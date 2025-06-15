import InfoCustomer from "@/components/admin/customer/InfoCustomer.tsx";
import FilterColumnData from "@/components/admin/filterColumnData/FiterColumndata.tsx";
import OrderPaymentInfo from "@/components/admin/order/OrderPaymentInfo.tsx";
import DataTable from "@/components/dataTable/DataTable.tsx";
import { orderItemColumns } from "@/components/dataTable/dataColumns/orderItem.column";
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
import { useAdminGetAddressesQuery } from "@/redux/api/address.api";
import { useAdminGetOrderDetaiQuery } from "@/redux/api/order.api";
import { showDialog } from "@/redux/slice/dialog.slice.ts";
import { ProductSortEnum } from "@/utils/enums/admin/sort/productSort.enum";
import { SortDirection } from "@tanstack/react-table";
import { EllipsisIcon, InboxIcon } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const OrderDetailManagementPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const { userId } = location.state;
  const navigate = useNavigate()
  const { data, isError } = useAdminGetOrderDetaiQuery(parseInt(id ?? "0"), { skip: !userId || !id })
  const { data: dataAddresses, error: errorAddresses } = useAdminGetAddressesQuery(parseInt(userId ?? "0"));

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
    if (!userId || !id) navigate("/admin/orders")
  }, [id, navigate, userId])

  useEffect(() => {
    if (!isError) return;
    toast.error("Lỗi tải chi tiết đơn hàng")
  }, [isError])
  useEffect(() => {
    if (!errorAddresses) return;
    toast.error("Lỗi tải địa giả giao hàng khách hàng")
  }, [errorAddresses])

  return (
    <main>
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
          <Popover>
            <PopoverTrigger className={"cursor-pointer"} asChild>
              <Button variant={"outline"} className={" max-sm:size-8"}>
                <span className={'max-sm:hidden'}>More actions</span>
                <EllipsisIcon className={"sm:hidden"} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-auto -translate-1/14 translate-y-2 p-2 text-xs sm:text-sm"}>
              <p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Duplicate</p>
              <p onClick={() => dispatch(showDialog('show-confirm'))} className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer text-red-500"}>Delete order</p>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      <section
        className={"flex justify-between max-sm:flex-wrap max-sm:space-y-2 my-4 space-x-3 items-start"}>
        <div className="rounded-lg shadow-sm shadow-accent-foreground  w-full sm:w-7/10 p-3 bg-white text-xs sm:text-sm text-neutral-600">
          <span className={'text-base'}>Products</span>
          <FilterColumnData sortEnum={ProductSortEnum} placeholderInput={'Search product'} DirectionSortBy={DirectionValues} />
          <DataTable columns={orderItemColumns} data={dataWithHandler} />
        </div>
        <InfoCustomer
          id={data?.data.id ?? 0}
          email={data?.data.email}
          full_name={data?.data.name ?? ""}
          phone={data?.data.phone}
          email_subscribed={""}
          location={data?.data.address_detail ?? ""}
          orders={0}
          amount_spent={0}
          customer_since={1} // thời gian tạo tài khoản cho đến hiện tại
          rfm_group={""}
          address_default={dataAddresses?.data.filter(it => it.active)[0]} //AddressShippingType
          order_list={[]} // OrderManagementType[] //TODO: chỉnh lại
          addresses_shipping={dataAddresses?.data} //AddressShippingType[]
          no_order={0}
        />
      </section>

      <div className="flex items-start max-sm:flex-wrap my-5 sm:space-x-6 max-sm:space-y-4">
        <section className={"rounded-lg shadow-sm shadow-accent-foreground w-full sm:w-7/10 p-3 bg-white text-neutral-600"}>
          <span>Payment</span>
          {!data ? <Skeleton /> : <OrderPaymentInfo {...data.data} />}
        </section>
      </div>
    </main>
  )
}
const DirectionValues: Record<SortDirection, string> = {
  asc: 'Oldest to newest',
  desc: 'Newest to oldest',
}
export default OrderDetailManagementPage