import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication";
import DialogConfirm from "@/components/dialog/DialogConfirm.tsx";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { useAppSelector } from "@/configs/store.config";
import { cn } from "@/lib/utils";
import { adminOrderApi, useAdminUpdateOrderHistoriesByOrderIdMutation } from "@/redux/api/order.api";
import { hiddenDialog } from "@/redux/slice/dialog.slice";
import OrderStatusEnum, { OrderStatusColors } from "@/utils/enums/orderStatus.enum";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function DialogUpdateStatus({ status, orderId }: { status: OrderStatusEnum, orderId?: number }) {
  const { dialog } = useAppSelector(state => state.dialog)
  const [showDialog, setShowDialog] = useState<"dialog" | "confirm-cancel" | "confirm-submit" | "none">("none")
  const dispatch = useDispatch()
  const [updateOrder] = useAdminUpdateOrderHistoriesByOrderIdMutation();
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    if (dialog === "update-status") setShowDialog("dialog")
    if (dialog === "none") setShowDialog("none")
  }, [dialog])

  const onClickCancel = useCallback(() => { setShowDialog("confirm-cancel") }, [setShowDialog])

  const onOpenChange = useCallback((open: boolean) => {
    if (open) return;
    setShowDialog("confirm-cancel")
  }, [setShowDialog])

  const onClickSubmit = useCallback(() => {
    updateOrder({ orderId: orderId ?? 0, data: { status, note } })
      .unwrap()
      .then((data) => {
        console.log(data);
        toast.success("Cập nhật trạng thái đơn hàng thành công.")
        dispatch(hiddenDialog())
        dispatch(adminOrderApi.util.invalidateTags(["order_detail"]));
      }).catch((error) => {
        console.error(error)
        toast.error("Cập nhật trạng thái đơn hàng thất bại.")
      })
  }, [updateOrder, orderId, status, note, dispatch])

  return (
    <>
      <Dialog open={showDialog === "dialog"} onOpenChange={onOpenChange}>
        <DialogContent
          className={"sm:max-w-[525px]"}
          classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px] !hidden"}
          onClosed={onClickCancel}>
          <DialogHeader>
            <DialogTitle className={"text-4xl"}>Cập nhật trạng thái đơn hàng</DialogTitle>
          </DialogHeader>
          <DialogDescription />
          <Badge variant={OrderStatusColors[status]} className={"mt-1 text-xl w-full text-center"}>
            {status}
          </Badge>
          <div>
            <p className={"text-sm text-muted-foreground"}>Vui lòng nhập lý do cập nhật trạng thái đơn hàng.</p>
            <textarea className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            )}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <DialogFooter className={"flex gap-2"}>
            <ButtonAuthentication className={"border-1 border-black bg-white !text-black cursor-pointer"} onClick={onClickCancel}>
              Hủy
            </ButtonAuthentication>
            <ButtonAuthentication className={"bg-green-700 hover:bg-green-200 cursor-pointer"} onClick={() => {
              if (!note || note.trim() === "") {
                toast.error("Vui lòng nhập lý do cập nhật trạng thái đơn hàng.")
                return;
              }
              setShowDialog("confirm-submit");
            }}>
              Xác nhận
            </ButtonAuthentication>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DialogConfirm
        title={'Bạn có chắc muốn thoát khỏi bước cập nhật trạng thái không?'}
        open={showDialog === "confirm-cancel"}
        onOpenChange={(value) => !value && dispatch(hiddenDialog())}
        onClickCancel={() => {
          setShowDialog("dialog")
        }}
        onClickSubmit={() => {
          dispatch(hiddenDialog())
        }}
      />
      <DialogConfirm
        title={'Bạn có chắc cập nhật trạng thái không?'}
        open={showDialog === "confirm-submit"}
        onClickCancel={() => {
          setShowDialog("dialog")
        }}
        onClickSubmit={onClickSubmit}
      />
    </>
  )
}
