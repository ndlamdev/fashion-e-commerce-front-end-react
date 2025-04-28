/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:30PM - 24/03/2025
 *  User: lam-nguyen
 **/
import ButtonAuthenticationProps from "@/components/authentication/props/buttonAuthentication.props.ts";

function ButtonAuthentication(props: ButtonAuthenticationProps) {
	return (
		<button
			type={props.type || "button"}
			{...props}
			className={`login-btn w-full rounded-full bg-black py-3 text-white transition-all duration-300 hover:bg-gray-200 hover:text-black ${props.className}`}>
			{props.children}
		</button>
	);
}

export default ButtonAuthentication;
