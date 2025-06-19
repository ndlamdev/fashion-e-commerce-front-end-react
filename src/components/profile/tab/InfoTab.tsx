import { memo, useEffect } from "react";
import { InfoTabProps } from "@/components/profile/props/infoTab.props.ts";
import { Button } from "@/components/ui/button.tsx";
import { formatDateFromArray } from "@/utils/helper/format-data.ts";
import { getGenderByValue } from "@/components/profile/props/editInfoProfileDialog.props.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { showDialog } from "@/redux/slice/dialog.slice.ts";
import { useTranslation } from "react-i18next";

const InfoTab = memo((props: Partial<InfoTabProps>) => {
  const dispatch = useDispatch();
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.info_tab",
	});
  return (
    <article className={"space-y-10 max-md:space-y-5 max-sm:mt-10"}>
      <h1 className={"text-4xl font-bold max-md:text-xl"}>{t('title')}</h1>
      <div className='grid grid-cols-2 place-items-start gap-4 text-sm text-neutral-500 md:text-lg xl:text-xl'>
        <span>{t('full_name')}</span>
        {props.full_name ? <span className={"text-black"}>{props.full_name}</span> : <span className={"text-sm text-neutral-500 italic"}>{t('not_updated_yet')}</span>}
        <span>{t('phone')}</span>
        {props.phone ? <span className={"text-black"}>{props.phone}</span> : <span className={"text-sm text-neutral-500 italic"}>{t('not_updated_yet')}</span>}
        <span>{t('gender')}</span>{" "}
        {props.gender ? (
          <span className={"text-black"}>{getGenderByValue(props.gender)?.name}</span>
        ) : (
          <span className={"text-sm text-neutral-500 italic"}>{t('not_updated_yet')}</span>
        )}
        <span>{t('birthday')}</span>
        {props.birthday ? (
          <span className={"text-black"}>{formatDateFromArray(props.birthday)}</span>
        ) : (
          <span className={"text-sm text-neutral-500 italic"}>{t('update_birthday')}</span>
        )}
        <span>{t('height')}</span>
        {props.height ? <span className={"text-black"}>{props.height}</span> : <span className={"text-sm text-neutral-500 italic"}>{t('not_updated_yet')}</span>}
        <span>{t('weight')}</span>
        {props.weight ? <span className={"text-black"}>{props.weight}</span> : <span className={"text-sm text-neutral-500 italic"}>{t('not_updated_yet')}</span>}
        <Button
          onClick={() => dispatch(showDialog("edit-info-profile"))}
          className={
            "cursor-pointer rounded-full border border-black bg-white p-5 text-xl font-bold text-black hover:border-neutral-500 hover:bg-black hover:text-white max-md:text-sm"
          }>
					{t('update')}
        </Button>
      </div>

      <h1 className={"text-4xl font-bold max-md:text-xl"}>{t('sign_in_info')}</h1>
      <div className='grid grid-cols-2 place-items-start gap-4 text-sm even:text-neutral-500 md:text-lg xl:text-xl'>
        <span>{t('email')}</span>
        {props.email ? <span className={"text-black"}>{props.email}</span> : <span className={"text-sm text-neutral-500 italic"}>{t('not_updated_yet')}</span>}
        <span>{t('password')}</span> <span>******************</span>
        <Button
          onClick={() => dispatch(showDialog("change-password"))}
          className={
            "cursor-pointer rounded-full border border-black bg-white p-5 text-xl font-bold text-black hover:border-neutral-500 hover:bg-black hover:text-white max-md:text-sm"
          }>
					{t('update')}
        </Button>
      </div>
    </article>
  );
});

export default function Info() {
  const { user } = useSelector((state: RootState) => state.auth);
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.info_tab",
	});

  useEffect(() => {
    document.title = "KimiFashion - " + t('title');
  }, []);

  if (!user) return <Skeleton />;
  return <InfoTab {...user} />;
}
