import { ReactNode, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils.ts";

const AccordionCustom = (
  { isDown = false, ...props }:
  {trigger: ReactNode, content: ReactNode, className?: string, isDown?: boolean},
) => {
  const [isOpen, setIsOpen] = useState(isDown);
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className={cn("w-80 mx-auto my-5", props.className)}>
      {/* Nút Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center transition cursor-pointer"
      >
        {props.trigger}
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Nội dung accordion */}
      <div
        ref={contentRef}
        style={{ height: contentHeight }}
        className="overflow-hidden transition-all duration-700 ease-in-out"
      >
        <div className="p-4 bg-white">
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default AccordionCustom;
