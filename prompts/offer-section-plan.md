---
type: 'implementation-plan'
scope: 'feature'
feature_name: 'offer-section'
source: ['https://www.figma.com/design/zGkat3VFCaj1WLaiP2SVFA/Search-research?node-id=35-825&m=dev', 'https://www.figma.com/design/zGkat3VFCaj1WLaiP2SVFA/Search-research?node-id=35-823&m=dev', 'https://www.figma.com/design/zGkat3VFCaj1WLaiP2SVFA/Search-research?node-id=35-824&m=dev'], 
context_source: 'README.md'
output_file: 'offer-section-plan.md'
date: '2025-11-05'
---

# Offer Section - Implementation Plan

## 1. Summary

Offer Section to komponent sekcji wyświetlający ofertę oklejania samochodów z trzema pakietami (Optimum, Full Front, Full Body). Komponent wykorzystuje wzorzec accordion, gdzie każdy pakiet można rozwinąć, aby zobaczyć szczegóły. Kluczowe elementy:

- **Obrazek samochodu po lewej stronie** - dynamicznie się zmienia (z animacją) w zależności od wybranego pakietu, pokazując różne części podświetlone na złoto
- **Lista pakietów po prawej stronie** - accordion z trzema pakietami, każdy zawiera numer, nazwę, opis usług i cenę
- **Opcja dodatkowa** - "Powłoka ceramiczna" (konfigurowalna w Sanity) widoczna tylko w rozwiniętym pakiecie
- **Responsywność** - na mobile obrazek na górze (stack layout), z animacją zmiany przy rozwijaniu pakietu
- **Animacje** - płynne przejścia między obrazkami i stanami accordiona

**Terminologia:**

- `package` (pakiet) - pojedynczy element w accordionie (np. "Pakiet Optimum")
- `additionalOption` (opcja dodatkowa) - konfigurowalna opcja "Powłoka ceramiczna"

---

## 2. Frontend Plan

### 2.1 Required shadcn/ui Components

- [ ] **Accordion** - nie jest obecnie zainstalowany w projekcie
  - Instalacja: `pnpm dlx shadcn@latest add accordion`
  - Będzie wymagał dostosowania stylów zgodnie z designem (żółte tło dla aktywnego, ciemne dla nieaktywnych)

### 2.2 Missing Components to Create

#### 2.2.1 Section Component: `components/sections/offer-section/offer-section.tsx`

**Purpose:** Prezentacyjny komponent sekcji oferty  
**Location:** `components/sections/offer-section/`

**Props Interface:**

```typescript
interface OfferPackage {
  id: string;
  number: string; // e.g., ".01", ".02", ".03"
  subtitle: string; // e.g., "Pakiet"
  title: string; // e.g., "OPTIMUM", "FULL FRONT", "FULL BODY"
  description: string; // opis usług w pakiecie
  price: string; // e.g., "od 100 zł"
  image: React.ReactNode; // obrazek samochodu dla tego pakietu
}

interface AdditionalOption {
  label: string; // e.g., "Zabezpieczenie powłoką ceramiczną"
  price: string; // e.g., "od 100 zł"
}

interface OfferSectionProps {
  packages: OfferPackage[];
  additionalOption?: AdditionalOption; // opcjonalne
  defaultOpenPackage?: string; // ID pakietu otwartego domyślnie
}
```

**Key Features:**

- Używa shadcn Accordion z customowym stylingiem
- Aktywny pakiet: żółte tło (`bg-primary`), ciemny tekst (`text-primary-foreground`)
- Nieaktywny pakiet: ciemne tło (transparent/background), szary tekst (`text-muted` i `text-muted-foreground`)
- Obrazek wyświetlany po lewej (desktop) lub na górze (mobile)
- Płynna animacja zmiany obrazka przy przełączaniu pakietów
- Opcja dodatkowa wyświetlana tylko w rozwiniętym pakiecie

**Layout Structure:**

```
<section>
  <div className="grid lg:grid-cols-2"> {/* na mobile stack, na desktop 2 kolumny */}
    {/* Left side - Car Image */}
    <div className="relative">
      {/* Animated image switcher */}
    </div>

    {/* Right side - Accordion */}
    <Accordion>
      {packages.map(package => (
        <AccordionItem>
          <AccordionTrigger>
            {/* Package header: subtitle, title, number */}
          </AccordionTrigger>
          <AccordionContent>
            {/* Package description, price */}
            {/* Additional option if exists */}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
</section>
```

