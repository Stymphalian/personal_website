// Blog post data structure for developer-focused content
// Supports markdown content, tags, and developer-relevant metadata

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown content
  author: string;
  date: string;
  tags: string[];
  featured: boolean;
  readTime: number; // in minutes
  category: 'tutorial' | 'project-showcase' | 'tech-review' | 'career-advice';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const blogPosts: BlogPost[] = [
  {
    id: 'react-performance-optimization',
    title: 'React Performance Optimization: A Deep Dive into useMemo and useCallback',
    slug: 'react-performance-optimization',
    excerpt: 'Learn how to optimize React applications using useMemo and useCallback hooks, with real-world examples and performance benchmarks.',
    content: `# React Performance Optimization: A Deep Dive into useMemo and useCallback

## Introduction

Performance optimization in React applications is crucial for maintaining smooth user experiences, especially as applications grow in complexity. In this post, we'll explore two powerful hooks that can significantly improve your app's performance: \`useMemo\` and \`useCallback\`.

## Understanding the Problem

Before diving into solutions, let's understand why performance issues occur in React:

\`\`\`jsx
function ExpensiveComponent({ data, onItemClick }) {
  // This expensive calculation runs on every render
  const processedData = data.map(item => {
    // Simulate expensive operation
    return expensiveOperation(item);
  });

  return (
    <div>
      {processedData.map(item => (
        <button key={item.id} onClick={() => onItemClick(item)}>
          {item.name}
        </button>
      ))}
    </div>
  );
}
\`\`\`

## The useMemo Hook

\`useMemo\` is perfect for memoizing expensive calculations:

\`\`\`jsx
function OptimizedComponent({ data, onItemClick }) {
  // Only recalculates when data changes
  const processedData = useMemo(() => {
    return data.map(item => expensiveOperation(item));
  }, [data]);

  return (
    <div>
      {processedData.map(item => (
        <button key={item.id} onClick={() => onItemClick(item)}>
          {item.name}
        </button>
      ))}
    </div>
  );
}
\`\`\`

## The useCallback Hook

\`useCallback\` prevents unnecessary re-renders of child components:

\`\`\`jsx
function ParentComponent({ data }) {
  // Stable function reference
  const handleItemClick = useCallback((item) => {
    console.log('Item clicked:', item);
    // Handle item click logic
  }, []); // Empty dependency array since it doesn't depend on any props/state

  return (
    <ExpensiveComponent 
      data={data} 
      onItemClick={handleItemClick} 
    />
  );
}
\`\`\`

## Real-World Example

Here's a practical example combining both hooks:

\`\`\`jsx
function DataTable({ data, filters, sortBy }) {
  // Memoize filtered and sorted data
  const processedData = useMemo(() => {
    let filtered = data.filter(item => {
      return Object.entries(filters).every(([key, value]) => 
        item[key].includes(value)
      );
    });
    
    return filtered.sort((a, b) => {
      if (sortBy.ascending) {
        return a[sortBy.field] > b[sortBy.field] ? 1 : -1;
      }
      return a[sortBy.field] < b[sortBy.field] ? 1 : -1;
    });
  }, [data, filters, sortBy]);

  // Memoize event handlers
  const handleRowClick = useCallback((rowData) => {
    // Handle row selection
    setSelectedRow(rowData);
  }, []);

  const handleSort = useCallback((field) => {
    setSortBy(prev => ({
      field,
      ascending: prev.field === field ? !prev.ascending : true
    }));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name</th>
          <th onClick={() => handleSort('date')}>Date</th>
          <th onClick={() => handleSort('status')}>Status</th>
        </tr>
      </thead>
      <tbody>
        {processedData.map(row => (
          <tr key={row.id} onClick={() => handleRowClick(row)}>
            <td>{row.name}</td>
            <td>{row.date}</td>
            <td>{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
\`\`\`

## Performance Benchmarks

Here are some performance improvements you can expect:

- **useMemo**: 40-60% reduction in calculation time for expensive operations
- **useCallback**: 20-30% reduction in unnecessary re-renders
- **Combined**: Up to 70% improvement in overall component performance

## Best Practices

1. **Don't over-optimize**: Only use these hooks when you have measurable performance issues
2. **Profile first**: Use React DevTools Profiler to identify bottlenecks
3. **Dependency arrays**: Be careful with dependency arrays to avoid stale closures
4. **Consider alternatives**: Sometimes restructuring components is better than memoization

## Conclusion

\`useMemo\` and \`useCallback\` are powerful tools for React performance optimization. When used correctly, they can significantly improve your application's performance. However, remember that premature optimization can lead to more complex code without meaningful benefits.

Always measure performance before and after implementing these optimizations to ensure they're providing real value to your users.`,
    author: 'Jordan Yu',
    date: '2024-01-15',
    tags: ['React', 'Performance', 'JavaScript', 'Hooks', 'Optimization'],
    featured: true,
    readTime: 12,
    category: 'tutorial',
    difficulty: 'intermediate'
  },
  {
    id: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns for Robust Applications',
    slug: 'typescript-advanced-patterns',
    excerpt: 'Explore advanced TypeScript patterns including conditional types, mapped types, and utility types to build more robust applications.',
    content: `# Advanced TypeScript Patterns for Robust Applications

## Introduction

TypeScript's type system is incredibly powerful, but many developers only scratch the surface. In this post, we'll explore advanced patterns that can make your applications more robust and maintainable.

## Conditional Types

Conditional types allow you to create types that change based on other types:

\`\`\`typescript
// Basic conditional type
type IsString<T> = T extends string ? true : false;

type Result1 = IsString<string>; // true
type Result2 = IsString<number>; // false

// More complex conditional type
type NonNullable<T> = T extends null | undefined ? never : T;

type User = {
  id: number;
  name: string;
  email?: string;
};

type RequiredUser = NonNullable<User['email']>; // string
\`\`\`

## Mapped Types

Mapped types allow you to transform existing types:

\`\`\`typescript
// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties required
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Make all properties readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Example usage
type User = {
  id: number;
  name: string;
  email: string;
};

type PartialUser = Partial<User>;
// Equivalent to:
// {
//   id?: number;
//   name?: string;
//   email?: string;
// }
\`\`\`

## Utility Types

TypeScript provides many built-in utility types:

\`\`\`typescript
// Pick specific properties
type UserBasicInfo = Pick<User, 'id' | 'name'>;

// Omit specific properties
type UserWithoutId = Omit<User, 'id'>;

// Extract union types
type StringOrNumber = string | number;
type OnlyStrings = Extract<StringOrNumber, string>; // string

// Exclude union types
type NonNullables = Exclude<StringOrNumber, null | undefined>; // string | number

// Return type of a function
type FunctionReturnType = ReturnType<() => string>; // string

// Parameters of a function
type FunctionParams = Parameters<(name: string, age: number) => void>; // [string, number]
\`\`\`

## Template Literal Types

Template literal types allow you to create string literal types:

\`\`\`typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoint = '/users' | '/posts' | '/comments';

type ApiRoute = \`\${HttpMethod} \${ApiEndpoint}\`;
// Results in: 'GET /users' | 'GET /posts' | 'GET /comments' | 'POST /users' | ...

// More complex example
type EventName = 'click' | 'hover' | 'focus';
type ElementType = 'button' | 'input' | 'div';

type EventHandlerName = \`on\${Capitalize<EventName>}\`;
// Results in: 'onClick' | 'onHover' | 'onFocus'

type ElementEvent = \`\${ElementType}\${Capitalize<EventName>}\`;
// Results in: 'buttonClick' | 'buttonHover' | 'inputClick' | ...
\`\`\`

## Advanced Generic Constraints

Generic constraints allow you to limit what types can be used:

\`\`\`typescript
// Constraint to objects with specific properties
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Constraint to constructable types
function createInstance<T extends new (...args: any[]) => any>(
  constructor: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  return new constructor(...args);
}

// Constraint to objects with length property
function getLength<T extends { length: number }>(obj: T): number {
  return obj.length;
}

// Usage examples
const user = { id: 1, name: 'John' };
const id = getProperty(user, 'id'); // number

const arr = [1, 2, 3];
const length = getLength(arr); // number
const strLength = getLength('hello'); // number
\`\`\`

## Real-World Example: API Client

Here's how these patterns can be used in a real API client:

\`\`\`typescript
// Base API types
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

type ApiError = {
  error: string;
  status: number;
  details?: any;
};

// API endpoint configuration
type EndpointConfig = {
  '/users': {
    GET: { response: User[]; params?: { page?: number; limit?: number } };
    POST: { body: CreateUserRequest; response: User };
    PUT: { body: UpdateUserRequest; response: User };
    DELETE: { params: { id: number }; response: { success: boolean } };
  };
  '/posts': {
    GET: { response: Post[]; params?: { userId?: number } };
    POST: { body: CreatePostRequest; response: Post };
  };
};

// Generic API client
class ApiClient {
  async request<
    TEndpoint extends keyof EndpointConfig,
    TMethod extends keyof EndpointConfig[TEndpoint]
  >(
    endpoint: TEndpoint,
    method: TMethod,
    options?: {
      body?: EndpointConfig[TEndpoint][TMethod] extends { body: any }
        ? EndpointConfig[TEndpoint][TMethod]['body']
        : never;
      params?: EndpointConfig[TEndpoint][TMethod] extends { params: any }
        ? EndpointConfig[TEndpoint][TMethod]['params']
        : never;
    }
  ): Promise<ApiResponse<EndpointConfig[TEndpoint][TMethod]['response']>> {
    // Implementation details...
    throw new Error('Not implemented');
  }
}

// Usage
const api = new ApiClient();

// TypeScript knows the exact types
const users = await api.request('/users', 'GET', { params: { page: 1, limit: 10 } });
// users.data is User[]
// users.status is number
// users.message is string

const newUser = await api.request('/users', 'POST', { 
  body: { name: 'John', email: 'john@example.com' } 
});
// newUser.data is User
\`\`\`

## Conclusion

Advanced TypeScript patterns can significantly improve your code's robustness and maintainability. While they may seem complex at first, they provide powerful tools for building type-safe applications.

Start with simpler patterns and gradually incorporate more advanced ones as you become comfortable with them. Remember that the goal is to catch errors at compile time, not to make your types unnecessarily complex.`,
    author: 'Jordan Yu',
    date: '2024-01-20',
    tags: ['TypeScript', 'Advanced Patterns', 'Type System', 'Generics', 'Utility Types'],
    featured: true,
    readTime: 15,
    category: 'tutorial',
    difficulty: 'advanced'
  },
  {
    id: 'docker-production-optimization',
    title: 'Docker Production Optimization: From Development to Production',
    slug: 'docker-production-optimization',
    excerpt: 'Learn how to optimize Docker containers for production deployment, including multi-stage builds, security best practices, and performance tuning.',
    content: `# Docker Production Optimization: From Development to Production

## Introduction

Docker has revolutionized how we deploy applications, but many developers struggle with the transition from development containers to production-ready deployments. In this post, we'll explore how to optimize your Docker setup for production environments.

## Multi-Stage Builds

Multi-stage builds are essential for reducing production image size:

\`\`\`dockerfile
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
\`\`\`

## Security Best Practices

Security should be a top priority in production:

\`\`\`dockerfile
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
\`\`\`

## Performance Optimization

Several techniques can improve container performance:

\`\`\`dockerfile
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
\`\`\`

## Docker Compose for Production

Production Docker Compose should include monitoring and networking:

\`\`\`yaml
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
      - DATABASE_URL=\${DATABASE_URL}
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
      - POSTGRES_DB=\${DB_NAME}
      - POSTGRES_USER=\${DB_USER}
      - POSTGRES_PASSWORD=\${DB_PASSWORD}
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
\`\`\`

## Monitoring and Logging

Production containers need proper monitoring:

\`\`\`yaml
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
      - GF_SECURITY_ADMIN_PASSWORD=\${GRAFANA_PASSWORD}
    volumes:
      - grafana_data:/var/lib/grafana
    depends_on:
      - prometheus

volumes:
  prometheus_data:
  grafana_data:
\`\`\`

## Environment-Specific Configuration

Use environment variables for configuration:

\`\`\`bash
# .env.production
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@db:5432/production
REDIS_URL=redis://redis:6379
JWT_SECRET=your-super-secret-jwt-key
API_RATE_LIMIT=100
LOG_LEVEL=warn
\`\`\`

## Deployment Scripts

Automate your deployment process:

\`\`\`bash
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
\`\`\`

## Performance Monitoring

Monitor your containers in production:

\`\`\`bash
# Check container resource usage
docker stats

# Monitor logs
docker-compose -f docker-compose.prod.yml logs -f app

# Check container health
docker-compose -f docker-compose.prod.yml ps

# Resource usage breakdown
docker system df
\`\`\`

## Conclusion

Optimizing Docker for production requires attention to security, performance, and monitoring. Start with multi-stage builds and security best practices, then add monitoring and automation as your deployment process matures.

Remember that production optimization is an ongoing process. Regularly review your Docker setup and look for opportunities to improve security, performance, and maintainability.`,
    author: 'Jordan Yu',
    date: '2024-01-25',
    tags: ['Docker', 'DevOps', 'Production', 'Optimization', 'Security'],
    featured: false,
    readTime: 18,
    category: 'tutorial',
    difficulty: 'intermediate'
  }
];

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag));
};

export const getPostsByCategory = (category: BlogPost['category']): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getPostsByDifficulty = (difficulty: BlogPost['difficulty']): BlogPost[] => {
  return blogPosts.filter(post => post.difficulty === difficulty);
};

export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getAllTags = (): string[] => {
  const tagSet = new Set<string>();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

export const getPostsByAuthor = (author: string): BlogPost[] => {
  return blogPosts.filter(post => post.author === author);
};
