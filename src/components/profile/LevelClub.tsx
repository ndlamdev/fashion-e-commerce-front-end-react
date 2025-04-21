import * as React from "react";
import { clubStyle, LevelType } from "@/components/profile/props/level.props.ts";
import { cn } from "@/lib/utils.ts";
import { CrownIcon } from "lucide-react";

interface Props {
	level: LevelType;
	styleName?: string;
	styleIcon?: string;
}

export const LevelClub: React.FC<Props> = (prop) => {
	const club = clubStyle;
	return (
		<>
			<div className="flex items-center space-x-2">
				<span className={cn(`hidden md:visible text-base uppercase font-extrabold bg-clip-text text-transparent`, prop.styleName, club[prop.level].styleGradient)}>{club[prop.level].name}</span>
				<div className={cn("p-1 rounded-md md:rounded-lg bg-clip-border", club[prop.level].styleGradient)}>
					<div className="p-1 rounded-md md:rounded-lg bg-neutral-100 flex items-center justify-center">
						<CrownIcon className={cn(`size-2 md:size-4 bg-clip-text `, prop.styleIcon, club[prop.level].color)} />
					</div>
				</div>
			</div>
		</>
	);
};