import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Input } from "@/components/ui/input.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { Button } from "@/components/ui/button.tsx";
import { gender } from "@/components/profile/props/editInfoProfileDialog.props.ts";
import "react-day-picker/style.css";
import { DatePicker } from "@/components/DatePickerCustom.tsx";
import { useSaveProfileMutation } from "@/redux/api/profile.api";
import { toast } from "sonner";
import { formatDateFromArray } from "@/utils/helper/format-data.ts";
import { ProfileRequest } from "@/domain/resquest/profile/profile.request.ts";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "@/redux/slice/auth.slice";
import { RootState } from "@/configs/store.config.ts";
import { hiddenDialog } from "@/redux/slice/dialog.slice.ts";
import { GenderType } from "@/types/profile/profile.type";

const EditInfoProfileDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ProfileRequest>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [request, { isLoading }] = useSaveProfileMutation();
  const [heightValue, setHeightValue] = useState<number[]>([user?.height ?? 0]);
  const dispatch = useDispatch();
  const { dialog } = useSelector((state: RootState) => state.dialog);

  // handle data weight range Slider component
  const [weightValue, setWeightValue] = useState<number[]>([user?.weight ?? 0]);

  const onSubmit = async (formValues: ProfileRequest) => {
    try {
      const data = {
        ...formValues,
        country_code: user?.country_code,
        height: heightValue[0],
        weight: weightValue[0],
      } as ProfileRequest;
      console.log(data);
      const result = await request(data).unwrap();
      if (result?.code >= 400) {
        toast("Cập nhật thất bại " + result?.message, {});
        return;
      }
      dispatch(changeProfile(result.data));
      toast("Cập nhật thành công");
      dispatch(hiddenDialog());
    } catch (error) {
      console.log(error);
      toast("Cập nhật thất bại " + error, {});
    }
  };

  return (
    <Dialog open={dialog === "edit-info-profile"}>
      <DialogContent
        classIcon={
          "bg-black text-white p-2 sm:p-5 cursor-pointer !rounded-lg sm:!rounded-full -translate-y-3 sm:-translate-y-10 translate-x-3 sm:translate-x-10 opacity-100 "
        }
        onClosed={() => dispatch(hiddenDialog())}
        className={"z-51 max-w-full text-gray-500 max-sm:bottom-0 max-sm:h-3/4 max-sm:-translate-y-1/4 max-sm:rounded-b-none max-sm:p-2 sm:max-w-200"}>
        <ScrollArea className={"h-100 overflow-auto overscroll-none p-5 max-md:p-2 max-sm:h-full max-sm:w-full"}>
          <DialogTitle className={"max-sm: text-lg text-black sm:text-center sm:text-2xl lg:text-4xl"}>Chỉnh sửa thông tin tài khoản</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className={"w-full space-y-3 p-2 max-sm:my-5"}>
            <div className=''>
              <Input
                defaultValue={user?.full_name}
                placeholder={"Họ và tên của bạn"}
                className={"rounded-lg"}
                {...register("full_name", {
                  required: "vui lòng nhập tên tài khoản",
                })}
              />
              {errors.full_name && <p className={"ml-2 text-red-500"}>{errors.full_name.message}</p>}
            </div>
            <DatePicker defaultValue={formatDateFromArray(user?.birthday ?? [])} {...register("birthday")} />
            <RadioGroup defaultValue={user?.gender} className={"flex space-x-4"} onValueChange={value => {
              setValue("gender", value as GenderType);
            }} >
              {Object.keys(gender).map((_, index: number) => {
                return (
                  <div key={index} className='flex flex-wrap space-x-2'>
                    <RadioGroupItem value={gender[index].value} id={gender[index].value} className={"cursor-pointer"} />
                    <Label htmlFor={gender[index].value} className={"cursor-pointer"}>
                      {gender[index].name}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
            <div className=''>
              <Input
                defaultValue={user?.phone}
                placeholder={"Số điện thoại"}
                className={""}
                {...register("phone", {
                  required: true,
                  pattern: {
                    value: /(0[35789])+([0-9]{8})\b/g,
                    message: "SDT khong hop le.",
                  },
                })}
              />
              {errors.phone && <span className={"ml-2 text-red-500"}>{errors.phone.message}</span>}
            </div>
            <div className='flex w-full'>
              <span className='flex-none px-4 text-gray-500'>Chiều cao</span>
              <Slider {...register("height")} className={"shrink"} onValueChange={setHeightValue} defaultValue={heightValue} min={140} max={190} step={1} />
              <span className='flex-none px-4 text-blue-700'>{heightValue} cm</span>
            </div>
            <div className='my-5 flex w-full'>
              <span className='flex-none px-4 text-gray-500'>Cân nặng</span>
              <Slider {...register("weight")} className={"shrink"} onValueChange={setWeightValue} defaultValue={weightValue} min={40} max={90} step={1} />
              <span className='flex-none px-4 text-blue-700'>{weightValue} kg</span>
            </div>

            <Button type={"submit"} disabled={isLoading} className={"w-full cursor-pointer bg-black p-3 text-white uppercase active:bg-neutral-500"}>
              Cập nhật tài khoản
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog >
  );
};

export default EditInfoProfileDialog;
