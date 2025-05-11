import { LevelType } from "@/components/profile/props/level.props.ts";

export type RankingHeaderProps = {
	fullName: string
	levelClub: LevelType
	resetRankingDate: Date
	nextResetRankingDate: Date
	spendingMore?: number
	point?: number
	pendingPoint?: number
	nextLevel?: LevelType
	nextRankingValue?: number

}