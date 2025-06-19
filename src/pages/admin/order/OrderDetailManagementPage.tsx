import InfoCustomer from "@/components/admin/customer/InfoCustomer.tsx";
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
import { useAdminGetOrderDetaiQuery } from "@/redux/api/order.api";
import { showDialog } from "@/redux/slice/dialog.slice.ts";
import { AddressShippingType } from "@/types/profile/address.type";
import { EllipsisIcon, InboxIcon } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
const OrderDetailManagementPage = () => {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.admin.orders"
	});
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate()
  const { data, isError } = useAdminGetOrderDetaiQuery(parseInt(id ?? "0"), { skip: !id })

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
    toast.error(t('error_detail_order'))
  }, [isError])

  useEffect(() => {
    document.title = "KimiFashion - "+t('management');
  }, []);

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
                <span className={'max-sm:hidden'}>{t('more_actions')}</span>
                <EllipsisIcon className={"sm:hidden"} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-auto -translate-1/14 translate-y-2 p-2 text-xs sm:text-sm"}>
              <p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>{t('more_actions')}</p>
              <p onClick={() => dispatch(showDialog('show-confirm'))} className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer text-red-500"}>{t('delete')}</p>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      <section
        className={"flex justify-between max-sm:flex-wrap max-sm:space-y-2 my-4 space-x-3 items-start"}>
        <div className="rounded-lg shadow-sm shadow-accent-foreground  w-full sm:w-7/10 p-3 bg-white text-xs sm:text-sm text-neutral-600">
          <span className={'text-base'}>{t('product')}</span>
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
            district_id: "",
            ward: data?.data.ward,
            ward_id: "",
          } as AddressShippingType} //AddressShippingType
          order_list={[]} // OrderManagementType[] //TODO: chỉnh lại
          addresses_shipping={[]} //AddressShippingType[]
          hidden_no_order={true}
        />
      </section>

      <div className="flex items-start max-sm:flex-wrap my-5 sm:space-x-6 max-sm:space-y-4">
        <section className={"rounded-lg shadow-sm shadow-accent-foreground w-full sm:w-7/10 p-3 bg-white text-neutral-600"}>
          <span>{t('payment')}</span>
          {!data ? <Skeleton /> : <OrderPaymentInfo {...data.data} />}
        </section>
      </div>
    </main>
  )
}

export default OrderDetailManagementPage