#### 2.2.2 CMS Adapter: `components/cms/page/components/sanity-offer-section.tsx`

**Purpose:** Adapter przekształcający dane z Sanity do props komponentu prezentacyjnego  
**Location:** `components/cms/page/components/`

**Responsibilities:**

- Odbiera dane typu `PageSectionItem<'offerSection'>` z Sanity
- Przekształca obrazki Sanity do komponentów Next.js Image
- Mapuje tablicę pakietów z Sanity do formatu `OfferPackage[]`
- Przekazuje przetworzone dane do `OfferSection`

#### 2.2.3 Storybook Story: `components/sections/offer-section/offer-section.stories.tsx`

**Purpose:** Dokumentacja i development environment dla komponentu  
**Location:** `components/sections/offer-section/`

**Stories to Include:**

- `Default` - wszystkie trzy pakiety, pierwszy otwarty domyślnie
- `WithAdditionalOption` - z opcją dodatkową
- `WithoutAdditionalOption` - bez opcji dodatkowej
- `SecondPackageOpen` - drugi pakiet otwarty domyślnie
- `Mobile` - viewport mobile (480px)

### 2.3 Responsive Layout Strategy

**Desktop (≥976px):**

- Grid layout: `grid-cols-2` (obrazek | accordion)
- Obrazek: 755px szerokości (około 60% width kontenera)
- Accordion: reszta szerokości (około 40%)
- Padding w headerach pakietów: `pl-10 pr-16 py-4` (40px, 64px, 16px)

**Tablet (768px - 975px):**

- Grid layout: `grid-cols-2` (podobnie jak desktop, ale mniejsze obrazki)
- Dostosowane padding: `pl-8 pr-12 py-4`

**Mobile (<768px):**

- Stack layout: `flex-col` (obrazek na górze, accordion na dole)
- Obrazek: full width, height: auto (aspect ratio zachowany)
- Padding w headerach: `pl-6 pr-8 py-4` (24px, 32px, 16px)
- Mniejsze fonty: subtitle `text-base`, title `text-2xl`, number `text-4xl`

### 2.4 Design Tokens & Theme Adjustments

**Colors (already defined in globals.css):**

- `bg-primary` - #f7b402 (żółte tło aktywnego pakietu)
- `text-primary-foreground` - #001c2a (ciemny tekst na żółtym)
- `text-muted` - #858585 (szary tekst nieaktywnych pakietów)
- `text-muted-foreground` - #d1d1d1 (jaśniejszy szary dla numerów)
- `bg-background` - #1a1a1a (ciemne tło sekcji)

**Typography:**

- Projekt używa `Montserrat` i `Orbitron` (już zdefiniowane w `globals.css`)
- Figma pokazuje `Uniwars` - **należy zastąpić `Orbitron`** (najbliższy dostępny font)
- Subtitle (np. "Pakiet"): `font-orbitron text-2xl font-light uppercase`
- Title (np. "OPTIMUM"): `font-orbitron text-[32px] font-semibold uppercase`
- Number (np. ".01"): `font-orbitron text-[64px] font-normal`
- Description: `font-montserrat text-xl font-normal`
- Price: `font-montserrat text-xl font-normal text-right`
- Additional label ("Dodatkowo"): `font-montserrat text-xs font-normal`

**Spacing:**

- Gap między elementami w rozwiniętym pakiecie: `gap-2` (8px)
- Padding sekcji "Dodatkowo": `pt-4` (16px)
- Gap między tytułem a ceną: `justify-between` (space between)

**Animations:**

- Transition obrazka: `transition-opacity duration-500 ease-in-out`
- Accordion: domyślne animacje z shadcn (można dostosować w `accordion.tsx`)
- Crossfade effect dla obrazków: użyć `AnimatePresence` z framer-motion lub CSS transitions

**Border/Dividers:**

- Brak widocznych borderów między pakietami w designie
- Separator może być dodany jako `border-b border-border` jeśli potrzebny

### 2.5 Image Animation Strategy

**Approach:** Controlled animated image switcher

Ponieważ każdy pakiet ma osobny obrazek z różnymi podświetleniami:

1. **Preload wszystkich obrazków** - użyć Next.js Image z `priority` dla wszystkich obrazków
2. **Conditional rendering** - pokazuj tylko obrazek aktywnego pakietu
3. **Crossfade animation:**
   ```tsx
   <div className="relative w-full h-full">
     {packages.map(pkg => (
       <div
         key={pkg.id}
         className={cn(
           "absolute inset-0 transition-opacity duration-500",
           activePackageId === pkg.id ? "opacity-100" : "opacity-0 pointer-events-none"
         )}
       >
         {pkg.image}
       </div>
     ))}
   </div>
   ```

