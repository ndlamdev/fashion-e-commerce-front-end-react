import { ZoneOfProductsProps } from "@/components/collection/props/zoneOfProducts.props.ts";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import ProductResponseType from "@/types/product/productResponse.type.ts";
import CardProduct from "@/components/card-product/CardProduct.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useReducer } from "react";
import FilterItem, { FilterReducer } from "@/components/collection/FilterItem.tsx";
import { filterItemInitial } from "@/assets/data/collection/filterItem.data.ts";
import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";
import { mockCollectionFilters } from "@/assets/data/collection/collectionFileterProp.data.ts";
import CollectionFilter from "@/components/collection/CollectionFilter.tsx";

export default function ZoneOfProducts(props: ZoneOfProductsProps) {
	const filters: CollectionFilterProps = mockCollectionFilters;
	const [filterItems, dispatch] = useReducer(FilterReducer, filterItemInitial);

	return (
		<div className={"w-full px-2"}>
			<Breadcrumb className={"text-xs lg:text-sm"}>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Trang chủ</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href='/collection/'>level 1</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<p className='my-3 font-bold uppercase lg:text-2xl'>{props.currentCategory}</p>
			<div className='my-4 border-1 border-gray-300' />

			<div className='flex items-center justify-between text-xs lg:text-sm'>
				<div className='flex items-center space-x-2'>
					<p className='font-bold'>
						<span className='mx-1'>{props.TotalProducts ?? "0"}</span> kết quả
					</p>
					<div className='flex items-center space-x-2 max-sm:hidden'>
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
				<div className='flex items-center space-x-2 text-gray-500 max-sm:hidden'>
					<span className='uppercase'>Sắp xếp theo</span>
					<Select>
						<SelectTrigger className='w-50 rounded-full bg-neutral-100'>
							<SelectValue placeholder='Mặc định' />
						</SelectTrigger>
						<SelectContent className={"text-gray-500"}>
							<SelectItem value='new'>Mới nhất</SelectItem>
							<SelectItem value='hot'>Bán chạy</SelectItem>
							<SelectItem value='z2a'>Giá thấp đến cao</SelectItem>
							<SelectItem value='a2z'>Giá cao đến thấp</SelectItem>
							<SelectItem value='height-discount'>%Giảm giá nhiều</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className='hidden max-sm:block'>
					<CollectionFilter {...filters} />
				</div>
			</div>

			<div className='my-4 flex flex-wrap border-b-1 border-gray-300'>
				{props.showProducts &&
					props.showProducts.map((item: ProductResponseType) => (
						<CardProduct className={"h-auto w-[30vw] basis-1/2 sm:w-full lg:h-100 lg:basis-1/3 xl:basis-1/4"} {...item} key={item.id} />
					))}
			</div>
			<div className='my-5 place-content-center text-center'>
				<Button className={"cursor-pointer rounded-full bg-black p-6 font-bold text-white uppercase hover:bg-gray-300 hover:text-black"}>Xem Thêm</Button>
				<p className='my-4 text-sm text-neutral-500'>
					Hiện thị 1 - {props.showProducts?.length} trên tổng số {props.TotalProducts} sản phẩm
				</p>
			</div>
		</div>
	);
}
