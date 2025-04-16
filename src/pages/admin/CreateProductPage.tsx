/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 09:10 AM - 14/04/2025
 *  User: Lam Nguyen
 **/

import { Input } from "@/components/ui/input.tsx";
import QuillEditor from "@/components/editor/QuillEditor.tsx";
import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";
import QuillEditorConfig from "@/components/editor/QuillEditorConfig.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import VariantManagerComponent from "@/components/admin/product/VariantManagerComponent.tsx";

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
		<div>
			<h1 className={"mb-5 text-xl font-bold"}>{titlePage}</h1>
			<div className={"grid grid-cols-1 grid-rows-1 gap-3 lg:grid-cols-8"}>
				<div className={"col-span-5 flex flex-col gap-3"}>
					<div className={"flex flex-col gap-5 rounded-xl bg-white p-5"}>
						<div>
							<label htmlFor={"title-product"}>Title</label>
							<Input placeholder={"Title product"} id={"title-product"} className={"mt-1"} />
						</div>
						<div>
							<label htmlFor={"description-product"}>Description</label>
							<QuillEditor className={"mt-1"} />
						</div>
						<div>
							<label htmlFor={"description-product"}>Media</label>
							<div className={"mt-1 flex h-25 max-h-50 items-center justify-center rounded-xl border-1 border-dashed"} onClick={() => {}}>
								<div className={"flex items-center gap-2"}>
									<button className={"rounded-sm border-1 bg-white p-1 text-sm text-black"} onClick={() => {}}>
										upload new
									</button>
									<p className={"text-sm"}>Select existing</p>
								</div>
							</div>
						</div>
						<div>
							<p>Category</p>
							<Select>
								<SelectTrigger className='mt-1 w-full'>
									<SelectValue placeholder='Theme' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='light'>Light</SelectItem>
									<SelectItem value='dark'>Dark</SelectItem>
									<SelectItem value='system'>System</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className={"flex flex-col rounded-xl bg-white p-5"}>
						<h3 className={"mb-2 pb-0 font-medium"}>Pricing</h3>
						<div className={"grid grid-cols-3 grid-rows-1 gap-3"}>
							<div>
								<label htmlFor='product-price' className={"text-sm"}>
									Price
								</label>
								<div className={"mt-1 flex items-center gap-1 rounded-md border-1 px-3 py-2 text-sm"}>
									<span className={"text-decoration-underline"}>₫</span>
									<input
										id={"product-price"}
										type={"number"}
										min={0}
										value={0}
										onChange={(event) => {
											console.log(event.target.value);
										}}
										className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
								</div>
							</div>
							<div>
								<label htmlFor='product-compare-at-price' className={"text-sm"}>
									Compare-at price
								</label>
								<div className={"mt-1 flex items-center gap-1 rounded-md border-1 px-3 py-2 text-sm"}>
									<span className={"text-decoration-underline"}>₫</span>
									<input
										id={"product-compare-at-price"}
										type={"number"}
										min={0}
										value={0}
										onChange={(event) => {
											console.log(event.target.value);
										}}
										className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
								</div>
							</div>
						</div>
						<Separator className={"my-5"} />
						<div className={"grid grid-cols-3 grid-rows-1 gap-3"}>
							<div>
								<label htmlFor='product-price' className={"text-sm"}>
									Cost per item
								</label>
								<div className={"mt-1 flex items-center gap-1 rounded-md border-1 px-3 py-2 text-sm"}>
									<span className={"text-decoration-underline"}>₫</span>
									<input
										id={"product-price"}
										type={"number"}
										min={0}
										value={0}
										onChange={(event) => {
											console.log(event.target.value);
										}}
										className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
								</div>
							</div>
							<div>
								<label htmlFor='product-compare-at-price' className={"text-sm"}>
									Profit
								</label>
								<div className={"mt-1 flex items-center gap-1 rounded-md border-1 px-3 py-2 text-sm"}>
									<span className={"text-decoration-underline"}>₫</span>
									<input
										id={"product-compare-at-price"}
										type={"number"}
										min={0}
										value={0}
										onChange={(event) => {
											console.log(event.target.value);
										}}
										className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
								</div>
							</div>
							<div>
								<label htmlFor='product-price' className={"text-sm"}>
									Margin
								</label>
								<div className={"mt-1 flex items-center gap-1 rounded-md border-1 px-3 py-2 text-sm"}>
									<span className={"text-decoration-underline"}>₫</span>
									<input
										id={"product-price"}
										type={"number"}
										min={0}
										value={0}
										onChange={(event) => {
											console.log(event.target.value);
										}}
										className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
								</div>
							</div>
						</div>
					</div>
					<div className={"flex flex-col rounded-xl bg-white p-5"}>
						<h3 className={"mb-2 pb-0 font-medium"}>Inventory</h3>
					</div>
					<div className={"flex flex-col rounded-xl bg-white p-5"}>
						<h3 className={"mb-2 pb-0 font-medium"}>Shipping</h3>
					</div>
					<div className={"flex flex-col rounded-xl bg-white p-5"}>
						<h3 className={"mb-2 pb-0 font-medium"}>Variants</h3>
						<VariantManagerComponent />
					</div>
				</div>
				<div className={"col-span-3 rounded-xl border bg-white p-5"}>Right status with status</div>
			</div>
		</div>
	);
}

export default CreateProductPage;
