---
type: 'implementation-plan'
scope: 'feature'
feature_name: 'faq-section'
source: 'brak Figmy – design oparty na istniejącym design systemie projektu'
context_source: 'README.md + globals.css + istniejące komponenty sekcji'
output_file: 'faq-plan.md'
---

## 1. Summary

Sekcja FAQ (Frequently Asked Questions) to modułowy blok treści zarządzany przez Sanity CMS, który może być dodany do dowolnej strony jako kolejna sekcja. Renderuje listę pytań i odpowiedzi w postaci single akordeonu (jedno pytanie otwarte naraz, domyślnie wszystkie zwinięte). Pasuje do istniejącego flow sekcji strony: Sanity schema → CMS adapter → Presentational component.

**Kluczowe założenia:**
- Akordeon typu `single`, pierwsze pytanie domyślnie zwinięte
- Komponent generuje `FAQPage` JSON-LD schema markup dla Google rich results — pytania mogą pojawiać się bezpośrednio w wynikach wyszukiwania jako rozwijalne snippety, co bezpośrednio podnosi SEO strony

---

## 2. Frontend Plan

- [ ] **Użyj shadcn/ui Accordion** (`components/ui/accordion.tsx`) — idealnie pasuje do FAQ. Jeśli jeszcze nie zainstalowany, dodaj przez `pnpm dlx shadcn@latest add accordion`.
- [ ] **Utwórz komponent prezentacyjny** w ścieżce:
  ```
  components/sections/faq-section/
  ├── faq-section.tsx          # Główny komponent
  ├── faq-section.stories.tsx  # Storybook stories
  └── types.ts                 # Typy props
  ```
- [ ] **Interfejs props** (`types.ts`):
  - `title: string` — nagłówek sekcji (np. "Najczęściej zadawane pytania")
  - `subtitle?: string` — opcjonalny podtytuł / lead
  - `items: { question: string; answer: React.ReactNode }[]` — lista pytań i odpowiedzi
- [ ] **Struktura komponentu** `FaqSection`:
  - Wrapping w `<section>` z `aria-labelledby` wskazującym na nagłówek
  - `<h2>` dla tytułu sekcji (zgodnie z hierarchią nagłówków strony)
  - `<p>` dla opcjonalnego podtytułu
  - shadcn/ui `<Accordion type="single" collapsible>` bez `defaultValue` (wszystkie zwinięte na start)
    - Każdy element: `<AccordionItem value={`item-${index}`}>` → `<AccordionTrigger>` (pytanie) → `<AccordionContent>` (odpowiedź)
  - Treść odpowiedzi renderowana przez `RichText` (obsługa Portable Text z Sanity)
- [ ] **JSON-LD script** (`<FaqJsonLd>`) — osobny podkomponent generujący structured data:
  - Ścieżka: `components/sections/faq-section/faq-json-ld.tsx`
  - Server Component renderujący `<script type="application/ld+json">` z `FAQPage` schema
  - Przyjmuje `items: { question: string; answer: string }[]` — `answer` jako plain text (strip HTML/Portable Text do stringa)
  - Umieszczony wewnątrz `FaqSection`, renderowany bezpośrednio w JSX (Next.js App Router pozwala na to bez `next/head`)
- [ ] **Responsywność** (mobile-first):
  - Mobile: pełna szerokość, padding `px-4`
  - Tablet (`md:`): padding `px-8`
  - Desktop (`lg:`): max-width ograniczony do czytelnej linii (`max-w-3xl` lub `max-w-4xl`), wycentrowany
- [ ] **Styl zgodny z projektem**:
  - Nagłówek sekcji: `font-montserrat uppercase font-medium` (jak w `ImageSection`)
  - Żółta kreska akcentująca pod tytułem: `h-0.5 w-full bg-primary`
  - Kolory: `text-foreground`, `bg-background`
- [ ] **Storybook** (`faq-section.stories.tsx`):
  - `Default` story z przykładowymi 4–5 pytaniami
  - `SingleItem` story z jednym pytaniem
  - Parametr `layout: 'fullscreen'`

---

## 3. Sanity CMS Plan

- [ ] **Utwórz schemat sekcji** w:
  ```
  sanity/schemas/sections/faq-section.ts
  ```
  Struktura schematu:
  - `name: 'faqSection'`, `type: 'object'`, `title: 'FAQ Section'`
  - Pole `title` (string, wymagane) — tytuł sekcji
  - Pole `subtitle` (string, opcjonalne) — podtytuł / lead
  - Pole `items` (array, wymagane, min. 1 element) — lista pytań:
    - `_key` (generowany automatycznie przez Sanity)
    - `question` (string, wymagane) — treść pytania
    - `answer` (blockContent / `blockContentSection`, wymagane) — treść odpowiedzi jako Portable Text

- [ ] **Zarejestruj schemat** w `sanity/schemas/index.ts`:
  - Zaimportuj `faqSection` z `'./sections/faq-section'`
  - Dodaj do tablicy `schemaTypes`

- [ ] **Aktualizacja GROQ query** w `sanity/schemas/pages/page.queries.ts`:
  - W bloku `sections[]{}` dodaj obsługę `_type == 'faqSection'`:
    ```
    _type == 'faqSection' => {
      title,
      subtitle,
      items[]{
        _key,
        question,
        answer[]{ ..., _type == 'image' => { ..., asset-> } }
      }
    }
    ```

---

## 4. Integration Plan

