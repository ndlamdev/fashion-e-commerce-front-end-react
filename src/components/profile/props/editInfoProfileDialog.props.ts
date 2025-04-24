import { GenderType } from "@/types/profile/customer.type.ts";


interface GenderProps {
	name: string,
	value: GenderType,
}

const gender: Record<number, GenderProps> = {
	0 : { name: 'Nam', value: GenderType.Male},
	1 : {name: 'Nữ', value: GenderType.Female},
	2 : {name: 'Khác', value: GenderType.Other}
}

export { gender };