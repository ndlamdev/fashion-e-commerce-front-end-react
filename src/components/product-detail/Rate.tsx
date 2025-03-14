import { useState } from "react";
import { Star, StarHalf } from "lucide-react";
import clsx from "clsx";
import { cn } from "@/lib/utils.ts";

const Rate = ({
                defaultValue,
                onChange,
                className,
                disabled = false,
                allowHalf = false,
              }: {
  defaultValue: number;
  onChange?: (value: number) => void;
  className?: string;
  disabled?: boolean;
  allowHalf?: boolean;
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(defaultValue);
  const handleClick = (index: number) => {
    if (!disabled) {
      setSelectedIndex(index);
      if (onChange) onChange(index + 1);
    }
  };

  return (
    <div className={clsx("flex space-x-1", className)}>
      {[...Array(5)].map((_, index) => {
        const isHalf :boolean = allowHalf && index + defaultValue%1 === selectedIndex;
        console.log("isHalf", isHalf);
        return (
          <span
            key={index}
            className="relative"
            onMouseEnter={() => !disabled && setHoverIndex(index)}
            onMouseLeave={() => !disabled && setHoverIndex(null)}
            onClick={() => handleClick(index)}
          >
            {isHalf ? (
              <Star className={cn("relative stroke-black !fill-none", className)}>
                <StarHalf className={cn("absolute size-6 ", className)} />
              </Star>
            ) : (
              <Star
                className={cn(
                  "size-6 transition-all duration-200",
                   index < defaultValue
                    ? className
                    : clsx(className, "!fill-white"),
                )}
              />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Rate;
