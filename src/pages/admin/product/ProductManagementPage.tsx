/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:10 AM - 15/06/2025
 *  User: kimin
 **/

import DataTable from "@/components/dataTable/DataTable.tsx";
import { productColumns } from "@/components/dataTable/dataColumns/product.column.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { useGetAllProductQuery } from "@/redux/api/product.api";
import { EllipsisIcon, TagIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

function ProductManagementPage() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.admin.products"
	});
  const navigate = useNavigate();
  const { data, isError } = useGetAllProductQuery();

  const handleWatchDetail = useCallback((id: string) => {
    console.log(id);
  }, [])
  const handleSaveLock = useCallback((id: string) => {
    console.log(id);

  }, [])

  useEffect(() => {
    if (!isError) return;
    toast.error(t('error_loading_product'));
  }, [isError]);

   useEffect(() => {
    document.title = "KimiFashion - "+t('management');
  }, []);

  return (
    <main>
      <header className={""}>
        <div className="flex justify-between items-end">
          <p className="flex justify-end items-center space-x-2 text-sm sm:text-lg lg:text-2xl">
            <TagIcon className={'size-4 sm:size-6 lg:size-8'} />
            <span className={"font-bold "}>{t('product')}</span>
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
            <Button
              className={"cursor-pointer text-xs sm:text-md max-sm:h-8"}
              onClick={() => {
                navigate("/admin/product/create");
              }}
            >{t('add_product')}</Button>
          </div>
        </div>
      </header>
      <section className={"my-5"}>
        <DataTable
          columns={productColumns(handleWatchDetail, handleSaveLock)}
          data={data?.data ?? []} />
      </section>
    </main>
  )
}

export default ProductManagementPage;
