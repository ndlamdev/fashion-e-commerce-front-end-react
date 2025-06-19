import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication";
import DialogConfirm from "@/components/dialog/DialogConfirm.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input";
import { adminInventoryApi, useUpdateInventoryMutation } from "@/redux/api/inventory.api";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function DialogUpdateQuantity({ variantId, oldQuantity, onHidden }: { variantId?: string, oldQuantity?: number, onHidden?: () => void }) {
  const [showDialog, setShowDialog] = useState<"dialog" | "confirm-cancel" | "confirm-submit" | "none">(variantId ? "dialog" : "none")
  const dispatch = useDispatch()
  const [updateInventory] = useUpdateInventoryMutation();
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const { t } = useTranslation(undefined, {
    keyPrefix: "page.admin.inventory.dialog.update_status"
  });


  const onClickCancel = useCallback(() => { setShowDialog("confirm-cancel") }, [setShowDialog])

  const onOpenChange = useCallback((open: boolean) => {
    if (open) return;
    setShowDialog("confirm-cancel")
  }, [setShowDialog])

  const onClickSubmit = useCallback(() => {
    if (!variantId) return;
    updateInventory({ variantId: variantId, quantity: newQuantity })
      .unwrap()
      .then(() => {
        toast.success(t("update_success"));
        onHidden?.();
        setShowDialog("none");
        dispatch(adminInventoryApi.util.invalidateTags(["inventory"]));
      }).catch((error) => {
        console.error(error)
        toast.error(t("update_failure"));
      })
  }, [variantId, updateInventory, newQuantity, onHidden, dispatch, t])

  useEffect(() => {
    setShowDialog(variantId ? "dialog" : "none");
  }, [variantId])

  return (
    <>
      <Dialog open={showDialog === "dialog"} onOpenChange={onOpenChange}>
        <DialogContent
          className={"sm:max-w-[525px]"}
          classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px] !hidden"}
          onClosed={onClickCancel}>
          <DialogHeader>
            <DialogTitle className={"text-4xl"}>{t('title')}</DialogTitle>
          </DialogHeader>
          <DialogDescription />
          <div className={"flex items-center gap-2"}>
            <Input value={oldQuantity} readOnly={true} />
            <ArrowRight width={50} height={50} />
            <Input type={"number"} value={newQuantity} onChange={(e) => setNewQuantity(Number(e.target.value))} />
          </div>
          <DialogFooter className={"flex gap-2"}>
            <ButtonAuthentication className={"border-1 border-black bg-white !text-black cursor-pointer"} onClick={onClickCancel}>
              {t('cancel')}
            </ButtonAuthentication>
            <ButtonAuthentication className={"bg-green-700 hover:bg-green-200 cursor-pointer"} onClick={() => {
              setShowDialog("confirm-submit");
            }}>
              {t('confirm')}
            </ButtonAuthentication>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DialogConfirm
        title={t('confirm_cancel')}
        open={showDialog === "confirm-cancel"}
        onOpenChange={(value) => {
          if (value) return;
          onHidden?.()
          setShowDialog("none");
        }}
        onClickCancel={() => {
          setShowDialog("dialog")
        }}
        onClickSubmit={() => {
          onHidden?.()
          setShowDialog("none");
        }}
      />
      <DialogConfirm
        title={t('confirm_submit')}
        open={showDialog === "confirm-submit"}
        onClickCancel={() => {
          setShowDialog("dialog")
        }}
        onClickSubmit={onClickSubmit}
      />
    </>
  )
}
