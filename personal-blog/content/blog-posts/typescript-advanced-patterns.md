---
id: 'typescript-advanced-patterns'
title: 'Advanced TypeScript Patterns for Robust Applications'
slug: 'typescript-advanced-patterns'
excerpt: 'Explore advanced TypeScript patterns including conditional types, mapped types, and utility types to build more robust applications.'
author: 'Jordan Yu'
date: '2024-01-20'
tags: ['TypeScript', 'Advanced Patterns', 'Type System', 'Generics', 'Utility Types']
featured: true
readTime: 15
category: 'tutorial'
difficulty: 'advanced'
---

# Advanced TypeScript Patterns for Robust Applications

## Introduction

TypeScript's type system is incredibly powerful, but many developers only scratch the surface. In this post, we'll explore advanced patterns that can make your applications more robust and maintainable.

## Conditional Types

Conditional types allow you to create types that change based on other types:

```typescript
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
```

## Mapped Types

Mapped types allow you to transform existing types:

```typescript
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
```

## Utility Types

TypeScript provides many built-in utility types:

```typescript
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
```

## Template Literal Types

Template literal types allow you to create string literal types:

```typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoint = '/users' | '/posts' | '/comments';

type ApiRoute = `${HttpMethod} ${ApiEndpoint}`;
// Results in: 'GET /users' | 'GET /posts' | 'GET /comments' | 'POST /users' | ...

// More complex example
type EventName = 'click' | 'hover' | 'focus';
type ElementType = 'button' | 'input' | 'div';

type EventHandlerName = `on${Capitalize<EventName>}`;
// Results in: 'onClick' | 'onHover' | 'onFocus'

type ElementEvent = `${ElementType}${Capitalize<EventName>}`;
// Results in: 'buttonClick' | 'buttonHover' | 'inputClick' | ...
```

## Advanced Generic Constraints

Generic constraints allow you to limit what types can be used:

```typescript
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
```

## Real-World Example: API Client

Here's how these patterns can be used in a real API client:

```typescript
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
```

## Conclusion

Advanced TypeScript patterns can significantly improve your code's robustness and maintainability. While they may seem complex at first, they provide powerful tools for building type-safe applications.

Start with simpler patterns and gradually incorporate more advanced ones as you become comfortable with them. Remember that the goal is to catch errors at compile time, not to make your types unnecessarily complex.