**Alternative:** Użyć `framer-motion` AnimatePresence dla bardziej zaawansowanych animacji (jeśli już jest w projekcie).

---

## 3. Sanity CMS Plan

### 3.1 Schema Definition

**Location:** `sanity/schemas/sections/offer-section.ts`

**Schema Structure:**

```typescript
import { defineField, defineType } from 'sanity';

export const offerSection = defineType({
  name: 'offerSection',
  type: 'object',
  title: 'Offer Section',
  fields: [
    defineField({
      name: 'packages',
      type: 'array',
      title: 'Pakiety',
      description: 'Lista pakietów usług (maksymalnie 3)',
      validation: (Rule) => Rule.required().min(1).max(3),
      of: [
        {
          type: 'object',
          title: 'Pakiet',
          fields: [
            defineField({
              name: 'number',
              type: 'string',
              title: 'Numer',
              description: 'Np. ".01", ".02", ".03"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              type: 'string',
              title: 'Podtytuł',
              description: 'Np. "Pakiet"',
              initialValue: 'Pakiet',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Tytuł',
              description: 'Np. "OPTIMUM", "FULL FRONT"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Opis',
              description: 'Opis usług zawartych w pakiecie',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'price',
              type: 'string',
              title: 'Cena',
              description: 'Np. "od 100 zł"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              type: 'responsiveImage',
              title: 'Obrazek samochodu',
              description: 'Obrazek z podświetlonymi częściami dla tego pakietu',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'number',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'additionalOption',
      type: 'object',
      title: 'Opcja dodatkowa',
      description: 'Np. "Powłoka ceramiczna"',
      fields: [
        defineField({
          name: 'label',
          type: 'string',
          title: 'Etykieta',
          description: 'Np. "Zabezpieczenie powłoką ceramiczną"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'price',
          type: 'string',
          title: 'Cena',
          description: 'Np. "od 100 zł"',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'defaultOpenPackage',
      type: 'number',
      title: 'Domyślnie otwarty pakiet',
      description: 'Indeks pakietu otwartego domyślnie (0 = pierwszy, 1 = drugi, 2 = trzeci)',
      validation: (Rule) => Rule.min(0).max(2),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      packages: 'packages',
    },
    prepare({ packages }) {
      return {
        title: 'Offer Section',
        subtitle: `${packages?.length || 0} pakietów`,
      };
    },
  },
});
```

### 3.2 Schema Registration

**File:** `sanity/schemas/index.ts`

Add import and register:

```typescript
import { offerSection } from './sections/offer-section';

// Add to schema types array
offerSection,
```

### 3.3 GROQ Query Extension

**File:** `sanity/schemas/pages/page.queries.ts`

Extend page sections query to include `offerSection`:

```groq
sections[] {
  _type == 'offerSection' => {
    _key,
    _type,
    packages[] {
      number,
      subtitle,
      title,
      description,
      price,
      image {
        asset-> {
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        },
        alt,
        breakpoints[] {
          breakpoint,
          asset-> {
            url
          }
        }
      }
    },
    additionalOption {
      label,
      price
    },
    defaultOpenPackage
  },
  // ... other section types
}
```

### 3.4 Type Generation

Po dodaniu schematu uruchomić:

```bash
pnpm typegen
```

To wygeneruje TypeScript types w `sanity/schemas/schema.json` i odpowiednie typy dla komponentów.

---

## 4. Integration Plan

### 4.1 Data Flow

```
Sanity CMS (offerSection schema)
    ↓
GROQ Query (page.queries.ts)
    ↓
Next.js Server Component (app/(website)/[...slug]/page.tsx)
    ↓
SanityOfferSection (adapter - components/cms/page/components/sanity-offer-section.tsx)
    ↓
OfferSection (presentational - components/sections/offer-section/offer-section.tsx)
    ↓
User sees animated accordion with car images
```

### 4.2 Props Transformation

**In `sanity-offer-section.tsx`:**

