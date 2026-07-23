interface FaqJsonLdItem {
  question: string;
  answerPlainText: string;
}

interface FaqJsonLdProps {
  items: FaqJsonLdItem[];
}

export const FaqJsonLd = ({ items }: FaqJsonLdProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answerPlainText }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answerPlainText,
      },
    })),
  };

  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};
