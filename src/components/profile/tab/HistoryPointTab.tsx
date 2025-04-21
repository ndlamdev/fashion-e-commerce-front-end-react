import { TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";

const HistoryPointTab =() => {
	return (
		<article >
			<h1 className={'text-4xl font-bold'}>Lịch sử Point</h1>
			<h2 className={'text-neutral-500 text-lg mt-3'}>Point của bạn</h2>
			<TableHeader>
				<TableRow className="text-sm uppercase">
					<TableHead className="w-[100px]">Point được tặng</TableHead>
					<TableHead>Hết hạn</TableHead>
				</TableRow>
			</TableHeader>

		</article>
	);
}

export default function HistoryPoint() {
	return <HistoryPointTab />;
}