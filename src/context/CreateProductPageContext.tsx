/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:12 PM - 16/04/2025
 *  User: kimin
 **/
import { createContext } from "react";

const CreateProductPageContext = createContext<{
	borderStyle: string;
}>({ borderStyle: "" });

export default CreateProductPageContext;
