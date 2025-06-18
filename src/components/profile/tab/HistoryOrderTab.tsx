import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { ApiPageResponse } from "@/domain/ApiPageResponse.ts";
import { useHistoryOrderQuery } from "@/redux/api/order.api";
import HistoryOrderType from "@/types/historyOrder.type";
import FormatData from "@/utils/helper/format-data.ts";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { OrderStatusColors } from "@/utils/enums/orderStatus.enum";

export default function HistoryOrder() {
  const [page, setPage] = useState<number>(0);
  const { data, isLoading, isError } = useHistoryOrderQuery(page);

  useEffect(() => {
    if (!isError) return
    toast.error("Lỗi hệ thống!");
  }, [isError])

  useEffect(() => {
    document.title = "KimiFashion - Lịch sử đơn hàng";
  }, []);

  return isLoading ? <Skeleton /> : <HistoryOrderTab data={data?.data} page={page} onPageChange={setPage} />;
}

const HistoryOrderTab = ({ data, onPageChange, page }: { data?: ApiPageResponse<HistoryOrderType>; onPageChange: (page: number) => void; page: number }) => {
  return (
    <article className={"max-sm:mt-10"}>
      <h1 className={"text-lg font-bold sm:text-2xl lg:text-4xl"}>Lịch sử đơn hàng</h1>
      <h2 className={"mt-3 text-sm text-neutral-500 sm:text-lg"}>Đơn hàng của bạn</h2>
      {data && data.content.length > 0 ? (
        <Table className={"relative block"}>
          <TableHeader className={"sticky top-0 block !w-full bg-white"}>
            <TableRow className={"grid w-full grid-cols-4 grid-rows-1 text-xs uppercase sm:text-sm"}>
              <TableHead className={"flex items-center justify-start pl-5 font-bold"}>ID</TableHead>
              <TableHead className={"flex items-center justify-center font-bold"}>Tổng tiền</TableHead>
              <TableHead className={"flex items-center justify-center font-bold"}>Ngày đặt</TableHead>
              <TableHead className={"flex items-center justify-end font-bold"}>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={"block !w-full"}>
            {data.content.slice(0, 10).map((it) => (
              <TableRow className={"grid w-full grid-cols-4 grid-rows-1 text-xs uppercase sm:text-sm"} key={`order_${it.id}`}>
                <TableCell className={"flex items-center justify-start pl-5 font-bold text-blue-700"}>#{it.id}</TableCell>
                <TableCell className={"flex items-center justify-center"}>{FormatData.formatCurrency(it.amount)}</TableCell>
                <TableCell className={"flex items-center justify-center"}>{FormatData.formatDateTimeFromArray(it.date)}</TableCell>
                <TableCell className={"flex items-center justify-end"}>
                  <Badge variant={OrderStatusColors[it.status]}>{it.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className={"sticky bottom-0 block !w-full bg-white"}>
            <TableRow className={"grid w-full grid-cols-4 grid-rows-1 text-xs uppercase sm:text-sm"}>
              <TableCell className={"col-span-4"}>
                <Pagination>
                  <PaginationContent>
                    {page > 0 && (
                      <PaginationItem className={"cursor-pointer"}>
                        <PaginationPrevious onClick={() => onPageChange(page <= 0 ? 0 : page - 1)} />
                      </PaginationItem>
                    )}
                    <PaginationItem className={"cursor-pointer"}>
                      <PaginationLink onClick={() => onPageChange(page <= 0 ? 0 : page)}>{page + 1}</PaginationLink>
                    </PaginationItem>
                    {page < data.totalPages - 1 && (
                      <PaginationItem className={"cursor-pointer"}>
                        <PaginationNext onClick={() => onPageChange(page + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
                <p className='my-4 text-right text-sm text-neutral-500'>
                  Hiện {data.pageable.offset + 1} - {data.pageable.offset + data.numberOfElements} trên tổng số {data.totalElements} đơn hàng
                </p>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <p className='text-center text-xs text-neutral-500 italic sm:text-base'>Bạn chưa có đơn hàng nào mua tại website</p>
      )}
    </article>
  );
};
