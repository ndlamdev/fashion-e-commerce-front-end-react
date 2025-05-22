import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";

export const mockCollectionFilters: CollectionFilterProps = {
	size: ["S", "M", "L", "XL", "2XL", "3XL", "29",
		"30",
		"31",
		"32",
		"33"],
	color: [
		{ name: "Mix", style: "bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700", slug: "mix" },
		{ name: "Đen", style: "bg-stone-950", slug: "den" },
		{ name: "Xám", style: "bg-neutral-400", slug: "xam" },
		{ name: "Trắng", style: "bg-white", slug: "trang" },
		{ name: "Be", style: "bg-amber-100", slug: "be" },
		{ name: "Xanh lam", style: "bg-blue-500", slug: "xam-lam" },
		{ name: "Xanh rêu", style: "bg-green-800", slug: "xanh-reu" },
		{ name: "Xanh ngọc", style: "bg-cyan-500", slug: "xanh-ngoc" },
		{ name: "Đỏ", style: "bg-red-500", slug: "do" },
		{ name: "Cam", style: "bg-orange-500", slug: "cam" },
		{ name: "Hồng", style: "bg-pink-400", slug: "hong" },
		{ name: "Xanh đậm", style: "bg-blue-900", slug: "xanh-dam" },
		{ name: "Đen Xám", style: "bg-slate-500", slug: "den-xam" },
	],
};
