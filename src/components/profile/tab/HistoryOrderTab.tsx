import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { HistoryOrderProps } from "@/components/profile/props/historyOrder.props.ts";

export default function HistoryOrder() {
	const data: HistoryOrderProps[] = []
	return <HistoryOrderTab {...data}/>;
}

const HistoryOrderTab = (props: HistoryOrderProps[]) => {
	return (
		<article >
			<h1 className={'text-4xl font-bold'}>Lịch sử đơn hàng</h1>
			<h2 className={'text-neutral-500 text-lg mt-3'}>Đơn hàng của bạn</h2>
			{props.length > 0 ? <Table>
				<TableHeader>
					<TableRow className="text-sm uppercase">
						<TableHead className="w-[100px]">No.</TableHead>
						<TableHead>Ngày đặt</TableHead>
						<TableHead>Tình trạng</TableHead>
						<TableHead className="text-right">Trạng thái
						</TableHead>
					</TableRow>
				</TableHeader>
			</Table> :
				<p className="text-center italic text-neutral-500">Bạn chưa có đơn hàng nào mua tại website</p>
			}

		</article>
	);
}