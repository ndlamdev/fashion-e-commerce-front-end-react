import Quill from "quill";
import FormatData from "@/utils/format-data.ts";
import { QuillOptions } from "quill/core/quill";
import katex from "katex";

const imageHandler = (quill?: Quill): void => {
	const input = document.createElement("input");
	input.setAttribute("type", "file");
	input.setAttribute("accept", "image/*");
	input.click();
	input.onchange = async () => {
		if (!quill) return;
		if (input !== null && input.files !== null) {
			const file = input.files[0];
			const base64 = await FormatData.convertImageToBase64(file);
			quill.insertEmbed(quill.getLength() - 1, "image", base64, "api");
		}
	};
};

const initQuill = (options?: QuillOptions) => {
	Quill.register("katex", katex, true);
	let result: Quill | undefined = undefined;
	result = new Quill("#editor", {
		modules: {
			syntax: true,
			toolbar: {
				container: "#toolbar-container",
				handlers: {
					image: () => imageHandler(result),
				},
			},
		},
		placeholder: "Compose an epic...",
		theme: "snow",
		...options,
	});
	return result;
};

export default { initQuill, imageHandler };
