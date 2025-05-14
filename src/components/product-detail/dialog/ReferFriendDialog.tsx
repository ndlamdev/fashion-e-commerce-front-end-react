import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { toast } from "sonner";
import { Check, Copy, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { NavLink } from "react-router";

const ReferFriendDialog = () => {
	return (
		<DialogContent className={"pb-0 xl:max-w-[660px]!"}>
			<DialogTitle/>
			<DialogDescription>
				<ScrollArea className={"h-146 border-none"}>
					<div className={"grid lg:grid-cols-1 xl:grid-cols-2"}>
						<div>
							<p className={"pe-6 text-3xl font-bold"}>Giới thiệu bạn bè Nhận ngay 10% CoolCash</p>
							<p className={"my-5 text-sm"}>
								Bạn sẽ nhận được 10% giá trị đơn hàng đầu tiên của bạn bè và được trả bằng CoolCash khi họ là thành viên CoolClub và mua sản phẩm
								Coolmate bất kỳ.
							</p>
							<div className={"mb-3 rounded-lg bg-neutral-100 p-3"}>
								<p className={"text-sm text-neutral-400 uppercase"}>Gửi mã giới thiệu đến với bạn bè</p>
								<div className={"border-1 border-neutral-300"}></div>
								<p className={"flex items-center justify-between p-2"}>
									<span className={"text-lg text-neutral-700 uppercase"}>{}</span>
									<span
										onClick={() => {
											navigator.clipboard.writeText('copied!').finally()
											toast("Đã copy mã giới thiệu");
										}}
										className={"flex cursor-pointer text-sm text-blue-700"}>
															<Copy className={"mx-1"} /> Copy
														</span>
								</p>
							</div>
							<div className={"mb-3 rounded-lg bg-neutral-100 p-3"}>
								<p className={"text-sm text-neutral-400 uppercase"}>Gửi link giới thiệu đến với bạn bè</p>
								<div className={"flex items-center justify-between rounded-3xl border-2 bg-white px-2"}>
									<Input className={"w-3/4! border-none! focus-visible:border-none"} type={"text"} value={"http://localhost:5173/product-detail"} />
									<span
										onClick={() => {
											navigator.clipboard.writeText('copied!').finally()
											toast("Đã copy mã giới thiệu");
										}}
										className={"flex cursor-pointer text-sm text-blue-700"}>
															<Copy className={"mx-1"} /> Copy
														</span>
								</div>
							</div>

							<Button onClick={() => toast("Đã copy link giới thiệu")} className={"mb-2 w-full cursor-pointer rounded-2xl"} variant={"default"}>
								<Share2 />
								<span>Chia sẻ</span>
							</Button>

							<p className={"text-sm font-bold"}>Bạn sẽ nhận được CoolCash khi:</p>
							<ul className={"text-sm"}>
								<li className={"flex items-center"}>
									<Check className={"mr-1 size-4 flex-none"} /> <span className={"shrink text-sm"}>Bạn bè của bạn tham gia CoolClub</span>
								</li>
								<li className={"flex items-center"}>
									<Check className={"mr-1 size-4 flex-none"} />{" "}
									<span className={"shrink text-sm"}>Bạn bè của bạn hoàn thành đơn hàng đầu tiên trên website</span>
								</li>
								tẽ
								<li className={"flex items-center"}>
									<Check className={"mr-1 size-4 flex-none"} />{" "}
									<span className={"shrink text-sm"}>
															Sau 7 ngày kể từ ngày đơn hàng giao thành công và không đổi trả, bạn có thể nhận và sử dụng CoolCash của bạn
														</span>
								</li>
							</ul>

							<NavLink to={"/"}>
								<span className={"text-xs text-gray-400 underline decoration-gray-400"}>*Chính sách và điều khoản</span>
							</NavLink>
						</div>
						<img
							src={"https://mcdn.coolmate.me/image/September2024/mceclip0_28.png"}
							alt={""}
							className={"h-0 w-0 place-self-end object-cover xl:h-auto xl:w-full"}
						/>
					</div>
				</ScrollArea>
			</DialogDescription>
		</DialogContent>
	)
}

export default ReferFriendDialog;