/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:37PM - 06/03/2025
 *  User: lam-nguyen
 **/
import { CSSProperties, ReactNode } from "react";

type InputState = "HOLDER" | "FOCUS" | "BLUR" | "LEAVE";

function Input({
	leftIcon,
	rightIcon,
	getState,
	className,
	inputClassName,
	inputStyle,
	style,
	onChange,
	placeholder,
}: {
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	getState?: (state: InputState) => void;
	className?: string;
	inputClassName?: string;
	inputStyle?: CSSProperties;
	style?: CSSProperties;
	onChange?: (input: string) => void;
	placeholder?: string;
}) {
	return (
		<div className={`${className && className}`} style={style} onMouseLeave={() => getState?.("LEAVE")} onMouseEnter={() => getState?.("HOLDER")}>
			{leftIcon && leftIcon}
			<input
				style={inputStyle}
				onChange={(e) => {
					onChange?.(e.target.value);
				}}
				placeholder={placeholder}
				onFocus={() => getState?.("FOCUS")}
				onBlur={() => getState?.("BLUR")}
				className={`w-full border-none outline-none focus:border-none focus:outline-none active:border-none active:outline-none ${inputClassName && inputClassName}`}
			/>
			{rightIcon && rightIcon}
		</div>
	);
}

export default Input;
