import i18n from "i18next";

export function translated(key: string, prefix: string, options?: Record<string, any>) {
	return i18n.t(`${prefix}.${key}`, options);
}
