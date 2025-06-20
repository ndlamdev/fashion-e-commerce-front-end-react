import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { SameRadioGroup, SameRadioGroupItem } from "@/components/radio-group/SameRadioGroup.tsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { hiddenDialog } from "@/redux/slice/dialog.slice.ts";
import { useTranslation } from "react-i18next";

const GuideChooseSizeDialog = () => {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.product_details.dialog.guide_choose_size"
	});
	const dispatch = useDispatch();
	const { dialog } = useSelector((state: RootState) => state.dialog);
	// handle data height range Slider component
	const [heightValue, setHeightValue] = useState<number[]>([0]); // Giá trị mặc định

	const handleHeightChange = (newValue: number[]) => {
		setHeightValue(newValue);
	};

	// handle data weight range Slider component
	const [weightValue, setWeightValue] = useState<number[]>([0]); // Giá trị mặc định

	const handleWeightChange = (newValue: number[]) => {
		setWeightValue(newValue);
	};
	return (
		<Dialog open={dialog === 'guide-choose-size'} onOpenChange={() => dispatch(hiddenDialog())}>
			<DialogContent className={"max-w-[910px]!"}>
				<DialogTitle/>
				<DialogDescription>
					<Tabs className={"relative"} defaultValue='choose-size'>
						<TabsList className={"h-auto cursor-pointer rounded-2xl border-2 border-gray-300 bg-white p-0 text-black"}>
							<TabsTrigger
								className={
									"h-12 cursor-pointer rounded-xl border-none bg-white font-bold data-[state=active]:bg-gray-200 data-[state=active]:shadow-none"
								}
								value='choose-size'>
								{t('guide_choose_size_tab')}
							</TabsTrigger>
							<TabsTrigger
								className={
									"h-12 cursor-pointer rounded-xl border-none bg-white font-bold data-[state=active]:bg-gray-200 data-[state=active]:shadow-none"
								}
								value='size-table'>
								{t('table_size_tab')}
							</TabsTrigger>
						</TabsList>
						<TabsContent className={"py-5 lg:px-20"} value='choose-size'>
							<div className='flex w-full'>
								<span className='flex-none px-4 text-gray-500'>{t('height')}</span>
								<Slider
									className={"shrink"}
									onValueChange={handleHeightChange}
									defaultValue={heightValue}
									min={0}
									max={0}
									step={1}
								/>
								<span className='flex-none px-4 text-blue-700'>{heightValue} cm</span>
							</div>

							<div className='my-5 flex w-full'>
								<span className='flex-none px-4 text-gray-500'>{t('weight')}</span>
								<Slider
									className={"shrink"}
									onValueChange={handleWeightChange}
									defaultValue={heightValue}
									min={0}
									max={0}
									step={1}
								/>
								<span className='flex-none px-4 text-blue-700'>{weightValue} kg</span>
							</div>

							<SameRadioGroup className={"flex"} defaultValue={"option-1"}>
								<div className='w-1/3 rounded-lg bg-[url(https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2023/mceclip1_23.jpg)] bg-cover bg-center bg-no-repeat'>
									<SameRadioGroupItem className={`relative h-full w-full cursor-pointer border-none shadow-none`} value='option-1' id='option-1'>
										<div className={`absolute inset-0 size-full h-full rounded-lg outline-4 outline-offset-2 outline-blue-700`}></div>
									</SameRadioGroupItem>
								</div>
								<div className='w-1/3 rounded-lg bg-[url(https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2023/mceclip3_97.jpg)] bg-cover bg-center bg-no-repeat'>
									<SameRadioGroupItem className={`relative h-full w-full cursor-pointer border-none shadow-none`} value='option-2' id='option-2'>
										<div className={`absolute inset-0 size-full h-full rounded-lg outline-4 outline-offset-2 outline-blue-700`}></div>
									</SameRadioGroupItem>
								</div>
								<div className='w-1/3 rounded-lg bg-[url(https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2023/mceclip0_45.png)] bg-cover bg-center bg-no-repeat'>
									<SameRadioGroupItem className={`relative h-full w-full cursor-pointer border-none shadow-none`} value='option-3' id='option-3'>
										<div className={`absolute inset-0 size-full h-full rounded-lg outline-4 outline-offset-2 outline-blue-700`}></div>
									</SameRadioGroupItem>
								</div>
							</SameRadioGroup>
							<p className='my-3 font-bold'>{t('suggest')}:</p>
							<div className='flex flex-wrap space-y-2 space-x-4'>
								<div className='flex rounded-full bg-black p-1 text-center text-white'>Lorem ipsum.</div>
								<div className='flex rounded-full bg-black p-1 text-center text-white'>Lorem ipsum.</div>
								<div className='flex rounded-full bg-black p-1 text-center text-white'>Lorem ipsum.</div>
								<div className='flex rounded-full bg-black p-1 text-center text-white'>Lorem ipsum.</div>
							</div>
						</TabsContent>
						<TabsContent value='size-table'>
							<Table>
								<TableCaption className={"break-all"}>
									{t('description')}
								</TableCaption>
								<TableHeader className={"bg-blue-700"}>
									<TableRow>
										<TableHead className={"text-white"}>Size</TableHead>
										<TableHead className={"text-white"}>M</TableHead>
										<TableHead className={"text-white"}>L</TableHead>
										<TableHead className={"text-white"}>XL</TableHead>
										<TableHead className={"text-white"}>2XL</TableHead>
										<TableHead className={"text-white"}>3XL</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow className='text-sm font-bold break-all'>
										<TableCell>{t('height')}</TableCell>
										<TableCell>1m60 - 1m65</TableCell>
										<TableCell>1m66 - 1m72</TableCell>
										<TableCell>1m72 - 1m77</TableCell>
										<TableCell>1m77 - 1m84</TableCell>
										<TableCell>
											<span>1m85 - 1m92</span>
										</TableCell>
									</TableRow>

									<TableRow className='text-sm font-bold'>
										<TableCell>{t('weight')}</TableCell>
										<TableCell> 55kg - 61kg</TableCell>
										<TableCell>62kg - 68kg</TableCell>
										<TableCell>69kg - 75kg</TableCell>
										<TableCell>76kg - 84kg</TableCell>
										<TableCell>85kg - 90kg</TableCell>
									</TableRow>

									<TableRow className='text-sm font-bold'>
										<TableCell>{t('long_shirt')}</TableCell>
										<TableCell>68.5</TableCell>
										<TableCell>70.5</TableCell>
										<TableCell>72.5</TableCell>
										<TableCell>74.5</TableCell>
										<TableCell>76</TableCell>
									</TableRow>

									<TableRow className='text-sm font-bold'>
										<TableCell>{t('wide_chest')}</TableCell>
										<TableCell>52.7</TableCell>
										<TableCell>54.7</TableCell>
										<TableCell>56.7</TableCell>
										<TableCell>59.7</TableCell>
										<TableCell>62.7</TableCell>
									</TableRow>

									<TableRow className='text-sm font-bold'>
										<TableCell>{t('long_sleeves')}</TableCell>
										<TableCell>58.5</TableCell>
										<TableCell>60.5</TableCell>
										<TableCell>62.5</TableCell>
										<TableCell>64.5</TableCell>
										<TableCell>66.5</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TabsContent>
					</Tabs>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	)
}
export default GuideChooseSizeDialog;