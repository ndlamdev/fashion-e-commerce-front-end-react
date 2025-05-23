import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils.ts";

export default function Gift(className: { className: string }) {
	return (
		<div className={cn("p-2", className)}>
			<ScrollArea className='mb-5 h-30 rounded-lg border-1 sm:h-45'>
				<div className={""}>
					<div className='bg-neutral-100 p-1 text-xs sm:p-2 sm:text-base'>
						<p>
							Khuyến mãi <span className='font-bold'>Lorem ipsum</span>
						</p>
					</div>
					<div className='flex p-2 sm:p-4'>
						<RadioGroup defaultValue='option-one'>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='option-one'
									id='option-one'
									children={<Circle className='absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 fill-blue-800' />}
								/>
								<Label htmlFor='option-one'>
									<div className='flex space-x-2'>
										<img
											src={"https://media3.coolmate.me/cdn-cgi/image/width=200,height=300,quality=80,format=auto/uploads/January2024/AT.220.TIM.1_11.jpg"}
											alt=''
											className='w-12 rounded-lg object-cover sm:w-20'
										/>
										<div className=''>
											<p className='mb-2 text-xs sm:text-sm'>Lorem ipsum dolor sit.</p>
											<div className='mb-2 flex space-x-2'>
												<Select>
													<SelectTrigger className='w-20 rounded-sm bg-neutral-100 text-xs font-bold sm:w-25 sm:rounded-xl sm:text-sm'>
														<SelectValue placeholder={"lorem1"} />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value={"lorem1"}>lorem1</SelectItem>
														<SelectItem value={"lorem2"}>lorem1</SelectItem>
														<SelectItem value={"lorem3"}>lorem1</SelectItem>
													</SelectContent>
												</Select>

												<Select>
													<SelectTrigger className='w-14 rounded-sm bg-neutral-100 text-xs font-bold uppercase sm:w-20 sm:rounded-xl sm:text-sm'>
														<SelectValue placeholder={"l"} />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value={"l"}>l</SelectItem>
														<SelectItem value={"lorem2"}>lorem1</SelectItem>
														<SelectItem value={"lorem3"}>lorem1</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className='flex'>
												<span className={"mr-4 font-bold"}>lorem</span>
												<span className={"text-gray-500 line-through"}>Lorem ipsum.</span>
											</div>
										</div>
									</div>
								</Label>
							</div>
						</RadioGroup>
					</div>
				</div>
			</ScrollArea>
		</div>
	);
}
