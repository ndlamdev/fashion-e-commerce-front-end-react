import { ZoneOfProductsProps } from "@/components/collection/props/zoneOfProducts.props.ts";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import ProductType from "@/types/product/product.type.ts";
import CardProduct from "@/components/card-product/CardProduct.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useReducer } from "react";
import FilterItem, { FilterReducer } from "@/components/collection/FilterItem.tsx";
import { filterItemInitial } from "@/assets/data/collection/filterItem.data.ts";
import { FilterProps } from "@/components/collection/props/filter.props.ts";
import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";
import { mockCollectionFilters } from "@/assets/data/collection/collectionFileterProp.data.ts";
import CollectionFilter from "@/components/collection/CollectionFilter.tsx";

export default function ZoneOfProducts(props: ZoneOfProductsProps) {
  const filters: CollectionFilterProps = mockCollectionFilters;
  const [filterItems, dispatch] = useReducer(FilterReducer, filterItemInitial);

  const handleDeleteFilterItem = (item: FilterProps) => {
    dispatch({
      type: "deleted",
      payload: {id: item.id, name: item.name},
    });
    console.log(filterItemInitial);
  };
  return (
    <div className={"w-full px-2 "}>
      <Breadcrumb className={'text-xs lg:text-sm'}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/collection/">level 1</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="uppercase my-3 font-bold lg:text-2xl">{props.currentCategory}</p>
      <div className="border-1 my-4 border-gray-300" />

      <div className="flex items-center justify-between lg:text-sm text-xs">
        <div className=" flex items-center space-x-2">
          <p className="font-bold"><span className="mx-1">{props.TotalProducts ?? "0"}</span> kết quả</p>
          <div className="max-sm:hidden  flex items-center space-x-2">
            {filterItems.map((item) => (<FilterItem onDelete={() => handleDeleteFilterItem(item)} {...item} key={item.id} />))}
          </div>
        </div>
        <div className="max-sm:hidden flex items-center space-x-2 text-gray-500">
          <span className="uppercase">Sắp xếp theo</span>
          <Select>
            <SelectTrigger className="w-50 rounded-full bg-neutral-100 ">
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
      </div>

      <div className="flex flex-wrap my-4 border-b-1 border-gray-300">
        {props.showProducts &&
          props.showProducts.map((item: ProductType) => (
            <CardProduct className={"xl:basis-1/4 lg:basis-1/3 basis-1/2 w-[30vw] sm:w-full h-auto lg:h-100"} {...item} key={item.id} />
          ))
        }
      </div>
      <div className="my-5 text-center place-content-center">
        <Button className={"p-6 rounded-full bg-black text-white uppercase font-bold hover:bg-gray-300 hover:text-black cursor-pointer"}>
          Xem Thêm
        </Button>
        <p className="text-sm my-4 text-neutral-500">Hiện thị 1 - {props.showProducts?.length} trên tổng số {props.TotalProducts} sản phẩm</p>
      </div>
    </div>
  );
}