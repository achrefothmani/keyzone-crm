import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-white hover:bg-gold-deep shadow-gold hover:shadow-[0_10px_28px_-8px_rgba(201,166,70,0.7)]",
  secondary:
    "bg-ink text-white hover:bg-black/85",
  ghost:
    "bg-transparent text-ink hover:bg-surface",
  outline:
    "bg-canvas text-ink border border-line hover:border-gold/60 hover:text-ink",
  danger:
    "bg-canvas text-danger border border-line hover:border-danger/40 hover:bg-red-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", iconLeft, iconRight, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[10px] font-medium tracking-tight",
          "transition-all duration-200 ease-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {iconLeft ? <span className="-ml-0.5 [&_svg]:w-4 [&_svg]:h-4">{iconLeft}</span> : null}
        {children}
        {iconRight ? <span className="-mr-0.5 [&_svg]:w-4 [&_svg]:h-4">{iconRight}</span> : null}
      </button>
    );
  },
);
Button.displayName = "Button";
