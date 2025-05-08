import { TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";

const HistoryPointTab =() => {
	return (
		<article className={'max-sm:mt-10'}>
			<h1 className={'text-lg lg:text-4xl sm:text-2xl font-bold'}>Lịch sử Point</h1>
			<h2 className={'text-neutral-500 text-sm sm:text-lg mt-3'}>Point của bạn</h2>
			<TableHeader>
				<TableRow className="text-xs sm:text-sm uppercase">
					<TableHead className="">Point được tặng</TableHead>
					<TableHead>Hết hạn</TableHead>
				</TableRow>
			</TableHeader>

		</article>
	);
}

export default function HistoryPoint() {
	return <HistoryPointTab />;
}