import { MENU_DATA } from "@shared/menu-data";

export function useFaqs() {
  const faqs = MENU_DATA.faqs.map((faq, idx) => ({
    id: idx + 1,
    question: faq.question,
    answer: faq.answer,
    category: "General"
  }));

  return { data: faqs, isLoading: false };
}
