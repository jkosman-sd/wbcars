import React from 'react';

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
  answerPlainText?: string;
}

export interface FaqSectionProps {
  items: FaqItem[];
}
