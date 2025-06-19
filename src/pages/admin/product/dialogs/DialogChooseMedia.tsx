import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication";
import { mediaChooseColumns } from "@/components/dataTable/dataColumns/mediaChoose.column";
import DataTable from "@/components/dataTable/DataTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { useAppSelector } from "@/configs/store.config";
import MediaResponse from "@/domain/response/media.response";
import { useGetAllMediaQuery } from "@/redux/api/media.api";
import { hiddenDialog } from "@/redux/slice/dialog.slice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function DialogChooseMedia(
  {
    mediaChoose,
    setMediaChoose
  }:
    {
      mediaChoose: MediaResponse[],
      setMediaChoose: (media: MediaResponse[]) => void
    }
) {
  const { dialog } = useAppSelector(state => state.dialog)
  const dispatch = useDispatch()
  const { data, isError } = useGetAllMediaQuery(undefined, { skip: dialog !== "choose-media" });
  const [mediaChecked, setMediaChecked] = useState<Record<string, MediaResponse>>({});

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

  useEffect(() => {
    setMediaChoose(Object.values(mediaChecked));
  }, [mediaChecked, setMediaChoose]);

  const dataPrepared = useMemo(() => {
    const record: Record<string, MediaResponse> = {};
    mediaChoose.forEach(media => {
      record[media.id] = media;
    });
    return data?.data.map(media => ({ ...media, checked: !!record[media.id] })) ?? [];
  }, [data?.data, mediaChoose]);

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
          <DataTable columns={mediaChooseColumns((data, checked) => {
            if (checked) setMediaChecked(prev => ({ ...prev, [data.id]: data }));
            else setMediaChecked(prev => {
              const newState = { ...prev };
              delete newState[data.id];
              return newState;
            });
          })} data={dataPrepared} />
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
