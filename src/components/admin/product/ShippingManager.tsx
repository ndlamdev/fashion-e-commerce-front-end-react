/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:45 AM - 17/04/2025
 *  User: kimin
 **/
import { DetailedHTMLProps, HTMLAttributes } from "react";

function ShippingManager(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	return (
		<div {...props}>
			<div>
				<label className={"flex items-center gap-2"}>
					<input type='checkbox' className={"aspect-square w-4"} />
					<span>This is a physical product</span>
				</label>
			</div>
		</div>
	);
}

export default ShippingManager;
