/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:36AM - 30/03/2025
 * User: lam-nguyen
 **/

type KeySessionStorage = "EMAIL_FORGET_PASSWORD" | "EMAIL_REGISTER" | "TOKEN_RESET_PASSWORD" | "REGISTER_TOKEN_USING_GOOGLE" | "REGISTER_TOKEN_USING_FACEBOOK";

const setValue = (key: KeySessionStorage, value: string) => {
	sessionStorage.setItem(key, value);
};

const getValue = (key: KeySessionStorage) => {
	return sessionStorage.getItem(key);
};

const deleteValue = (key: KeySessionStorage) => {
	sessionStorage.removeItem(key);
};

const SessionStorage = {
	setValue,
	getValue,
	deleteValue,
};

export default SessionStorage;
