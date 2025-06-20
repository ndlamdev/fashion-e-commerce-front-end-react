/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:46 AM - 05/06/2025
 * User: kimin
 **/

import { jwtDecode, JwtPayload } from "jwt-decode";

type MyJwtPayload<T = object> = JwtPayload & {
	payload?: T;
};

type ContentJwtPayload = { refreshTokenId: string; roles: string[]; useId: number; type: string; email: string };

const getPayloadToken = (token: string) => jwtDecode<MyJwtPayload<ContentJwtPayload>>(token).payload;

export default {
	getPayload: getPayloadToken,
};
