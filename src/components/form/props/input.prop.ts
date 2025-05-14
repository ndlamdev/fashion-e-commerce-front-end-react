/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:07 AM - 19/03/2025
 * User: lam-nguyen
 **/
import * as React from "react";
import { CSSProperties, ReactNode } from "react";

export type InputState = "HOLDER" | "FOCUS" | "BLUR" | "LEAVE";

type InputProps = React.ComponentProps<"input"> & {
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	getState?: (state: InputState) => void;
	className?: string;
	inputClassName?: string;
	inputStyle?: CSSProperties;
	style?: CSSProperties;
	onTextChange?: (input: string) => void;
	placeholder?: string;
	disabled?: boolean;
	children?: ReactNode;
};

export default InputProps;
