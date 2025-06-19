import { translated } from "@/utils/helper/locale.ts";

interface FaqProps {
	title: string;
	content: string;
}

const tFAQ = (key: string) => translated(key, 'page.profile.faq_tab.faq');

const faqValues: Record<number, FaqProps> = {
	0: {title: tFAQ('faq_1.title'), content: tFAQ('faq_1.content')},
	1: {title: tFAQ('faq_2.title'), content: tFAQ('faq_2.content')},
	2: {title: tFAQ('faq_3.title'), content: tFAQ('faq_3.content')},
	3: {title: tFAQ('faq_4.title'), content: tFAQ('faq_4.content')},
	4: {title: tFAQ('faq_5.title'), content: tFAQ('faq_5.content')},
	5: {title: tFAQ('faq_6.title'), content: tFAQ('faq_6.content')},
	6: {title: tFAQ('faq_7.title'), content: tFAQ('faq_7.content')},
	7: {title: tFAQ('faq_8.title'), content: tFAQ('faq_8.content')},
	8: {title: tFAQ('faq_9.title'), content: tFAQ('faq_9.content')},
	9: {title: tFAQ('faq_10.title'), content: tFAQ('faq_10.content')},
}

export { faqValues };