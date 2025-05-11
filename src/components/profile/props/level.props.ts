export type LevelType = 0| 1 | 2 | 3 ;

interface LevelStyle {
	name: string;
	color: string;
	styleGradient: string;
}

const clubStyle: Record<LevelType, LevelStyle> = {
	0: { name: "New", color: 'text-sky-600', styleGradient: "bg-gradient-to-b from-sky-600 via-sky-300 to-sky-600" },
	1: { name: "Silver", color: 'text-[#797979]', styleGradient: "bg-gradient-to-b from-[#797979] via-[#D4D4D4] to-[#797979]" },
	2: { name: "Gold", color: 'text-[#BF9B30]', styleGradient: "bg-gradient-to-b from-[#BF9B30] via-[#FFCF40] to-[#FFCF40]" },
	3: { name: "Platinum", color: 'text-[#CDCDCD]', styleGradient: "bg-gradient-to-b from-[#CDCDCD] via-[#E6E6E6] to-[#CDCDCD]"},
};

export { clubStyle };