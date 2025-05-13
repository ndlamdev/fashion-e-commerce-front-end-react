import { ProductVariantsType } from "@/types/product/productVariants.type.ts";

const getColors = (variances: ProductVariantsType[] | undefined) => {
	if (!variances) return [];
	const map = new Map<string, string>();
	for (const { options } of variances) {
		if (!map.has(options.COLOR)) {
			map.set(options.COLOR, options.COLOR);
		}
	}

	return Array.from(map.values());
};

const getSizes = (variances: ProductVariantsType[] | undefined, color: string | undefined) => {
	if (!variances || !color) return [];
	const map = new Map<string, string>();
	for (const { options } of variances) {
		if (options.COLOR === color && !map.has(options.SIZE)) map.set(options.SIZE, options.SIZE);
	}
	return Array.from(map.values());
}

export {getColors, getSizes}