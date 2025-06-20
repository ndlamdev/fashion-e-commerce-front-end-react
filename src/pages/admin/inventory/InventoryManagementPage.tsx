/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:10 AM - 15/06/2025
 *  User: kimin
 **/

import DataTable from "@/components/dataTable/DataTable.tsx";
import { inventoryColumns } from "@/components/dataTable/dataColumns/inventory.column.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { useGetAllInventoryQuery } from "@/redux/api/inventory.api";
import { EllipsisIcon, TagIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import DialogUpdateQuantity from "./dialogs/DialogUpdateQuantity";

function InventoryManagementPage() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.admin.inventory"
	});
  const { data, isError } = useGetAllInventoryQuery();
  const [variantUpdating, setVariantUpdating] = useState<{ id: string, oldQuantity: number } | undefined>();

  const handleWatchDetail = useCallback((id: string) => {
    console.log(id);
  }, [])
  const handleSaveLock = useCallback((id: string) => {
    console.log(id);

  }, [])

  useEffect(() => {
    if (!isError) return;
    toast.error(t('error'));
  }, [isError, t]);

  useEffect(() => {
    document.title = "KimiFashion - "+t('management');
  }, [t]);


  return (
    <>
      <header className={""}>
        <div className="flex justify-between items-end">
          <p className="flex justify-end items-center space-x-2 text-sm sm:text-lg lg:text-2xl">
            <TagIcon className={'size-4 sm:size-6 lg:size-8'} />
            <span className={"font-bold "}>{t('available')}</span>
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
      <main>
        <section className={"my-5"}>
          <DataTable columns={inventoryColumns(handleWatchDetail, handleSaveLock, (id, quantity) => setVariantUpdating({ id, oldQuantity: quantity }))} data={data?.data ?? []} />
        </section>
      </main>
      <DialogUpdateQuantity variantId={variantUpdating?.id} oldQuantity={variantUpdating?.oldQuantity ?? 0} onHidden={() => setVariantUpdating(undefined)} />
    </>
  )
}

export default InventoryManagementPage;
