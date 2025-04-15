import { Input } from "@/components/ui/input.tsx";
import QuillEditor from "@/components/editor/QuillEditor.tsx";
import { useEffect, useRef } from "react";
import Quill from "quill";

function CreateProductPage({ titlePage = "Add product" }: { titlePage?: string }) {
	const refQuill = useRef<Quill | undefined>(undefined);
	useEffect(() => {
		refQuill.current = new Quill("#editor", {
			modules: {
				syntax: true,
				toolbar: "#toolbar-container",
			},
			theme: "snow",
		});
	});

	const getDescription = () => console.log(refQuill.current?.getSemanticHTML());

	return (
		<div>
			<h1>{titlePage}</h1>
			<div className={"grid grid-cols-1 grid-rows-1 gap-2 md:grid-cols-8"}>
				<div className={"col-span-5 rounded-xl bg-white p-5"}>
					<div>
						<label htmlFor={"title-product"}>Title</label>
						<Input placeholder={"Title product"} id={"title-product"} />
					</div>
					<div>
						<label htmlFor={"description-product"}>Description</label>
						<QuillEditor />
					</div>
					<button onClick={getDescription}>Xem mô tả của sản phẩm</button>
				</div>
				<div className={"col-span-3 rounded-xl border bg-white p-5"}>Right</div>
			</div>
		</div>
	);
}

export default CreateProductPage;
