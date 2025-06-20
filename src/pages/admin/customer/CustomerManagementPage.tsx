import DataTable from "@/components/dataTable/DataTable.tsx";
import { customerColumns } from "@/components/dataTable/dataColumns/customer.column.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { useAdminGetProfilesQuery } from "@/redux/api/profile.api";
import { EllipsisIcon, UserRoundIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { CustomerColumnProp } from "@/components/dataTable/props/customerColumn.prop.ts";
import { useTranslation } from "react-i18next";


export function CustomerManagementPage() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.admin.customers"
	});
  const { data, isError } = useAdminGetProfilesQuery()
  const navigate = useNavigate();
  const handleWatchDetail = useCallback((id: number) => {
    navigate(`/admin/customers/${id}`);
  }, [navigate])
  const handleSaveLock = useCallback((id: number) => {
    //TODO: implement lock or open lock here
    console.log(id);
  }, [])

  useEffect(() => {
    if (!isError) return;
    toast.error(t('error_loading_list'))
  }, [isError, t])

  useEffect(() => {
    document.title = "KimiFashion - " + t('management');
  }, [t]);

  return (
    <main>
      <header className={""}>
        <div className="flex justify-between items-end">
          <p className="flex justify-end items-center space-x-2 text-sm sm:text-lg lg:text-2xl">
            <UserRoundIcon className={'size-4 sm:size-6 lg:size-8'} />
            <span className={"font-bold "}>{t('customer')}</span>
          </p>
          <div className="flex items-center space-x-2 text-center">
            <Popover>
              <PopoverTrigger className={"cursor-pointer visible sm:hidden"} asChild>
                <Button variant={"outline"} className={"cursor-pointer max-sm:size-8"}>
                  <EllipsisIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className={"w-auto text-center -translate-1/14 translate-y-2 p-2 text-sm"}>
                <p className={'p-1 hover:bg-neutral-200 rounded-lg cursor-pointer'}>{t('import')}</p>
                <p className={'p-1 hover:bg-neutral-200 rounded-lg cursor-pointer'}>{t('export')}</p>
              </PopoverContent>
            </Popover>
            <Button variant={"outline"} className={"cursor-pointer max-sm:hidden"}>{t('import')}</Button>
            <Button variant={"outline"} className={"cursor-pointer max-sm:hidden"}>{t('export')}</Button>
            <Button className={"cursor-pointer text-xs sm:text-md max-sm:h-8"}>{t('add')}</Button>
          </div>
        </div>
      </header>
      <section className={"my-5"}>
        <DataTable columns={customerColumns(handleWatchDetail, handleSaveLock)}
          data={data?.data.map(it => ({
            id: it.user_id,
            name: it.full_name,
            create_at: it.create_at,
            email: it.email,
            no_orders: it.total_orders,
            amount_spent: it.total_spent,
            is_locked: it.lock,
          } as CustomerColumnProp)) ?? []} />
      </section>
    </main>
  );
}