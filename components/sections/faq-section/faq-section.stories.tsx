import type { Meta, StoryObj } from '@storybook/nextjs';

import { FaqSection } from './faq-section';

const meta = {
  title: 'Sections/FaqSection',
  component: FaqSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FaqSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    question: 'Jak długo trwa detailing samochodu?',
    answer: (
      <p>
        Czas detailingu zależy od zakresu usługi. Podstawowe mycie i odkurzanie zajmuje około 2–3 godzin, natomiast
        pełny detailing z korektą lakieru i powłoką ceramiczną może potrwać nawet 2–3 dni.
      </p>
    ),
    answerPlainText:
      'Czas detailingu zależy od zakresu usługi. Podstawowe mycie i odkurzanie zajmuje około 2–3 godzin, natomiast pełny detailing z korektą lakieru i powłoką ceramiczną może potrwać nawet 2–3 dni.',
  },
  {
    question: 'Czy powłoka ceramiczna chroni przed zarysowaniami?',
    answer: (
      <p>
        Powłoka ceramiczna zwiększa twardość powierzchni lakieru i zapewnia ochronę przed drobnymi zarysowaniami, pyłem
        i promieniowaniem UV. Nie jest jednak odporna na głębokie rysy mechaniczne.
      </p>
    ),
    answerPlainText:
      'Powłoka ceramiczna zwiększa twardość powierzchni lakieru i zapewnia ochronę przed drobnymi zarysowaniami, pyłem i promieniowaniem UV. Nie jest jednak odporna na głębokie rysy mechaniczne.',
  },
  {
    question: 'Jak często powinienem oddawać auto do detailingu?',
    answer: (
      <p>
        Zalecamy profesjonalny detailing co 6–12 miesięcy, w zależności od warunków użytkowania pojazdu. Regularne mycie
        należy wykonywać częściej — co 2–4 tygodnie.
      </p>
    ),
    answerPlainText:
      'Zalecamy profesjonalny detailing co 6–12 miesięcy, w zależności od warunków użytkowania pojazdu. Regularne mycie należy wykonywać częściej — co 2–4 tygodnie.',
  },
  {
    question: 'Czy mogę umówić się na wizytę online?',
    answer: (
      <p>
        Tak, przyjmujemy rezerwacje przez formularz na stronie oraz telefonicznie. Zalecamy wcześniejszy kontakt,
        ponieważ terminy rozchodzą się szybko, szczególnie w sezonie letnim.
      </p>
    ),
    answerPlainText:
      'Tak, przyjmujemy rezerwacje przez formularz na stronie oraz telefonicznie. Zalecamy wcześniejszy kontakt, ponieważ terminy rozchodzą się szybko, szczególnie w sezonie letnim.',
  },
  {
    question: 'Jakie pojazdy obsługujecie?',
    answer: (
      <p>
        Obsługujemy samochody osobowe, SUV-y, samochody sportowe oraz pojazdy premium i luksusowe. Każde zlecenie
        traktujemy indywidualnie, dopasowując zakres usług do potrzeb klienta.
      </p>
    ),
    answerPlainText:
      'Obsługujemy samochody osobowe, SUV-y, samochody sportowe oraz pojazdy premium i luksusowe. Każde zlecenie traktujemy indywidualnie, dopasowując zakres usług do potrzeb klienta.',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const SingleItem: Story = {
  args: {
    items: [sampleItems[0]],
  },
};
