import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'glass' | 'glass-dark' | 'primary' | 'secondary' | 'material' | 'tertiary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ComponentType<{ className?: string }>;
    iconPosition?: 'left' | 'right';
    labelType?: 'text' | 'symbol';
    stroke?: boolean;
    fullWidth?: boolean;
    emoji?: string;
    direction?: 'horizontal' | 'vertical';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'glass',
            size = 'md',
            icon: Icon,
            iconPosition = 'left',
            labelType = 'text',
            stroke = false,
            fullWidth = false,
            emoji,
            direction = 'horizontal',
            className = '',
            style,
            ...props
        },
        ref
    ) => {
        const isSymbolOnly = labelType === 'symbol';

        const baseStyles =
            direction === 'vertical' 
                ? 'inline-flex flex-col items-center justify-center transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
                : 'inline-flex items-center justify-center transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed';

        const variantStyles = {
            glass: 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30',
            'glass-dark': 'bg-black/20 backdrop-blur-md text-white hover:bg-black/30',
            primary: 'bg-soft-pink text-white hover:bg-soft-pink/90',
            secondary: 'bg-deep-violet text-white hover:bg-deep-violet/90',
            material: 'bg-material-ultrathin-2 backdrop-blur-material text-white',
            tertiary: 'bg-fills-tertiary-1 backdrop-blur-heavy text-white rounded-[16px]',
            ghost: 'bg-transparent hover:opacity-80',
        };

        // Different size styles for symbol-only vs text buttons
        const gapStyle = direction === 'vertical' ? 'gap-2' : 'gap-2';
        const sizeStyles = isSymbolOnly ? {
            sm: 'p-2',
            md: 'p-2.5',
            lg: 'p-3',
        } : variant === 'tertiary' ? {
            sm: `px-4 py-2 text-sm ${gapStyle}`,
            md: `px-5 py-3 text-base ${gapStyle}`,
            lg: `px-6 py-3 text-lg ${gapStyle}`,
        } : {
            sm: `px-3 py-1.5 text-sm ${gapStyle}`,
            md: `px-4 py-2 text-base ${gapStyle}`,
            lg: `px-5 py-3 text-base ${gapStyle}`,
        };

        // Icon size based on button size
        const iconSizeStyles = {
            sm: 'w-4 h-4',
            md: 'w-5 h-5',
            lg: 'w-5 h-[19px]', // 20x19 for large as per Figma
        };

        // Border radius - fully rounded for symbol-only, 16px for large text buttons, 8px for others
        const radiusStyle = isSymbolOnly ? 'rounded-[100px]' : size === 'lg' ? 'rounded-2xl' : 'rounded-lg';

        // Stroke style - add border when stroke is true
        const strokeStyles = stroke
            ? { ...style, border: '1px solid rgba(194, 194, 194, 0.5)' }
            : style;

        const widthStyle = fullWidth ? 'w-full' : '';
        const textStyle = !isSymbolOnly
            ? variant === 'ghost'
                ? 'font-sf-pro text-title-2'
                : 'font-inter text-button'
            : '';

        // Ghost variant color
        const ghostStyles = variant === 'ghost'
            ? { ...strokeStyles, color: 'rgba(0, 0, 0, 0.25)' }
            : strokeStyles;

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${radiusStyle} ${widthStyle} ${textStyle} ${className}`}
                style={ghostStyles}
                {...props}
            >
                {emoji && <span className="text-[12px]">{emoji}</span>}
                {Icon && (iconPosition === 'left' || isSymbolOnly) && !emoji && (
                    <Icon className={iconSizeStyles[size]} />
                )}
                {!isSymbolOnly && children}
                {Icon && iconPosition === 'right' && !isSymbolOnly && !emoji && (
                    <Icon className={iconSizeStyles[size]} />
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;

