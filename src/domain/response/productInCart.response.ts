type ProductInCartResponse = {
	id: string;
	lock: boolean;
	title: string;
	image: {
		id: string;
		src: string;
	};
	available: boolean;
	seo_alias: string;
};
export default ProductInCartResponse;
