import { CustomerManagementData } from "@/assets/data/cusotmerManagement.data.ts";
import InfoCustomer from "@/components/admin/customer/InfoCustomer.tsx";
import DataTable from "@/components/dataTable/DataTable.tsx";
import { columns } from "@/components/dataTable/dataColumns/order.column.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { Button } from "@/components/ui/button.tsx";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { HoverCardContext } from "@/context/HoverCardContext.ts";
import { HoverCardValues } from "@/context/provider/HoverCardProvider.tsx";
import { useAdminGetAddressesQuery } from "@/redux/api/address.api";
import { useAdminGetOrderHistoriesByUseIdQuery } from "@/redux/api/order.api";
import { useAdminGetProfileQuery } from "@/redux/api/profile.api";
import { setUserIdAction } from "@/redux/slice/address.slice";
import { showDialog } from "@/redux/slice/dialog.slice.ts";
import { HoverCardEnum } from "@/utils/enums/hoverCard.enum.ts";
import formatData, { formatCurrency } from "@/utils/helper/format-data.ts";
import { EllipsisIcon, UserRoundIcon } from "lucide-react";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
export default function CustomerDetailManagementPage() {
  const { showHoverCard, hoverCard } = useContext(HoverCardContext);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) return;
    navigate("/admin")
  }, [id, navigate])

   useEffect(() => {
    document.title = "KimiFashion - Quản lý khách hàng";
  }, []);

  const customer = CustomerManagementData;
  const data = HoverCardValues[hoverCard];
  const { data: dataOrders, error: errorOrders } = useAdminGetOrderHistoriesByUseIdQuery(parseInt(id ?? "0"))
  const { data: dataProfile, error: errorProfle } = useAdminGetProfileQuery(parseInt(id ?? "0"));
  const { data: dataAddresses, error: errorAddresses } = useAdminGetAddressesQuery(parseInt(id ?? "0"));

  const handleWatchDetail = useCallback((id: number) => {
    navigate(`/admin/orders/${id}`);
  }, [navigate])
  const handleDelete = useCallback((id: number) => {
    //TODO: implement delete order here
    console.log(id);
  }, [])

  useEffect(() => {
    if (!errorOrders) return;
    toast.error("Lỗi tải lịch sử mua hàng!")
  }, [errorOrders])

  useEffect(() => {
    if (!errorProfle) return;
    toast.error("Lỗi tải thông tin cá nhân!")
  }, [errorProfle])

  useEffect(() => {
    if (!errorAddresses) return;
    toast.error("Lỗi tải thông tin địa chỉ giao hàng người dùng!")
  }, [errorAddresses])

  const dayRegisterSince = useMemo(() => {
    if (!dataProfile) return 0;
    const datetimeCreated = formatData.parseDatetime(dataProfile.data.create_at)
    const timeDiff = new Date().getTime() - datetimeCreated.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  }, [dataProfile])

  useEffect(() => {
    if (!id) {
      navigate("/admin")
      return;
    }
    dispatch(setUserIdAction(parseInt(id)))

    return () => {
      dispatch(setUserIdAction(undefined))
    }
  })

  const defaultAddress = useMemo(() => {
    const address = dataAddresses?.data.filter(it => it.active)
    if (!address || address.length < 1) return undefined;
    return address[0];
  }, [dataAddresses]);

  return (
    <main>
      <header>
        <div className="flex justify-between items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={"#"}><UserRoundIcon className={"size-4 sm:size-6"} /></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#"><span className={"font-bold text-sm sm:text-2xl"}>{dataProfile?.data.full_name ?? ""}</span></BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Popover>
            <PopoverTrigger className={"cursor-pointer"} asChild>
              <Button variant={"outline"} className={" max-sm:size-8"}>
                <span className={'max-sm:hidden'}>More actions</span>
                <EllipsisIcon className={"sm:hidden"} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-auto -translate-1/14 translate-y-2 p-2 text-xs sm:text-sm"}>
              <p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Merge Customer</p>
              <p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Request customer data</p>
              <p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Erase customer data</p>
              <p onClick={() => dispatch(showDialog('show-confirm'))} className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer text-red-500"}>Delete customer</p>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      <section
        className={"my-4 grid grid-cols-4  rounded-lg shadow-sm shadow-accent-foreground bg-white"}>
        <HoverCard openDelay={50} closeDelay={100}>
          <HoverCardTrigger onMouseEnter={() => {
            showHoverCard(HoverCardEnum.AMOUNT_SPENT);
          }} className="p-2 hover:bg-neutral-200 rounded-lg  text-xs sm:text-sm">
            <div className={"flex"}>
              <div className={"flex flex-col items-center"}>
                <p
                  className="underline underline-offset-2 decoration-dashed cursor-pointer">
                  Amount spent</p>
                <p className="">{formatCurrency(dataOrders?.data.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) ?? 0)}</p>

              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardTrigger onMouseEnter={() => {
            showHoverCard(HoverCardEnum.ORDERS);
          }} className="p-2 hover:bg-neutral-200 rounded-lg text-xs sm:text-sm flex">
            <div className={"flex flex-col items-center"}>
              <p className="underline underline-offset-2 decoration-dashed cursor-pointer">Orders</p>
              <p className="">{dataOrders?.data.length ?? 0}</p>
            </div>
          </HoverCardTrigger>
          <HoverCardTrigger onMouseEnter={() => {
            showHoverCard(HoverCardEnum.CUSTOMER_SINCE);
          }} className="p-2 hover:bg-neutral-200 rounded-lg text-xs sm:text-sm flex">
            <div className={"flex flex-col items-center"}>
              <p className="underline underline-offset-2 decoration-dashed cursor-pointer ">Customer since </p>
              <p className="">{dayRegisterSince} days</p>
            </div>
          </HoverCardTrigger>
          <HoverCardTrigger onMouseEnter={() => {
            showHoverCard(HoverCardEnum.RFM_GROUP);
          }} className="p-2 hover:bg-neutral-200 rounded-lg text-xs sm:text-sm flex">
            <div className={"flex flex-col items-center"}>
              <p className="underline underline-offset-2 decoration-dashed cursor-pointer ">RFM Group</p>
              <p className="">{customer.rfm_group}</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            style={{
              transform: `translate(${(-100 * ((Object.values(HoverCardValues).length - hoverCard.valueOf() - 1) % Object.values(HoverCardValues).length))}%, ${0}px)`,
            }}
            className={"text-xs sm:text-sm flex"}>
            <div className={"flex flex-col items-center"}>
              <p className={"font-bold"}>{data.title}</p>
              <p className={"text-wrap"}>{data.description}</p>
              {data.footer}
            </div>
          </HoverCardContent>
        </HoverCard>
      </section>

      <div className="flex items-start max-sm:flex-wrap my-5 sm:space-x-6 max-sm:space-y-4">
        <section className={"rounded-lg shadow-sm shadow-accent-foreground w-full sm:w-9/10 p-3 bg-white"}>
          {dataOrders && dataOrders.data.length > 0
            ? (<DataTable columns={columns(handleWatchDetail, handleDelete)} data={dataOrders?.data ?? []} />)
            : (
              <div className={"flex justify-between items-center"}>
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-neutral-600 italic">This customer hasn’t placed any orders yet</p>
                  <Button variant={'outline'} className={'cursor-pointer'}>Create Order</Button>
                </div>
                <img src={"https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/empty-state-orders-1-3vUe-nXUGWPA.svg"} alt={""} className={'max-sm:hidden'} />
              </div>
            )}
        </section>
        <InfoCustomer
          id={dataProfile?.data.id ?? 0}
          email={dataProfile?.data.email}
          full_name={dataProfile?.data.full_name ?? ""}
          phone={dataProfile?.data.phone}
          email_subscribed={""}
          location={defaultAddress?.street ?? ""}
          orders={dataOrders?.data.length ?? 0}
          amount_spent={dataOrders?.data.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) ?? 0}
          customer_since={1} // thời gian tạo tài khoản cho đến hiện tại
          rfm_group={""}
          address_default={defaultAddress} //AddressShippingType
          order_list={[]} // OrderManagementType[] //TODO: chỉnh lại
          addresses_shipping={dataAddresses?.data} //AddressShippingType[]
          no_order={0}
        />
      </div>
    </main >
  );
}