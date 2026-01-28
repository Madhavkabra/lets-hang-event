import React from 'react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'glass' | 'glass-dark';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = 'glass-dark', className = '', ...props }, ref) => {
    const baseStyles =
      'w-full bg-black/20 font-sf-pro text-body text-white placeholder:text-white/60 focus:outline-none transition-all duration-200 resize-none';

    const variantStyles = {
      glass: 'bg-white/10 backdrop-blur-md p-4 rounded-2xl',
      'glass-dark': 'bg-black/20 backdrop-blur-md p-4 rounded-2xl',
    };

    return (
      <textarea
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
        rows={2}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;

