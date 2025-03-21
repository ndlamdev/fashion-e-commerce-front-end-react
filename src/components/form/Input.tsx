/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:37PM - 06/03/2025
 *  User: lam-nguyen
 **/
import InputProps from "@/components/form/props/input.prop.ts";

function Input({ leftIcon, rightIcon, getState, className, inputClassName, inputStyle, style, onChange, placeholder, disabled = false }: InputProps) {
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
        disabled={disabled}
      />
			{rightIcon && rightIcon}
		</div>
	);
}

export default Input;
