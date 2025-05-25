export enum CollectionEnum {
	MALE = "MALE",
	FEMALE = "FEMALE",
	SPORT = "SPORT",
}

export const CollectionValue: Record<string, string> = {
	[CollectionEnum.MALE]: "Nam",
	[CollectionEnum.FEMALE]: "Nữ",
	[CollectionEnum.SPORT]: "Thể thao",
};
