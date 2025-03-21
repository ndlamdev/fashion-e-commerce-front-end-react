import CollectionFilter from "@/components/collection/CollectionFilter.tsx";
import { mockCollectionFilters } from "@/assets/data/collectionFileterProp.data.ts";
import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";

export default function CollectionLayout(){
  const filters: CollectionFilterProps = mockCollectionFilters
  return (
    <>
      <div className="flex p-6">
        <div className="w-1/4">
          <CollectionFilter {...filters} />
        </div>
        <div className="w-3/4">
        </div>
      </div>
    </>
  )
}