import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { FaqJsonLd } from './faq-json-ld';
import { FaqItem, FaqSectionProps } from './types';

export const FaqSection = ({ items }: FaqSectionProps) => {
  const jsonLdItems = items
    .filter((item): item is FaqItem & { answerPlainText: string } => !!item.answerPlainText)
    .map(({ question, answerPlainText }) => ({ question, answerPlainText }));

  return (
    <section aria-label='FAQ' className='w-full'>
      {jsonLdItems.length > 0 && <FaqJsonLd items={jsonLdItems} />}

      <Accordion type='single' collapsible className='w-full'>
        {items.map(({ question, answer }, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className='font-montserrat text-left text-2xl leading-tight font-medium text-foreground hover:text-primary hover:no-underline md:text-3xl lg:text-[32px] lg:leading-8 [&>svg]:text-primary'>
              {question}
            </AccordionTrigger>
            <AccordionContent className='font-montserrat text-base leading-relaxed text-muted-foreground md:text-lg lg:text-xl'>
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
