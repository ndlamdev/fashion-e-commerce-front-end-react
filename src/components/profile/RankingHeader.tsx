import { RankingHeaderProps } from "@/components/profile/props/rankingHeader.props.ts";
import { LevelClub } from "@/components/profile/LevelClub.tsx";

export default function RankingHeader(props: RankingHeaderProps) {

	return (
		<>
			<div className="p-4">
				<h2 className="mb-4">Hi, {props.fullName}</h2>
				<LevelClub level={props.levelClub} />
			</div>
		</>
	);

}