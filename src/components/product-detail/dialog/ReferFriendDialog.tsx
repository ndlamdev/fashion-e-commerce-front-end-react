import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { toast } from "sonner";
import { Check, Copy, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { hiddenDialog } from "@/redux/slice/dialog.slice.ts";
import { useTranslation } from "react-i18next";

const ReferFriendDialog = () => {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.product_details.dialog.refer_friend"
	});
	const dispatch = useDispatch();
	const { dialog } = useSelector((state: RootState) => state.dialog);
	return (
		<Dialog open={dialog === "refer-friend"} onOpenChange={() => dispatch(hiddenDialog())}>
			<DialogContent className={"pb-0 xl:max-w-[660px]!"}>
				<DialogTitle/>
				<DialogDescription>
					<ScrollArea className={"h-146 border-none"}>
						<div className={"grid lg:grid-cols-1 xl:grid-cols-2"}>
							<div>
								<p className={"pe-6 text-3xl font-bold"}>{t('title')}</p>
								<p className={"my-5 text-sm"}>
									{t("description")}
								</p>
								<div className={"mb-3 rounded-lg bg-neutral-100 p-3"}>
									<p className={"text-sm text-neutral-400 uppercase"}>{t("send_refer_code_to_your_friend")}</p>
									<div className={"border-1 border-neutral-300"}></div>
									<p className={"flex items-center justify-between p-2"}>
										<span className={"text-lg text-neutral-700 uppercase"}></span>
										<span
											onClick={() => {
												navigator.clipboard.writeText('copied!').finally()
												toast(t('copied'));
											}}
											className={"flex cursor-pointer text-sm text-blue-700"}>
															<Copy className={"mx-1"} /> {t("copy")}
														</span>
									</p>
								</div>
								<div className={"mb-3 rounded-lg bg-neutral-100 p-3"}>
									<p className={"text-sm text-neutral-400 uppercase"}>{t("send_refer_link_to_your_friend")}</p>
									<div className={"flex items-center justify-between rounded-3xl border-2 bg-white px-2"}>
										<Input className={"w-3/4! border-none! focus-visible:border-none"} type={"text"} value={"http://localhost:5173/product-detail"} />
										<span
											onClick={() => {
												navigator.clipboard.writeText('copied!').finally()
												toast(t('copied'));
											}}
											className={"flex cursor-pointer text-sm text-blue-700"}>
															<Copy className={"mx-1"} /> {t("copy")}
														</span>
									</div>
								</div>

								<Button onClick={() => toast(t('copied'))} className={"mb-2 w-full cursor-pointer rounded-2xl"} variant={"default"}>
									<Share2 />
									<span>{t('share')}</span>
								</Button>

								<p className={"text-sm font-bold"}>{t('to_given_cash')}:</p>
								<ul className={"text-sm"}>
									<li className={"flex items-center"}>
										<Check className={"mr-1 size-4 flex-none"} /> <span className={"shrink text-sm"}>{t('to_given_cash_tick_1')}</span>
									</li>
									<li className={"flex items-center"}>
										<Check className={"mr-1 size-4 flex-none"} />
										<span className={"shrink text-sm"}>{t('to_given_cash_tick_2')}</span>
									</li>
									<li className={"flex items-center"}>
										<Check className={"mr-1 size-4 flex-none"} />
										<span className={"shrink text-sm"}>
															{t('to_given_cash_tick_3')}
														</span>
									</li>
								</ul>

								<NavLink to={"/"}>
									<span className={"text-xs text-gray-400 underline decoration-gray-400"}>*{t('terms_and_policies')}</span>
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
		</Dialog>
	)
}

export default ReferFriendDialog;