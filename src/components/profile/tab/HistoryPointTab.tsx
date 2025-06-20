import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const HistoryPointTab = () => {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.points_tab",
	});
	return (
		<article className={"max-sm:mt-10"}>
			<h1 className={"text-lg font-bold sm:text-2xl lg:text-4xl"}>{t('title')}</h1>
			<h2 className={"mt-3 text-sm text-neutral-500 sm:text-lg"}>{t('your_points')}</h2>
			<Table>
				<TableHeader>
					<TableRow className='text-xs uppercase sm:text-sm'>
						<TableHead className=''>{t('awarded_point')}</TableHead>
						<TableHead>{t('expired')}</TableHead>
					</TableRow>
				</TableHeader>
			</Table>
		</article>
	);
};

export default function HistoryPoint() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.points_tab",
	});
 useEffect(() => {
    document.title = "KimiFashion - " + t('title');
  }, []);

	return <HistoryPointTab />;
}
