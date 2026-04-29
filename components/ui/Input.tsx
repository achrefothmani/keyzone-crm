import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, iconLeft, suffix, ...props }, ref) => {
    return (
      <div
        className={cn(
          "group relative flex items-center h-11 rounded-[10px] border border-line bg-canvas",
          "transition-all duration-200 ease-smooth",
          "hover:border-ink/20",
          "focus-within:border-gold focus-within:shadow-focus",
          className,
        )}
      >
        {iconLeft ? (
          <span className="pl-3.5 text-ink-muted [&_svg]:w-4 [&_svg]:h-4">{iconLeft}</span>
        ) : null}
        <input
          ref={ref}
          className={cn(
            "flex-1 bg-transparent text-sm text-ink placeholder:text-ink-soft",
            "px-3.5 outline-none disabled:cursor-not-allowed disabled:opacity-50",
          )}
          {...props}
        />
        {suffix ? (
          <span className="pr-3 text-xs text-ink-muted">{suffix}</span>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";
