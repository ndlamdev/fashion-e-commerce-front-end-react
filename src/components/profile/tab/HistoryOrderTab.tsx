import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { ApiPageResponse } from "@/domain/ApiPageResponse.ts";
import { useHistoryOrderQuery } from "@/redux/api/order.api";
import HistoryOrderType from "@/types/historyOrder.type";
import FormatData from "@/utils/helper/format-data.ts";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const demo: ApiPageResponse<HistoryOrderType> = {
	content: [
		{
			id: 1,
			amount: 100000,
			date: [2023, 10, 1, 12, 0],
			status: "Đang xử lý",
		},
		{
			id: 2,
			amount: 200000,
			date: [2023, 10, 2, 14, 30],
			status: "Đã giao hàng",
		},
		{
			id: 3,
			amount: 150000,
			date: [2023, 10, 3, 9, 15],
			status: "Đã hủy",
		},
		{
			id: 4,
			amount: 300000,
			date: [2023, 10, 4, 16, 45],
			status: "Đang giao hàng",
		},
		{
			id: 5,
			amount: 250000,
			date: [2023, 10, 5, 11, 20],
			status: "Đã giao hàng",
		},
		{
			id: 6,
			amount: 180000,
			date: [2023, 10, 6, 13, 0],
			status: "Đang xử lý",
		},
		{
			id: 7,
			amount: 220000,
			date: [2023, 10, 7, 15, 30],
			status: "Đã hủy",
		},
		{
			id: 8,
			amount: 120000,
			date: [2023, 10, 8, 10, 0],
			status: "Đang giao hàng",
		},
		{
			id: 9,
			amount: 140000,
			date: [2023, 10, 9, 17, 15],
			status: "Đã giao hàng",
		},
		{
			id: 10,
			amount: 160000,
			date: [2023, 10, 10, 12, 30],
			status: "Đang xử lý",
		},
		{
			id: 11,
			amount: 190000,
			date: [2023, 10, 11, 14, 45],
			status: "Đã hủy",
		},
		{
			id: 12,
			amount: 210000,
			date: [2023, 10, 12, 9, 0],
			status: "Đang giao hàng",
		},
		{
			id: 13,
			amount: 130000,
			date: [2023, 10, 13, 16, 30],
			status: "Đã giao hàng",
		},
		{
			id: 14,
			amount: 170000,
			date: [2023, 10, 14, 11, 15],
			status: "Đang xử lý",
		},
		{
			id: 15,
			amount: 200000,
			date: [2023, 10, 15, 13, 45],
			status: "Đã hủy",
		},
		{
			id: 16,
			amount: 240000,
			date: [2023, 10, 16, 10, 0],
			status: "Đang giao hàng",
		},
		{
			id: 17,
			amount: 260000,
			date: [2023, 10, 17, 15, 30],
			status: "Đã giao hàng",
		},
		{
			id: 18,
			amount: 280000,
			date: [2023, 10, 18, 12, 15],
			status: "Đang xử lý",
		},
		{
			id: 19,
			amount: 300000,
			date: [2023, 10, 19, 14, 0],
			status: "Đã hủy",
		},
		{
			id: 20,
			amount: 320000,
			date: [2023, 10, 20, 9, 45],
			status: "Đang giao hàng",
		},
		{
			id: 21,
			amount: 340000,
			date: [2023, 10, 21, 16, 30],
			status: "Đã giao hàng",
		},
		{
			id: 22,
			amount: 360000,
			date: [2023, 10, 22, 11, 15],
			status: "Đang xử lý",
		},
		{
			id: 23,
			amount: 380000,
			date: [2023, 10, 23, 13, 0],
			status: "Đã hủy",
		},
		{
			id: 24,
			amount: 400000,
			date: [2023, 10, 24, 10, 30],
			status: "Đang giao hàng",
		},
	],
	totalElements: 24,
	totalPages: 10,
	size: 10,
	number: 0,
	pageable: {
		sort: { sorted: true, unsorted: false, empty: false },
		offset: 0,
		pageNumber: 0,
		pageSize: 10,
		paged: true,
		unpaged: false,
	},
	last: false,
	first: true,
	numberOfElements: 10,
	empty: false,
	sort: {
		sorted: true,
		unsorted: false,
		empty: false,
	},
};

export default function HistoryOrder() {
	const [page, setPage] = useState<number>(0);
	// @ts-expect-error: _data is not defined in the type, but it is used in the component
	const { _data, isLoading } = useHistoryOrderQuery(page);

	return isLoading ? <Skeleton /> : <HistoryOrderTab data={demo} page={page} onPageChange={setPage} />;
}

const HistoryOrderTab = ({ data, onPageChange, page }: { data: ApiPageResponse<HistoryOrderType>; onPageChange: (page: number) => void; page: number }) => {
	return (
		<article className={"max-sm:mt-10"}>
			<h1 className={"text-lg font-bold sm:text-2xl lg:text-4xl"}>Lịch sử đơn hàng</h1>
			<h2 className={"mt-3 text-sm text-neutral-500 sm:text-lg"}>Đơn hàng của bạn</h2>
			{data.content.length > 0 ? (
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
								<TableCell className={"flex items-center justify-end"}>{it.status}</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter className={"sticky bottom-0 block !w-full bg-white"}>
						<TableRow className={"grid w-full grid-cols-4 grid-rows-1 text-xs uppercase sm:text-sm"}>
							<TableCell className={"col-span-4"}>
								<Pagination>
									<PaginationContent>
										<PaginationItem className={"cursor-pointer"}>
											<PaginationPrevious onClick={() => onPageChange(page <= 0 ? 0 : page - 1)} />
										</PaginationItem>
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
