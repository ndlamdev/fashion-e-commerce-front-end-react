/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:40 PM - 18/05/2025
 * User: kimin
 **/

type QuickSearchProductType = {
	id: string;
	title: string;
	image: {
		id: string;
		src: string;
	};
	collection: {
		id: string;
		title: string;
		type: "MALE" | "FEMALE" | "UNISEX";
	};
};

export default QuickSearchProductType;
