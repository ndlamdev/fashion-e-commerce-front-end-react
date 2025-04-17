/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:35PM - 24/03/2025
 *  User: lam-nguyen
 **/

import InputAuthenticationProps from "@/components/authentication/props/inputAuthentication.props.ts";

function InputAuthentication(props: InputAuthenticationProps) {
	return (
		<div className={"w-full"}>
			<input
				className={`form-control w-full rounded-full border-1 border-gray-300 px-4 py-3.5 text-sm transition-all duration-200 outline-none focus:border-blue-500 ${props.className}`}
				{...props}
			/>
			{props.error && <p className={"mt-1 pl-4 text-sm text-red-600"}>{props.error}</p>}
		</div>
	);
}

export default InputAuthentication;
