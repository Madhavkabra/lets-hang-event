import React from 'react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'glass' | 'glass-dark';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = 'glass-dark', className = '', ...props }, ref) => {
    const baseStyles =
      'w-full bg-transparent font-sf-pro text-body text-white placeholder:text-white/60 focus:outline-none transition-all duration-200 resize-none';

    const variantStyles = {
      glass: 'bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg',
      'glass-dark': 'bg-black/20 backdrop-blur-md px-4 py-3 rounded-lg',
    };

    return (
      <textarea
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        rows={4}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;

