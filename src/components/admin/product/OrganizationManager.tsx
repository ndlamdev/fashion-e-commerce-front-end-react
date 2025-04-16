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
			<div>
				<label htmlFor={"product-type"} className={"fw-semibold text-sm text-gray-700"}>
					Type
				</label>
				<Input id={"product-type"} type='text' className={`mt-1 text-sm ${createProductPageContext.borderStyle}`} />
			</div>
			<div>
				<label htmlFor={"product-vendor"} className={"fw-semibold text-sm text-gray-700"}>
					Vendor
				</label>
				<Input id={"product-vendor"} type='text' className={`mt-1 text-sm ${createProductPageContext.borderStyle}`} />
			</div>
			<div>
				<label htmlFor={"product-collections"} className={"fw-semibold text-sm text-gray-700"}>
					Collections
				</label>
				<Input id={"product-collections"} type='text' className={`mt-1 text-sm ${createProductPageContext.borderStyle}`} />
			</div>
			<div>
				<label htmlFor={"product-tags"} className={"fw-semibold text-sm text-gray-700"}>
					Tags
				</label>
				<Input id={"product-tags"} type='text' className={`mt-1 text-sm ${createProductPageContext.borderStyle}`} />
			</div>
		</div>
	);
}

export default OrganizationManager;
