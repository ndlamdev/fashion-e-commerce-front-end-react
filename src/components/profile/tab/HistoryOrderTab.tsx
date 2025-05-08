import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { HistoryOrderProps } from "@/components/profile/props/historyOrder.props.ts";

export default function HistoryOrder() {
	const data: HistoryOrderProps[] = []
	return <HistoryOrderTab {...data}/>;
}

const HistoryOrderTab = (props: HistoryOrderProps[]) => {
	return (
		<article className={'max-sm:mt-10'}>
			<h1 className={'text-lg lg:text-4xl sm:text-2xl font-bold'}>Lịch sử đơn hàng</h1>
			<h2 className={'text-neutral-500 text-sm sm:text-lg mt-3'}>Đơn hàng của bạn</h2>
			{props.length > 0 ? <Table>
				<TableHeader>
					<TableRow className="text-xs sm:text-sm  uppercase">
						<TableHead className="">No.</TableHead>
						<TableHead>Ngày đặt</TableHead>
						<TableHead>Tình trạng</TableHead>
						<TableHead className="text-right">Trạng thái
						</TableHead>
					</TableRow>
				</TableHeader>
			</Table> :
				<p className="text-xs sm:text-base text-center italic text-neutral-500">Bạn chưa có đơn hàng nào mua tại website</p>
			}

		</article>
	);
}