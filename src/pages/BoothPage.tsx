import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";
import { mockCollectionFilters } from "@/assets/data/collection/collectionFileterProp.data.ts";
import CollectionFilter from "@/components/collection/CollectionFilter.tsx";
import ZoneOfProducts from "@/components/collection/ZoneOfProducts.tsx";
import sampleProducts from "@/assets/data/product.data.ts";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import CategoryDescription from "@/components/collection/CategoryDescription.tsx";
import { categoryDescriptionSamples } from "@/assets/data/collection/categoryDescription.data.ts";
import Privilege from "@/components/footer/Privilege.tsx";

export default function BoothPage() {
	const filters: CollectionFilterProps = mockCollectionFilters;
	const products = sampleProducts;
	const sportDescriptions = categoryDescriptionSamples;
	return (
		<>
			<div className='p-3 sm:flex'>
				<div className='hidden sm:block sm:w-1/4'>
					<CollectionFilter {...filters} />
				</div>
				<div className='sm:w-3/4'>
					<ScrollArea className={"h-dvh"}>
						<ZoneOfProducts currentCategory={"lorem"} showProducts={products} TotalProducts={12} />
					</ScrollArea>
				</div>
			</div>
			<CategoryDescription {...sportDescriptions} />
			<section className={"px-5 py-5 md:px-10 md:py-10 lg:px-15 lg:py-14"}>
				<Privilege />
			</section>
		</>
	);
}
