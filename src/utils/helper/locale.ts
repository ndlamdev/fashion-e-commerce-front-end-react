import i18n from "i18next";

export function translated(key: string, prefix: string) {
	return i18n.t(`${prefix}.${key}`);
}