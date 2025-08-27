---
id: 'docker-production-optimization'
title: 'Docker Production Optimization: From Development to Production'
slug: 'docker-production-optimization'
excerpt: 'Learn how to optimize Docker containers for production deployment, including multi-stage builds, security best practices, and performance tuning.'
author: 'Jordan Yu'
date: '2024-01-25'
tags: ['Docker', 'DevOps', 'Production', 'Optimization', 'Security']
featured: false
readTime: 18
category: 'tutorial'
difficulty: 'intermediate'
---

# Docker Production Optimization: From Development to Production

## Introduction

Docker has revolutionized how we deploy applications, but many developers struggle with the transition from development containers to production-ready deployments. In this post, we'll explore how to optimize your Docker setup for production environments.

## Multi-Stage Builds

Multi-stage builds are essential for reducing production image size:

```dockerfile
# Development stage
FROM node:18-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Security Best Practices

Security should be a top priority in production:

```dockerfile
# Use specific version tags, not 'latest'
FROM node:18.19-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY --chown=nextjs:nodejs . .

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
```

## Performance Optimization

Several techniques can improve container performance:

```dockerfile
# Use .dockerignore to exclude unnecessary files
# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.vscode
.idea

# Optimize layer caching
FROM node:18-alpine

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Remove dev dependencies from final image
RUN npm prune --production

# Use multi-stage build for smaller final image
FROM node:18-alpine
WORKDIR /app
COPY --from=0 /app/dist ./dist
COPY --from=0 /app/node_modules ./node_modules
COPY --from=0 /app/package*.json ./

EXPOSE 3000
CMD ["npm", "start"]
```

## Docker Compose for Production

Production Docker Compose should include monitoring and networking:

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    depends_on:
      - db
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=${DB_NAME}
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    networks:
      - app-network
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - app-network
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

## Monitoring and Logging

Production containers need proper monitoring:

```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
    volumes:
      - grafana_data:/var/lib/grafana
    depends_on:
      - prometheus

volumes:
  prometheus_data:
  grafana_data:
```

## Environment-Specific Configuration

Use environment variables for configuration:

```bash
# .env.production
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@db:5432/production
REDIS_URL=redis://redis:6379
JWT_SECRET=your-super-secret-jwt-key
API_RATE_LIMIT=100
LOG_LEVEL=warn
```

## Deployment Scripts

Automate your deployment process:

```bash
#!/bin/bash
# deploy.sh

set -e

echo "Starting production deployment..."

# Pull latest changes
git pull origin main

# Build production image
docker-compose -f docker-compose.prod.yml build

# Stop existing containers
docker-compose -f docker-compose.prod.yml down

# Start new containers
docker-compose -f docker-compose.prod.yml up -d

# Wait for health checks
echo "Waiting for services to be healthy..."
sleep 30

# Check service health
docker-compose -f docker-compose.prod.yml ps

echo "Deployment completed successfully!"
```

## Performance Monitoring

Monitor your containers in production:

```bash
# Check container resource usage
docker stats

# Monitor logs
docker-compose -f docker-compose.prod.yml logs -f app

# Check container health
docker-compose -f docker-compose.prod.yml ps

# Resource usage breakdown
docker system df
```

## Conclusion

Optimizing Docker for production requires attention to security, performance, and monitoring. Start with multi-stage builds and security best practices, then add monitoring and automation as your deployment process matures.

Remember that production optimization is an ongoing process. Regularly review your Docker setup and look for opportunities to improve security, performance, and maintainability.
