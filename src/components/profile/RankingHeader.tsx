import { RankingHeaderProps } from "@/components/profile/props/rankingHeader.props.ts";
import { LevelClub } from "@/components/profile/LevelClub.tsx";
import { formatCurrency, formatDate } from "@/utils/format-data.ts";
import { Progress } from "@/components/ui/progress.tsx";
import { cn } from "@/lib/utils.ts";
import { LevelType } from "@/components/profile/props/level.props.ts";
import { BadgeCentIcon, InfoIcon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card.tsx";

export default function RankingHeader(props: RankingHeaderProps) {
	const levelClub: LevelType[] = [0, 1, 2, 3];
	return (
			<div className="p-4 flex flex-wrap justify-between items-center bg-white shadow-lg rounded-lg">
				<div className=" p-4 w-2/3 bg-white">
					<h2 className="mb-4 text-4xl">Hi, {props.fullName}</h2>
					<LevelClub styleName={"text-2xl"} styleIcon={"size-5"} level={props.levelClub} />
					<div className="flex items-center space-x-1 mt-4">
						<p className="">Chi tiêu thêm <span
							className="text-base font-bold text-sky-600">{formatCurrency(props.nextRankingValue ?? 0)}</span> để lên
							hạng</p>
						{props.nextLevel && <LevelClub level={props.nextLevel} />}
					</div>
					<div className="relative">
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
						<p className="text-neutral-400 mt-12 italic">Hạng thành viên được vừa được xét lại vào
							ngày <span>{formatDate(props.resetRankingDate)}</span>, ngày xét hạng tiếp
							theo: <span>{formatDate(props.nextResetRankingDate)}</span></p>
					</div>
				</div>
				<div className="w-1/3 p-4 bg-white flex flex-wrap place-content-end ">
					<div className="p-4 bg-white">
						<p className="text-neutral-500">Bạn đang có</p>
						<p className="flex flex-wrap items-center space-x-2 font-bold text-lg">
							<BadgeCentIcon /> {props.point ?? 0} Point</p>
						<p
							className="flex flex-wrap items-center space-x-2 text-lg text-neutral-500">Chờ: {props.pendingPoint ?? 0} Point
							<HoverCard>
								<HoverCardTrigger className={'px-1'}><InfoIcon className={'cursor-pointer'}/></HoverCardTrigger>
								<HoverCardContent>
									<p className="">Đây là số point bạn sẽ nhận được khi nhận các đơn hàng đang chờ thành công</p>
								</HoverCardContent>
							</HoverCard>
						</p>
					</div>
					<div className="rounded-lg w-2/3">
						<img src={'https://mcdn.coolmate.me/image/March2025/mceclip1_60.png'} alt={''} className={' cursor-pointer'}/>
					</div>
				</div>
			</div>
	);

}