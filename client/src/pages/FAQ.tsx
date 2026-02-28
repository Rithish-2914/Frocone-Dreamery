import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFaqs } from "@/hooks/use-faqs";

export default function FAQ() {
  const { data: faqs = [] } = useFaqs();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Questions & Answers</h1>
          <p className="text-gray-600">
            Everything you need to know about Frocone Creamery.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq: any) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
