import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef, type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, ...props }, ref) => {
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
        <select
          ref={ref}
          defaultValue={props.defaultValue ?? ""}
          className={cn(
            "appearance-none flex-1 bg-transparent text-sm text-ink",
            "pl-3.5 pr-10 outline-none cursor-pointer",
          )}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 w-4 h-4 text-ink-muted pointer-events-none group-focus-within:text-gold transition-colors"
          strokeWidth={1.75}
        />
      </div>
    );
  },
);
Select.displayName = "Select";
