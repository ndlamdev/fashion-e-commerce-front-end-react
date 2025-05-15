/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:34PM - 30/03/2025
 *  User: lam-nguyen
 **/
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet.tsx";
import { SolarCloudDownloadLinear } from "@/assets/images/icons/SolarCloudDownloadLinear.tsx";
import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { hiddenSheet } from "@/redux/slice/sheet.slice.ts";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function SheetFileSearch() {
	return (
		<SheetContent className={"p-5"} side={"top"}>
			<SheetHeader>
				<SheetTitle>Tìm kiếm bằng hình ảnh</SheetTitle>
			</SheetHeader>
			<div className={"flex justify-center"}>
				<FileDropZone />
			</div>
		</SheetContent>
	);
}

const FileDropZone: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSetFile = useCallback(
		(files: FileList | null | undefined) => {
			if (!files) return;
			const file = files.item(0);
			if (!file) return;
			if (!file.type.startsWith("image")) {
				toast.error("Vui lòng chỉ chọn file hình ảnh!");
				return;
			}
			dispatch(hiddenSheet());
			navigate("/collection", {
				state: {
					file: file,
				},
			});
		},
		[dispatch, navigate],
	);

	const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback(() => {
		setIsDragging(false);
	}, []);

	const handleFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			handleSetFile(event.target.files);
		},
		[handleSetFile],
	);

	const handleDrop = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			setIsDragging(false);
			handleSetFile(e.dataTransfer.files);
		},
		[handleSetFile],
	);

	return (
		<div
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onClick={() => fileInputRef.current?.click()}
			className={`relative h-[250px] w-[65%] rounded-lg border border-dashed ${isDragging ? "border-blue-400 bg-blue-200" : "border-gray-500 bg-white"}`}>
			<div className={"relative z-2 size-full"} />
			<div className={"absolute top-[50%] left-[50%] z-1 flex -translate-[50%] flex-col items-center justify-center"}>
				<SolarCloudDownloadLinear className={"h-[75px] w-[75px] lg:h-[100px] lg:w-[100px]"} />
				<p className={"text-center"}>{isDragging ? "Thả file vào đây" : "Kéo và thả file vào đây"}</p>
			</div>
			<input ref={fileInputRef} type='file' style={{ display: "none" }} accept={"image/*"} onTextChange={handleFileChange} />
		</div>
	);
};

export default SheetFileSearch;
