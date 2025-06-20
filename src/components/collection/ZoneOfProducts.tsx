import { ZoneOfProductsProps } from "@/components/collection/props/zoneOfProducts.props.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import ProductResponseType from "@/domain/response/product.response";
import CardProduct from "@/components/card-product/CardProduct.tsx";
import { memo } from "react";
import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";
import { mockCollectionFilters } from "@/assets/data/collection/collectionFileterProp.data.ts";
import CollectionFilter from "@/components/collection/CollectionFilter.tsx";
import { useSearchParams } from "react-router";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import { DirectionSort, ProductTag } from "@/utils/enums/productTag.enum.ts";

function ZoneOfProducts(props: ZoneOfProductsProps) {
	const filters: CollectionFilterProps = mockCollectionFilters;
	const [searchParams, setSearchParams] = useSearchParams();

	const page = parseInt(searchParams.get("page") ?? "0");
	const goToPage = (page: number) => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		searchParams.set("page", page + "");
		setSearchParams(searchParams);
	};
	const sortSelected = (value: string) => {
		const newParams = new URLSearchParams(searchParams); // Clone lại params hiện tại
		const [tag, direction] = value.split(",");
		newParams.set("tag", tag);
		newParams.set("direction", direction);
		setSearchParams(newParams);
	};
	return (
		<article className={"w-full px-2"}>
			<section className='flex items-center justify-between text-xs lg:text-sm'>
				<div className='flex items-center space-x-2'>
					<p className='font-bold'>
						<span className='mx-1'>{props.page?.numberOfElements ?? 0}</span> kết quả
					</p>
					<div className='flex items-center space-x-2 max-sm:hidden'>
						{/*{filterItems.map((item) => (*/}
						{/*	<FilterItem*/}
						{/*		onDelete={() =>*/}
						{/*			dispatch({*/}
						{/*				type: "deleted",*/}
						{/*				payload: { id: item.id, name: "" },*/}
						{/*			})*/}
						{/*		}*/}
						{/*		{...item}*/}
						{/*		key={item.id}*/}
						{/*	/>*/}
						{/*))}*/}
						{/*{filterItems.length > 0 && (*/}
						{/*	<span*/}
						{/*		onClick={() => dispatch({ type: "clear", payload: { id: 0, name: "" } })}*/}
						{/*		className={"cursor-pointer text-sm text-blue-700 hover:underline"}>*/}
						{/*		Xóa lọc*/}
						{/*	</span>*/}
						{/*)}*/}
					</div>
				</div>
				<div className='flex items-center space-x-2 text-gray-500 max-sm:hidden'>
					<span className='uppercase'>Sắp xếp theo</span>
					<Select defaultValue={searchParams.get("sort") ?? undefined} onValueChange={sortSelected}>
						<SelectTrigger className='w-50 rounded-full bg-neutral-100'>
							<SelectValue placeholder='Mặc định' />
						</SelectTrigger>
						<SelectContent className={"text-gray-500"}>
							<SelectItem value={ProductTag.NEW + "," + DirectionSort.ASC}>Mới nhất</SelectItem>
							<SelectItem value={ProductTag.BEST_SELLER + "," + DirectionSort.ASC}>Bán chạy</SelectItem>
							<SelectItem value={"REGULAR_PRICE," + DirectionSort.ASC}>Giá thấp đến cao</SelectItem>
							<SelectItem value={"REGULAR_PRICE," + DirectionSort.DESC}>Giá cao đến thấp</SelectItem>
							<SelectItem value={ProductTag.CLEARANCE_SALE + "," + DirectionSort.ASC}>%Giảm giá nhiều</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className='hidden max-sm:block'>
					<CollectionFilter {...filters} />
				</div>
			</section>

			<section className='flex flex-wrap border-b-1 border-gray-300 py-15'>
				{props.page?.content ? (
					props.page?.content.map((item: ProductResponseType) => (
						<CardProduct className={"h-auto w-[30vw] basis-1/2 sm:w-full lg:h-100 lg:basis-1/3 xl:basis-1/4"} {...item} key={item.id} />
					))
				) : (
					<span className={"italic"}>Không có kết quả cho sản phẩm bạn tìm kiếm</span>
				)}
			</section>
			{props.page && props.page?.totalElements > 12 && (
				<section className='placoe-content-center my-5 text-center'>
					<Pagination>
						<PaginationContent>
							<PaginationItem className={"cursor-pointer"}>
								<PaginationPrevious onClick={() => goToPage(page <= 0 ? 0 : page - 1)} />
							</PaginationItem>
							<PaginationItem className={"cursor-pointer"}>
								<PaginationLink onClick={() => goToPage(page <= 0 ? 0 : page)}>{page}</PaginationLink>
							</PaginationItem>
							{page < props.page.totalPages - 1 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
							{page < props.page.totalPages - 1 && (
								<PaginationItem className={"cursor-pointer"}>
									<PaginationNext onClick={() => goToPage(page + 1)} />
								</PaginationItem>
							)}
						</PaginationContent>
					</Pagination>
					<p className='my-4 text-sm text-neutral-500'>
						Hiện {props.page.pageable.offset + 1} - {props.page.pageable.offset + props.page.numberOfElements} trên tổng số {props.page.totalElements} sản phẩm
					</p>
				</section>
			)}
		</article>
	);
}

export default memo(ZoneOfProducts);
