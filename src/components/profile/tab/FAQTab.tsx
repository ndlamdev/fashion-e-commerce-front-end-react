import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.tsx";
import { faqValues } from "@/components/profile/props/faq.props.ts";

const FAQTab = () => {
	return (
		<article className={'max-sm:mt-10'}>
			<h1 className={"text-lg lg:text-4xl sm:text-2xl font-bold"}>FAQ - Câu hỏi thường gặp</h1>
			<Accordion type="single" collapsible>
				{Object.keys(faqValues).map((key, index) => {
						return (
							<AccordionItem value={key}>
								<AccordionTrigger className={'font-bold '}>{faqValues[index].title}</AccordionTrigger>
								<AccordionContent>
									{faqValues[index].content}
								</AccordionContent>
							</AccordionItem>
						)
					})}
			</Accordion>

		</article>
	);
};

export default function FAQ() {
	return <FAQTab />;
}