import React, { useState } from 'react';
import type { ProjectMedia } from '../../data/projects';

interface MediaGalleryProps {
    images?: ProjectMedia[];
    videos?: ProjectMedia[];
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ images = [], videos = [] }) => {
    const [selectedMedia, setSelectedMedia] = useState<ProjectMedia | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allMedia = [...images, ...videos];

    if (allMedia.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Project Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allMedia.map((media, index) => (
                    <div key={index} className="relative group cursor-pointer">
                        {media.type === 'image' ? (
                            <img
                                src={media.src}
                                alt={media.alt || 'Project media'}
                                className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                                onClick={() => {
                                    setSelectedMedia(media);
                                    setIsModalOpen(true);
                                }}
                            />
                        ) : (
                            <div
                                className="relative cursor-pointer"
                                onClick={() => {
                                    setSelectedMedia(media);
                                    setIsModalOpen(true);
                                }}
                            >
                                <img
                                    src={media.thumbnail || media.src}
                                    alt={media.alt || 'Video thumbnail'}
                                    className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}
                        {media.caption && (
                            <p className="mt-2 text-sm text-gray-600 text-center">{media.caption}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal for full-size media view */}
            {isModalOpen && selectedMedia && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors z-10"
                        >
                            ×
                        </button>
                        {selectedMedia.type === 'image' ? (
                            <img
                                src={selectedMedia.src}
                                alt={selectedMedia.alt || 'Project media'}
                                className="max-w-full max-h-full object-contain rounded-lg"
                            />
                        ) : (
                            <iframe
                                src={selectedMedia.src}
                                title={selectedMedia.alt || 'Project video'}
                                className="w-full h-96 rounded-lg"
                                allowFullScreen
                            />
                        )}
                        {selectedMedia.caption && (
                            <p className="mt-4 text-white text-center text-lg">{selectedMedia.caption}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaGallery;
