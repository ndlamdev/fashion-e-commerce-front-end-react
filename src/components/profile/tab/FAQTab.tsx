import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.tsx";
import { faqValues } from "@/components/profile/props/faq.props.ts";
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
        {Object.keys(faqValues).map((key, index) => {
          return (
            <AccordionItem value={key} key={`FAG-${key}`}>
              <AccordionTrigger className={"font-bold"}>{faqValues[index].title}</AccordionTrigger>
              <AccordionContent>{faqValues[index].content}</AccordionContent>
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
