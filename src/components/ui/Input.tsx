import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<{ className?: string }>;
  variant?: 'glass' | 'glass-dark' | 'transparent';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { icon: Icon, variant = 'glass', className = '', ...props },
    ref
  ) => {
    const baseStyles =
      'w-full bg-transparent font-sf-pro text-body text-white placeholder:text-white/60 focus:outline-none transition-all duration-200';

    const variantStyles = {
      glass: 'bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg',
      'glass-dark': 'bg-black/20 backdrop-blur-md px-4 py-3 rounded-lg',
      transparent: 'px-2 py-1',
    };

    if (Icon) {
      return (
        <div
          className={`flex items-center gap-3 ${variantStyles[variant]}`}
        >
          <Icon className="w-5 h-5 text-white/80 flex-shrink-0" />
          <input
            ref={ref}
            className={`${baseStyles} ${className}`}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;

