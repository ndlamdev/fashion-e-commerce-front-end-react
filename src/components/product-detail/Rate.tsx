import { useState } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";

const Rate = ({
                count = 5,
                onChange,
                className,
              }: {
  count?: number;
  onChange?: (value: number) => void;
  className?: string;
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const safeCount = count > 0 ? Math.floor(count) : 5;

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    if (onChange) onChange(index + 1);
  };

  return (
    <div className={clsx("flex space-x-1", className)}>
      {[...Array(safeCount)].map((_, index) => (
        <Star
          key={index}
          className={clsx(
            "w-6 h-6 cursor-pointer transition-all duration-200",
            index <= (hoverIndex ?? selectedIndex)
              ? "fill-yellow-400 stroke-yellow-400"
              : "fill-gray-300 stroke-gray-400"
          )}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Rate;
