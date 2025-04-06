import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const LoadingSpinner = ({ className, size = "md" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Outer ring */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-4 border-solid border-brand-500/20",
            sizeClasses[size]
          )}
        />
        {/* Spinning ring */}
        <div
          className={cn(
            "animate-spin rounded-full border-4 border-solid border-brand-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
            sizeClasses[size],
            className
          )}
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}; 