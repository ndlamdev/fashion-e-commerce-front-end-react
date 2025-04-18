import RankingHeader from "@/components/profile/RankingHeader.tsx";

export default function ProfilePage() {
	return (
		<main className={'p-8 bg-neutral-300'}>
			<RankingHeader fullName={'LamHongPhong'} levelClub={0} nextLevel={1} resetRankingDate={new Date()} nextResetRankingDate={new Date()}/>
		</main>
	);
}
