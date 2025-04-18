export type LevelType = 1 | 2 | 3 | 4 ;

interface LevelStyle {
	name: string;
	color: string;
	styleGradient: string;
}

const clubStyle: Record<LevelType, LevelStyle> = {
	1: { name: "New", color: 'text-sky-600', styleGradient: "bg-gradient-to-b from-sky-600 via-sky-300 to-sky-600" },
	2: { name: "Silver", color: 'text-[#797979]', styleGradient: "bg-gradient-to-b from-[#797979] via-[#D4D4D4] to-[#797979]" },
	3: { name: "Gold", color: 'text-[#BF9B30]', styleGradient: "bg-gradient-to-b from-[#BF9B30] via-[#FFCF40] to-[#FFCF40]" },
	4: { name: "Platinum", color: 'text-[#CDCDCD]', styleGradient: "bg-gradient-to-b from-[#CDCDCD] via-[#E6E6E6] to-[#CDCDCD]"},
};

export { clubStyle };