import DataTable from "@/components/dataTable/DataTable.tsx";
import { columns } from "@/components/dataTable/dataColumns/order.column.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAdminOrderHistoriesQuery, useAdminOrderAbandonedCheckoutHistoriesQuery } from "@/redux/api/order.api";
import { InboxIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import HistoryOrderType from "@/types/historyOrder.type";

export default function OrderManagementPage({ abandonedCheckout }: { abandonedCheckout?: boolean }) {
  const { t } = useTranslation(undefined, {
    keyPrefix: "page.admin.orders"
  });
  const navigate = useNavigate();
  const { data: orderHistories, isError: isErrorOrderHistories } = useAdminOrderHistoriesQuery(undefined, { skip: abandonedCheckout })
  const { data: abandonedCheckoutHistories, isError: isErrorAbandonedCheckoutHistories } = useAdminOrderAbandonedCheckoutHistoriesQuery(undefined, { skip: !abandonedCheckout })
  const [data, setData] = useState<HistoryOrderType[]>([]);
  const handleWatchDetail = useCallback((userId: number, orderId: number) => {
    navigate(`/admin/orders/${orderId}`, {
      state: {
        userId: userId
      }
    });
  }, [navigate])
  const handleDelete = useCallback((orderId: number) => {
    //TODO: implement delete here
    console.log(orderId);
  }, [])

  useEffect(() => {
    if (!isErrorOrderHistories && !isErrorAbandonedCheckoutHistories) return;
    toast.error(t('error'))
  }, [isErrorOrderHistories, isErrorAbandonedCheckoutHistories, t])

  useEffect(() => {
    document.title = "KimiFashion - " + t('management');
  }, [t]);

  useEffect(() => {
    setData(orderHistories?.data ?? (abandonedCheckoutHistories?.data ?? []));
  }, [orderHistories, abandonedCheckoutHistories]);

  return (
    <main>
      <header className={"my-3"}>
        <div className="flex justify-between items-end">
          <p className="flex justify-end items-center space-x-2 text-sm sm:text-lg lg:text-2xl">
            <InboxIcon className={'size-4 sm:size-6 lg:size-8'} />
            <span className={"font-bold "}>{t('order')}</span>
          </p>
          <div className="flex items-center space-x-2 text-center">
            <Button variant={"outline"} className={"cursor-pointer text-xs sm:text-md max-sm:h-8"}>{t('export')}</Button>
            <Button className={"cursor-pointer text-xs sm:text-md max-sm:h-8"}>{t('add')}</Button>
          </div>
        </div>
      </header>
      <DataTable columns={columns(handleWatchDetail, handleDelete)} data={data} />
    </main>
  )
}
