
// export interface ProjectMedia {
//   type: 'image' | 'video';
//   src: string;
//   alt?: string;
//   caption?: string;
//   thumbnail?: string;
// }

// export interface Project extends ProjectFrontmatter {
//   // Content field removed - content is now loaded dynamically from markdown files
//   // All other fields remain the same for backward compatibility
//   images?: ProjectMedia[]; // Additional images
//   videos?: ProjectMedia[]; // Video content
// }

// export const projects: Project[] = [
//   {
//     id: 'ak-chibi-bot',
//     slug: 'ak-chibi-bot',
//     title: 'Arknights Chibi Twitch Bot',
//     description: 'A twitch bot and browser source overlay to show Arknight chibis walking on your stream. Viewers can issue !chibi chat commands to choose their own operator, change skins and play different animations.',
//     shortDescription: 'Twitch Bot and Browser Overlay for Arknights Chibis',
//     image: '/images/ak-chibi-bot/banner.png',
//     techStack: ['React', 'Spine', 'Twitch API', 'Golang'],
//     tags: ['React', 'Spine', 'Twitch API', 'Golang'],
//     featured: true,
//     date: '2024-06-10',
//     liveDemo: 'https://akchibibot.stymphalian.top',
//     githubRepo: 'https://github.com/stymphalian/ak_chibi_bot',
//     showDetails: true,
//     images: [
//       {
//         type: 'image',
//         src: '/images/ak-chibi-bot/banner.png',
//         alt: 'Arknights Chibi Bot',
//         caption: 'Arknights Chibi Twith Bot and Overlay'
//       }
//     ],
//     videos: [
//       // {
//       //   type: 'video',
//       //   src: 'https://www.youtube.com/embed/demo-video-id',
//       //   alt: 'Project walkthrough',
//       //   caption: 'Video demonstration of key features',
//       //   thumbnail: '/placeholder-project-3.jpg'
//       // }
//     ]
//   },
//   {
//     id: 'graph-editor',
//     slug: 'graph_editor',
//     title: 'Graph Editor',
//     description: 'A web-based graph (node/edge) editor application designed to allow you to visually create and edit graphs. Features a text-panel for edge-list representation with bidirectional synchronization between text and visual editors. Built as an experiment with agentic coding using Cursor AI.',
//     shortDescription: 'Interactive web-based graph editor with visual and text editing modes',
//     image: '/images/graph_editor/banner.png',
//     techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'D3.js', 'Jest'],
//     tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'D3.js', 'Jest'],
//     featured: true,
//     date: '2025-09-01',
//     githubRepo: 'https://github.com/Stymphalian/graph_editor',
//     showDetails: true,
//     images: [
//       {
//         type: 'image',
//         src: '/images/graph_editor/banner.png',
//         alt: 'Graph Editor Interface',
//         caption: 'Interactive graph editor with visual and text editing modes'
//       }
//     ],
//     videos: []
//   },
//   {
//     id: 'vscode-code-share-link',
//     slug: 'vscode-code-share-link',
//     title: 'VSCode Code Share Link',
//     description: 'A VS Code extension that allows you to quickly generate and share code links to specific lines of code in your repository. Perfect for code reviews, documentation, and collaboration with keyboard shortcuts and context menu integration.',
//     shortDescription: 'VS Code extension for generating shareable code links',
//     image: '/images/vscode-code-share-link/banner.png',
//     techStack: ['TypeScript', 'VS Code API', 'Git', 'Node.js'],
//     tags: ['TypeScript', 'VS Code Extension', 'Developer Tools', 'Git'],
//     featured: true,
//     date: '2025-09-20',
//     githubRepo: 'https://github.com/Stymphalian/vscode-code-share-link',
//     showDetails: true,
//     images: [
//       {
//         type: 'image',
//         src: '/images/vscode-code-share-link/banner.png',
//         alt: 'VSCode Code Share Link Extension',
//         caption: 'VS Code extension for generating shareable code links'
//       }
//     ],
//     videos: []
//   },
// ];
