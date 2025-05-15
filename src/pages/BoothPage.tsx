import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";
import { mockCollectionFilters } from "@/assets/data/collection/collectionFileterProp.data.ts";
import CollectionFilter from "@/components/collection/CollectionFilter.tsx";
import ZoneOfProducts from "@/components/collection/ZoneOfProducts.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import CategoryDescription from "@/components/collection/CategoryDescription.tsx";
import { categoryDescriptionSamples } from "@/assets/data/collection/categoryDescription.data.ts";
import { useLocation } from "react-router";
import { useEffect } from "react";
import RecentActivity from "@/components/collection/RecentActivity.tsx";
import { useSearchByImageMutation } from "@/services/product.service.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function BoothPage() {
	const location = useLocation();
	const { file, prompt } = location.state || { file: undefined, prompt: undefined };
	const filters: CollectionFilterProps = mockCollectionFilters;
	const sportDescriptions = categoryDescriptionSamples;
	const [request, {data: dataImageSearch, isLoading: isLoadingImageSearch}] = useSearchByImageMutation()
	useEffect(() => {
		if (!file) return;
		const formData = new FormData();
		formData.append('file', file)
			request(formData);
	}, [file, request]);

	useEffect(() => {
		if (!prompt) return;
		// TODO: Hiện thực chức năng tìm kiếm vằn bảng hoặc tìm kiếm bằng giọng nói tại đây. Chỉ cần gửi prompt lên server
		console.log(prompt);
	}, [prompt]);

	return (
		<main>
			<div className='p-3 sm:flex'>
				<div className='hidden sm:block sm:w-1/4'>
					<CollectionFilter {...filters} />
				</div>
				<div className='sm:w-3/4'>
					<ScrollArea className={"h-dvh"}>
						{isLoadingImageSearch ? <Skeleton className={'w-full'} /> :
							<ZoneOfProducts currentCategory={"lorem"} showProducts={dataImageSearch?.data.content} TotalProducts={dataImageSearch?.data.numberOfElements} />
						}
					</ScrollArea>
				</div>
			</div>
			<CategoryDescription {...sportDescriptions} />
			<section className={"px-5 md:px-10 md:py-10 lg:px-15 lg:py-14"}>
				<RecentActivity />
			</section>
		</main>
	);
}
