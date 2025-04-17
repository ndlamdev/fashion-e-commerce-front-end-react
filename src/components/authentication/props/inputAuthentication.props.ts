/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:36PM - 24/03/2025
 * User: lam-nguyen
 **/
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type InputAuthenticationProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
	error?: string;
};

export default InputAuthenticationProps;
