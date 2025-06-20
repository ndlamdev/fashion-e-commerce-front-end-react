/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:08 PM - 18/05/2025
 * User: kimin
 **/
import InputProps from "@/components/form/props/input.prop.ts";

type SearcherProps = InputProps & {
	onSearch?: (text: string) => void;
	onEnter?: (text: string) => void;
};

export default SearcherProps;
