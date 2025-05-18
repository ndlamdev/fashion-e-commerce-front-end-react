import { ZoneOfProductsProps } from "@/components/collection/props/zoneOfProducts.props.ts";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import ProductResponseType from "@/types/product/productResponse.type.ts";
import CardProduct from "@/components/card-product/CardProduct.tsx";
import { memo, useReducer, useState } from "react";
import FilterItem, { FilterReducer } from "@/components/collection/FilterItem.tsx";
import { filterItemInitial } from "@/assets/data/collection/filterItem.data.ts";
import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";
import { mockCollectionFilters } from "@/assets/data/collection/collectionFileterProp.data.ts";
import CollectionFilter from "@/components/collection/CollectionFilter.tsx";
import { useNavigate, useSearchParams } from "react-router";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination.tsx";

function ZoneOfProducts(props: ZoneOfProductsProps) {
	const filters: CollectionFilterProps = mockCollectionFilters;
	const [filterItems, dispatch] = useReducer(FilterReducer, filterItemInitial);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams()
	const [numPage, setNumPage] = useState<number>(parseInt(searchParams.get('page') ?? '0'));
	return (
		<article className={"w-full px-2"}>
			<Breadcrumb className={"text-xs lg:text-sm"}>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink
							className={"cursor-pointer"}
							onClick={() => navigate(`/collection?type=${props.collection?.type}`, {})}>{props.collection?.type}</BreadcrumbLink>
					</BreadcrumbItem>
					{props.collection?.id && <BreadcrumbSeparator />}
					{props.collection?.id && (
						<BreadcrumbItem>
							<BreadcrumbLink>{props.collection?.title}</BreadcrumbLink>
						</BreadcrumbItem>)}
				</BreadcrumbList>
			</Breadcrumb>
			<p className="my-3 font-bold uppercase lg:text-2xl">{props.collection?.title}</p>
			<div className="my-4 border-1 border-gray-300" />

			<section className="flex items-center justify-between text-xs lg:text-sm">
				<div className="flex items-center space-x-2">
					<p className="font-bold">
						<span className="mx-1">{props.page?.numberOfElements ?? 0}</span> kết quả
					</p>
					<div className="flex items-center space-x-2 max-sm:hidden">
						{filterItems.map((item) => (
							<FilterItem
								onDelete={() =>
									dispatch({
										type: "deleted",
										payload: { id: item.id, name: "" },
									})
								}
								{...item}
								key={item.id}
							/>
						))}
						{filterItems.length > 0 && (
							<span
								onClick={() => dispatch({ type: "clear", payload: { id: 0, name: "" } })}
								className={"cursor-pointer text-sm text-blue-700 hover:underline"}>
								Xóa lọc
							</span>
						)}
					</div>
				</div>
				<div className="flex items-center space-x-2 text-gray-500 max-sm:hidden">
					<span className="uppercase">Sắp xếp theo</span>
					<Select>
						<SelectTrigger className="w-50 rounded-full bg-neutral-100">
							<SelectValue placeholder="Mặc định" />
						</SelectTrigger>
						<SelectContent className={"text-gray-500"}>
							<SelectItem value="new">Mới nhất</SelectItem>
							<SelectItem value="hot">Bán chạy</SelectItem>
							<SelectItem value="z2a">Giá thấp đến cao</SelectItem>
							<SelectItem value="a2z">Giá cao đến thấp</SelectItem>
							<SelectItem value="height-discount">%Giảm giá nhiều</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="hidden max-sm:block">
					<CollectionFilter {...filters} />
				</div>
			</section>

			<section className="my-4 flex flex-wrap border-b-1 border-gray-300">
				{props.page?.content ?
					props.page?.content.map((item: ProductResponseType) => (
						<CardProduct className={"h-auto w-[30vw] basis-1/2 sm:w-full lg:h-100 lg:basis-1/3 xl:basis-1/4"} {...item}
												 key={item.id} />
					)) :
					<span className={"italic"}>Không có kết quả cho sản phẩm bạn tìm kiếm</span>
				}
			</section>
			{props.page && <section className="my-5 place-content-center text-center">
				{(props?.page.totalElements > 8) &&
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious onClick={() => setNumPage(numPage <= 0 ? 0 : numPage - 1)}
																		href={props.collection.id ? `/collection?cid=${props.collection.id}&type=${props.collection.type}&page=${numPage <= 0 ? 0 : numPage}` : `/collection?type=${props.collection.type}&page=${numPage <= 0 ? 0 : numPage}`} />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									href={props.collection.id ? `/collection?cid=${props.collection.id}&type=${props.collection.type}&page=${numPage > 1 ? numPage: 1}` : `/collection?type=${props.collection.type}&page=${numPage}`}
								>{numPage}</PaginationLink>
							</PaginationItem>
							{numPage < props.page.totalPages &&
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>}
							<PaginationItem>
								<PaginationNext onClick={() => props.page?.totalPages && setNumPage(numPage < props.page?.totalPages ? numPage + 1 : props.page?.totalPages)}
																href={props.collection.id ? `/collection?cid=${props.collection.id}&type=${props.collection.type}&page=${numPage < props.page?.totalPages ? numPage : props.page?.totalPages}` : `/collection?type=${props.collection.type}&page=${numPage < props.page?.totalPages ? numPage : props.page?.totalPages}`} />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				}
				<p className="my-4 text-sm text-neutral-500">
					Hiện {(props.page?.numberOfElements * props.page.pageable.pageNumber) + 1} -  {props.page?.numberOfElements * (props.page.pageable.pageNumber + 1)} trên tổng số {props.page.totalElements} sản phẩm
				</p>
			</section>}
		</article>
	);
}


export default memo(ZoneOfProducts);
