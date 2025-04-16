/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 09:10 AM - 14/04/2025
 *  User: Lam Nguyen
 **/

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";
import QuillEditorConfig from "@/components/editor/QuillEditorConfig.ts";
import VariantManager from "@/components/admin/product/VariantManager.tsx";
import PriceManager from "@/components/admin/product/PriceManager.tsx";
import BaseInfo from "@/components/admin/product/BaseInfo.tsx";
import CreateProductPageContext from "@/context/CreateProductPageContext";

function CreateProductPage({ titlePage = "Add product" }: { titlePage?: string }) {
	const refQuill = useRef<Quill | undefined>(undefined);
	useEffect(() => {
		if (refQuill.current) return;
		refQuill.current = QuillEditorConfig.initQuill({
			uploadImageHandler: (file) => {
				console.log(file);
			},
		});
	});

	return (
		<CreateProductPageContext.Provider value={{ borderStyle: "border-1 border-gray-400" }}>
			<div>
				<h1 className={"mb-5 text-xl font-bold"}>{titlePage}</h1>
				<div className={"grid grid-cols-1 grid-rows-1 gap-3 lg:grid-cols-8"}>
					<div className={"col-span-5 flex flex-col gap-3"}>
						<div className={"flex flex-col gap-5 rounded-xl bg-white p-5"}>
							<BaseInfo />
						</div>
						<div className={"flex flex-col rounded-xl bg-white p-5"}>
							<h3 className={"mb-2 pb-0 font-medium"}>Pricing</h3>
							<PriceManager
								onDataChange={(data) => {
									console.log(data);
								}}
							/>
						</div>
						<div className={"flex flex-col rounded-xl bg-white p-5"}>
							<h3 className={"mb-2 pb-0 font-medium"}>Inventory</h3>
						</div>
						<div className={"flex flex-col rounded-xl bg-white p-5"}>
							<h3 className={"mb-2 pb-0 font-medium"}>Shipping</h3>
						</div>
						<div className={"flex flex-col rounded-xl bg-white p-5"}>
							<h3 className={"mb-2 pb-0 font-medium"}>Variants</h3>
							<VariantManager />
						</div>
					</div>
					<div className={"col-span-3 rounded-xl border bg-white p-5"}>Right status with status</div>
				</div>
			</div>
		</CreateProductPageContext.Provider>
	);
}

export default CreateProductPage;
