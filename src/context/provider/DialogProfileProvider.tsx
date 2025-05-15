import { ReactNode, useState } from "react";
import DialogTypeEnum from "@/utils/enums/dialog.type.enum.ts";
import SaveAddressDialog from "@/components/profile/dialog/SaveAddressDialog.tsx";
import EditInfoProfileDialog from "@/components/profile/dialog/EditInfoProfileDialog.tsx";
import { Dialog } from "@/components/ui/dialog.tsx";
import ResetPasswordDialog from "@/components/profile/dialog/ResetPasswordDialog.tsx";
import { DialogProfileContext } from "@/context/dialogProfileContext.props.ts";

export const DialogProfileProvider = ({ children }: { children: ReactNode }) => {
	const [dialog, setDialog] = useState<DialogTypeEnum>("none");
	const renderContent = (dialog: DialogTypeEnum): ReactNode => {
		switch (dialog) {
			case "none":
				return <></>;
			case "reset-password":
				return <ResetPasswordDialog />;
			case "save-address":
				return <SaveAddressDialog />;
			case "edit-info-profile":
				return <EditInfoProfileDialog />;
		}
	};
	return (
		<DialogProfileContext
			value={{
				showDialog: (type) => setDialog(type),
				dialog: dialog,
			}}
		>
			<Dialog open={dialog !== "none"} onOpenChange={(value) => !value && setDialog("none")}>
				{children}
				{renderContent(dialog)}
			</Dialog>
		</DialogProfileContext>
	);
};
