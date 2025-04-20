import { toast } from "sonner";
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";

const ReferFriendTab = () => {
	// handle save text to clipboard
	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			console.log("Copied to clipboard!");
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};
	return (
		<article className={"p-8 bg-white rounded-lg shadow-lg"}>
			<h1 className={"text-4xl font-bold normal-case"}>Giới thiệu bạn bè</h1>
			<section className={"flex  justify-between items-center space-x-5"}>
				<div className="rounded-lg bg-neutral-100 p-4">
					<h2 className="font-bold text-lg">Nhận 10% CoolCash</h2>
					<p className="text-sm">Giới thiệu Coolmate đến bạn bè và gia đình của bạn vô cùng đơn giản</p>
					<div className="grid grid-cols-3 mt-5 gap-2">
						<div className="space-y-2 flex flex-col items-center">
							<img className={"size-18"}
									 src="https://media3.coolmate.me/cdn-cgi/image/width=300,height=442,quality=80/uploads/February2025/mceclip2_16.png"
									 alt="" />
							<p className={"text-sky-600"}>Lấy mã hoặc link</p>
							<p className={"text-center"}>Chọn sản phẩm hoặc truy cập trang CoolClub để lấy mã hoặc link giới
								thiệu.</p>
						</div>
						<div className="space-y-2 flex flex-col items-center">
							<img className={"size-18"}
									 src="https://media3.coolmate.me/cdn-cgi/image/width=300,height=442,quality=80/uploads/February2025/mceclip0_87.png"
									 alt="" />
							<p className={"text-sky-600"}>Chia sẻ đến bạn bè</p>
							<p className={"text-center"}>Bạn bè mua sắm với mã hoặc link của bạn sẽ được giảm 50k cho đơn hàng đầu
								tiên từ 200k.</p>
						</div>
						<div className="space-y-2 flex flex-col items-center">
							<img className={"size-18"}
									 src="https://media3.coolmate.me/cdn-cgi/image/width=300,height=442,quality=80/uploads/February2025/mceclip1_85.png"
									 alt="" />
							<p className={"text-sky-600"}>Nhận CoolCash</p>
							<p className={"text-center"}>Bạn sẽ nhận 10% CoolCash theo giá trị đơn hàng sau 7 ngày từ khi đơn giao
								thành công.</p>
						</div>
					</div>
				</div>

				<div className="rounded-lg bg-neutral-100 p-4">
					<h2 className="font-bold text-lg my-3">Mã giới thiệu của bạn</h2>
					<div className="w-70 flex justify-between items-center p-2 rounded-full bg-white">
						<span className="uppercase">Lorem ipsum.</span>
						<span
							onClick={() => {
								copyToClipboard("").then();
								toast("Đã copy mã giới thiệu");
							}}
							className={"flex cursor-pointer text-sm text-blue-700"}>
																<Copy className={"mx-1"} /> Copy
															</span>

					</div>
					<h2 className="font-bold text-lg my-3">Link giới thiệu của bạn</h2>
					<div className="flex items-center space-x-2 bg-white rounded-full p-1">
						<Input className={" bg-white rounded-full !border-none  blur-none focus-visible:border-none!"} type={"text"} value={"http://localhost:5173/product-detail"} />
						<span
							onClick={() => {
								copyToClipboard('').then();
								toast("Đã copy mã giới thiệu");
							}}
							className={"flex cursor-pointer text-sm text-blue-700"}>
															<Copy className={"mx-1"} /> Copy
														</span>
					</div>
					<div className="border-t pt-3 text-sm mt-5">
						<p className="">Chia sẻ mã hoặc link giới thiệu của bạn bằng cách copy và gửi cho bạn bè hoặc chia sẻ trên mạng xã hội nhé.</p>
					</div>

				</div>
			</section>
			<section className={"flex justify-between items-center space-x-3 my-5"}>
				<div className="flex items-center content-start bg-blue-600 p-2 px-5 rounded-3xl text-white">
					<img src="https://mcdn.coolmate.me/image/September2024/mceclip1_29.png" alt="" className="" />
					<div className="">
						<p className="text-4xl">0</p>
						<p className="">Point nhận được</p>
					</div>
				</div>
				<div className="flex items-center content-start bg-orange-600 p-2 px-5 rounded-3xl text-white">
					<img src="https://mcdn.coolmate.me/image/September2024/mceclip2.png" alt="" className="" />
					<div className="">
						<p className="text-4xl">0</p>
						<p className="">đã hoàn thành</p>
					</div>
				</div>
				<div className="flex items-center content-start bg-sky-300  p-2 px-5 rounded-3xl text-white">
					<img src="https://mcdn.coolmate.me/image/September2024/mceclip3_12.png" alt="" className="" />
					<div className="">
						<p className="text-4xl">0</p>
						<p className="">đang xử lý</p>
					</div>
				</div>
			</section>
			<section>
				<h2 className={"text-lg font-bold uppercase"}>Bạn bè đã tham gia</h2>
				<Table>
					<TableHeader>
						<TableRow className="text-sm uppercase">
							<TableHead className="w-[100px]">No.</TableHead>
							<TableHead>Bạn bè</TableHead>
							<TableHead>Tình trạng</TableHead>
							<TableHead className="text-right">Giá trị
							</TableHead>
						</TableRow>
					</TableHeader>
				</Table>

			</section>
		</article>
	);
};

export default function ReferFriend() {
	return <ReferFriendTab />;
}