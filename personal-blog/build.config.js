// Build Configuration for Personal Blog Project
export const buildConfig = {
  // Build targets
  targets: {
    modern: 'esnext',
    legacy: 'es2015',
    node: 'node16'
  },
  
  // Output directories
  output: {
    dist: 'dist',
    assets: 'assets',
    images: 'assets/images',
    css: 'assets/css',
    js: 'assets/js'
  },
  
  // Bundle splitting configuration
  chunks: {
    vendor: ['react', 'react-dom'],
    router: ['react-router-dom'],
    icons: ['lucide-react'],
    markdown: ['react-markdown', 'rehype-highlight', 'remark-gfm'],
    utils: ['@/utils']
  },
  
  // Asset optimization
  assets: {
    images: {
      formats: ['webp', 'avif', 'png', 'jpg'],
      quality: 80,
      maxWidth: 1920
    },
    fonts: {
      formats: ['woff2', 'woff'],
      display: 'swap'
    }
  },
  
  // Performance budgets
  performance: {
    maxSize: {
      js: '500kb',
      css: '100kb',
      images: '1mb'
    },
    maxInitialSize: '1mb',
    maxAsyncSize: '500kb'
  }
}

export default buildConfig
