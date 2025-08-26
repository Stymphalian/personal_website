# Build Configuration Documentation

## Overview
This project uses Vite with enhanced build configurations for development and production environments.

## Environment Configuration

### Development Environment (`env.development`)
- **NODE_ENV**: development
- **VITE_APP_ENV**: development
- **VITE_APP_TITLE**: Personal Blog (Dev)
- **PORT**: 3000
- **PREVIEW_PORT**: 4173
- **Source Maps**: Enabled
- **Minification**: Disabled

### Production Environment (`env.production`)
- **NODE_ENV**: production
- **VITE_APP_ENV**: production
- **VITE_APP_TITLE**: Personal Blog & Portfolio
- **Source Maps**: Disabled
- **Minification**: Enabled with Terser
- **Console Logs**: Removed

## Build Scripts

### Development
```bash
npm run dev              # Start development server (mode: development)
npm run dev:prod         # Start development server (mode: production)
npm run build:dev        # Build for development with source maps
npm run preview:dev      # Preview development build
```

### Production
```bash
npm run build            # Production build with optimization
npm run preview          # Preview production build
npm run build:analyze    # Build with bundle analysis
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run lint:check       # Strict linting (no warnings)
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # TypeScript type checking
```

### Testing
```bash
npm run test             # Run tests once
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:ci          # CI-friendly test run
```

### Utilities
```bash
npm run clean            # Clean build directory
npm run start            # Start production preview server
```

## TypeScript Configurations

### `tsconfig.json` (Base)
- Base configuration extended by other configs
- Common compiler options

### `tsconfig.dev.json` (Development)
- Faster builds with relaxed type checking
- Source maps enabled
- Incremental compilation

### `tsconfig.build.json` (Production)
- Strict type checking
- Declaration files generated
- Optimized for production builds

### `tsconfig.test.json` (Testing)
- Jest-specific configuration
- Test file exclusions

## Build Features

### Code Splitting
- **Vendor**: React and React DOM
- **Router**: React Router DOM
- **Icons**: Lucide React
- **Markdown**: Markdown processing libraries

### Asset Optimization
- **Images**: Organized in `assets/images/`
- **CSS**: Organized in `assets/css/`
- **JavaScript**: Organized in `assets/js/`
- **Hashing**: Content-based file naming for caching

### Performance Optimizations
- **Tree Shaking**: Unused code elimination
- **Minification**: Terser for production builds
- **Source Maps**: Development builds only
- **Bundle Analysis**: Available via `build:analyze`

## Development Workflow

1. **Development**: `npm run dev` - Fast refresh, source maps
2. **Testing**: `npm run test:watch` - Continuous testing
3. **Building**: `npm run build:dev` - Development build
4. **Production**: `npm run build` - Optimized production build
5. **Preview**: `npm run preview` - Test production build locally

## Environment Variables

### Available Variables
- `VITE_APP_ENV`: Environment identifier
- `VITE_APP_TITLE`: Application title
- `VITE_API_URL`: API endpoint URL
- `VITE_ENABLE_DEBUG`: Debug mode toggle
- `VITE_ENABLE_SOURCE_MAPS`: Source map toggle

### Usage in Code
```typescript
const apiUrl = import.meta.env.VITE_API_URL
const isDebug = import.meta.env.VITE_ENABLE_DEBUG
```

## Troubleshooting

### Common Issues
1. **Terser not found**: Install with `npm install --save-dev terser`
2. **TypeScript errors**: Run `npm run type-check`
3. **Build failures**: Check environment files and dependencies
4. **Port conflicts**: Modify PORT in environment files

### Performance Tips
1. Use `npm run build:dev` for faster development builds
2. Enable incremental compilation in development
3. Use source maps only when debugging
4. Monitor bundle sizes with `build:analyze`