- [ ] **Utwórz CMS adapter** w:
  ```
  components/cms/page/components/sanity-faq-section.tsx
  ```
  - Typ props: `PageSectionItem<'faqSection'>` (generowany automatycznie przez `sanity typegen`)
  - Transformacja danych:
    - Przepuść `title` i `subtitle` bezpośrednio
    - Każdy element `items` zmapuj na `{ question, answer: <RichText value={item.answer} />, answerPlainText: toPlainText(item.answer) }`
    - `toPlainText` — helper z `@portabletext/toolkit` (lub własna funkcja w `lib/`) spłaszczający Portable Text do stringa dla JSON-LD
  - Wrap w `<PageSection>` (bez `fullWidth`)
  - Renderuj `<FaqSection>` z transformowanymi propsami

- [ ] **Zarejestruj adapter** w `components/cms/page/sanity-page.tsx`:
  - Zaimportuj `SanityFaqSection`
  - Dodaj `faqSection: SanityFaqSection` do obiektu `sanityPageComponents`

- [ ] **Regeneruj typy Sanity** po zmianach w schemacie:
  ```bash
  pnpm typegen
  ```
  Sprawdź że `sanity-types.ts` zawiera typ `faqSection` w unii sekcji strony.

- [ ] **Rewalidacja**: Projekt używa Next.js ISR/SSR — brak dodatkowej konfiguracji cache wymagana dla sekcji; dziedziczone z konfiguracji strony.

---

## 5. Asset & Style Plan

### Paleta kolorów (z globals.css)
| Token             | Wartość       | Użycie w FAQ                        |
|-------------------|---------------|-------------------------------------|
| `bg-background`   | `#1a1a1a`     | tło całej sekcji                    |
| `text-foreground` | `#ffffff`      | treść pytań i odpowiedzi            |
| `text-primary`    | `#f7b402`     | nagłówek sekcji, chevron, hover     |
| `text-muted-foreground` | `#d1d1d1` | opcjonalny podtytuł sekcji       |
| `border-border`   | `#262626`     | separatory między pytaniami         |
| `bg-secondary`    | `#121212`     | opcjonalne ciemniejsze tło sekcji   |

### Typografia (spójna z resztą projektu)
- **Nagłówek sekcji** (`<h2>`): `font-michroma text-3xl md:text-[36px] lg:text-[40px] font-semibold text-primary uppercase` — identycznie jak `SubheadingSection`
- **Żółta kreska pod tytułem**: `mt-2 h-0.5 w-12 bg-primary` (krótka, nie full-width jak w ImageSection)
- **Podtytuł** (`<p>`): `font-montserrat text-lg text-muted-foreground mt-4`
- **Pytanie** (`AccordionTrigger`): `font-montserrat font-medium text-foreground text-base md:text-lg hover:text-primary transition-colors`
- **Odpowiedź** (`AccordionContent`): `font-montserrat font-normal text-muted-foreground text-base leading-relaxed` — renderowana przez `RichText`
- **Chevron** (ikona toggle): `text-primary` — nadpisanie domyślnego stylu shadcn

### Struktura wizualna
```
┌─────────────────────────────────────────────────────┐
│  NAJCZĘŚCIEJ ZADAWANE PYTANIA  ← font-michroma, żółty│
│  ▬▬▬▬                          ← żółta kreska 3rem   │
│  Opcjonalny podtytuł...         ← muted, montserrat  │
│                                                       │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ border-border      │
│  Pytanie 1                               ▼ (żółty)   │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ border-border      │
│  Pytanie 2 (rozwinięte)                  ▲ (żółty)   │
│    Treść odpowiedzi w muted-foreground...             │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ border-border      │
│  Pytanie 3                               ▼ (żółty)   │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ border-border      │
└─────────────────────────────────────────────────────┘
```

### Layout i spacing
- Sekcja: `py-12 md:py-16 lg:py-20` (pionowe odstępy zgodne z projektem)
- Kontener: `max-w-3xl mx-auto px-4 md:px-8` (wąski, czytelny)
- Odstęp tytuł → accordion: `mt-8 md:mt-10`
- Padding wewnętrzny pytania: `py-4` (domyślny shadcn AccordionItem)

### Ikona
- Domyślny chevron z `AccordionTrigger` shadcn nadpisany kolorem `text-primary`
- Brak potrzeby osobnego `<Icon>` komponentu

---

## 6. Dependencies & Setup

- [ ] **shadcn/ui Accordion** — zainstaluj jeśli brakuje:
  ```bash
  pnpm dlx shadcn@latest add accordion
  ```
  Komponent pojawi się w `components/ui/accordion.tsx`
- [ ] **`@portabletext/toolkit`** — do konwersji Portable Text → plain string dla JSON-LD:
  ```bash
  pnpm add @portabletext/toolkit
  ```
  Użycie: `toPlainText(portableTextArray)` zwraca string bez znaczników
- [ ] **Nowe pliki do stworzenia**:
  - `sanity/schemas/sections/faq-section.ts`
  - `components/sections/faq-section/faq-section.tsx`
  - `components/sections/faq-section/faq-json-ld.tsx`
  - `components/sections/faq-section/faq-section.stories.tsx`
  - `components/sections/faq-section/types.ts`
  - `components/cms/page/components/sanity-faq-section.tsx`
- [ ] **Pliki do modyfikacji**:
  - `sanity/schemas/index.ts` — rejestracja schematu
  - `sanity/schemas/pages/page.queries.ts` — rozszerzenie GROQ query
  - `components/cms/page/sanity-page.tsx` — rejestracja adaptera
- [ ] **Regeneracja typów** po zmianach schematu: `pnpm typegen`
- [ ] **Weryfikacja** w Storybook: `pnpm storybook`

---

## 7. Open Questions

Wszystkie pytania zostały rozstrzygnięte — brak otwartych kwestii.
