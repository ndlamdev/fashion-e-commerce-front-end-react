/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:18 PM - 16/04/2025
 *  User: Lam Nguyen
 **/

type OptionVariantType = {
	name: string;
	values: {
		oldValue: string;
		newValue: string;
	}[];
	canAddNewValueOption: boolean;
};

export default OptionVariantType;