```typescript
export const SanityOfferSection = (props: PageSectionItem<'offerSection'>) => {
  const section = props;

  const packages = section.packages.map((pkg, index) => ({
    id: pkg.number, // or use index.toString()
    number: pkg.number,
    subtitle: pkg.subtitle,
    title: pkg.title,
    description: pkg.description,
    price: pkg.price,
    image: (
      <Image
        src={pkg.image.asset.url}
        alt={pkg.image.alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 976px) 50vw, 755px"
        priority={index === section.defaultOpenPackage} // priority for default open image
      />
    ),
  }));

  const additionalOption = section.additionalOption ? {
    label: section.additionalOption.label,
    price: section.additionalOption.price,
  } : undefined;

  return (
    <PageSection key={section._key}>
      <OfferSection
        packages={packages}
        additionalOption={additionalOption}
        defaultOpenPackage={packages[section.defaultOpenPackage]?.id}
      />
    </PageSection>
  );
};
```

### 4.3 Component Registration

**File:** `components/cms/sanity-components.tsx`

Add to components map:

```typescript
import { SanityOfferSection } from './page/components/sanity-offer-section';

const componentsMap = {
  offerSection: SanityOfferSection,
  // ... other components
};
```

### 4.4 Caching & Revalidation

- **Server Components**: dane fetched server-side w `page.tsx`
- **Revalidation**: użyć Next.js ISR z `revalidate` w `page.tsx` (np. `export const revalidate = 60`)
- **Draft Mode**: respektować istniejący draft mode dla preview w Sanity Studio

---

## 5. Asset & Style Plan

### 5.1 Required Assets

**Images:**

- 3 obrazki samochodu (dla każdego pakietu) - dynamiczne z Sanity
- Format: JPEG lub WebP (preferowane WebP dla lepszej kompresji)
- Wymiary rekomendowane: 755×474 px (aspect ratio ~1.59:1)
- Podświetlenia na złoto (części samochodu) - bezpośrednio w obrazkach, nie jako overlay

**Icons:**

- Accordion chevron icon (jeśli nie ma w shadcn accordion) - użyć `Icon` component z projektu
- Możliwe że trzeba dodać `ChevronDown` icon

### 5.2 Styling Conventions

**Tailwind Classes - Priority:**

1. Użyj istniejących design tokens z `globals.css`
2. Kolory: `bg-primary`, `text-primary-foreground`, `text-muted`, etc.
3. Fonty: `font-montserrat`, `font-orbitron`
4. Spacing: standardowe Tailwind scale (4, 8, 16, 24, 32, 64px)

**Custom Classes (jeśli potrzebne):**
Dodać do `globals.css` w sekcji `@layer utilities`:

```css
.offer-package-header {
  @apply flex items-start justify-between uppercase;
}

.offer-package-number {
  @apply font-orbitron text-[64px] leading-none font-normal;
}

.offer-package-title {
  @apply font-orbitron text-[32px] leading-[32px] font-semibold uppercase;
}

.offer-package-subtitle {
  @apply font-orbitron text-2xl leading-[32px] font-light uppercase;
}
```

**Responsive Behaviors:**

- Use `device-sizes.ts` breakpoints: `[480, 768, 976, 1440]`
- Mobile-first approach: base styles = mobile, then `md:`, `lg:` for larger screens
- Breakpoints mapping:
  - `sm:` - 480px (mobile landscape)
  - `md:` - 768px (tablet)
  - `lg:` - 976px (desktop)
  - `xl:` - 1440px (large desktop)

### 5.3 Accessibility Considerations

**ARIA Labels:**

- Accordion: shadcn ma built-in accessibility, ale sprawdzić:
  - `aria-expanded` na trigger
  - `aria-controls` łączące trigger z content
  - `role="region"` na content
- Obrazki: zawsze `alt` attribute z opisem obrazka (np. "Lexus z podświetloną maską i lampami")

**Keyboard Navigation:**

- Tab przez pakiety
- Enter/Space do rozwijania/zwijania
- Arrow keys dla nawigacji między pakietami (jeśli shadcn to wspiera)

**Screen Readers:**

- Oznacz numer pakietu jako `aria-label="Pakiet numer 01"`
- Cena: oznacz jako `aria-label="Cena od 100 złotych"`
- Announce state changes przy rozwijaniu/zwijaniu

**Focus Styles:**

- Użyć `focus-visible:ring-2 focus-visible:ring-ring` z design tokens
- Visible focus indicator na każdym interactive element

**Color Contrast:**

