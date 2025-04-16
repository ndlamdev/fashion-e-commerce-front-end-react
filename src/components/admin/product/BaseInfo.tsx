/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:42 PM - 16/04/2025
 *  User: kimin
 **/

import { Input } from "@/components/ui/input.tsx";
import QuillEditor from "@/components/editor/QuillEditor.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { useContext } from "react";
import CreateProductPageContext from "@/context/CreateProductPageContext.tsx";

function BaseInfo() {
	const createProductPageContext = useContext(CreateProductPageContext);

	return (
		<>
			<div>
				<label htmlFor={"title-product"}>Title</label>
				<Input placeholder={"Title product"} id={"title-product"} className={`mt-1 text-sm ${createProductPageContext.borderStyle}`} />
			</div>
			<div>
				<label htmlFor={"description-product"}>Description</label>
				<QuillEditor className={"mt-1"} />
			</div>
			<div>
				<label htmlFor={"description-product"}>Media</label>
				<div
					className={`mt-1 flex h-35 max-h-50 items-center justify-center rounded-xl border-dashed ${createProductPageContext.borderStyle}`}
					onClick={() => {}}>
					<div className={"flex items-center gap-2"}>
						<button className={"rounded-sm bg-white p-1 text-sm text-black"} onClick={() => {}}>
							upload new
						</button>
						<p className={"text-sm"}>Select existing</p>
					</div>
				</div>
			</div>
			<div>
				<p>Category</p>
				<Select>
					<SelectTrigger className={`mt-1 w-full ${createProductPageContext.borderStyle}`}>
						<SelectValue placeholder='Theme' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='light'>Light</SelectItem>
						<SelectItem value='dark'>Dark</SelectItem>
						<SelectItem value='system'>System</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</>
	);
}

export default BaseInfo;
