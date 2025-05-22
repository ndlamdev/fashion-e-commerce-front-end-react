import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication.tsx";

function ConfirmDialog(
  {
    open,
    onOpenChange,
    onClickCancel,
    onClickSubmit,
  }: {
    open: boolean;
    onOpenChange?: (value: boolean) => void;
    onClickCancel: () => void;
    onClickSubmit: () => void;
  }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={"sm:max-w-[525px]"}
        classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px] !hidden"}
        onClosed={onClickCancel}
      >
        <DialogHeader>
          <DialogTitle className={"text-4xl"}>Bạn có chắc muốn thoát khỏi bước xác không</DialogTitle>
        </DialogHeader>
        <div className={"flex gap-2"}>
          <ButtonAuthentication className={"border-1 border-black bg-white !text-black"} onClick={onClickCancel}>
            Hủy
          </ButtonAuthentication>
          <ButtonAuthentication className={"bg-green-700 hover:bg-green-200"} onClick={onClickSubmit}>
            Xác nhận
          </ButtonAuthentication>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;
