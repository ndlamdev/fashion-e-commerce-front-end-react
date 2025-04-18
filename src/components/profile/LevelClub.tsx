import * as React from "react";
import { clubStyle, LevelType } from "@/components/profile/props/level.props.ts";
import { cn } from "@/lib/utils.ts";
import { CrownIcon } from "lucide-react";

interface Props {
	level: LevelType;
}

export const LevelClub: React.FC<Props> = (prop) => {
	const club = clubStyle;
	return (
		<>
			<div className="flex items-center space-x-2">
				<span className={cn(`text-base uppercase font-extrabold bg-clip-text text-transparent`, club[prop.level].styleGradient)}>{club[prop.level].name}</span>
				<div className={cn("p-1 rounded bg-clip-border", club[prop.level].styleGradient)}>
					<div className="w-6 h-6 rounded bg-white flex items-center justify-center">
						<CrownIcon className={cn(`w-4 h-4 bg-clip-text `, club[prop.level].color)} />
					</div>
				</div>
			</div>
		</>
	);
};