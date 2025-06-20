import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const VoucherWalletTab = () =>{
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.points_tab",
	});
	return (
		<article className={'max-sm:mt-10'}>
			<h1 className={'text-lg lg:text-4xl sm:text-2xl font-bold'}>{t('title')}</h1>
			<p className="italic text-xs sm:text-sm  text-neutral-500 text-center">{t('not_have')}</p>

		</article>
	);
}
export default function VoucherWallet() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.points_tab",
	});
 useEffect(() => {
    document.title = "KimiFashion - " + t('title');
  }, []);

	return <VoucherWalletTab />;
}