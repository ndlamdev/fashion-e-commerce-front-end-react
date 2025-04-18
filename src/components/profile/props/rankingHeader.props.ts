import { LevelType } from "@/components/profile/props/level.props.ts";

export type RankingHeaderProps = {
	fullName: string
	levelClub: LevelType
	spendingMore?: number
	cash?: number
	waitingCash?: number
}