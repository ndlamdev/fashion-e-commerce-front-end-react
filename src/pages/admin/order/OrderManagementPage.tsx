import DataTable from "@/components/dataTable/DataTable.tsx";
import { columns } from "@/components/dataTable/dataColumns/order.column.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAdminOrderHistoriesQuery } from "@/redux/api/order.api";
import { InboxIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function OrderManagementPage() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.admin.orders"
	});
  const navigate = useNavigate();
  const { data, error } = useAdminOrderHistoriesQuery()
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
    if (!error) return;
    toast.error(t('error'))
  }, [error])

 useEffect(() => {
    document.title = "KimiFashion - "+t('management');
  }, []);

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
      <DataTable columns={columns(handleWatchDetail, handleDelete)} data={data?.data ?? []} />
    </main>
  )
}
