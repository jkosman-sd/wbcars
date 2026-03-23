import { toPlainText } from 'next-sanity';

import { PageSectionItem } from '@/components/cms/page/sanity-page';
import { RichText } from '@/components/cms/shared/rich-text/rich-text';
import { PageSection } from '@/components/layout/page-section/page-section';
import { FaqSection } from '@/components/sections/faq-section/faq-section';

type SanityFaqSectionProps = PageSectionItem<'faqSection'>;

export const SanityFaqSection = (props: SanityFaqSectionProps) => {
  const { items } = props;

  const faqItems = items.map((item) => ({
    question: item.question,
    answer: <RichText value={item.answer} />,
    answerPlainText: toPlainText(item.answer),
  }));

  return (
    <PageSection>
      <FaqSection items={faqItems} />
    </PageSection>
  );
};
