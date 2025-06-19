import { translated } from "../helper/locale";

export enum CollectionEnum {
	MALE = "MALE",
	FEMALE = "FEMALE",
	SPORT = "SPORT",
}
const t = (key: string) => translated(key, 'header.product_types')

export const CollectionValue: Record<string, string> = {
	[CollectionEnum.MALE]: t('male'),
	[CollectionEnum.FEMALE]: t('female'),
	[CollectionEnum.SPORT]: t('sport'),
};
