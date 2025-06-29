import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { appDispatch, RootState } from "@/configs/store.config.ts";
import { SaveAddressRequest } from "@/domain/resquest/saveAddress.request.ts";
import { addressApi, adminAddressApi, useAdminGetAddressQuery, useAdminSaveAddressMutation, useGetAddressQuery, useSaveAddressMutation } from "@/redux/api/address.api.ts";
import { setAddressIdAction } from "@/redux/slice/address.slice";
import { hiddenDialog } from "@/redux/slice/dialog.slice.ts";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import AddressData, { getDistrict, getWard } from "@/assets/data/address/tree"

const SaveAddressDialog = () => {
  const dispatch = useDispatch();
  const { dialog } = useSelector((state: RootState) => state.dialog);
  const { user } = useSelector((state: RootState) => state.auth);
  const { addressIdAction, userIdAction } = useSelector((state: RootState) => state.address);

  const { data: address } = useGetAddressQuery(addressIdAction, { skip: !addressIdAction || !!userIdAction });
  const { data: adminAddress } = useAdminGetAddressQuery({ userId: userIdAction ?? 0, addressId: addressIdAction ?? 0 }, { skip: !addressIdAction || !userIdAction });

  const [request, { isLoading: isLoadingAddressShippingResponse }] = useSaveAddressMutation();
  const [adminRequest, { isLoading: isLoadingAdminAddressShippingResponse }] = useAdminSaveAddressMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control
  } = useForm<SaveAddressRequest>();
  useEffect(() => {
    if (address?.data) {
      reset(address.data);
    }
    if (adminAddress?.data) {
      reset(adminAddress.data);
    }
  }, [address, adminAddress, reset]);

  const [cityCodeValue, districtCodeValue] = watch(["city_code", "district_code"]);

  const onSubmit = async (formValues: SaveAddressRequest) => {
    try {
      const data = {
        ...formValues,
        id: addressIdAction,
        country_code: user?.country_code,
        city: AddressData[formValues.city_code].name_with_type,
        district: getDistrict(formValues.city_code)[formValues.district_code].name_with_type,
        ward: getWard(formValues.city_code, formValues.district_code)[formValues.ward_code].name_with_type,
        active: formValues.active ?? false,
      } as SaveAddressRequest;

      let result
      if (!userIdAction)
        result = await request(data).unwrap();
      else
        result = await adminRequest({ userId: userIdAction, address: data }).unwrap();

      if (result?.code >= 400) {
        toast("Cập nhật thất bại " + result?.message, {});
        return;
      }
      dispatch(hiddenDialog());
      toast("Cập nhật thành công ");
      reset();
      if (!userIdAction) {
        appDispatch(addressApi.util.invalidateTags(["Address"]));
      }
      else
        appDispatch(adminAddressApi.util.invalidateTags(["AdminAddress"]));
    } catch (error) {
      console.log(error);
      toast("Cập nhật thất bại " + error, {});
    }
  };

  const closeDialog = () => {
    dispatch(hiddenDialog());
    dispatch(setAddressIdAction(undefined))
    reset();
  }

  return (
    <Dialog open={dialog === "save-address"} onOpenChange={(open) => {
      if (open) return;
      closeDialog();
    }}>
      <DialogContent
        classIcon={
          " bg-black text-white p-2 sm:p-5 cursor-pointer !rounded-lg sm:!rounded-full -translate-y-3 sm:-translate-y-10 translate-x-3 sm:translate-x-10 opacity-100 "
        }
        className={"z-51 max-w-full text-gray-500 max-sm:bottom-0 max-sm:h-3/4 max-sm:-translate-y-1/4 max-sm:rounded-b-none max-sm:p-2 sm:max-w-200"}>
        <DialogTitle />
        <DialogDescription />
        <form onSubmit={handleSubmit(onSubmit)} className={"w-full space-y-3 p-2 max-sm:my-5"}>
          <div className={"grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 sm:p-2"}>
            <div className=''>
              <Input
                placeholder={"Họ và tên"}
                className={"h-10 rounded-lg"}
                {...register("full_name", {
                  required: "vui lòng nhập họ và tên",
                })}
              />
              {errors.full_name && <p className={"ml-2 text-red-500"}>{errors.full_name.message}</p>}
            </div>
            <div className=''>
              <Input
                placeholder={"Số điện thoại"}
                className={"h-10 rounded-lg"}
                {...register("phone", {
                  required: "vui lòng nhập số điện thoại",
                  pattern: {
                    value: /(0[35789])+([0-9]{8})\b/g,
                    message: "số điện thoại không đúng khu vực Việt Nam",
                  },
                })}
              />
              {errors.phone && <p className={"ml-2 text-red-500"}>{errors.phone.message}</p>}
            </div>
            <Input placeholder={"Địa chỉ"} className={"h-10 rounded-lg"} {...register("street")} />
            <div className=''>
              <Controller
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      if (!value) return;
                      field.onChange(value)
                    }}
                  >
                    <SelectTrigger className={"max-sm:w-full"}>
                      <SelectValue placeholder='Thành phố/tỉnh' />
                    </SelectTrigger>
                    <SelectContent className={"z-52"}>
                      {Object.entries(AddressData).map(([key, city]) => (
                        <SelectItem key={"city-" + key} value={key}>
                          {city.name_with_type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                name={"city_code"}
                control={control}
                rules={{ required: "Không được bỏ trống" }}
              />
              {errors.city && <p className={"ml-2 text-red-500"}>{errors.city.message}</p>}
            </div>
            <div>
              <Controller
                render={({ field }) => (
                  <Select value={field.value}
                    onValueChange={(value) => {
                      if (!value) return;
                      field.onChange(value)
                    }}
                  >
                    <SelectTrigger disabled={!cityCodeValue} className={"max-sm:w-full"}>
                      <SelectValue placeholder='Quận/huyện' />
                    </SelectTrigger>
                    <SelectContent className={"z-52"}>
                      {Object.entries(getDistrict(cityCodeValue)).map(([key, district]) => (
                        <SelectItem key={"district-" + key} data-district-code={district.code} value={key}>
                          {district.name_with_type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                name={"district_code"}
                control={control}
                rules={{ required: "Không được bỏ trống" }}
              />
              {errors.district && <p className={"ml-2 text-red-500"}>{errors.district.message}</p>}
            </div>
            <div>
              <Controller
                render={({ field }) => (
                  <Select value={field.value}
                    onValueChange={(value) => {
                      if (value) field.onChange(value)
                    }}
                  >
                    <SelectTrigger disabled={!cityCodeValue || !districtCodeValue} className={"max-sm:w-full"}>
                      <SelectValue placeholder='Phường/xã' />
                    </SelectTrigger>
                    <SelectContent className={"z-52"}>
                      {Object.entries(getWard(cityCodeValue, districtCodeValue)).map(([key, ward]) => (
                        <SelectItem key={"ward-" + key} value={key}>
                          {ward.name_with_type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                name={"ward_code"}
                control={control}
                rules={{ required: "Không được bỏ trống" }}
              />
              {errors.ward && <p className={"ml-2 text-red-500"}>{errors.ward.message}</p>}
            </div>
            <Controller
              name={"active"}
              control={control}
              render={({ field }) => (
                <div className='flex content-start items-center space-x-3'>
                  <Checkbox defaultChecked={address?.data.active} id={"is-default"} checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor={"is-default"}>Đặt làm mặc định</Label>
                </div>
              )}></Controller>
          </div>
          <div className='flex w-full place-content-end items-center space-x-4'>
            <Button
              disabled={isLoadingAddressShippingResponse && isLoadingAdminAddressShippingResponse}
              onClick={closeDialog}
              type={"button"}
              className={"cursor-pointer rounded-full bg-neutral-200 text-black uppercase hover:bg-neutral-500 hover:text-white sm:p-5"}>
              Hủy
            </Button>
            <Button type={"submit"} className={"cursor-pointer rounded-full bg-black text-white uppercase active:bg-neutral-500 sm:p-5"}>
              Lưu
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SaveAddressDialog;
