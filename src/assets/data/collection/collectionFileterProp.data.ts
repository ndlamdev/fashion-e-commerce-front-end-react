import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";
import { translated } from "@/utils/helper/locale.ts";
const tColor = (key: string) => translated(key, 'page.collection.colors')
export const mockCollectionFilters: CollectionFilterProps = {
	size: ["S", "M", "L", "XL", "2XL", "3XL", "29", "30", "31", "32", "33"],
	color: [
		{ name: tColor('mix'), style: "bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700", slug: "mix" },
		{ name: tColor('black'), style: "bg-stone-950", slug: "den" },
		{ name: tColor('gray'), style: "bg-neutral-400", slug: "xam" },
		{ name: tColor('white'), style: "bg-white", slug: "trang" },
		{ name: tColor('beige'), style: "bg-amber-100", slug: "be" },
		{ name: tColor('blue'), style: "bg-blue-500", slug: "xam-lam" },
		{ name: tColor('green'), style: "bg-green-800", slug: "xanh-reu" },
		// { name: tColor('turquoise'), style: "bg-cyan-500", slug: "xanh-ngoc" },
		{ name: tColor('red'), style: "bg-red-500", slug: "do" },
		{ name: tColor('orange'), style: "bg-orange-500", slug: "cam" },
		{ name: tColor('pink'), style: "bg-pink-400", slug: "hong" },
		{ name: tColor('dark_blue'), style: "bg-blue-900", slug: "xanh-dam" },
		{ name: tColor('gray_black'), style: "bg-slate-500", slug: "den-xam" },
	],
};
