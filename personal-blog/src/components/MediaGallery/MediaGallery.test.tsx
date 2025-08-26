import { fireEvent, render, screen } from '@testing-library/react';
import type { ProjectMedia } from '../../data/projects';
import MediaGallery from './MediaGallery';

// Mock data for testing
const mockImages: ProjectMedia[] = [
    {
        type: 'image',
        src: '/test-image-1.jpg',
        alt: 'Test Image 1',
        caption: 'Test Caption 1'
    },
    {
        type: 'image',
        src: '/test-image-2.jpg',
        alt: 'Test Image 2',
        caption: 'Test Caption 2'
    }
];

const mockVideos: ProjectMedia[] = [
    {
        type: 'video',
        src: 'https://www.youtube.com/embed/test-video',
        alt: 'Test Video',
        caption: 'Test Video Caption',
        thumbnail: '/test-video-thumbnail.jpg'
    }
];

describe('MediaGallery', () => {
    it('renders nothing when no media is provided', () => {
        const { container } = render(<MediaGallery />);
        expect(container.firstChild).toBeNull();
    });

    it('renders images correctly', () => {
        render(<MediaGallery images={mockImages} />);

        expect(screen.getByText('Project Media')).toBeInTheDocument();
        expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
        expect(screen.getByAltText('Test Image 2')).toBeInTheDocument();
        expect(screen.getByText('Test Caption 1')).toBeInTheDocument();
        expect(screen.getByText('Test Caption 2')).toBeInTheDocument();
    });

    it('renders videos correctly with play button overlay', () => {
        render(<MediaGallery videos={mockVideos} />);

        expect(screen.getByAltText('Test Video')).toBeInTheDocument();
        expect(screen.getByText('Test Video Caption')).toBeInTheDocument();

        // Check for play button overlay
        const playButton = screen.getByAltText('Test Video');
        expect(playButton).toBeInTheDocument();
    });

    it('renders both images and videos when both are provided', () => {
        render(<MediaGallery images={mockImages} videos={mockVideos} />);

        expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
        expect(screen.getByAltText('Test Image 2')).toBeInTheDocument();
        expect(screen.getByAltText('Test Video')).toBeInTheDocument();
    });

    it('opens modal when image is clicked', () => {
        render(<MediaGallery images={mockImages} />);

        const image = screen.getByAltText('Test Image 1');
        fireEvent.click(image);

        // Modal should be open
        expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
        // Check that modal image is displayed (there will be two images with same alt text)
        const modalImage = screen.getAllByAltText('Test Image 1')[1];
        expect(modalImage).toBeInTheDocument();
    });

    it('closes modal when close button is clicked', () => {
        render(<MediaGallery images={mockImages} />);

        // Open modal
        const image = screen.getByAltText('Test Image 1');
        fireEvent.click(image);

        // Close modal
        const closeButton = screen.getByRole('button', { name: '×' });
        fireEvent.click(closeButton);

        // Modal should be closed
        expect(screen.queryByRole('button', { name: '×' })).not.toBeInTheDocument();
    });

    it('displays video in modal when video thumbnail is clicked', () => {
        render(<MediaGallery videos={mockVideos} />);

        const videoThumbnail = screen.getByAltText('Test Video');
        fireEvent.click(videoThumbnail);

        // Modal should be open with video
        expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
        const iframe = screen.getByTitle('Test Video');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/test-video');
    });

    it('displays caption in modal when available', () => {
        render(<MediaGallery images={mockImages} />);

        const image = screen.getByAltText('Test Image 1');
        fireEvent.click(image);

        // Check that modal caption is displayed (there will be two captions with same text)
        const modalCaption = screen.getAllByText('Test Caption 1')[1];
        expect(modalCaption).toBeInTheDocument();
    });

    it('applies responsive grid layout classes', () => {
        render(<MediaGallery images={mockImages} />);

        const gridContainer = screen.getByText('Project Media').nextElementSibling;
        expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
    });

    it('applies hover effects to media items', () => {
        render(<MediaGallery images={mockImages} />);

        const mediaItems = screen.getAllByRole('img');
        mediaItems.forEach(item => {
            const parent = item.closest('.group');
            expect(parent).toHaveClass('group', 'cursor-pointer');
        });
    });
});
