import { RankingHeaderProps } from "@/components/profile/props/rankingHeader.props.ts";
import { LevelClub } from "@/components/profile/LevelClub.tsx";
import { formatCurrency, formatDate } from "@/utils/helper/format-data.ts";
import { Progress } from "@/components/ui/progress.tsx";
import { cn } from "@/lib/utils.ts";
import { LevelType } from "@/components/profile/props/level.props.ts";
import { BadgeCentIcon, InfoIcon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card.tsx";
import { useTranslation } from "react-i18next";
export default function RankingHeader(props: RankingHeaderProps) {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.ranking",
	});
	const levelClub: LevelType[] = [0, 1, 2, 3];
	return (
			<div className="md:p-4 flex flex-wrap justify-between items-center bg-neutral-300 md:bg-white md:shadow-lg md:rounded-lg">
				<div className=" p-4 max-md:w-full w-2/3 bg-white max-md:shadow-lg rounded-lg">
					<h2 className="mb-4 text-4xl max-md:text-xl font-bold">{t('hi')}, {props.fullName}</h2>
					<LevelClub styleName={"text-lg lg:text-2xl"} styleIcon={"size-5"} level={props.levelClub} />
					<div className="flex items-center space-x-1 mt-4">
						<p className="text-xs md:text-base">{t('spend_extra')}<span
							className="text-xs md:text-base font-bold text-sky-600"> {formatCurrency(props.nextRankingValue ?? 0)}</span> {t('to_up_rank')}</p>
						{props.nextLevel && <LevelClub level={props.nextLevel} />}
					</div>
					<div className="relative mx-3">
						<Progress className={" my-1"} value={(props.levelClub + 2	) * (100/(levelClub.length - 1))} />
						{levelClub.map((item: LevelType, index: number) => {
							return (
								<div key={index}
										 className={cn(`absolute  -top-1 `,)}
										 style={{ left: `${index * (100 / (levelClub.length - 1))}%`}}
								>
									<div className="mb-2 rounded-full w-1 p-1.5 bg-sky-700" />
									<LevelClub level={item} />
								</div>
							);
						})}
						<p className="text-xs md:text-base text-neutral-400 mt-12 italic">{t('update_rank_at')}
							ngày <span>{formatDate(props.resetRankingDate)}</span>, {t('update_rank_next')}
							theo: <span>{formatDate(props.nextResetRankingDate)}</span></p>
					</div>
				</div>
				<div className="w-1/3 max-md:w-full py-4 md:p-4 max-md:bg-neutral-300 bg-white flex flex-wrap max-md:justify-between md:place-content-end max-md:space-y-4">
					<div className=" p-4 bg-white max-md:w-full  max-md:rounded-lg max-md:shadow-lg ">
						<p className="text-neutral-500">{t('having')}</p>
						<p className="flex flex-wrap items-center space-x-2 font-bold text-lg">
							<BadgeCentIcon /> {props.point ?? 0} KimiCash</p>
						<p
							className="flex flex-wrap items-center space-x-2 text-lg text-neutral-500">{t('pending')}: {props.pendingPoint ?? 0} Point
							<HoverCard>
								<HoverCardTrigger className={'px-1'}><InfoIcon className={'cursor-pointer'}/></HoverCardTrigger>
								<HoverCardContent>
									<p className="max-md:text-xs">{t('will_have_point')}</p>
								</HoverCardContent>
							</HoverCard>
						</p>
					</div>
					<div className="rounded-lg md:w-2/3">
						<img src={'https://mcdn.coolmate.me/image/March2025/mceclip1_60.png'} alt={''} className={' cursor-pointer'}/>
					</div>
				</div>
			</div>
	);

}