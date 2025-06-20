import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ReviewTab = () => {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.reviews_tab",
	});
  return (
    <article className={'max-sm:mt-10'}>
      <h1 className={"text-lg lg:text-4xl sm:text-2xl font-bold"}>{t("title")}</h1>
      <p className="text-center italic text-neutral-500 text-xs sm:text-base">{t("not_have")}</p>
    </article>
  );
};

export default function Review() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.reviews_tab",
	});
  useEffect(() => {
    document.title = "KimiFashion - " + t("title");
  }, []);

  return <ReviewTab />;
}