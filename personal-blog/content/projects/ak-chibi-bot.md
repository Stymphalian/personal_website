---
id: 'ak-chibi-bot'
slug: 'ak-chibi-bot'
title: 'Arknights Chibi Twitch Bot'
description: 'A twitch bot and browser source overlay to show Arknight chibis walking on your stream. Viewers can issue !chibi chat commands to choose their own operator, change skins and play different animations.'
shortDescription: 'Twitch Bot and Browser Overlay for Arknights Chibis'
image: '/images/ak-chibi-bot/banner.png'
techStack: ['React', 'Spine', 'Twitch API', 'Golang']
tags: ['React', 'Spine', 'Twitch API', 'Golang']
featured: true
date: '2024-06-10'
liveDemo: 'https://akchibibot.stymphalian.top'
githubRepo: 'https://github.com/stymphalian/ak_chibi_bot'
showDetails: true
---

# Arknights Chibi Twitch Bot

A Twitch bot and browser source overlay that displays Arknights chibi characters walking on your stream. Viewers can interact with the bot using chat commands to choose operators, change skins, and play different animations.

## Features

- **Twitch Bot Integration**: Responds to chat commands in real-time
- **Browser Source Overlay**: Seamlessly integrates with OBS/Streamlabs
- **Interactive Commands**: Viewers can control chibi characters via chat
- **Multiple Operators**: Support for various Arknights characters
- **Skin System**: Different character skins and outfits
- **Animation Control**: Various walking and idle animations

## Tech Stack

- **Frontend**: React with Spine animation framework
- **Backend**: Golang for the Twitch bot
- **Animation**: Spine 2D for smooth character animations
- **Integration**: Twitch API for chat and stream integration
- **Overlay**: Browser source compatible with major streaming software

## Core Functionality

### Twitch Bot Commands
- `!chibi <operator>` - Summon a specific operator
- `!skin <skin_name>` - Change character skin
- `!dance` - Trigger dance animation
- `!walk` - Start walking animation
- `!stop` - Stop current animation

### Browser Source Features
- Real-time character rendering
- Smooth animation transitions
- Responsive design for different stream layouts
- Customizable positioning and scaling
- Performance optimized for streaming

### Character Management
- Operator selection system
- Skin and outfit variations
- Animation state management
- Position tracking and boundaries
- Collision detection

## Architecture

The system consists of two main components:
- **Golang Bot**: Handles Twitch chat integration and command processing
- **React Overlay**: Renders characters and animations in the browser

### Bot Architecture
- WebSocket connection to Twitch chat
- Command parsing and validation
- State management for active characters
- Event broadcasting to overlay

### Overlay Architecture
- Spine animation rendering
- Real-time state updates
- Performance optimization
- Browser source compatibility

## Integration

### Twitch Setup
- Bot account configuration
- Channel permissions
- Command moderation
- Rate limiting

### Streaming Software
- OBS Studio integration
- Streamlabs compatibility
- Browser source configuration
- Performance settings

## Development Process

This project demonstrates:
- Real-time application development
- Twitch API integration
- Animation system implementation
- Cross-platform compatibility
- Performance optimization for streaming

## Future Enhancements

- Additional operator characters
- More animation variations
- Sound effects integration
- Viewer interaction history
- Custom command creation
  variants: [Variant],
  inventory: Number,
  rating: Number,
  reviews: [ReviewId]
}

Orders: {
  _id: ObjectId,
  userId: ObjectId,
  items: [OrderItem],
  total: Number,
  status: String,
  paymentIntent: String,
  shippingAddress: Address,
  createdAt: Date
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Rate limiting
- HTTPS enforcement
- Secure payment processing

## Performance Optimizations

- Database indexing
- Caching with Redis
- Image optimization
- Lazy loading
- Bundle splitting
- CDN integration

## Testing Strategy

- Unit tests for all functions
- Integration tests for API endpoints
- E2E tests for user flows
- Security testing
- Performance testing
- Load testing

## Deployment

- Modern build system with Vite
- CI/CD pipeline
- Environment configuration
- Monitoring and logging
- Backup strategies
- SSL certificate management

## Future Enhancements

- Multi-language support
- Advanced analytics
- Mobile app development
- AI-powered recommendations
- Social media integration
- Advanced inventory management
