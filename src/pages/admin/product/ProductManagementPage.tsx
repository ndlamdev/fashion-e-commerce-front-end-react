/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:10 AM - 15/06/2025
 *  User: kimin
 **/

import FilterColumnData from "@/components/admin/filterColumnData/FiterColumndata.tsx";
import DataTable from "@/components/dataTable/DataTable.tsx";
import { productColumns } from "@/components/dataTable/dataColumns/product.column.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { ProductSortEnum } from "@/utils/enums/admin/sort/productSort.enum";
import { SortDirection } from "@tanstack/react-table";
import { EllipsisIcon, TagIcon } from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router";

function ProductManagementPage() {
  const navigate = useNavigate();

  const handleWatchDetail = useCallback((id: string) => {
    console.log(id);
  }, [])
  const handleSaveLock = useCallback((id: string) => {
    console.log(id);

  }, [])

  return (
    <main>
      <header className={""}>
        <div className="flex justify-between items-end">
          <p className="flex justify-end items-center space-x-2 text-sm sm:text-lg lg:text-2xl">
            <TagIcon className={'size-4 sm:size-6 lg:size-8'} />
            <span className={"font-bold "}>Sản phẩm</span>
          </p>
          <div className="flex items-center space-x-2 text-center">
            <Popover>
              <PopoverTrigger className={"cursor-pointer visible sm:hidden"} asChild>
                <Button variant={"outline"} className={"cursor-pointer max-sm:size-8"}>
                  <EllipsisIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className={"w-auto text-center -translate-1/14 translate-y-2 p-2 text-sm"}>
                <p className={'p-1 hover:bg-neutral-200 rounded-lg cursor-pointer'}>Nhập</p>
                <p className={'p-1 hover:bg-neutral-200 rounded-lg cursor-pointer'}>Xuất</p>
              </PopoverContent>
            </Popover>
            <Button variant={"outline"} className={"cursor-pointer max-sm:hidden"}>Nhập</Button>
            <Button variant={"outline"} className={"cursor-pointer max-sm:hidden"}>Xuất</Button>
            <Button className={"cursor-pointer text-xs sm:text-md max-sm:h-8"}>Thêm Sản phẩm</Button>
          </div>
        </div>
      </header>
      <section className={"my-5"}>
        <FilterColumnData sortEnum={ProductSortEnum} infoData={'0 sản phẩm'} placeholderInput={'Tìm tên SP'} DirectionSortBy={DirectionValues} />
        <DataTable columns={productColumns(handleWatchDetail, handleSaveLock)} data={[]} />
      </section>
    </main>
  )
}

const DirectionValues: Record<SortDirection, string> = {
  asc: 'Cũ đến mới',
  desc: 'Mới đến cũ',
}
export default ProductManagementPage;
