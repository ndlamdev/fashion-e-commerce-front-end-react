import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.tsx";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const FAQTab = () => {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.faq_tab",
	});
  return (
    <article className={"max-sm:mt-10"}>
      <h1 className={"text-lg font-bold sm:text-2xl lg:text-4xl"}>{t("heading")}</h1>
      <Accordion type='single' collapsible>
        {Array.from({length: 10}).map((_, index) => {
          return (
            <AccordionItem value={index+''} key={`FAG-${index}`}>
              <AccordionTrigger className={"font-bold"}>{t(`faq.faq_${index+1}.title`)}</AccordionTrigger>
              <AccordionContent>{t(`faq.faq_${index+1}.content`)}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </article>
  );
};

export default function FAQ() {
  useEffect(() => {
    document.title = "KimiFashion - FAQ";
  }, []);

  return <FAQTab />;
}
