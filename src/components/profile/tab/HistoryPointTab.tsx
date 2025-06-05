import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";

const HistoryPointTab = () => {
	return (
		<article className={"max-sm:mt-10"}>
			<h1 className={"text-lg font-bold sm:text-2xl lg:text-4xl"}>Lịch sử Point</h1>
			<h2 className={"mt-3 text-sm text-neutral-500 sm:text-lg"}>Point của bạn</h2>
			<Table>
				<TableHeader>
					<TableRow className='text-xs uppercase sm:text-sm'>
						<TableHead className=''>Point được tặng</TableHead>
						<TableHead>Hết hạn</TableHead>
					</TableRow>
				</TableHeader>
			</Table>
		</article>
	);
};

export default function HistoryPoint() {
	return <HistoryPointTab />;
}
