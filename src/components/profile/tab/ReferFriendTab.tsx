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
		<article className={"mt-8"}>
			<h1 className={"text-lg lg:text-4xl sm:text-2xl font-bold normal-case"}>Giới thiệu bạn bè</h1>
			<section className={" max-sm:w-full box-border flex max-lg:flex-wrap justify-between items-center lg:space-x-5 max-lg:space-y-5"}>
				<div className="rounded-lg bg-neutral-100 p-4 ">
					<h2 className="font-bold text-sm sm:text-lg">Nhận 10% CoolCash</h2>
					<p className="text-xs sm:text-sm">Giới thiệu Coolmate đến bạn bè và gia đình của bạn vô cùng đơn giản</p>
					<div className="grid grid-cols-3 max-md:grid-cols-1 mt-5 gap-2">
						<div className="space-y-2 flex flex-col items-center">
							<img className={"sm:size-18 size-12"}
									 src="https://media3.coolmate.me/cdn-cgi/image/width=300,height=442,quality=80/uploads/February2025/mceclip2_16.png"
									 alt="" />
							<p className={"text-sky-600 text-xs sm:text-base"}>Lấy mã hoặc link</p>
							<p className={"text-center text-xs sm:text-base"}>Chọn sản phẩm hoặc truy cập trang CoolClub để lấy mã hoặc link giới
								thiệu.</p>
						</div>
						<div className="space-y-2 flex flex-col items-center">
							<img className={"size-12 sm:size-18"}
									 src="https://media3.coolmate.me/cdn-cgi/image/width=300,height=442,quality=80/uploads/February2025/mceclip0_87.png"
									 alt="" />
							<p className={"text-sky-600 text-xs sm:text-base"}>Chia sẻ đến bạn bè</p>
							<p className={"text-center text-xs sm:text-base"}>Bạn bè mua sắm với mã hoặc link của bạn sẽ được giảm 50k cho đơn hàng đầu
								tiên từ 200k.</p>
						</div>
						<div className="space-y-2 flex flex-col items-center">
							<img className={"size-12 sm:size-18"}
									 src="https://media3.coolmate.me/cdn-cgi/image/width=300,height=442,quality=80/uploads/February2025/mceclip1_85.png"
									 alt="" />
							<p className={"text-sky-600 text-xs sm:text-base"}>Nhận CoolCash</p>
							<p className={"text-center text-xs sm:text-base"}>Bạn sẽ nhận 10% CoolCash theo giá trị đơn hàng sau 7 ngày từ khi đơn giao
								thành công.</p>
						</div>
					</div>
				</div>

				<div className="rounded-lg bg-neutral-100 p-4">
					<h2 className="font-bold text-sm sm:text-lg my-1">Mã giới thiệu của bạn</h2>
					<div className=" flex justify-between items-center p-2 rounded-full bg-white">
						<span className="uppercase text-sm sm:text-lg ">Lorem ipsum.</span>
						<span
							onClick={() => {
								copyToClipboard("").then();
								toast("Đã copy mã giới thiệu");
							}}
							className={"flex cursor-pointer text-sm text-blue-700"}>
																<Copy className={"mx-1 size-4 sm:size-6"} /> Copy
															</span>

					</div>
					<h2 className="font-bold text-sm sm:text-lg  my-1">Link giới thiệu của bạn</h2>
					<div className=" flex items-center space-x-2 bg-white rounded-full p-1">
						<Input className={" bg-white rounded-full !border-none  blur-none focus-visible:border-none!"} value={"http://localhost:5173/product-detail"} />
						<span
							onClick={() => {
								copyToClipboard('').then();
								toast("Đã copy mã giới thiệu");
							}}
							className={"flex cursor-pointer text-sm text-blue-700"}>
															<Copy className={"mx-1 size-4 sm:size-6"} /> Copy
														</span>
					</div>
					<div className="border-t pt-3 text-sm mt-5">
						<p className="">Chia sẻ mã hoặc link giới thiệu của bạn bằng cách copy và gửi cho bạn bè hoặc chia sẻ trên mạng xã hội nhé.</p>
					</div>

				</div>
			</section>
			<section className={"max-sm:w-full flex justify-between items-center space-x-3 my-5"}>
				<div className="max-sm:w-1/3 max-sm:h-30 grid grid-cols-1 sm:grid-cols-2 items-center bg-blue-600 p-2 sm:px-5 rounded-3xl max-md:rounded-xl text-white">
					<img src="https://mcdn.coolmate.me/image/September2024/mceclip1_29.png" alt="" className="object-cover max-sm:size-10 " />
					<div className="">
						<p className="lg:text-4xl font-bold text-lg">0</p>
						<p className="text-sm sm:text-base">Point nhận được</p>
					</div>
				</div>
				<div className="max-sm:w-1/3 max-sm:h-30 grid grid-cols-1 sm:grid-cols-2 items-center bg-orange-600 p-2 sm:px-5 rounded-3xl max-md:rounded-xl text-white">
					<img src="https://mcdn.coolmate.me/image/September2024/mceclip2.png" alt="" className="object-cover max-sm:size-10" />
					<div className="">
						<p className="lg:text-4xl font-bold text-lg">0</p>
						<p className="text-sm sm:text-base">đã hoàn thành</p>
					</div>
				</div>
				<div className="max-sm:w-1/3 max-sm:h-30 grid grid-cols-1 sm:grid-cols-2 items-center bg-sky-300  p-2 sm:px-5 rounded-3xl max-md:rounded-xl text-white">
					<img src="https://mcdn.coolmate.me/image/September2024/mceclip3_12.png" alt="" className="object-cover max-sm:size-10" />
					<div className="">
						<p className="lg:text-4xl font-bold text-lg">0</p>
						<p className="text-sm sm:text-base">đang xử lý</p>
					</div>
				</div>
			</section>
			<section>
				<h2 className={"text-sm sm:text-lg font-bold uppercase"}>Bạn bè đã tham gia</h2>
				<Table>
					<TableHeader>
						<TableRow className="text-xs uppercase sm:text-sm">
							<TableHead className="">No.</TableHead>
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