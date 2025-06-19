import InfoCustomer from "@/components/admin/customer/InfoCustomer.tsx";
import OrderPaymentInfo from "@/components/admin/order/OrderPaymentInfo.tsx";
import DataTable from "@/components/dataTable/DataTable.tsx";
import { orderItemColumns } from "@/components/dataTable/dataColumns/orderItem.column";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Skeleton } from "@/components/ui/skeleton";
import OrderItemResponse from "@/domain/response/orderItem.response";
import { adminOrderApi, useAdminDeleteOrderHistoriesByOrderIdMutation, useAdminGetOrderDetailQuery } from "@/redux/api/order.api";
import { showDialog } from "@/redux/slice/dialog.slice";
import { AddressShippingType } from "@/types/profile/address.type";
import OrderStatusEnum, { getNextStatus, OrderStatusColors } from "@/utils/enums/orderStatus.enum";
import { formatDateFromArray } from "@/utils/helper/format-data";
import { EllipsisIcon, InboxIcon, TrashIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import DialogUpdateStatus from "./dialogs/DialogUpdateStatus";
import DialogConfirm from "@/components/dialog/DialogConfirm";

const OrderDetailManagementPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate()
  const { data, isError } = useAdminGetOrderDetailQuery(parseInt(id ?? "0"), { skip: !id })
  const [nextStatus, setNextStatus] = useState<OrderStatusEnum | null>(null);
  const [idOrderStatusDelete, setIdOrderStatusDelete] = useState<number | undefined>(undefined);
  const [deleteOrderStatus] = useAdminDeleteOrderHistoriesByOrderIdMutation();

  const handleInputChange = useCallback((updater: (item: OrderItemResponse, index: number) => OrderItemResponse) => {
    return updater({
      id: 0,
      variant: {
        id: "",
        productId: "",
        title: "",
        sku: "",
        quantity: 0,
        options: {},
        pending: 0,
        lock: false,
        regular_price: 0,
        compare_price: 0,
        product_allow_buy_when_clocked: false,
        product_exclude_discount: false,
        product_apply_allowance_inventory: false,
        product_visibility: false,
        is_delete: false
      },
      product: {
        id: "",
        lock: false,
        title: "",
        image: {
          id: "",
          src: ""
        },
        available: false,
        seo_alias: ""
      },
      quantity: 0,
      compare_price: 0,
      regular_price: 0
    }, 0);
  }, [])

  // Before passing to <DataTable />
  const dataWithHandler = useMemo(() => {
    if (!data) return []
    return data.data.item_details.map((item) => ({
      ...item,
      onInputChange: handleInputChange
    }));
  }, [data, handleInputChange])



  useEffect(() => {
    if (!id) navigate("/admin/orders")
  }, [id, navigate])

  useEffect(() => {
    if (!isError) return;
    toast.error("Lỗi tải chi tiết đơn hàng")
  }, [isError])

  useEffect(() => {
    document.title = "KimiFashion - Chi tiết đơn hàng";
  }, []);

  const nextStatusWithData = useMemo(() => {
    if (!data) return "PENDING";
    return getNextStatus(data.data.statuses[data.data.statuses.length - 1]?.status) ?? "PENDING";
  }, [data])

  const onDeleteOrderStatus = useCallback(() => {
    if (!idOrderStatusDelete || !id) return;
    deleteOrderStatus({ orderId: parseInt(id), orderStatusId: idOrderStatusDelete })
      .unwrap()
      .then(() => {
        setIdOrderStatusDelete(undefined);
        dispatch(adminOrderApi.util.invalidateTags(["order_detail"]));
        toast.success("Đã xóa trạng thái đơn hàng thành công.");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Xóa trạng thái đơn hàng thất bại.");
      });

  }, [deleteOrderStatus, id, idOrderStatusDelete, dispatch]);

  return (
    <>
      <header>
        <div className="flex justify-between items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/orders"><InboxIcon className={"size-4 sm:size-6"} /></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={window.location.href}><span className={"font-bold text-sm sm:text-2xl"}>#{id}</span></BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {(data?.data.statuses[data.data.statuses.length - 1]?.status !== "CANCEL"
            && data?.data.statuses[data.data.statuses.length - 1]?.status !== "COMPLETED")
            && (
              <Popover>
                <PopoverTrigger className={"cursor-pointer"} asChild>
                  <Button variant={"outline"} className={" max-sm:size-8"}>
                    <span className={'max-sm:hidden'}>More actions</span>
                    <EllipsisIcon className={"sm:hidden"} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={"w-auto -translate-1/14 translate-y-2 p-2 text-xs sm:text-sm"}>
                  <p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}
                    onClick={() => {
                      setNextStatus(nextStatusWithData);
                      dispatch(showDialog("update-status"));
                    }}>Update status</p>
                  <p onClick={() => {
                    setNextStatus("CANCEL");
                    dispatch(showDialog('update-status'));
                  }} className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer text-red-500"}>
                    Cancel order
                  </p>
                </PopoverContent>
              </Popover>
            )}
        </div>
      </header>
      <main className={"grid md:grid-cols-9 grid-cols-1 grid-rows-2 md:grid-rows-1 gap-4  my-4"}>
        <section
          className={"flex flex-col md:col-span-6 col-span-1 gap-4"}>
          <div className="rounded-lg shadow-sm shadow-accent-foreground  w-full p-3 bg-white text-xs sm:text-sm text-neutral-600">
            <DataTable columns={orderItemColumns} data={dataWithHandler} />
          </div>
          <div className={"rounded-lg shadow-sm shadow-accent-foreground w-full p-3 bg-white text-neutral-600"}>
            <span className={'font-bold'}>Payment</span>
            {!data ? <Skeleton /> : <OrderPaymentInfo {...data.data} />}
          </div>
        </section>
        <section className={"md:col-span-3 col-span-1 gap-4 flex flex-col"}>
          <InfoCustomer
            className={"w-full sm:w-full"}
            id={data?.data.id ?? 0}
            email={data?.data.email}
            full_name={data?.data.name ?? ""}
            phone={data?.data.phone}
            email_subscribed={""}
            location={data?.data.address_detail ?? ""}
            orders={0}
            amount_spent={0}
            customer_since={0} // thời gian tạo tài khoản cho đến hiện tại
            rfm_group={""}
            address_default={{
              id: 0,
              full_name: data?.data.name,
              phone: data?.data.phone,
              country_code: "",
              active: false,
              street: data?.data.address_detail,
              city: data?.data.province,
              city_code: "",
              district: data?.data.district,
              district_code: "",
              ward: data?.data.ward,
              ward_code: "",
            } as AddressShippingType} //AddressShippingType
            order_list={[]} // OrderManagementType[] //TODO: chỉnh lại
            addresses_shipping={[]} //AddressShippingType[]
            hidden_no_order={true}
          />
          <div className="rounded-lg shadow-sm shadow-accent-foreground  w-full p-3 bg-white text-xs sm:text-sm text-neutral-600">
            <span className={'font-bold'}>Order Status</span>
            {data?.data.statuses.map((status, index) => (
              <div className="flex gap-2 mb-2" key={index + status.id}>
                <div className="flex flex-col gap-1 justify-between items-center w-3">
                  <span className="w-3 h-3 bg-black block rounded-full flex-shrink-0" />
                  {index + 1 != data?.data.statuses.length && <span className="w-1 h-full bg-black" />}
                </div>
                <div className={"w-full"}>
                  <div className={"flex-1 flex justify-between  items-center mb-1 w-full"}>
                    <p className={"flex items-center"}>
                      <span className="font-bold text-blue-600 mr-2">#{status.id}</span>
                      <Badge variant={OrderStatusColors[status.status as OrderStatusEnum]}>
                        {status.status}
                      </Badge>
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500">{formatDateFromArray(status.update_at)}</span>
                      {index + 1 === data?.data.statuses.length && (<TrashIcon className={"text-red-500 w-5 h-5"} onClick={() => setIdOrderStatusDelete(status.id)} />)}
                    </div>
                  </div>
                  <div>
                    <p>{status.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {(data?.data || !id) && <DialogUpdateStatus status={nextStatus ?? "PENDING"} orderId={parseInt(id ?? "0")} />}
      <DialogConfirm
        title={'Bạn có chắc muốn xóa trạng thái này không?'}
        open={idOrderStatusDelete !== undefined}
        onOpenChange={(value) => { if (!value) setIdOrderStatusDelete(undefined) }}
        onClickCancel={() => setIdOrderStatusDelete(undefined)}
        onClickSubmit={onDeleteOrderStatus}
      />
    </>
  )
}
export default OrderDetailManagementPage