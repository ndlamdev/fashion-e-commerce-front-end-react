/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:10 AM - 15/06/2025
 *  User: kimin
 **/

import DataTable from "@/components/dataTable/DataTable.tsx";
import { mediaColumns } from "@/components/dataTable/dataColumns/media.column.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { useGetAllMediaQuery } from "@/redux/api/media.api";
import { EllipsisIcon, FolderIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

function MediaManagementPage() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.admin.media"
	});
  const { data, isError } = useGetAllMediaQuery();

  const handleWatchDetail = useCallback((id: string) => {
    console.log(id);
  }, [])
  const handleSaveLock = useCallback((id: string) => {
    console.log(id);
  }, [])

  useEffect(() => {
    if (!isError) return;
    toast.error(t('error'));
  }, [isError]);

  useEffect(() => {
    document.title = "KimiFashion - "+t('management');
    const html = document.getElementsByTagName("html")[0];
    html.style.overflowY = "hidden";
    return () => {
      html.style.overflowY = "";
    }
  }, []);


  return (
    <main>
      <header className={""}>
        <div className="flex justify-between items-end">
          <p className="flex justify-end items-center space-x-2 text-sm sm:text-lg lg:text-2xl">
            <FolderIcon className={'size-4 sm:size-6 lg:size-8'} />
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
      <section className={"my-5"}>
        <DataTable columns={mediaColumns(handleWatchDetail, handleSaveLock)} data={data?.data ?? []} />
      </section>
    </main>
  )
}

export default MediaManagementPage;
