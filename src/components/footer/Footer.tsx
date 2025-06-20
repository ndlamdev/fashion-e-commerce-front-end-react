/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:08PM - 05/03/2025
 *  User: lam-nguyen
 **/
import { BiTwitterX } from "@/assets/images/icons/BiTwitterX";
import { LogosFacebook } from "@/assets/images/icons/LogosFacebook";
import { LogosYoutubeIcon } from "@/assets/images/icons/LogosYoutubeIcon";
import { SkillIconsInstagram } from "@/assets/images/icons/SkillIconsInstagram";
import { SolarArrowRightLinear } from "@/assets/images/icons/SolarArrowRightLinear.tsx";
import logo from "@/assets/images/icons/logo.jpg";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={"bg-black py-[40px] text-white"}>
      <div className={"mx-[50px] lg:mx-[100px] xl:mx-[150px]"}>
        <div className={"grid grid-flow-row grid-cols-4 gap-5"}>
          <div className={"col-span-4 row-span-1 md:hidden"}>
            <h6>{t("footer.shopping.title")}</h6>
            <h6>{t("footer.company_info.title")}</h6>
            <h6>{t("footer.help.title")}</h6>
          </div>
          <div className={"hidden md:block"}>
            <h6 className={"mb-4 font-bold"}>{t("footer.shopping.title")}</h6>
            <ul className={"flex flex-col gap-1"}>
              <li>{t("footer.shopping.shipping")}</li>
              <li>{t("footer.shopping.payment")}</li>
              <li>{t("footer.shopping.return")}</li>
              <li>{t("footer.shopping.store_locator")}</li>
              <li>{t("footer.shopping.magazine")}</li>
            </ul>
          </div>
          <div className={"hidden md:block"}>
            <h6 className={"mb-4"}>{t("footer.company_info.title")}</h6>
            <ul className={"flex flex-col gap-1"}>
              <li>{t("footer.company_info.careers")}</li>
              <li>{t("footer.company_info.about")}</li>
              <li>{t("footer.company_info.sustainability")}</li>
              <li>{t("footer.company_info.press")}</li>
              <li>{t("footer.company_info.investor_relations")}</li>
              <li>{t("footer.company_info.corporate_governance")}</li>
            </ul>
          </div>
          <div className={"hidden md:block"}>
            <h6 className={"mb-4"}>{t("footer.help.title")}</h6>
            <ul className={"flex flex-col gap-1"}>
              <li>{t("footer.help.customer_service")}</li>
              <li>{t("footer.help.my_account")}</li>
              <li>{t("footer.help.terms_conditions")}</li>
              <li>{t("footer.help.contact")}</li>
              <li>{t("footer.help.cookie_info")}</li>
              <li>{t("footer.help.payment_info")}</li>
              <li>{t("footer.help.order_success")}</li>
              <li>{t("footer.help.cookie_settings")}</li>
            </ul>
          </div>
          <div className={"col-span-4 md:col-span-1"}>
            <h6 className={"mb-4 block text-center md:inline-block"}>{t("footer.join_now.title")}</h6>
            <div>
              <p className={"block text-center font-medium md:inline"}>
                {t("footer.join_now.text")}
              </p>
            </div>
            <p className={"mt-3 flex justify-center md:justify-start"}>
              <a href='#'>
                <span className={"text-decoration-underline text-white"}>{t("footer.join_now.read_more")}</span>
                <span>
                  <SolarArrowRightLinear className={"inline"} color={"white"} />
                </span>
              </a>
            </p>
          </div>
        </div>
        <div className={"mt-5 flex flex-col items-center gap-4"}>
          <div className={"flex flex-col items-center gap-2"}>
            <h3>{t("footer.social_media")}</h3>
            <div className={"flex gap-3"}>
              {Object.entries(socialList).map(([key, { url, icon }]) => (
                <a key={key} href={url} target='_blank' rel='noopener noreferrer'>
                  {icon}
                </a>
              ))}
            </div>
          </div>
          <p>{t("footer.copyright")}</p>
          <div className={"p-4"}>
            <img src={logo} alt='KimiFashion Logo' className={"h-10 w-10  rounded-sm"} />
          </div>
        </div>
      </div>
    </footer>
  );
}

const socialList: Record<string, { url: string; icon: ReactNode }> = {
  facebook: {
    url: "https://www.facebook.com/KimiFashion",
    icon: <LogosFacebook width={30} height={30} />,
  }
  ,
  instagram: {
    url: "https://www.instagram.com/KimiFashion",
    icon: <SkillIconsInstagram width={30} height={30} />,
  },
  twitter: {
    url: "https://www.twitter.com/KimiFashion",
    icon: <BiTwitterX width={30} height={30} />,
  },
  youtube: {
    url: "https://www.youtube.com/KimiFashion",
    icon: <LogosYoutubeIcon width={30} height={30} />,
  },
};

export default Footer;
