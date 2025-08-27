# Multi-stage build for production React application
# Stage 1: Build the application
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies with production flag for smaller node_modules
RUN npm ci --only=production && npm cache clean --force

# Install dev dependencies separately for build
RUN npm ci --only=dev

# Copy source code
COPY . .

# Build the application
RUN npm run build && \
    # Remove dev dependencies after build to reduce image size
    rm -rf node_modules && \
    # Install only production dependencies
    npm ci --only=production && \
    npm cache clean --force

# Stage 2: Production server
FROM nginx:alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl && \
    # Remove default nginx configuration
    rm -rf /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create necessary directories and set permissions
RUN mkdir -p /run /var/cache/nginx /var/log/nginx && \
    chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx /run

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
