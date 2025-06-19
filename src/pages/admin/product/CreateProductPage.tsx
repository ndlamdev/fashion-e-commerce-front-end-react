/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 09:10 AM - 14/04/2025
 *  User: Lam Nguyen
 **/

import { SolarArrowLeftLinear } from "@/assets/images/icons/SolarArrowLeftLinear.tsx";
import { SolarInfoCircleLinear } from "@/assets/images/icons/SolarInfoCircleLinear.tsx";
import BaseInfo from "@/components/admin/product/BaseInfo.tsx";
import OrganizationManager from "@/components/admin/product/OrganizationManager.tsx";
import PriceManager from "@/components/admin/product/PriceManager.tsx";
import PublishManager from "@/components/admin/product/PublishManager.tsx";
import ShippingManager from "@/components/admin/product/ShippingManager.tsx";
import { useTranslation } from "react-i18next";
import VariantManager from "@/components/admin/product/VariantManager.tsx";
import QuillEditorConfig from "@/components/editor/QuillEditorConfig.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import CreateProductPageContext from "@/context/CreateProductPageContext.tsx";
import "katex/dist/katex.min.css";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useContext, useEffect, useRef, useState } from "react";
import DialogChooseMedia from "./dialogs/DialogChooseMedia";
import MediaResponse from "@/domain/response/media.response";

function CreateProductPage({ titlePage = "Thêm sản phẩm" }: { titlePage?: string }) {
  useEffect(() => {
    document.title = "KimiFashion - " + titlePage;
  }, [titlePage]);

  return (
    <CreateProductPageContext.Provider
      value={{
        borderStyle: "border-1 border-gray-400",
        sectionStyle: "rounded-xl border-1 border-gray-300 bg-white p-5",
      }}>
      <CreateProductMainPage titlePage={titlePage} />
    </CreateProductPageContext.Provider>
  );
}

const CreateProductMainPage = ({ titlePage }: { titlePage: string }) => {
  const refQuill = useRef<Quill | undefined>(undefined);
  const createProductPageContext = useContext(CreateProductPageContext);
  const [options, setOptions] = useState<Record<string, string[]>>({});
  const [mediaChoose, setMediaChoose] = useState<MediaResponse[]>([]);

	const { t } = useTranslation(undefined, {
		keyPrefix: "page.admin.products"
	});
  useEffect(() => {
    document.title = titlePage;
    if (refQuill.current) return;
    refQuill.current = QuillEditorConfig.initQuill({
      uploadImageHandler: (file) => {
        console.log(file);
      },
    });
  });

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    html.style.overflowY = "hidden";
    return () => {
      html.style.overflowY = "";
    };
  }, []);

  return (
    <>
      <div>
        <h1 className={"mb-5 flex items-center gap-2 text-xl font-bold"}>
          <SolarArrowLeftLinear width={28} height={28} className={"aspect-square rounded-sm p-0.5 hover:bg-gray-300"} />
          {titlePage}
        </h1>
        <div className={"grid grid-cols-1 grid-rows-1 gap-3 lg:grid-cols-8"}>
          <div className={"col-span-5 flex flex-col gap-3"}>
            <section className={`${createProductPageContext.sectionStyle}`}>
              <BaseInfo className={"flex flex-col gap-5"} />
            </section>
            <section className={`flex flex-col ${createProductPageContext.sectionStyle}`}>
							<h3 className={"mb-2 pb-0 font-semibold"}>{t("price")}</h3>
							<PriceManager
                onDataChange={(data) => {
                  console.log(data);
                }}
              />
            </section>
            <section className={`flex flex-col ${createProductPageContext.sectionStyle}`}>
							<h3 className={"mb-2 pb-0 font-semibold"}>{t("transport")}</h3>
              <ShippingManager />
            </section>
            <section className={`flex flex-col ${createProductPageContext.sectionStyle}`}>
							<h3 className={"mb-2 pb-0 font-semibold"}>{t("variant")}</h3>
              <VariantManager setOptions={setOptions} />
            </section>
          </div>
          <div className={"col-span-3 flex flex-col gap-3"}>
            <section className={`flex flex-col ${createProductPageContext.sectionStyle}`}>
              <h3 className={"mb-2 pb-0 text-[15px] font-semibold"}>
								<span>{t("status")}</span>
              </h3>
              <Select defaultValue={"Active"}>
                <SelectTrigger className={`mt-1 w-full ${createProductPageContext.borderStyle}`}>
									<SelectValue placeholder={t("active")} />
                </SelectTrigger>
                <SelectContent>
									<SelectItem value='Active'>{t("active")}</SelectItem>
									<SelectItem value='Draft'>{t("draft")}</SelectItem>
                </SelectContent>
              </Select>
            </section>
            <section className={`flex flex-col ${createProductPageContext.sectionStyle}`}>
              <h3 className={"mb-2 pb-0 text-[15px] font-semibold"}>
								<span>{t("publish")}</span>
              </h3>
              <PublishManager
                onDateOpenStoreChange={(value) => {
                  console.log(value);
                }}
              />
            </section>
            <section className={`flex flex-col ${createProductPageContext.sectionStyle}`}>
              <h3 className={"mb-2 pb-0 text-[15px] font-semibold"}>
								<span>{t("product_org")}</span>
                <SolarInfoCircleLinear width={15} height={15} className={"ml-2 inline"} color={"gray"} strokeWidth={2.5} />
              </h3>
              <OrganizationManager className={"flex flex-col gap-3"} />
            </section>
          </div>
        </div>
      </div>
      <DialogChooseMedia mediaChoose={mediaChoose} setMediaChoose={setMediaChoose} />
    </>
  );
};

export default CreateProductPage;
