/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:230 AM - 16/04/2025
 *  User: Lam Nguyen
 **/

import Quill from "quill";
import FormatData from "@/utils/format-data.ts";
import { QuillOptions } from "quill/core/quill";
import katex from "katex";

const imageHandler = (quill?: Quill, callback?: (file: File) => void): void => {
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
			callback?.(file);
		}
	};
};

const initQuill = (options?: QuillOptions & { uploadImageHandler?: (file: File) => void }) => {
	Quill.register("katex", katex, true);
	let result: Quill | undefined = undefined;
	result = new Quill("#editor", {
		modules: {
			syntax: true,
			toolbar: {
				container: "#toolbar-container",
				handlers: {
					image: () => imageHandler(result, options?.uploadImageHandler),
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
