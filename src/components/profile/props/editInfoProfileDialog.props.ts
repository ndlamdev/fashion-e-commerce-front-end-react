import { GenderType } from "@/types/profile/customer.type.ts";


interface GenderProps {
	name: string,
	value: GenderType,
}

const gender: Record<number, GenderProps> = {
	0 : { name: 'Nam', value: GenderType.MALE},
	1 : {name: 'Nữ', value: GenderType.FEMALE},
	2 : {name: 'Khác', value: GenderType.OTHER}
}

const getGenderByValue = (value: GenderType): GenderProps | undefined => {
	return Object.values(gender).find(g => g.value === value);
};

export { gender, getGenderByValue };