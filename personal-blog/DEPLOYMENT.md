# Personal Blog Deployment Guide

This comprehensive guide covers deploying the personal blog to production using Docker and various deployment platforms.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Docker Build Process](#docker-build-process)
4. [Deployment Methods](#deployment-methods)
5. [Environment Configuration](#environment-configuration)
6. [Monitoring and Health Checks](#monitoring-and-health-checks)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance and Updates](#maintenance-and-updates)
9. [Security Best Practices](#security-best-practices)
10. [Performance Optimization](#performance-optimization)

## Prerequisites

### Required Tools
- **Docker Desktop** (Windows/Mac) or Docker Engine (Linux)
- **Node.js 20.19+** (for local development and building)
- **Git** for version control
- **DigitalOcean account** (for production deployment)

### Optional Tools
- **DigitalOcean CLI (doctl)** for automated deployments
- **Docker Registry** (Docker Hub, GitHub Container Registry, etc.)

## Local Development

### Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd personal-blog

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Using Docker for Development

```bash
# Start development environment
docker-compose up app-dev

# Access the app at http://localhost:3000
# Changes to source code will automatically reload
```

## Docker Build Process

### Building Images

#### Using the Build Script (Recommended)

```bash
# Build all images (dev and production)
build.bat all

# Build only production image
build.bat prod

# Build only development image
build.bat dev

# Build without cache
build.bat prod --no-cache

# Get help
build.bat --help
```

#### Manual Build Commands

```bash
# Build production image
docker build -f Dockerfile --target production -t personal-blog:production .

# Build development image
docker build -f Dockerfile.dev -t personal-blog:dev .

# Build with specific tag
docker build -f Dockerfile --target production -t personal-blog:v1.0.0 .
```

### Image Optimization Features

- **Multi-stage builds** for smaller production images
- **Layer caching** for faster rebuilds
- **Production-only dependencies** in final image
- **Security hardening** with non-root user
- **Health check endpoints** for monitoring

## Deployment Methods

### Method 1: DigitalOcean Droplet (Manual)

#### Step 1: Create Droplet
1. Log into DigitalOcean
2. Create new droplet:
   - **OS**: Ubuntu 22.04 LTS
   - **Size**: Basic plan with 1GB RAM minimum
   - **Region**: Choose closest to your users
   - **Authentication**: SSH key (recommended)

#### Step 2: Configure Server
```bash
# SSH into droplet
ssh root@your-droplet-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Create app directory
mkdir -p /opt/personal-blog
cd /opt/personal-blog
```

#### Step 3: Deploy Application
```bash
# Pull image from registry
docker pull your-registry.com/personal-blog:latest

# Stop existing container (if any)
docker stop personal-blog || true
docker rm personal-blog || true

# Run new container
docker run -d \
  --name personal-blog \
  --restart unless-stopped \
  -p 80:80 \
  -p 443:443 \
  your-registry.com/personal-blog:latest

# Verify deployment
docker ps
docker logs personal-blog
```

#### Step 4: Configure Firewall
```bash
# Allow necessary ports
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 22/tcp    # SSH
ufw enable
```

### Method 2: DigitalOcean App Platform

#### Step 1: Prepare Repository
1. Push code to GitHub
2. Update `app-spec.yml` with your repository details
3. Commit and push changes

#### Step 2: Deploy via CLI
```bash
# Install doctl
# https://docs.digitalocean.com/reference/doctl/how-to/install/

# Authenticate
doctl auth init

# Create app
doctl apps create --spec app-spec.yml

# Check status
doctl apps list
doctl apps get <app-id>
```

#### Step 3: Deploy via Web Interface
1. Go to DigitalOcean App Platform
2. Click "Create App"
3. Connect GitHub repository
4. Select branch and configure settings
5. Deploy

### Method 3: Automated Deployment Script

```bash
# Deploy to production
deploy-digitalocean.bat --registry your-registry.com --tag v1.0.0

# Deploy to staging
deploy-digitalocean.bat --env staging --registry your-registry.com --tag staging

# Get help
deploy-digitalocean.bat --help
```

## Environment Configuration

### Environment Variables

#### Production
```bash
NODE_ENV=production
PORT=80
BASE_URL=https://your-domain.com
```

#### Staging
```bash
NODE_ENV=staging
PORT=3000
BASE_URL=https://staging.your-domain.com
```

#### Development
```bash
NODE_ENV=development
PORT=3000
BASE_URL=http://localhost:3000
```

### Configuration Files

- **`.env.production`** - Production environment variables
- **`.env.development`** - Development environment variables
- **`nginx.conf`** - Nginx server configuration
- **`app-spec.yml`** - DigitalOcean App Platform specification

## Monitoring and Health Checks

### Health Check Endpoint

- **URL**: `/health`
- **Response**: `healthy`
- **Purpose**: Load balancer and monitoring system health checks

### Docker Health Checks

```yaml
# Production container
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Development container
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1
```

### Monitoring Commands

```bash
# Check container health
docker ps

# View health check logs
docker inspect personal-blog | grep -A 10 Health

# Monitor resource usage
docker stats personal-blog

# View real-time logs
docker logs -f personal-blog
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Container Won't Start

**Symptoms**: Container exits immediately or shows error
```bash
# Check container logs
docker logs personal-blog

# Check container status
docker ps -a

# Inspect container
docker inspect personal-blog
```

**Common Causes**:
- Port already in use
- Insufficient permissions
- Missing environment variables
- Docker daemon issues

**Solutions**:
```bash
# Check port usage
netstat -tlnp | grep :80

# Check Docker daemon
systemctl status docker

# Restart Docker service
systemctl restart docker

# Run with interactive mode for debugging
docker run -it --rm personal-blog:latest /bin/sh
```

#### 2. Application Not Accessible

**Symptoms**: Container running but website not accessible
```bash
# Test local access
curl localhost:80/health

# Check container networking
docker network ls
docker network inspect bridge

# Verify port mapping
docker port personal-blog
```

**Solutions**:
- Verify firewall settings
- Check port mappings
- Ensure container is bound to correct interface

#### 3. Build Failures

**Symptoms**: Docker build fails with errors
```bash
# Check Dockerfile syntax
docker build --no-cache -f Dockerfile .

# Verify build context
ls -la

# Check .dockerignore file
cat .dockerignore
```

**Common Issues**:
- Missing dependencies
- Incorrect file paths
- Permission issues
- Network connectivity problems

#### 4. Performance Issues

**Symptoms**: Slow response times, high resource usage
```bash
# Monitor resource usage
docker stats personal-blog

# Check nginx configuration
docker exec personal-blog nginx -t

# View nginx access logs
docker exec personal-blog tail -f /var/log/nginx/access.log
```

**Optimization Tips**:
- Enable gzip compression
- Optimize image sizes
- Use CDN for static assets
- Monitor and adjust resource limits

### Debug Commands

```bash
# Container information
docker inspect personal-blog

# Execute commands in container
docker exec -it personal-blog /bin/sh

# View container processes
docker top personal-blog

# Check container filesystem
docker exec personal-blog ls -la /usr/share/nginx/html

# Test nginx configuration
docker exec personal-blog nginx -t

# View nginx error logs
docker exec personal-blog tail -f /var/log/nginx/error.log
```

## Maintenance and Updates

### Regular Maintenance Tasks

#### Weekly
- Check container logs for errors
- Monitor resource usage
- Verify health check endpoints
- Review security updates

#### Monthly
- Update base images
- Review and rotate logs
- Check SSL certificate expiration
- Review access logs for anomalies

#### Quarterly
- Security audit
- Performance review
- Backup verification
- Update deployment scripts

### Update Process

```bash
# 1. Build new image
build.bat prod

# 2. Test locally
docker run -d -p 8080:80 --name test-blog personal-blog:production
curl http://localhost:8080/health

# 3. Stop test container
docker stop test-blog && docker rm test-blog

# 4. Deploy to production
deploy-digitalocean.bat --registry your-registry.com --tag v1.1.0

# 5. Verify deployment
curl https://your-domain.com/health
```

### Rollback Process

```bash
# 1. Identify previous working version
docker images personal-blog

# 2. Stop current container
docker stop personal-blog

# 3. Start previous version
docker run -d --name personal-blog -p 80:80 personal-blog:v1.0.0

# 4. Verify rollback
curl https://your-domain.com/health
```

## Security Best Practices

### Container Security

- **Non-root user**: Container runs as nginx user
- **Minimal base image**: Alpine Linux for smaller attack surface
- **Regular updates**: Keep base images updated
- **Security scanning**: Use Docker Scout or similar tools

### Network Security

- **Firewall configuration**: Only allow necessary ports
- **SSH key authentication**: Disable password authentication
- **Regular security updates**: Keep system packages updated
- **Access logging**: Monitor and review access logs

### Application Security

- **HTTPS enforcement**: Redirect HTTP to HTTPS
- **Security headers**: XSS protection, content security policy
- **Input validation**: Sanitize all user inputs
- **Regular dependency updates**: Keep npm packages updated

## Performance Optimization

### Nginx Configuration

- **Gzip compression**: Reduces bandwidth usage
- **Static asset caching**: Long-term caching for static files
- **Connection pooling**: Optimized connection handling
- **Buffer optimization**: Optimized buffer sizes

### Docker Optimization

- **Multi-stage builds**: Smaller production images
- **Layer caching**: Faster rebuilds
- **Production dependencies**: Only necessary packages
- **Health checks**: Automated health monitoring

### Application Optimization

- **Code splitting**: Lazy loading of components
- **Image optimization**: Compressed and optimized images
- **Bundle analysis**: Monitor bundle sizes
- **Performance monitoring**: Core Web Vitals tracking

## Backup and Recovery

### Backup Strategy

#### Application Data
```bash
# Backup static files
docker cp personal-blog:/usr/share/nginx/html /opt/backups/app_$(date +%Y%m%d_%H%M%S)

# Backup configuration files
cp nginx.conf /opt/backups/nginx_$(date +%Y%m%d_%H%M%S).conf
cp docker-compose.yml /opt/backups/compose_$(date +%Y%m%d_%H%M%S).yml
```

#### System Configuration
```bash
# Backup system configuration
cp /etc/nginx/nginx.conf /opt/backups/system_nginx_$(date +%Y%m%d_%H%M%S).conf
cp /etc/docker/daemon.json /opt/backups/docker_daemon_$(date +%Y%m%d_%H%M%S).json
```

### Recovery Process

```bash
# 1. Stop application
docker stop personal-blog

# 2. Restore from backup
cp /opt/backups/app_20241201_120000/* /usr/share/nginx/html/

# 3. Restart application
docker start personal-blog

# 4. Verify recovery
curl https://your-domain.com/health
```

## Cost Optimization

### Resource Management

- **Right-sizing**: Choose appropriate droplet sizes
- **Reserved instances**: Use reserved instances for long-term deployments
- **Monitoring**: Track resource usage and optimize
- **Auto-scaling**: Implement auto-scaling for variable loads

### Platform Selection

- **Development**: Use basic droplets
- **Staging**: Consider App Platform with basic tier
- **Production**: App Platform with production tier (includes SSL, CDN)

## Support and Resources

### Documentation
- [Docker Documentation](https://docs.docker.com/)
- [DigitalOcean Documentation](https://docs.digitalocean.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)

### Community Support
- [Docker Community](https://forums.docker.com/)
- [DigitalOcean Community](https://www.digitalocean.com/community/)
- [Stack Overflow](https://stackoverflow.com/)

### Monitoring Tools
- **Docker Scout**: Container security scanning
- **DigitalOcean Monitoring**: Built-in monitoring
- **Custom Health Checks**: Application-specific monitoring

---

## Quick Reference

### Essential Commands
```bash
# Build and deploy
build.bat prod
deploy-digitalocean.bat --registry your-registry.com

# Check status
docker ps
docker logs personal-blog

# Health check
curl https://your-domain.com/health

# Update deployment
docker pull your-registry.com/personal-blog:latest
docker restart personal-blog
```

### Emergency Contacts
- **System Administrator**: [Your Contact]
- **DevOps Team**: [Team Contact]
- **DigitalOcean Support**: [Support URL]

### Maintenance Schedule
- **Daily**: Health check verification
- **Weekly**: Log review and monitoring
- **Monthly**: Security updates and optimization
- **Quarterly**: Comprehensive review and planning
