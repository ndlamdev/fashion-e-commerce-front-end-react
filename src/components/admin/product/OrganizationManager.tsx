/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:37 PM - 16/04/2025
 *  User: kimin
 **/
import { DetailedHTMLProps, HTMLAttributes, useContext } from "react";
import CreateProductPageContext from "@/context/CreateProductPageContext.tsx";
import { Input } from "@/components/ui/input.tsx";

function OrganizationManager(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	const createProductPageContext = useContext(CreateProductPageContext);

	return (
		<div {...props}>
			<label className={"fw-semibold text-sm text-gray-700"}>
				<span>Type</span>
				<Input type='text' className={`mt-1 text-sm ${createProductPageContext.borderStyle}`} />
			</label>
			<label className={"fw-semibold text-sm text-gray-700"}>
				<span>Vendor</span>
				<Input type='text' className={`mt-1 text-sm ${createProductPageContext.borderStyle}`} />
			</label>
			<label className={"fw-semibold text-sm text-gray-700"}>
				<span>Collections</span>
				<Input type='text' className={`mt-1 text-sm ${createProductPageContext.borderStyle}`} />
			</label>
			<label className={"fw-semibold text-sm text-gray-700"}>
				<span>Tags</span>
				<Input type='text' className={`mt-1 text-sm ${createProductPageContext.borderStyle}`} />
			</label>
		</div>
	);
}

export default OrganizationManager;
