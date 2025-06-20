/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:36AM - 30/03/2025
 * User: lam-nguyen
 **/

type KeyLocalStorage = "ACCESS_TOKEN" | "USER" | "REGISTER_TOKEN_USING_GOOGLE" | "LANGUAGE";

const setValue = (key: KeyLocalStorage, value: string) => {
	localStorage.setItem(key, value);
};

const getValue = (key: KeyLocalStorage) => {
	return localStorage.getItem(key);
};

const getValueWithDefaultValue = (key: KeyLocalStorage, defaultValue: string) => {
	return localStorage.getItem(key) || defaultValue;
};

const deleteValue = (key: KeyLocalStorage) => {
	localStorage.removeItem(key);
};

const setObjectValue = (key: KeyLocalStorage, value: object) => {
	localStorage.setItem(key, JSON.stringify(value));
};

const getObjectValue = <T>(key: KeyLocalStorage) => {
	const data = localStorage.getItem(key);
	if (!data) return null;
	return JSON.parse(data) as T;
};

const getObjectValueWithDefaultValue = <T>(key: KeyLocalStorage, defaultValue: T) => {
	const data = localStorage.getItem(key);
	if (!data) return defaultValue;
	return JSON.parse(data) as T;
};

const LocalStorage = {
	getValueWithDefaultValue,
	setValue,
	getValue,
	deleteValue,
	setObjectValue,
	getObjectValue,
	getObjectValueWithDefaultValue,
};

export default LocalStorage;
