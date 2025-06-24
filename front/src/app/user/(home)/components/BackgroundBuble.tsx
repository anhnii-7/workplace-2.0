import React from 'react';

interface BubbleProps {
  size: 'sm' | 'md' | 'lg' | 'xl';
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  opacity?: number;
  animationDelay?: string;
}

const Bubble: React.FC<BubbleProps> = ({ 
  size, 
  position, 
  opacity = 0.1, 
  animationDelay = '0s' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const positionStyles = {
    top: position.top,
    bottom: position.bottom,
    left: position.left,
    right: position.right,
  };

  return (
    <div
      className={`
        absolute rounded-full bg-blue-200 
        ${sizeClasses[size]}
        animate-pulse
      `}
      style={{
        ...positionStyles,
        opacity,
        animationDelay,
        animationDuration: '4s'
      }}
    />
  );
};

const BackgroundBubbles: React.FC = () => {
  const bubbles = [
    // Top area bubbles
    { size: 'lg' as const, position: { top: '10%', right: '5%' }, opacity: 0.08 },
    { size: 'md' as const, position: { top: '5%', right: '15%' }, opacity: 0.12, animationDelay: '1s' },
    { size: 'sm' as const, position: { top: '15%', right: '25%' }, opacity: 0.1, animationDelay: '0.5s' },
    
    // Left side bubbles
    { size: 'xl' as const, position: { top: '25%', left: '2%' }, opacity: 0.06, animationDelay: '2s' },
    { size: 'md' as const, position: { top: '40%', left: '8%' }, opacity: 0.1, animationDelay: '1.5s' },
    { size: 'sm' as const, position: { top: '55%', left: '3%' }, opacity: 0.12 },
    
    // Right side bubbles
    { size: 'lg' as const, position: { top: '35%', right: '3%' }, opacity: 0.08, animationDelay: '0.8s' },
    { size: 'md' as const, position: { top: '50%', right: '10%' }, opacity: 0.1, animationDelay: '2.2s' },
    { size: 'sm' as const, position: { top: '65%', right: '5%' }, opacity: 0.11, animationDelay: '1.2s' },
    
    // Bottom area bubbles
    { size: 'xl' as const, position: { bottom: '15%', left: '12%' }, opacity: 0.07, animationDelay: '3s' },
    { size: 'lg' as const, position: { bottom: '25%', right: '8%' }, opacity: 0.09, animationDelay: '2.5s' },
    { size: 'md' as const, position: { bottom: '10%', left: '25%' }, opacity: 0.1, animationDelay: '1.8s' },
    { size: 'sm' as const, position: { bottom: '5%', right: '20%' }, opacity: 0.12, animationDelay: '0.3s' },
    { size: 'md' as const, position: { bottom: '35%', left: '5%' }, opacity: 0.08, animationDelay: '2.8s' },
    
    // Center scattered bubbles
    { size: 'sm' as const, position: { top: '30%', left: '30%' }, opacity: 0.06, animationDelay: '4s' },
    { size: 'sm' as const, position: { top: '45%', right: '35%' }, opacity: 0.09, animationDelay: '3.5s' },
    { size: 'md' as const, position: { bottom: '40%', right: '30%' }, opacity: 0.07, animationDelay: '4.2s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble, index) => (
        <Bubble
          key={index}
          size={bubble.size}
          position={bubble.position}
          opacity={bubble.opacity}
          animationDelay={bubble.animationDelay}
        />
      ))}
    </div>
  );
};

export default BackgroundBubbles;