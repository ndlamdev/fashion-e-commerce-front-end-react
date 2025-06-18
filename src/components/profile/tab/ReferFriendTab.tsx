import { toast } from "sonner";
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { memo, useEffect } from "react";

const ReferFriendTab = memo(() => {
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
		<article className={"max-sm:mt-10"}>
			<h1 className={"text-lg font-bold normal-case sm:text-2xl lg:text-4xl"}>Giới thiệu bạn bè</h1>
			<section className={"box-border flex items-center justify-between max-lg:flex-wrap max-lg:space-y-5 max-sm:w-full sm:mt-5 lg:space-x-5"}>
				<div className='rounded-lg bg-neutral-100 p-4'>
					<h2 className='text-sm font-bold sm:text-lg'>Nhận 10% CoolCash</h2>
					<p className='text-xs sm:text-sm'>Giới thiệu Coolmate đến bạn bè và gia đình của bạn vô cùng đơn giản</p>
					<div className='mt-5 grid grid-cols-3 gap-2 max-md:grid-cols-1'>
						<div className='flex flex-col items-center space-y-2'>
							<img
								className={"size-12 sm:size-18"}
								src='https://media3.coolmate.me/cdn-cgi/image/width=300,height=442,quality=80/uploads/February2025/mceclip2_16.png'
								alt=''
							/>
							<p className={"text-xs text-sky-600 sm:text-base"}>Lấy mã hoặc link</p>
							<p className={"text-center text-xs sm:text-base"}>Chọn sản phẩm hoặc truy cập trang CoolClub để lấy mã hoặc link giới thiệu.</p>
						</div>
						<div className='flex flex-col items-center space-y-2'>
							<img
								className={"size-12 sm:size-18"}
								src='https://media3.coolmate.me/cdn-cgi/image/width=300,height=442,quality=80/uploads/February2025/mceclip0_87.png'
								alt=''
							/>
							<p className={"text-xs text-sky-600 sm:text-base"}>Chia sẻ đến bạn bè</p>
							<p className={"text-center text-xs sm:text-base"}>Bạn bè mua sắm với mã hoặc link của bạn sẽ được giảm 50k cho đơn hàng đầu tiên từ 200k.</p>
						</div>
						<div className='flex flex-col items-center space-y-2'>
							<img
								className={"size-12 sm:size-18"}
								src='https://media3.coolmate.me/cdn-cgi/image/width=300,height=442,quality=80/uploads/February2025/mceclip1_85.png'
								alt=''
							/>
							<p className={"text-xs text-sky-600 sm:text-base"}>Nhận CoolCash</p>
							<p className={"text-center text-xs sm:text-base"}>Bạn sẽ nhận 10% CoolCash theo giá trị đơn hàng sau 7 ngày từ khi đơn giao thành công.</p>
						</div>
					</div>
				</div>

				<div className='rounded-lg bg-neutral-100 p-4'>
					<h2 className='my-1 text-sm font-bold sm:text-lg'>Mã giới thiệu của bạn</h2>
					<div className='flex items-center justify-between rounded-full bg-white p-2'>
						<span className='text-sm uppercase sm:text-lg'>Lorem ipsum.</span>
						<span
							onClick={() => {
								copyToClipboard("").then();
								toast("Đã copy mã giới thiệu");
							}}
							className={"flex cursor-pointer text-sm text-blue-700"}>
							<Copy className={"mx-1 size-4 sm:size-6"} /> Copy
						</span>
					</div>
					<h2 className='my-1 text-sm font-bold sm:text-lg'>Link giới thiệu của bạn</h2>
					<div className='flex items-center space-x-2 rounded-full bg-white p-1'>
						<Input
							className={"rounded-full !border-none bg-white blur-none focus-visible:border-none!"}
							value={"http://localhost:5173/product-detail"}
							readOnly={true}
						/>
						<span
							onClick={() => {
								copyToClipboard("").then();
								toast("Đã copy mã giới thiệu");
							}}
							className={"flex cursor-pointer text-sm text-blue-700"}>
							<Copy className={"mx-1 size-4 sm:size-6"} /> Copy
						</span>
					</div>
					<div className='mt-5 border-t pt-3 text-sm'>
						<p className=''>Chia sẻ mã hoặc link giới thiệu của bạn bằng cách copy và gửi cho bạn bè hoặc chia sẻ trên mạng xã hội nhé.</p>
					</div>
				</div>
			</section>
			<section className={"my-5 flex items-center justify-between space-x-3 max-sm:w-full"}>
				<div className='grid grid-cols-1 items-center rounded-3xl bg-blue-600 p-2 text-white max-md:rounded-xl max-sm:h-30 max-sm:w-1/3 sm:grid-cols-2 sm:px-5'>
					<img src='https://mcdn.coolmate.me/image/September2024/mceclip1_29.png' alt='' className='object-cover max-sm:size-10' />
					<div className=''>
						<p className='text-lg font-bold lg:text-4xl'>0</p>
						<p className='text-sm sm:text-base'>Point nhận được</p>
					</div>
				</div>
				<div className='grid grid-cols-1 items-center rounded-3xl bg-orange-600 p-2 text-white max-md:rounded-xl max-sm:h-30 max-sm:w-1/3 sm:grid-cols-2 sm:px-5'>
					<img src='https://mcdn.coolmate.me/image/September2024/mceclip2.png' alt='' className='object-cover max-sm:size-10' />
					<div className=''>
						<p className='text-lg font-bold lg:text-4xl'>0</p>
						<p className='text-sm sm:text-base'>đã hoàn thành</p>
					</div>
				</div>
				<div className='grid grid-cols-1 items-center rounded-3xl bg-sky-300 p-2 text-white max-md:rounded-xl max-sm:h-30 max-sm:w-1/3 sm:grid-cols-2 sm:px-5'>
					<img src='https://mcdn.coolmate.me/image/September2024/mceclip3_12.png' alt='' className='object-cover max-sm:size-10' />
					<div className=''>
						<p className='text-lg font-bold lg:text-4xl'>0</p>
						<p className='text-sm sm:text-base'>đang xử lý</p>
					</div>
				</div>
			</section>
			<section>
				<h2 className={"text-sm font-bold uppercase sm:text-lg"}>Bạn bè đã tham gia</h2>
				<Table>
					<TableHeader>
						<TableRow className='text-xs uppercase sm:text-sm'>
							<TableHead className=''>No.</TableHead>
							<TableHead>Bạn bè</TableHead>
							<TableHead>Tình trạng</TableHead>
							<TableHead className='text-right'>Giá trị</TableHead>
						</TableRow>
					</TableHeader>
				</Table>
			</section>
		</article>
	);
});

export default function ReferFriend() {
 useEffect(() => {
    document.title = "KimiFashion - Giới thiệu bạn bè";
  }, []);

	return <ReferFriendTab />;
}
