import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'glass-dark' | 'solid';
  blur?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { children, variant = 'glass', blur = true, className = '', ...props },
    ref
  ) => {
    const baseStyles = 'rounded-xl transition-all duration-200';

    const variantStyles = {
      glass: `bg-white/10 ${blur ? 'backdrop-blur-md' : ''}`,
      'glass-dark': `bg-black/20 ${blur ? 'backdrop-blur-md' : ''}`,
      solid: 'bg-dark-purple',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;

