import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ComponentType<{ className?: string }>;
    variant?: 'glass' | 'glass-dark' | 'material' | 'transparent';
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
            material: '',
            transparent: 'px-2 py-1',
        };

        // Material variant with gradient border
        if (variant === 'material') {
            return (
                <div className="relative group">
                    {/* Gradient border wrapper */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/50 via-white/20 to-white/30 p-[1px] transition-all duration-300 group-hover:from-white/60 group-hover:via-white/30 group-hover:to-white/40">
                        <div
                            className="h-full w-full rounded-2xl bg-[rgba(110,110,110,0.75)]"
                            style={{ backdropFilter: 'blur(80px)' }}
                        >
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative flex items-center gap-3 p-4">
                        {Icon && <Icon className="w-5 h-5 text-white/80 flex-shrink-0" />}
                        <input
                            ref={ref}
                            className={`${baseStyles} ${className}`}
                            {...props}
                        />
                    </div>
                </div>
            );
        }

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

