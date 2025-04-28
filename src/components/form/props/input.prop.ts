/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:07 AM - 19/03/2025
 * User: lam-nguyen
 **/
import { CSSProperties, ReactNode } from "react";

export type InputState = "HOLDER" | "FOCUS" | "BLUR" | "LEAVE";

type InputProps = {
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	getState?: (state: InputState) => void;
	className?: string;
	inputClassName?: string;
	inputStyle?: CSSProperties;
	style?: CSSProperties;
	onChange?: (input: string) => void;
	placeholder?: string;
	disabled?: boolean;
};

export default InputProps;
