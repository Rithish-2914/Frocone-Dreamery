import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-full";
    
    const variants = {
      primary: "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(345,100%,75%)] text-white shadow-soft hover:shadow-hover hover:-translate-y-0.5 border border-white/20",
      secondary: "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] shadow-soft hover:shadow-hover hover:-translate-y-0.5",
      outline: "border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/0.1]",
      ghost: "text-[hsl(var(--foreground))] hover:bg-black/5",
      glass: "bg-white/50 backdrop-blur-md border border-white/40 text-[hsl(var(--foreground))] shadow-sm hover:bg-white/80",
    };
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
      icon: "w-10 h-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Export a motion-wrapped version for staggered enter animations
export const MotionButton = motion.create(Button);

export { Button };
