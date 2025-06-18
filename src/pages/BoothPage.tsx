import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";
import { mockCollectionFilters } from "@/assets/data/collection/collectionFileterProp.data.ts";
import CollectionFilter from "@/components/collection/CollectionFilter.tsx";
import ZoneOfProducts from "@/components/collection/ZoneOfProducts.tsx";
import CategoryDescription from "@/components/collection/CategoryDescription.tsx";
import { categoryDescriptionSamples } from "@/assets/data/collection/categoryDescription.data.ts";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import RecentActivity from "@/components/collection/RecentActivity.tsx";
import { useSearchByImageMutation, useSearchByTextQuery } from "@/redux/api/product.api";
import { useGetProductByCollectionIdQuery, useGetProductByCollectionTypeQuery } from "@/services/collection.service.ts";
import ProductResponseType from "@/domain/response/product.response";
import { ApiPageResponse } from "@/domain/ApiPageResponse.ts";
import { CollectionValue } from "@/utils/enums/collection.enum.ts";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb.tsx";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderIcon } from "lucide-react";

export default function BoothPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryObj = Object.fromEntries(searchParams.entries()); // get all key-value
  const location = useLocation();
  const { file, prompt, name, type } = location.state || {
    file: undefined,
    prompt: undefined,
    name: undefined,
    type: undefined,
  };
  const [title, setTitle] = useState<{
    name?: string;
    prompt?: string;
    fileName?: string | undefined;
    type?: string | undefined;
  }>();
  const [data, setData] = useState<ApiPageResponse<ProductResponseType> | undefined>();
  const filters: CollectionFilterProps = mockCollectionFilters;
  const sportDescriptions = categoryDescriptionSamples;
  const [requestImageSearch, { isLoading: isLoadingImageSearch, isError: isErrorImageSearch, data: dataImageSearch }] = useSearchByImageMutation();

  const {
    data: productsOfCollectionId,
    isLoading: isLoadingPOCI,
    isError: isErrorPOCI,
    isFetching: isFetchingPOCI,
  } = useGetProductByCollectionIdQuery(
    {
      ...queryObj,
      sizes: searchParams.getAll("sizes"),
    },
    { skip: !queryObj["cid"] },
  );

  const {
    data: productsOfType,
    isLoading: isLoadingPOT,
    isError: isErrorPOOT,
    isFetching: isFetchingPOT,
  } = useGetProductByCollectionTypeQuery(
    {
      ...queryObj,
      sizes: searchParams.getAll("sizes"),
    },
    { skip: !!queryObj["cid"] || !queryObj["type"] },
  );

  // const {
  // 	data: dataVoiceSearch,
  // 	isLoading: isLoadingVoiceSearch,
  // 	isError: isErrorVoiceSearch,
  // } = useVoiceSearchQuery(prompt, { skip: !prompt });
  const {
    data: dataSearchByText,
    isLoading: isLoadingSearchByText,
    isError: isErrorSearchByText,
    isFetching: isFetchingSearchByText,
  } = useSearchByTextQuery(
    {
      ...queryObj,
      title: queryObj["prompt"]?.replace("+", " ") ?? prompt,
      sizes: searchParams.getAll("sizes"),
    },
    { skip: !prompt && !queryObj["prompt"] },
  );

  useEffect(() => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    requestImageSearch(formData)
      .unwrap()
      .then((res) => {
        if (res.code >= 400) return;
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setData(undefined);
      });
  }, [dataImageSearch, file, requestImageSearch]);

  useEffect(() => {
    if (!prompt && !queryObj["prompt"]) return;
    setData(dataSearchByText?.data);
  }, [prompt, dataSearchByText, queryObj]);

  useEffect(() => {
    if (!queryObj["cid"]) return;
    setData(productsOfCollectionId?.data);
  }, [productsOfCollectionId?.data, queryObj]);

  useEffect(() => {
    if (queryObj["cid"] || !queryObj["type"]) return;
    setData(productsOfType?.data);
  }, [productsOfType?.data, queryObj]);

  useEffect(() => {
    if (name) {
      setTitle({ name: name });
      return;
    }
    if (prompt) {
      setSearchParams({ prompt: prompt });
      setTitle({ prompt: prompt });
      return;
    }
    if (file) {
      setTitle({ fileName: file.name });
      return;
    }
    if (type) {
      setTitle({ type: type });
      return;
    }
  }, [name, prompt, file, type, setSearchParams, navigate]);

  useEffect(() => {
    document.title = "KimiFashion - Gian hàng";
  }, []);


  return (
    <main>
      <div className='p-3 sm:flex'>
        <div className='hidden sm:block sm:w-1/4'>
          <CollectionFilter {...filters} />
        </div>
        <div className='sm:w-3/4'>
          <Breadcrumb className={"text-xs lg:text-sm"}>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/'>Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className={"cursor-pointer"}
                  onClick={() => {
                    navigate(`/collection?type=${queryObj["type"]}`);
                    setTitle({ type: queryObj["type"] });
                  }}>
                  {CollectionValue[queryObj["type"]] ?? type}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {title?.name && <BreadcrumbSeparator />}
              {title?.name && (
                <BreadcrumbItem>
                  <BreadcrumbLink>{title.name}</BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>

          {(title?.name || title?.type) && <p className='my-3 font-bold uppercase lg:text-2xl'>{title.name ?? title.type}</p>}
          {title?.prompt && <p className='my-3 font-bold uppercase lg:text-2xl'>Tìm kiếm: {title?.prompt}</p>}
          {title?.fileName && <p className='my-3 font-bold uppercase lg:text-2xl'>Tìm kiếm: {title?.fileName}</p>}
          <div className='my-4 border-1 border-gray-300' />
          {/*<ScrollArea className={"h-dvh"}>*/}
          {isLoadingPOCI ||
            isLoadingPOT ||
            isLoadingImageSearch ||
            isLoadingSearchByText ||
            isErrorSearchByText ||
            isErrorImageSearch ||
            isErrorPOCI ||
            isErrorPOOT ||
            isFetchingPOT ||
            isFetchingSearchByText ||
            isFetchingPOT ||
            isFetchingPOCI ? (
            <Skeleton className={"h-screen w-full place-content-center place-items-center items-center"}>
              <LoaderIcon className={"size-10 text-gray-600"} />
            </Skeleton>
          ) : (
            data && <ZoneOfProducts page={data} />
          )}
          {/*</ScrollArea>*/}
        </div>
      </div>
      <CategoryDescription {...sportDescriptions} />
      <section className={"px-5 md:px-10 md:py-10 lg:px-15 lg:py-14"}>
        <RecentActivity />
      </section>
    </main>
  );
}
