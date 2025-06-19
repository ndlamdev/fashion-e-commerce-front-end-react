import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog.tsx";
import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication.tsx";
import { useTranslation } from "react-i18next";

function DialogConfirm({
												 open,
												 onOpenChange,
												 onClickCancel,
												 onClickSubmit,
												 title = "Bạn có chắc muốn thoát khỏi bước xác không",
											 }: {
	open: boolean;
	onOpenChange?: (value: boolean) => void;
	onClickCancel: () => void;
	onClickSubmit: () => void;
	title?: string;
}) {
	const { t } = useTranslation(undefined, {
		keyPrefix: "button",
	});
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className={"sm:max-w-[525px]"}
				classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px] !hidden"}
				onClosed={onClickCancel}>
				<DialogHeader>
					<DialogTitle className={"text-4xl"}>{title}</DialogTitle>
				</DialogHeader>
				<DialogDescription />
				<DialogFooter className={"flex gap-2"}>
					<ButtonAuthentication className={"border-1 border-black bg-white !text-black cursor-pointer"}
																onClick={onClickCancel}>
						{t('cancel')}
					</ButtonAuthentication>
					<ButtonAuthentication className={"bg-green-700 hover:bg-green-200 cursor-pointer"} onClick={onClickSubmit}>
						{t('ok')}
					</ButtonAuthentication>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default DialogConfirm;
