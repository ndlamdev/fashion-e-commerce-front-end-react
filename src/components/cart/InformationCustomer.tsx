/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:15PM - 13/03/2025
 *  User: lam-nguyen
 **/
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { LaShippingFast } from "@/assets/images/icons/LaShippingFast.tsx";
import momo from "@/assets/images/icons/momo.png";
import zaloPay from "@/assets/images/icons/zalo-pay.png";
import cardSupport from "@/assets/images/icons/card-support.png";
import { useCallback, useEffect, useState } from "react";
import PaymentEnum from "@/utils/enums/payment.enum.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { PayOs } from "@/assets/images/icons/PayOs.tsx";
import { setPayment, updateInfoCustomerCreateOrder } from "@/redux/slice/cart.slice.ts";
import { useForm } from "react-hook-form";
import { InfoCustomerCreateOrder } from "@/domain/resquest/createOrder.request.ts";
import { useGetDefaultAddressQuery } from "@/redux/api/address.api.ts";
import { getAllCities, getDistrictsByCity, getWardsByCityAndDistrict } from "@/utils/helper/AddressFilter.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useGetInfoAddressesQuery } from "@/redux/api/addressCoolMate.api";

function InformationCustomer() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [sex, setSex] = useState("Anh/Chị");
  const [otherReceiver, setOtherReceiver] = useState(false);
  const [paymentHover, setPaymentHover] = useState<PaymentEnum | null>();
  const dispatch = useDispatch();
  const { payment, showConfirm, trigger: triggerState } = useSelector((state: RootState) => state.cart);
  const { data: infoAddresses, isError: isErrorInfoAddresses, isLoading: isLoadingInfoAddresses } = useGetInfoAddressesQuery();
  const { data: defaultAddress } = useGetDefaultAddressQuery();

  const {
    setValue,
    getValues,
    register,
    trigger,
    setError,
    watch,
    formState: { errors },
  } = useForm<InfoCustomerCreateOrder>();
  const [province, district, ward, address] = watch(["province", "district", "ward", "address"]);

  const handleChangeProvince = useCallback(
    (city: string) => {
      if (!infoAddresses) return;
      setValue("province", city);
      setValue("district", "");
      setValue("ward", "");
    },
    [infoAddresses, setValue],
  );

  const handleChangeDistrict = useCallback(
    (district: string) => {
      setValue("district", district);
      setValue("ward", "");
    },
    [setValue],
  );

  const handleChangeWard = useCallback(
    (ward: string) => {
      setValue("ward", ward);
    },
    [setValue],
  );

  useEffect(() => {
    if (address || !province || !district || !ward) return;
    setValue("address", ` , ${ward ?? ""}, ${district ?? ""}, ${province ?? ""}.`);
  }, [setValue, province, district, ward, address]);

  useEffect(() => {
    if (triggerState == 0) return;
    setValue("payment", { method: payment ?? "CASH" });
    const { province, district, ward } = getValues();
    if (!province || !province.length) {
      setError("province", {
        type: "manual",
        message: "Vui lòng chọn tỉnh/thành phố",
      });
    } else {
      setError("province", {
        type: "manual",
      });
    }

    if (!district || !district.length) {
      setError("district", {
        type: "manual",
        message: "Vui lòng chọn quận/huyện",
      });
    } else {
      setError("district", {
        type: "manual",
      });
    }

    if (!ward || !ward.length) {
      setError("ward", {
        type: "manual",
        message: "Vui lòng chọn phường/xã",
      });
    } else {
      setError("ward", {
        type: "manual",
      });
    }

    trigger().then();

    if (!province || !district || !ward) {
      return;
    }
    dispatch(updateInfoCustomerCreateOrder(getValues()));
  }, [triggerState, trigger, getValues, setError, dispatch, setValue, payment]);

  useEffect(() => {
    setValue("name", user?.full_name ?? "");
    setValue("phone", user?.phone ?? "");
    if (!defaultAddress) return;
    const { street, city, ward, district, full_name, phone } = defaultAddress.data;
    if (street?.length) setValue("address", street);
    setValue("province", city);
    setValue("district", district);
    setValue("ward", ward);
    setValue("name", full_name ?? "");
    setValue("phone", phone ?? "");
  }, [defaultAddress, setValue, user?.full_name, user?.phone]);

  return (
    <div className={`px-5 md:pb-0 lg:px-0 ${showConfirm ? "pb-30" : "pb-0"}`}>
      <h1 className={"mt:mt-0 mt-4 mb-4 text-xl md:text-3xl md:font-[600]"}>Thông tin đặt hàng</h1>
      <div className={"flex flex-col gap-4"}>
        <div className={"flex flex-col gap-4 md:flex-row"}>
          <div className={"md:w-8/12"}>
            <label htmlFor={"name"} className={"text-[0.9rem] text-gray-700"}>
              Họ và tên
            </label>
            <div className={"flex gap-2 overflow-hidden rounded-full border-1 border-gray-400"}>
              <Select
                onValueChange={(value) => {
                  setSex(value);
                  setValue("name", value + ": " + (getValues("name") ?? ""));
                }}
                defaultValue={"Anh/Chị"}>
                <SelectTrigger className='rounded-none border-0 bg-gray-200 py-5 text-black outline-none'>
                  <SelectValue placeholder={sex} className={"text-black"}>
                    {sex}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Anh'>Anh</SelectItem>
                  <SelectItem value='Chị'>Chị</SelectItem>
                  <SelectItem value='Anh/Chị'>Không tiết lộ</SelectItem>
                </SelectContent>
              </Select>
              <input
                id={"name"}
                className={"w-full outline-none"}
                placeholder={"Nhập họ và tên của bạn"}
                {...register("name", {
                  required: "Tên không được để trống",
                })}
              />
            </div>
            {errors.name && <small className={"text-red-500"}>{errors.name?.message}</small>}
          </div>
          <div className={"flex flex-col md:w-4/12"}>
            <label htmlFor={"phone-number"} className={"text-[0.9rem] text-gray-700"}>
              Số điện thoại
            </label>
            <input
              id={"phone-number"}
              placeholder={"Nhập số điện thoại của bạn"}
              type={"tel"}
              className={"rounded-full border-1 border-gray-400 px-5 py-2 outline-none"}
              {...register("phone", {
                required: "Số điện thoại không được để trống",
                minLength: {
                  value: 10,
                  message: "Vui lòng nhập số điện thoại của bạn",
                },
              })}
            />
            {errors.phone && <small className={"text-red-500"}>{errors.phone?.message}</small>}
          </div>
        </div>
        <div className={"email"}>
          <label htmlFor={"email"} className={"text-[0.9rem] text-gray-700"}>
            Email
          </label>
          <input
            className={"w-full rounded-full border-1 border-gray-400 px-5 py-2 outline-none"}
            defaultValue={user?.email}
            placeholder={"Theo dõi đơn hàng sẽ được gửi email về ZNS"}
            {...register("email", {
              required: "Email không được để trống",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Vui lòng nhập email hợp lệ",
              },
            })}
          />
          {errors.email && <small className={"text-red-500"}>{errors.email?.message}</small>}
        </div>
        <div className={"address"}>
          <label htmlFor={"email"} className={"text-[0.9rem] text-gray-700"}>
            Địa chỉ
          </label>
          <input
            className={"w-full rounded-full border-1 border-gray-400 px-5 py-2 outline-none"}
            placeholder={"Địa chỉ (ví dụ: 123 Vạn Phúc, phường Vạn Phúc)"}
            {...register("address", {
              required: "Địa chỉ không được để trống",
            })}
          />
          {errors.address && <small className={"text-red-500"}>{errors.address?.message}</small>}
          <div className={"mt-2 flex w-full flex-col flex-wrap gap-2 lg:flex-row"}>
            <div className={"w-full py-5 lg:w-auto lg:grow"}>
              <Select onValueChange={handleChangeProvince} value={province}>
                <SelectTrigger className={"w-full rounded-full border-gray-400"}>
                  <SelectValue placeholder={"Vui lòng chọn tỉnh/thành phố"} className={"text-black"} />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingInfoAddresses && <Skeleton className={"w-full"} />}
                  {isErrorInfoAddresses && <p className='text-sm text-red-500'>không tìm thấy dữ liệu</p>}
                  {infoAddresses &&
                    infoAddresses.length > 0 &&
                    getAllCities(infoAddresses).map((city, index) => (
                      <SelectItem key={index + "-" + city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {errors.province && <small className={"text-red-500"}>{errors.province?.message}</small>}
            </div>
            <div className={"w-full py-5 lg:w-auto lg:grow"}>
              <Select onValueChange={handleChangeDistrict} value={district}>
                <SelectTrigger className='w-full rounded-full border-gray-400'>
                  <SelectValue placeholder={"Chọn Quận/Huyện"} className={"text-black"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectContent>
                    {infoAddresses &&
                      getDistrictsByCity(infoAddresses, province).map((district, index) => (
                        <SelectItem key={index + "-" + district} data-district-code={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </SelectContent>
              </Select>
              {errors.district && <small className={"text-red-500"}>{errors.district?.message}</small>}
            </div>
            <div className={"w-full py-5 lg:w-auto lg:grow"}>
              <Select onValueChange={handleChangeWard} value={ward}>
                <SelectTrigger className='w-full rounded-full border-gray-400'>
                  <SelectValue placeholder={"Chọn Phường/Xã"} className={"text-black"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectContent>
                    {infoAddresses &&
                      getWardsByCityAndDistrict(infoAddresses, province, district).map((ward, index) => (
                        <SelectItem key={index + "-" + ward} value={ward}>
                          {ward}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </SelectContent>
              </Select>
              {errors.ward && <small className={"text-red-500"}>{errors.ward?.message}</small>}
            </div>
          </div>
        </div>
        <div className={"note"}>
          <label htmlFor={"note"} className={"text-[0.9rem] text-gray-700"}>
            Ghi chú
          </label>
          <input
            id={"note"}
            className={"w-full rounded-full border-1 border-gray-400 px-5 py-2 outline-none"}
            placeholder={"Thêm ghi chú (ví dụ: Giao giờ hành chính)"}
            {...register("note", {})}
          />
        </div>
        <div>
          <div className={"mb-5 flex items-center gap-3"}>
            <input
              id={"call-other-people"}
              type={"checkbox"}
              onChange={(event) => {
                setOtherReceiver(event.currentTarget.checked);
              }}
              checked={otherReceiver}
              className={"h-5 w-5"}
            />
            <label htmlFor={"call-other-people"} className={"text-[0.9rem] text-gray-700"}>
              Gọi cho người khác nhận hàng (nếu có)
            </label>
          </div>
          <div className={`flex flex-col gap-3 rounded-2xl bg-gray-200 p-5 ${otherReceiver ? "block" : "hidden"}`}>
            <div className={"flex gap-4"}>
              <label className={"flex gap-3"}>
                <input type={"radio"} name={"sex"} value={"male"} onChange={() => { }} />
                Nam
              </label>
              <label className={"flex gap-3"}>
                <input type={"radio"} name={"sex"} value={"female"} onChange={() => { }} />
                Nữ
              </label>
            </div>
            <div className={"flex gap-4"}>
              <input className={"w-full rounded-full border-1 border-gray-400 bg-white px-5 py-2 outline-none"} placeholder={"Họ và tên người nhận"} />
              <input className={"w-full rounded-full border-1 border-gray-400 bg-white px-5 py-2 outline-none"} placeholder={"Số điện thoại người nhận"} />
            </div>
          </div>
        </div>
      </div>
      <Separator className={"mb-6"} />
      <h1 className={"mb-4 text-3xl font-[600]"}>Thông tin đặt hàng</h1>
      <ul className={"flex flex-col gap-2"}>
        <li>
          <div
            className={`flex h-17 items-center gap-3 rounded-2xl border-1 border-gray-300 px-4 ${payment === "CASH" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
            onMouseEnter={() => setPaymentHover("CASH")}
            onMouseLeave={() => setPaymentHover(null)}
            onClick={() => {
              dispatch(setPayment("CASH"));
            }}>
            <input type={"radio"} className={"h-5 w-5"} checked={payment === "CASH" || paymentHover === "CASH"} onChange={() => { }} />
            <LaShippingFast width={40} height={40} />
            <p className={"text-[0.9rem] font-bold"}>Thanh toán khi nhận hàng</p>
          </div>
        </li>
        <li>
          <div
            className={`flex h-17 items-center gap-3 rounded-2xl border-1 border-gray-300 px-4 ${payment === "MOMO" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
            onMouseEnter={() => setPaymentHover("MOMO")}
            onMouseLeave={() => setPaymentHover(null)}
            onClick={() => {
              dispatch(setPayment("MOMO"));
            }}>
            <input type={"radio"} className={"h-5 w-5"} checked={payment === "MOMO" || paymentHover === "MOMO"} onChange={() => { }} />
            <img src={momo} alt={"momo.png"} className={"h-13 w-13"} />
            <p className={"text-[0.9rem] font-bold"}>Ví MoMo</p>
          </div>
        </li>
        <li>
          <div
            className={`flex h-17 items-center gap-3 rounded-2xl border-1 border-gray-300 px-4 ${payment === "ZALO_PAY" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
            onMouseEnter={() => setPaymentHover("ZALO_PAY")}
            onMouseLeave={() => setPaymentHover(null)}
            onClick={() => {
              dispatch(setPayment("ZALO_PAY"));
            }}>
            <input type={"radio"} className={"h-5 w-5"} checked={payment === "ZALO_PAY" || paymentHover === "ZALO_PAY"} onChange={() => { }} />
            <img src={zaloPay} alt={"zalo-pay.png"} className={"h-13 w-13 rounded-[0.5rem]"} />
            <div>
              <p className={"text-[0.9rem] font-bold"}>Thanh toán qua ZaloPay</p>
              <p className={"flex flex-col gap-x-2 text-[0.8rem] text-gray-400 md:flex-row"}>
                Hỗ trợ mọi hình thức thanh toán
                <img src={cardSupport} alt='support-card.png' className={"h-4"} />
              </p>
            </div>
          </div>
        </li>
        <li>
          <div
            className={`flex h-17 items-center gap-3 rounded-2xl border-1 border-gray-300 px-4 ${payment === "PAY_OS" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
            onMouseEnter={() => setPaymentHover("PAY_OS")}
            onMouseLeave={() => setPaymentHover(null)}
            onClick={() => {
              dispatch(setPayment("PAY_OS"));
            }}>
            <input type={"radio"} className={"h-5 w-5"} checked={payment === "PAY_OS" || paymentHover === "PAY_OS"} onChange={() => { }} />
            <PayOs className={"h-13 w-13 rounded-[0.5rem]"} />
            <div>
              <p className={"text-[0.9rem] font-bold"}>Ví điện tử PayOs</p>
              <p className={"flex gap-2 text-[0.8rem] text-gray-400"}>Quét QR để thanh toán</p>
            </div>
          </div>
        </li>
      </ul>
      <p className={"mt-2 text-[0.85rem]"}>
        Nếu bạn không hài lòng với sản phẩm của chúng tôi? Bạn hoàn toàn có thể trả lại sản phẩm. Tìm hiểu thêm{" "}
        <a href={"#"} className={"font-bold text-blue-800"}>
          tại đây
        </a>
      </p>
    </div>
  );
}

export default InformationCustomer;
