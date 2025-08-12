import React from 'react';
import { cn } from '../../utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
className={cn(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
  variant === 'destructive' && 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  variant === 'outline' && 'border border-input hover:bg-accent hover:text-accent-foreground',
  variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
  variant === 'link' && 'underline-offset-4 hover:underline text-primary',
  size === 'default' && 'h-10 py-2 px-4',
  size === 'sm' && 'h-9 px-3 rounded-md',
  size === 'lg' && 'h-11 px-8 rounded-md',
  size === 'icon' && 'h-10 w-10',
  className
)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