- Sprawdzić kontrast tekstu na żółtym tle (primary-foreground #001c2a na #f7b402) - powinien spełniać WCAG AA
- Szary tekst (#858585) na ciemnym tle (#1a1a1a) - sprawdzić kontrast

---

## 6. Dependencies & Setup

### 6.1 New Dependencies

**shadcn/ui Accordion:**

```bash
pnpm dlx shadcn@latest add accordion
```

To zainstaluje:

- `components/ui/accordion.tsx`
- Zależności: `@radix-ui/react-accordion` (jeśli jeszcze nie ma)

### 6.2 Optional Dependencies

**Framer Motion (for advanced animations):**

```bash
pnpm add framer-motion
```

Tylko jeśli chcemy bardziej zaawansowane animacje niż CSS transitions. Sprawdzić czy już jest w projekcie:

```bash
grep "framer-motion" package.json
```

### 6.3 Configuration Updates

**1. Accordion Customization:**

Po instalacji, edytować `components/ui/accordion.tsx`:

- Usunąć domyślne bordery jeśli są
- Dostosować padding
- Dostosować transition timing

**2. Image Optimization:**

W `next.config.ts` sprawdzić czy domains/remotePatterns są skonfigurowane dla Sanity CDN:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
    },
  ],
}
```

**3. Tailwind Config (opcjonalne):**

Jeśli potrzebne custom font sizes, dodać do `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    fontSize: {
      '8xl': '64px', // dla numerów pakietów
    },
  },
}
```

### 6.4 Sanity Studio Updates

Po dodaniu schema:

1. Uruchomić `pnpm typegen` - generuje TypeScript types
2. Restart Sanity Studio (jeśli jest uruchomione)
3. Sprawdzić czy nowy section type pojawia się w edytorze stron

---

## 7. Open Questions

### 7.1 Animation Details

- [ ] **Q1:** Jaka dokładnie animacja ma być przy zmianie obrazka?
  - **Opcja A:** Simple crossfade (fade out → fade in)
  - **Opcja B:** Slide transition (slide out left → slide in right)
  - **Opcja C:** Scale + fade (zoom out + fade → zoom in + fade)
  - **Rekomendacja:** Crossfade (najprostsze, najbardziej performant)

- [ ] **Q2:** Czas trwania animacji?
  - **Rekomendacja:** 500ms (standardowy timing dla transitions)

### 7.2 Accordion Behavior

- [ ] **Q3:** Czy można zamknąć wszystkie pakiety, czy zawsze jeden musi być otwarty?
  - **Opcja A:** Zawsze jeden otwarty (type="single" collapsible={false})
  - **Opcja B:** Można zamknąć wszystkie (type="single" collapsible={true})
  - **Rekomendacja:** Opcja A (zawsze jeden otwarty) - lepsze UX, zawsze widać obrazek

- [ ] **Q4:** Czy może być otwartych kilka pakietów jednocześnie?
  - **Rekomendacja:** Nie (type="single") - zgodnie z designem tylko jeden jednocześnie

### 7.3 Image Optimization

- [ ] **Q5:** Jakie formaty obrazków preferowane?
  - **Rekomendacja:** WebP z fallback do JPEG
  - Next.js Image automatycznie konwertuje, ale w Sanity można uploadować WebP

- [ ] **Q6:** Czy obrazki mają być lazy-loaded czy priority?
  - **Rekomendacja:**
    - Priority dla domyślnie otwartego pakietu (pierwszy load)
    - Lazy dla pozostałych (ale preload na hover nad triggerem?)

### 7.4 Content Flexibility

- [ ] **Q7:** Czy liczba pakietów może się zmieniać (1-5) czy zawsze 3?
  - **Current Plan:** Schema ma validation max(3), ale można zmienić
  - **Recommendation:** Trzymać się 3 (zgodnie z designem)

- [ ] **Q8:** Czy opcja dodatkowa może mieć osobny opis (nie tylko label + price)?
  - **Current Plan:** Tylko label + price
  - **Możliwość rozbudowy:** Dodać pole `description` w `additionalOption`

### 7.5 Mobile Experience

- [ ] **Q9:** Na mobile, czy obrazek ma być sticky podczas scrollowania przez pakiety?
  - **Rekomendacja:** Nie, naturalny scroll (obrazek na górze, przy zmianie pakietu scroll do góry?)

- [ ] **Q10:** Czy na mobile pokazywać mniejszą wersję obrazka (różne crop/sizes)?
  - **Rekomendacja:** Użyć responsiveImage z Sanity (różne breakpoints)

### 7.6 Accessibility Edge Cases

- [ ] **Q11:** Jak obsłużyć użytkowników z motion sickness (prefers-reduced-motion)?
  - **Rekomendacja:** Wyłączyć animacje dla `@media (prefers-reduced-motion: reduce)`

---

## 8. Implementation Checklist

### Phase 1: Setup & Dependencies

- [ ] Install shadcn accordion component
- [ ] Check if framer-motion is needed/available
- [ ] Verify Next.js image configuration for Sanity CDN

### Phase 2: Sanity Schema

- [ ] Create `sanity/schemas/sections/offer-section.ts`
- [ ] Register schema in `sanity/schemas/index.ts`
- [ ] Add GROQ query fragment to `page.queries.ts`
- [ ] Run `pnpm typegen` to generate types
- [ ] Test schema in Sanity Studio

### Phase 3: Presentational Component

- [ ] Create `components/sections/offer-section/` directory
- [ ] Implement `offer-section.tsx` with accordion
- [ ] Implement image switcher with animation
- [ ] Style according to design (colors, typography, spacing)
- [ ] Implement responsive layout (desktop/mobile)
- [ ] Add accessibility features (ARIA labels, keyboard nav)
- [ ] Test with mock data

### Phase 4: Storybook

- [ ] Create `offer-section.stories.tsx`
- [ ] Add stories for different states (default, variants)
- [ ] Test responsive behaviors in Storybook
- [ ] Document props and usage

### Phase 5: CMS Integration

- [ ] Create `components/cms/page/components/sanity-offer-section.tsx`
- [ ] Transform Sanity data to component props
- [ ] Handle image loading with Next.js Image
- [ ] Register in `components/cms/sanity-components.tsx`

### Phase 6: Testing & Refinement

- [ ] Test full integration (Sanity → Frontend)
- [ ] Test animations on different browsers
- [ ] Test responsive behavior on real devices
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Performance audit (Lighthouse)
- [ ] Adjust animations/transitions if needed

### Phase 7: Documentation

- [ ] Add usage examples to component comments
- [ ] Update README if needed (new section type)
- [ ] Document any custom Tailwind classes added

---

## 9. Success Criteria

Implementation will be considered complete when:

✅ **Functionality:**

- [ ] Three packages display in accordion format
- [ ] Only one package can be expanded at a time
- [ ] Car image changes smoothly when switching packages
- [ ] Additional option displays correctly in expanded package
- [ ] Default open package works as configured in Sanity

✅ **Visual Design:**

- [ ] Matches Figma design (colors, typography, spacing)
- [ ] Active package has yellow background
- [ ] Inactive packages have gray text
- [ ] Images display with correct aspect ratio
- [ ] Animations are smooth and performant

✅ **Responsiveness:**

- [ ] Desktop: side-by-side layout (image | accordion)
- [ ] Mobile: stacked layout (image on top)
- [ ] Image switches correctly on mobile
- [ ] Typography scales appropriately
- [ ] Touch interactions work smoothly

✅ **Accessibility:**

- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Screen readers announce package states
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA
- [ ] Respects prefers-reduced-motion

✅ **CMS Integration:**

- [ ] Schema appears in Sanity Studio
- [ ] All fields are editable
- [ ] Images upload and display correctly
- [ ] Data flows correctly to frontend
- [ ] Preview mode works in Sanity

✅ **Performance:**

- [ ] Images are optimized (WebP, proper sizes)
- [ ] Animations don't cause jank (60fps)
- [ ] Lighthouse score remains high
- [ ] No layout shift during image switching

✅ **Code Quality:**

- [ ] Follows project conventions (kebab-case, structure)
- [ ] TypeScript types are properly defined
- [ ] Components are properly separated (CMS vs presentational)
- [ ] Storybook documentation is complete
- [ ] Code is readable and maintainable

---

## 10. Notes & Recommendations

### Performance Optimization

- Use `priority` for first visible image, lazy load others
- Consider using blur placeholder for images (Next.js Image feature)
- Preload images on accordion trigger hover (advanced optimization)

### Future Enhancements

- Add comparison mode (show multiple packages side-by-side)
- Add "Wybierz pakiet" CTA button in each package
- Add package highlights animations on hover
- Add video option instead of static image
- Add testimonials/reviews per package

### Design System Alignment

- Consider extracting accordion styling to a variant in `accordion.tsx`
- Create reusable typography components if this pattern repeats
- Document custom color usage for yellow/dark theme

### Maintenance

- Keep image assets organized in Sanity with clear naming
- Document image requirements in Sanity field descriptions
- Consider adding image dimension validation in schema

---

**End of Implementation Plan**

Generated: 2025-11-05  
Feature: offer-section  
Ready for implementation by development team.
