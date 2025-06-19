import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import LazyImage from "@/components/ui/LazyImage";
import { useAppSelector } from "@/configs/store.config";
import { useGetAllMediaQuery } from "@/redux/api/media.api";
import { hiddenDialog } from "@/redux/slice/dialog.slice";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const RESOURCE_IMAGE = import.meta.env.VITE_BASE_MEDIA_URL;

export default function DialogChooseMedia() {
  const { dialog } = useAppSelector(state => state.dialog)
  const dispatch = useDispatch()
  const { data, isError } = useGetAllMediaQuery(undefined, {skip: dialog !== "choose-media"});

  useEffect(() => {
    if (!isError) return;
    toast.error("Lỗi tải thông tin đa phương tiện!");
  }, [isError]);


  const onClickCancel = useCallback(() => { dispatch(hiddenDialog()) }, [dispatch])

  const onOpenChange = useCallback((open: boolean) => {
    if (open) return;
    dispatch(hiddenDialog())
  }, [dispatch])

  const onClickSubmit = useCallback(() => { }, [])

  return (
    <Dialog open={dialog === "choose-media"} onOpenChange={onOpenChange}>
      <DialogContent
        className={"sm:max-w-[70%] max-h-[70%] overflow-y-hidden flex flex-col"}
        classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px] !hidden"}
        onClosed={onClickCancel}>
        <DialogHeader>
          <DialogTitle className={"text-4xl"}>Chọn hình ảnh</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <div className={"overflow-y-auto overflow-x-hidden flex-1"}>
          <div className={"flex flex-wrap gap-2"}>
            {/*     {data?.data.slice(0, 5).map((media) => (
              <div key={media.id} className={"p-2 border-b border-gray-200 relative"}>
                <LazyImage src={RESOURCE_IMAGE + media.path} alt={media.display_name} className={"w-full h-full"} loading="lazy" />
              </div>
            ))} */}
          </div>
        </div>
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
  )
}
