/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 09:10 AM - 14/04/2025
 *  User: Lam Nguyen
 **/

import { useContext, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";
import QuillEditorConfig from "@/components/editor/QuillEditorConfig.ts";
import VariantManager from "@/components/admin/product/VariantManager.tsx";
import PriceManager from "@/components/admin/product/PriceManager.tsx";
import BaseInfo from "@/components/admin/product/BaseInfo.tsx";
import CreateProductPageContext from "@/context/CreateProductPageContext";
import { SolarArrowLeftLinear } from "@/assets/images/icons/SolarArrowLeftLinear.tsx";
import OrganizationManager from "@/components/admin/product/OrganizationManager.tsx";
import { SolarInfoCircleLinear } from "@/assets/images/icons/SolarInfoCircleLinear.tsx";

function CreateProductPage({ titlePage = "Add product" }: { titlePage?: string }) {
	return (
		<CreateProductPageContext.Provider value={{ borderStyle: "border-1 border-gray-400", sectionStyle: "rounded-xl border-1 border-gray-300 bg-white p-5" }}>
			<CreateProductMainPage titlePage={titlePage} />
		</CreateProductPageContext.Provider>
	);
}

const CreateProductMainPage = ({ titlePage }: { titlePage: string }) => {
	const refQuill = useRef<Quill | undefined>(undefined);
	const createProductPageContext = useContext(CreateProductPageContext);
	useEffect(() => {
		document.title = titlePage;
		if (refQuill.current) return;
		refQuill.current = QuillEditorConfig.initQuill({
			uploadImageHandler: (file) => {
				console.log(file);
			},
		});
	});

	return (
		<div>
			<h1 className={"mb-5 flex items-center gap-2 text-xl font-bold"}>
				<SolarArrowLeftLinear width={28} height={28} className={"aspect-square rounded-sm p-0.5 hover:bg-gray-300"} />
				{titlePage}
			</h1>
			<div className={"grid grid-cols-1 grid-rows-1 gap-3 lg:grid-cols-8"}>
				<div className={"col-span-5 flex flex-col gap-3"}>
					<section className={`${createProductPageContext.sectionStyle}`}>
						<BaseInfo className={"flex flex-col gap-5"} />
					</section>
					<section className={`flex flex-col ${createProductPageContext.sectionStyle}`}>
						<h3 className={"mb-2 pb-0 font-medium"}>Pricing</h3>
						<PriceManager
							onDataChange={(data) => {
								console.log(data);
							}}
						/>
					</section>
					<section className={`${createProductPageContext.sectionStyle}`}>
						<h3 className={"mb-2 pb-0 font-medium"}>Inventory</h3>
					</section>
					<section className={`flex flex-col ${createProductPageContext.sectionStyle}`}>
						<h3 className={"mb-2 pb-0 font-medium"}>Shipping</h3>
					</section>
					<section className={`flex flex-col ${createProductPageContext.sectionStyle}`}>
						<h3 className={"mb-2 pb-0 font-medium"}>Variants</h3>
						<VariantManager />
					</section>
				</div>
				<div className={"col-span-3"}>
					<section className={`flex flex-col ${createProductPageContext.sectionStyle}`}>
						<h3 className={"mb-2 pb-0 text-[15px] font-medium"}>
							<span>Product organization</span>
							<SolarInfoCircleLinear width={15} height={15} className={"ml-2 inline"} color={"gray"} strokeWidth={2.5} />
						</h3>
						<OrganizationManager className={"flex flex-col gap-3"} />
					</section>
				</div>
			</div>
		</div>
	);
};

export default CreateProductPage;
