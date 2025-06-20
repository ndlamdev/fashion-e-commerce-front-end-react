import { toast } from "sonner";
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ReferFriendTab = memo(() => {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.refer_friend_tab",
	});
	return (
		<article className={"max-sm:mt-10"}>
			<h1 className={"text-lg font-bold normal-case sm:text-2xl lg:text-4xl"}>{t('title')}</h1>
			<section className={"box-border flex items-center justify-between max-lg:flex-wrap max-lg:space-y-5 max-sm:w-full sm:mt-5 lg:space-x-5"}>
				<div className='rounded-lg bg-neutral-100 p-4'>
					<h2 className='text-sm font-bold sm:text-lg'>{t('given_cash')}</h2>
					<p className='text-xs sm:text-sm'>{t('simple_refer')}</p>
					<div className='mt-5 grid grid-cols-3 gap-2 max-md:grid-cols-1'>
						<div className='flex flex-col items-center space-y-2'>
							<img
								className={"size-12 sm:size-18"}
								src='https://media3.coolmate.me/cdn-cgi/image/width=300,height=442,quality=80/uploads/February2025/mceclip2_16.png'
								alt=''
							/>
							<p className={"text-xs text-sky-600 sm:text-base"}>{t('get_code_or_link')}</p>
							<p className={"text-center text-xs sm:text-base"}>{t('club')}</p>
						</div>
						<div className='flex flex-col items-center space-y-2'>
							<img
								className={"size-12 sm:size-18"}
								src='https://media3.coolmate.me/cdn-cgi/image/width=300,height=442,quality=80/uploads/February2025/mceclip0_87.png'
								alt=''
							/>
							<p className={"text-xs text-sky-600 sm:text-base"}>{t('share_with_friend')}</p>
							<p className={"text-center text-xs sm:text-base"}>{t('gift')}</p>
						</div>
						<div className='flex flex-col items-center space-y-2'>
							<img
								className={"size-12 sm:size-18"}
								src='https://media3.coolmate.me/cdn-cgi/image/width=300,height=442,quality=80/uploads/February2025/mceclip1_85.png'
								alt=''
							/>
							<p className={"text-xs text-sky-600 sm:text-base"}>{t('receiver_cash')}</p>
							<p className={"text-center text-xs sm:text-base"}>{t('give_cash_by_percent_order')}</p>
						</div>
					</div>
				</div>

				<div className='rounded-lg bg-neutral-100 p-4'>
					<h2 className='my-1 text-sm font-bold sm:text-lg'>{t('refer_code')}</h2>
					<div className='flex items-center justify-between rounded-full bg-white p-2'>
						<span className='text-sm uppercase sm:text-base'>Lorem ipsum.</span>
						<span
							onClick={() => {
								navigator.clipboard.writeText('').finally();
								toast(t('copied_code'));
							}}
							className={"flex cursor-pointer text-sm text-blue-700"}>
							<Copy className={"mx-1 size-4 sm:size-6"} /> {t('copy')}
						</span>
					</div>
					<h2 className='my-1 text-sm font-bold sm:text-lg'>{t('refer_link')}</h2>
					<div className='flex items-center space-x-2 rounded-full bg-white p-1'>
						<Input
							className={"rounded-full !border-none bg-white blur-none focus-visible:border-none!"}
							value={"http://localhost:5173/product-detail"}
							readOnly={true}
						/>
						<span
							onClick={() => {
								navigator.clipboard.writeText('').finally();
								toast(t('copied_code'));
							}}
							className={"flex cursor-pointer text-sm text-blue-700"}>
							<Copy className={"mx-1 size-4 sm:size-6"} /> {t('copy')}
						</span>
					</div>
					<div className='mt-5 border-t pt-3 text-sm'>
						<p className=''>{t('share_description')}</p>
					</div>
				</div>
			</section>
			<section className={"my-5 flex items-center justify-between space-x-3 max-sm:w-full"}>
				<div className='grid grid-cols-1 items-center rounded-3xl bg-blue-600 p-2 text-white max-md:rounded-xl max-sm:h-30 max-sm:w-1/3 sm:grid-cols-2 sm:px-5'>
					<img src='https://mcdn.coolmate.me/image/September2024/mceclip1_29.png' alt='' className='object-cover max-sm:size-10' />
					<div className=''>
						<p className='text-lg font-bold lg:text-4xl'>0</p>
						<p className='text-sm sm:text-base'>{t('given_point')}</p>
					</div>
				</div>
				<div className='grid grid-cols-1 items-center rounded-3xl bg-orange-600 p-2 text-white max-md:rounded-xl max-sm:h-30 max-sm:w-1/3 sm:grid-cols-2 sm:px-5'>
					<img src='https://mcdn.coolmate.me/image/September2024/mceclip2.png' alt='' className='object-cover max-sm:size-10' />
					<div className=''>
						<p className='text-lg font-bold lg:text-4xl'>0</p>
						<p className='text-sm sm:text-base'>{t('processing')}</p>
					</div>
				</div>
				<div className='grid grid-cols-1 items-center rounded-3xl bg-sky-300 p-2 text-white max-md:rounded-xl max-sm:h-30 max-sm:w-1/3 sm:grid-cols-2 sm:px-5'>
					<img src='https://mcdn.coolmate.me/image/September2024/mceclip3_12.png' alt='' className='object-cover max-sm:size-10' />
					<div className=''>
						<p className='text-lg font-bold lg:text-4xl'>0</p>
						<p className='text-sm sm:text-base'>{t('finished')}</p>
					</div>
				</div>
			</section>
			<section>
				<h2 className={"text-sm font-bold uppercase sm:text-lg"}>{t('joined')}</h2>
				<Table>
					<TableHeader>
						<TableRow className='text-xs uppercase sm:text-sm'>
							<TableHead className=''>No.</TableHead>
							<TableHead>{t('friend')}</TableHead>
							<TableHead>{t('status')}</TableHead>
							<TableHead className='text-right'>{t('value')}</TableHead>
						</TableRow>
					</TableHeader>
				</Table>
			</section>
		</article>
	);
});

export default function ReferFriend() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.refer_friend_tab",
	});
 useEffect(() => {
    document.title = "KimiFashion - " + t('title');
  }, []);

	return <ReferFriendTab />;
}
