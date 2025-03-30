import { ReactNode, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils.ts";

const AccordionCustom = ({ isDown = false, ...props }: { trigger: ReactNode; content: ReactNode; className?: string; isDown?: boolean }) => {
	const [isOpen, setIsOpen] = useState(isDown);
	const [contentHeight, setContentHeight] = useState("0px");
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
		}
	}, [isOpen]);

	return (
		<div className={cn("mx-auto my-5 w-80", props.className)}>
			{/* Nút Toggle */}
			<button onClick={() => setIsOpen(!isOpen)} className='flex w-full cursor-pointer items-center justify-between transition'>
				{props.trigger}
				<ChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
			</button>

			{/* Nội dung accordion */}
			<div ref={contentRef} style={{ height: contentHeight }} className='overflow-hidden transition-all duration-700 ease-in-out'>
				<div className='bg-white p-4'>{props.content}</div>
			</div>
		</div>
	);
};

export default AccordionCustom;
