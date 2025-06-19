import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { useAppSelector } from "@/configs/store.config";
import DialogConfirm from "@/components/dialog/DialogConfirm.tsx";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hiddenDialog } from "@/redux/slice/dialog.slice";
export default function DialogUpdateStatus() {
  const { dialog } = useAppSelector(state => state.dialog)
  const [showDialog, setShowDialog] = useState<"dialog" | "confirm" | "none">("none")
  const dispatch = useDispatch()

  useEffect(() => {
    if (dialog === "update-status") setShowDialog("dialog")
    if (dialog === "none") setShowDialog("none")
  }, [dialog])

  const onClickCancel = useCallback(() => { setShowDialog("confirm") }, [setShowDialog])

  const onOpenChange = useCallback((open: boolean) => {
    if (open) return;
    setShowDialog("confirm")
  }, [setShowDialog])

  const onClickSubmit = useCallback(() => { }, [])

  return (
    <>
      <Dialog open={showDialog === "dialog"} onOpenChange={onOpenChange}>
        <DialogContent
          className={"sm:max-w-[525px]"}
          classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px] !hidden"}
          onClosed={onClickCancel}>
          <DialogHeader>
            <DialogTitle className={"text-4xl"}>Cập nhật trạng thái đơnhàng</DialogTitle>
          </DialogHeader>
          <DialogDescription />
          <DialogFooter className={"flex gap-2"}>
            <ButtonAuthentication className={"border-1 border-black bg-white !text-black cursor-pointer"} onClick={onClickCancel}>
              Hủy
            </ButtonAuthentication>
            <ButtonAuthentication className={"bg-green-700 hover:bg-green-200 cursor-pointer"} onClick={onClickSubmit}>
              Xác nhận
            </ButtonAuthentication>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DialogConfirm
        open={showDialog === "confirm"}
        onOpenChange={(value) => !value && dispatch(hiddenDialog())}
        onClickCancel={() => {
          setShowDialog("dialog")
        }}
        onClickSubmit={() => {
          dispatch(hiddenDialog())
        }}
        title={'Do you want to delete this?'}
      />
    </>
  )
}
