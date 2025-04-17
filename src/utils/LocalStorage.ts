/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:36AM - 30/03/2025
 * User: lam-nguyen
 **/

type KeyLocalStorage = "ACCESS_TOKEN";

const setValue = (key: KeyLocalStorage, value: string) => {
	localStorage.setItem(key, value);
};

const getValue = (key: KeyLocalStorage) => {
	return localStorage.getItem(key);
};

const deleteValue = (key: KeyLocalStorage) => {
	localStorage.removeItem(key);
};

const LocalStorage = {
	setValue,
	getValue,
	deleteValue,
};

export default LocalStorage;
