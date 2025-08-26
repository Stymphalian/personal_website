import React, { useState } from 'react';

interface HeadshotProps {
  src?: string;
  alt: string;
  fallbackEmoji?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Headshot: React.FC<HeadshotProps> = ({
  src,
  alt,
  fallbackEmoji = '👨‍💻',
  size = 'lg',
  className = ''
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-24 text-3xl',
    md: 'w-32 h-32 text-4xl',
    lg: 'w-48 h-48 text-6xl',
    xl: 'w-64 h-64 text-8xl'
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  // Show fallback emoji if no image source, image failed to load, or image hasn't loaded yet
  const showFallback = !src || imageError || !imageLoaded;

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Fallback emoji background */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center shadow-lg transition-opacity duration-300 ${
        showFallback ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="text-white font-bold">{fallbackEmoji}</div>
      </div>

      {/* Professional headshot image */}
      {src && (
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full rounded-full object-cover shadow-lg transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      )}

      {/* Loading indicator */}
      {src && !imageLoaded && !imageError && (
        <div className="absolute inset-0 rounded-full bg-gray-200 flex items-center justify-center shadow-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};

export default Headshot;
