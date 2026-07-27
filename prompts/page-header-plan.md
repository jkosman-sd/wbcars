---
type: 'implementation-plan'
scope: 'feature'
feature_name: 'page-header'
source: 'https://www.figma.com/design/zGkat3VFCaj1WLaiP2SVFA/Search-research?node-id=34-466&m=dev'
context_source: 'README.md'
output_file: 'page-header-plan.md'
---

## 1. Summary

The page header is a fixed/sticky navigation component displayed at the top of all website pages. It consists of:

- A logo image on the left side (216x64px)
- A horizontal navigation menu on the right side with links (O nas, Zakres usług, Galeria, Kontakt)
- Semi-transparent dark background (rgba(26,26,26,0.5))
- Desktop-optimized design with 64px horizontal padding

The component will be integrated into the `app/(website)/layout.tsx` to appear across all website pages. Navigation links and their href values will be dynamically fetched from Sanity CMS to allow content editors to manage navigation structure.

## 2. Frontend Plan

### 2.1 Required Components

#### Existing shadcn/ui components to use:

- None directly - this is a custom navigation component

#### Existing project components to reference:

- `components/ui/icon.tsx` - For potential mobile menu icon (hamburger)
- `components/layout/page-section/page-section.tsx` - As reference for layout patterns (though not directly used)

### 2.2 New Components to Create

#### A. Main Header Component

**Location**: `components/layout/page-header/page-header.tsx`

**Purpose**: Pure presentational component that renders the header navigation

**Props Interface**:

```typescript
interface PageHeaderProps {
  logo: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  navigationLinks: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
  className?: string;
}
```

**Key Features**:

- Semi-transparent background with backdrop blur/glass effect
- Responsive padding: 64px desktop, scaled down for tablet/mobile
- Flexbox layout: justify-between for logo and nav
- Sticky/fixed positioning at top
- Logo should use Next.js `Image` component for optimization
- Navigation links should use Next.js `Link` component for client-side routing

**Styling Notes**:

- Background: `bg-[rgba(26,26,26,0.5)]` with `backdrop-blur-sm`
- Padding: `px-16 py-4` on desktop (64px = 16 _ 4, 16px = 4 _ 4)
- Logo container: `w-54 h-16` (216px = 54 _ 4, 64px = 16 _ 4)
- Navigation gap between items: `gap-10` (40px = 10 \* 4)
- Font: Montserrat Bold, 13px (`text-[13px]`), uppercase, `text-neutral-50`
- Letter spacing and line height: `leading-tight`

#### B. Sanity CMS Adapter Component

**Location**: `components/cms/layout/sanity-page-header.tsx`

**Purpose**: Transforms Sanity CMS data into props for the presentational PageHeader component

**Data Transformation**:

- Fetch navigation data from Sanity settings or navigation schema
- Transform Sanity image references to Next.js Image props
- Map navigation items to the expected format
- Handle logo image URL generation using Sanity's image builder

#### C. Mobile Navigation Component (Optional - Phase 2)

**Location**: `components/layout/page-header/mobile-navigation.tsx`

**Purpose**: Hamburger menu for mobile devices with slide-out drawer

**Note**: The Figma design shows desktop view only. Mobile navigation should be implemented as a follow-up enhancement with:

- Hamburger icon button (using `Icon` component with 'Menu' icon)
- Slide-out drawer/sheet component (may need to add shadcn/ui Sheet component)
- Full-screen overlay navigation menu
- Responsive breakpoint: show hamburger menu below `md` (768px)

### 2.3 Folder Structure

```
components/
├── layout/
│   └── page-header/
│       ├── page-header.tsx          # Main presentational component
│       ├── page-header.stories.tsx  # Storybook stories
│       └── mobile-navigation.tsx    # (Phase 2) Mobile menu
└── cms/
    └── layout/
        └── sanity-page-header.tsx   # Sanity CMS adapter
```

### 2.4 Responsive Layout Strategy

**Desktop (≥1024px)**:

- Full horizontal layout with logo and navigation links side-by-side
- 64px horizontal padding
- Navigation links displayed inline with 40px gap

**Tablet (768px - 1023px)**:

- Reduce horizontal padding to 32px (`px-8`)
- Reduce navigation gap to 32px (`gap-8`)
- Slightly smaller logo scale if needed

**Mobile (<768px)** - Phase 2:

- Reduce horizontal padding to 16px (`px-4`)
- Hide desktop navigation links (`hidden md:flex`)
- Show hamburger menu icon (`flex md:hidden`)
- Mobile menu overlay/drawer

### 2.5 Design Tokens & Theme Adjustments

**Colors** (already defined in globals.css):

- Background: `bg-[rgba(26,26,26,0.5)]` (semi-transparent)
- Text: `text-neutral-50` (white/near-white)
- Hover state: `hover:text-primary` (yellow accent #f7b402)

**Typography** (already defined):

- Font family: Montserrat (already configured as `--font-montserrat`)
- Font weight: Bold
- Font size: 13px
- Text transform: uppercase
- Letter spacing: tracking-wide (may need to add)

**New Tailwind Utilities Needed**: None - all required utilities exist in current configuration

## 3. Sanity CMS Plan

### 3.1 Schema Design

#### Option A: Add Navigation to Settings (Recommended)

Extend the existing `sanity/schemas/settings.ts` to include navigation configuration.

**Location**: `sanity/schemas/settings.ts`

**New Field to Add**:

```typescript
{
  name: 'navigation',
  type: 'object',
  title: 'Nawigacja',
  group: 'navigation', // Add new group
  fields: [
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
      description: 'Logo wyświetlane w nagłówku (zalecane: 216x64px)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Tekst alternatywny',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'navigationLinks',
      type: 'array',
      title: 'Linki nawigacyjne',
      description: 'Linki wyświetlane w głównym menu',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Etykieta',
              description: 'Tekst wyświetlany w menu',
              validation: (Rule) => Rule.required().max(30),
            },
            {
              name: 'href',
              type: 'string',
              title: 'Link',
              description: 'Ścieżka URL (np. /o-nas, /galeria) lub pełny URL',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'external',
              type: 'boolean',
              title: 'Link zewnętrzny',
              description: 'Zaznacz, jeśli link prowadzi poza stronę',
              initialValue: false,
            },
            {
              name: 'order',
              type: 'number',
              title: 'Kolejność',
              description: 'Kolejność wyświetlania (1, 2, 3...)',
              validation: (Rule) => Rule.required().integer().min(1),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
              order: 'order',
            },
            prepare({ title, subtitle, order }) {
              return {
                title: `${order}. ${title}`,
                subtitle: subtitle,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
    },
  ],
}
```

**New Group to Add** (in settings.ts groups array):

```typescript
{
  title: 'Nawigacja',
  name: 'navigation',
}
```

#### Option B: Create Separate Navigation Schema (Alternative)

If more complex navigation features are needed later (multi-level menus, mega menus), create a dedicated schema.

**Location**: `sanity/schemas/objects/navigation.ts`

This would allow for more flexibility but adds complexity. **Recommendation: Start with Option A** (Settings integration) and migrate to Option B only if needed.

### 3.2 Schema Structure Details

**Fields Breakdown**:

1. **logo** (image):
   - Type: Sanity image with hotspot
   - Alt text field (required for accessibility)
   - Validation: Required

2. **navigationLinks** (array of objects):
   - **label**: Display text (max 30 chars to prevent overflow)
   - **href**: URL path or full URL
   - **external**: Boolean flag for external links (opens in new tab)
   - **order**: Number for sorting links in correct order
   - Validation: Min 1 link, max 6 links (to prevent overcrowding)

**Data Validation**:

- Logo must have alt text
- Each link must have label and href
- Links should be unique (no duplicate labels)
- Order numbers should be unique

### 3.3 Schema File Location

**Primary Location**: `sanity/schemas/settings.ts` (extend existing settings singleton)

**Registration**: Already registered in `sanity/schemas/index.ts` as the settings type

**After Creation**:

1. Run `pnpm typegen` to regenerate TypeScript types from Sanity schemas
2. New types will be available in generated schema.json

### 3.4 Query Structure

**Location**: Create new file `sanity/schemas/settings.queries.ts`

**Query Definition**:

```groq
*[_type == "settings"][0]{
  _id,
  navigation{
    logo{
      ...,
      asset->
    },
    navigationLinks[]{
      label,
      href,
      external,
      order
    } | order(order asc)
  }
}
```

**Query Features**:

- Fetch the singleton settings document
- Expand logo image asset reference
- Sort navigation links by order field (ascending)
- Return only necessary fields for navigation

**Usage Pattern**:

```typescript
// In sanity.client.ts or similar
export async function getNavigationData() {
  return client.fetch(navigationQuery);
}
```

## 4. Integration Plan

### 4.1 Data Fetching Strategy

**Location**: `app/(website)/layout.tsx`

**Approach**: Server Component data fetching

- Fetch navigation data in the layout's Server Component
- Pass data as props to the Sanity adapter component
- Navigation data is static enough to use ISR with revalidation

**Code Pattern**:

```typescript
import { SanityPageHeader } from '@/components/cms/layout/sanity-page-header';
import { getNavigationData } from '@/sanity/sanity.client';

export default async function Layout({ children }: LayoutProps) {
  const navigationData = await getNavigationData();

  return (
    <>
      <SanityPageHeader data={navigationData} />
      <main>{children}</main>
    </>
  );
}
```

### 4.2 Component Wiring

**Data Flow**:

1. `layout.tsx` (Server Component) → Fetches navigation data from Sanity
2. `sanity-page-header.tsx` (Adapter) → Transforms Sanity data to component props
3. `page-header.tsx` (Presentational) → Renders the navigation UI

**Props Transformation in Adapter**:

```typescript
// sanity-page-header.tsx
import { PageHeader } from '@/components/layout/page-header/page-header';
import { urlFor } from '@/sanity/sanity.client'; // Image URL builder

export function SanityPageHeader({ data }) {
  const logo = {
    src: urlFor(data.navigation.logo).width(432).height(128).url(), // 2x for retina
    alt: data.navigation.logo.alt,
    width: 216,
    height: 64,
  };

  const navigationLinks = data.navigation.navigationLinks.map(link => ({
    label: link.label,
    href: link.href,
    external: link.external,
  }));

  return <PageHeader logo={logo} navigationLinks={navigationLinks} />;
}
```

### 4.3 Positioning in Layout

**Integration Point**: `app/(website)/layout.tsx`

**Layout Structure**:

```tsx
<>
  <PageHeader /> {/* Fixed/sticky at top */}
  <main className='pt-20'>
    {' '}
    {/* Padding-top to account for fixed header height */}
    {children}
  </main>
  {/* Footer would go here if it exists */}
</>
```

**Note**: Main content needs `pt-20` (80px) or similar to account for the fixed header height (~96px including padding). Adjust based on actual header height after implementation.

### 4.4 Caching & Revalidation

**Strategy**: Incremental Static Regeneration (ISR)

**Revalidation Rules**:

- Cache navigation data for 3600 seconds (1 hour)
- Revalidate on-demand when settings are updated in Sanity Studio
- Use Next.js 15 caching: `{ next: { revalidate: 3600 } }`

**Webhook Setup** (Optional - for instant updates):

- Configure Sanity webhook to hit `/api/revalidate` when settings are updated
- Revalidate layout route: `revalidatePath('/[...slug]', 'layout')`

## 5. Asset & Style Plan

### 5.1 Required Assets

**Logo**:

- Format: PNG or SVG (prefer SVG for scalability)
- Dimensions: 216x64px (logical size), provide 2x version (432x128px) for retina displays
- File location: Upload to Sanity CMS as part of Settings
- Background: Transparent
- Content: Based on Figma design - "WB CARS" logo with "AUTO DETAILING" text

**Icons** (Phase 2 - Mobile):

- Hamburger menu icon: Use lucide-react `Menu` icon via existing `Icon` component
- Close icon: Use lucide-react `X` icon via existing `Icon` component

### 5.2 Typography

**Desktop Navigation Links**:

- Font family: `font-montserrat` (Montserrat)
- Font weight: `font-bold`
- Font size: `text-[13px]`
- Text transform: `uppercase`
- Color: `text-neutral-50` (white/near-white)
- Hover color: `hover:text-primary` (yellow)
- Letter spacing: `tracking-wide` or `tracking-wider` (test for best fit)
- Line height: `leading-tight`

**Logo**:

- Alt text must be descriptive: e.g., "WB Cars - Auto Detailing Tarnów"

### 5.3 Styling Conventions

**Component Styles** (using Tailwind):

```tsx
// Header container
className = 'fixed top-0 left-0 right-0 z-50 w-full bg-[rgba(26,26,26,0.5)] backdrop-blur-sm';

// Inner container
className = 'flex items-center justify-between px-4 py-4 md:px-8 lg:px-16';

// Logo container
className = 'relative w-54 h-16';

// Navigation container
className = 'hidden md:flex items-center gap-8 lg:gap-10';

// Navigation link
className =
  'font-montserrat font-bold text-[13px] uppercase text-neutral-50 hover:text-primary transition-colors duration-200';
```

**Responsive Behavior Classes**:

- Mobile: `px-4 py-4`
- Tablet: `md:px-8`
- Desktop: `lg:px-16`
- Desktop navigation: `hidden md:flex`
- Mobile menu: `flex md:hidden` (Phase 2)

**Accessibility Classes**:

- Focus states: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`
- Skip to content link: Consider adding for screen readers

## 6. Dependencies & Setup

### 6.1 New Dependencies

**None Required** - All necessary packages are already installed:

- ✅ `next` - For Image and Link components
- ✅ `lucide-react` - For icons (mobile menu in Phase 2)
- ✅ `@sanity/client` - For Sanity data fetching
- ✅ `tailwindcss` - For styling

### 6.2 Configuration Updates

#### A. Sanity Schema Registration

**File**: `sanity/schemas/index.ts`

**Action**: No changes needed if extending settings.ts (already registered)

If creating separate navigation schema:

```typescript
import { navigation } from './objects/navigation';

export const schemaTypes = [
  // ... existing schemas
  navigation,
];
```

#### B. TypeScript Type Generation

**Command**: Run after schema changes

```bash
pnpm typegen
```

**Result**: Updates `sanity/schemas/schema.json` with new navigation types

#### C. Sanity Studio Configuration

**File**: `sanity.config.ts`

**Action**: No changes needed - singleton plugin already configured

**Verification**: After schema update, verify in Sanity Studio that:

1. Settings document shows new "Nawigacja" tab/group
2. Navigation fields are editable
3. Logo upload works
4. Navigation links can be added/reordered

### 6.3 Environment Variables

**No new environment variables needed** - Existing Sanity configuration is sufficient:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN` (if using private dataset)

### 6.4 Storybook Configuration

**File**: `components/layout/page-header/page-header.stories.tsx`

**Mock Data Needed**:

```typescript
const mockLogo = {
  src: '/images/wbcars-logo.png', // Use public folder for Storybook
  alt: 'WB Cars - Auto Detailing',
  width: 216,
  height: 64,
};

const mockNavLinks = [
  { label: 'O nas', href: '/o-nas' },
  { label: 'Zakres usług', href: '/zakres-uslug' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Kontakt', href: '/kontakt' },
];
```

**Stories to Create**:

1. Default - Standard navigation
2. WithExternalLink - Show external link styling
3. MobileView - Mobile viewport preview (Phase 2)
4. ScrolledState - Show backdrop blur effect (if sticky behavior)

## 7. Open Questions

### 7.1 Design & UX Questions

- [ ] **Logo Asset**: Do we have the final WB Cars logo file, or should it be extracted/exported from Figma?
  - Format preference: SVG or PNG?
  - Are there different logo versions (light/dark, compact/full)?

- [ ] **Header Behavior**: Should the header be:
  - Fixed (always visible at top, content scrolls behind it)?
  - Sticky (visible at top, hides/shows on scroll)?
  - Static (scrolls with page content)?
  - **Recommendation**: Fixed with backdrop blur (matches Figma semi-transparent design)

- [ ] **Mobile Navigation**: Mobile design not shown in Figma. Confirm desired behavior:
  - Hamburger menu with slide-out drawer? (Recommended)
  - Bottom navigation bar?
  - Simplified horizontal scroll?
  - **Recommendation**: Hamburger menu with full-screen overlay (Phase 2)

- [ ] **Active Link Styling**: How should the active/current page link be styled?
  - Underline?
  - Yellow primary color?
  - Bold or different weight?
  - **Recommendation**: Yellow primary color with bottom border

- [ ] **Scroll Behavior**: Should header change appearance on scroll?
  - Increase opacity/reduce transparency?
  - Reduce height?
  - Add shadow?
  - **Recommendation**: Keep consistent unless UX testing shows need for change

### 7.2 Technical Questions

- [ ] **Link Structure**: Should navigation links point to:
  - Section anchors on homepage (e.g., `/#o-nas`)?
  - Separate page routes (e.g., `/o-nas`)?
  - Mix of both?
  - **Recommendation**: Separate page routes for better SEO, then we can add anchor support later

- [ ] **External Links**: Are any navigation links expected to be external?
  - Social media?
  - Booking system?
  - **Current Plan**: Support external links via `external` boolean flag

- [ ] **Navigation Depth**: Will we need multi-level navigation (dropdowns)?
  - Submenu items?
  - Mega menu?
  - **Current Plan**: Single-level navigation only. If needed later, migrate to separate navigation schema.

- [ ] **Language/Internationalization**: Is multi-language support planned?
  - English/Polish toggle?
  - **Current Plan**: Polish only based on existing content. Add i18n later if needed.

### 7.3 Performance Questions

- [ ] **Image Optimization**: Confirm Next.js Image optimization is enabled in `next.config.ts`:
  - Remote patterns configured for Sanity CDN?
  - Image domains allowed?
  - **Action**: Verify and update if needed

- [ ] **Preloading**: Should we preload the logo image for faster initial paint?
  - Add `<link rel="preload">` in head?
  - **Recommendation**: Test performance, add if LCP is affected

### 7.4 Content Management Questions

- [ ] **Default Navigation**: What should be the initial/default navigation links in Sanity?
  - Match Figma: O nas, Zakres usług, Galeria, Kontakt?
  - **Recommendation**: Add migration script or manual setup guide

- [ ] **Link Validation**: Should we validate that internal links point to existing pages?
  - Reference field to pages?
  - String validation only?
  - **Current Plan**: String field for flexibility, validate manually or via Sanity plugin later

- [ ] **Maximum Links**: Is 6 links maximum appropriate?
  - Too few/too many?
  - **Current Plan**: 6 max to prevent overflow on most desktop screens

### 7.5 Accessibility Questions

- [ ] **Skip Navigation Link**: Should we add "Skip to main content" link for screen readers?
  - Hidden by default, visible on focus?
  - **Recommendation**: Yes, add as accessibility best practice

- [ ] **Keyboard Navigation**: Confirm required keyboard behavior:
  - Tab through all links?
  - Arrow key navigation?
  - Escape to close mobile menu?
  - **Current Plan**: Standard tab navigation, escape for mobile menu (Phase 2)

- [ ] **ARIA Labels**: Should navigation have landmark role and label?
  - `<nav aria-label="Nawigacja główna">`?
  - **Recommendation**: Yes, follow WCAG guidelines

---

## 8. Implementation Phases

### Phase 1: Core Desktop Navigation (MVP)

**Priority**: High
**Estimated Effort**: 4-6 hours

- [ ] Extend Sanity settings schema with navigation fields
- [ ] Run typegen to generate types
- [ ] Create `PageHeader` presentational component
- [ ] Create `SanityPageHeader` adapter component
- [ ] Integrate into `app/(website)/layout.tsx`
- [ ] Add Storybook stories
- [ ] Test navigation links and logo display
- [ ] Verify accessibility (keyboard navigation, ARIA labels)

### Phase 2: Mobile Navigation

**Priority**: Medium
**Estimated Effort**: 3-4 hours

- [ ] Add hamburger menu icon button
- [ ] Create mobile navigation drawer/sheet
- [ ] Implement responsive breakpoints
- [ ] Add open/close animations
- [ ] Test on real mobile devices
- [ ] Update Storybook with mobile stories

### Phase 3: Enhancements

**Priority**: Low
**Estimated Effort**: 2-3 hours

- [ ] Add active link highlighting
- [ ] Implement smooth scroll to sections (if using anchors)
- [ ] Add scroll-based header opacity changes
- [ ] Optimize image loading (preload logo)
- [ ] Add Sanity webhook for instant cache invalidation
- [ ] Performance testing and optimization

---

## 9. Success Criteria

### Functional Requirements

- ✅ Logo displays correctly at 216x64px
- ✅ Navigation links render from Sanity data
- ✅ Links navigate to correct pages/sections
- ✅ External links open in new tab (if applicable)
- ✅ Header stays at top of page (fixed/sticky)
- ✅ Semi-transparent background with blur effect

### Accessibility Requirements

- ✅ All links keyboard accessible (Tab navigation)
- ✅ Focus states visible and clear
- ✅ Logo has meaningful alt text
- ✅ Navigation has proper semantic HTML (`<nav>`, `<a>`)
- ✅ ARIA labels for navigation landmark
- ✅ Screen reader tested (VoiceOver on macOS)

### Responsive Requirements

- ✅ Desktop (≥1024px): Full horizontal navigation
- ✅ Tablet (768-1023px): Scaled navigation
- ✅ Mobile (<768px): Hamburger menu (Phase 2)
- ✅ No horizontal scroll on any viewport

### Performance Requirements

- ✅ Logo image optimized via Next.js Image
- ✅ Navigation data cached with ISR
- ✅ No layout shift on initial load
- ✅ Header renders on initial page load (SSR)

### Content Management Requirements

- ✅ Content editors can update logo via Sanity Studio
- ✅ Content editors can add/remove/reorder navigation links
- ✅ Changes reflect on website within revalidation period (1 hour or on-demand)
- ✅ Validation prevents invalid data entry

---

## 10. Testing Checklist

### Manual Testing

- [ ] Test all navigation links navigate correctly
- [ ] Test logo displays at correct size and quality
- [ ] Test semi-transparent background appears correctly
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on real mobile devices (iOS, Android)
- [ ] Test keyboard navigation (Tab, Shift+Tab)
- [ ] Test screen reader (VoiceOver, NVDA)
- [ ] Test with various numbers of links (1, 3, 6)
- [ ] Test with long link labels (does it overflow?)
- [ ] Test with external links (new tab behavior)

### Visual Regression Testing

- [ ] Compare with Figma design pixel measurements
- [ ] Verify typography matches (font, size, weight, spacing)
- [ ] Verify colors match design system
- [ ] Verify hover states work correctly
- [ ] Verify focus states are visible

### Performance Testing

- [ ] Check Lighthouse score (should be 90+)
- [ ] Verify logo image is optimized (not full resolution)
- [ ] Check no unnecessary JavaScript in header
- [ ] Verify no layout shift (CLS score)
- [ ] Test on slow 3G connection

### Content Management Testing

- [ ] Test adding new link in Sanity Studio
- [ ] Test removing link in Sanity Studio
- [ ] Test reordering links
- [ ] Test updating logo image
- [ ] Test validation rules (max links, required fields)
- [ ] Verify changes appear on frontend after revalidation

---

## 11. Documentation Requirements

### Code Documentation

- [ ] Add JSDoc comments to PageHeader component
- [ ] Document props interfaces with descriptions
- [ ] Add inline comments for complex logic
- [ ] Document responsive breakpoint decisions

### Storybook Documentation

- [ ] Add README.md in page-header/ folder
- [ ] Document component usage examples
- [ ] Document props and their purposes
- [ ] Show different states/variants in stories

### CMS Documentation

- [ ] Add help text to Sanity schema fields
- [ ] Create guide for content editors (how to update navigation)
- [ ] Document link format expectations (internal vs external)
- [ ] Document logo image requirements (size, format)

### Technical Documentation

- [ ] Update main README.md with navigation pattern
- [ ] Document how to add new layout components
- [ ] Document caching/revalidation strategy
- [ ] Add troubleshooting guide for common issues

---

## 12. Related Files Reference

### Files to Create

1. `components/layout/page-header/page-header.tsx` - Main component
2. `components/layout/page-header/page-header.stories.tsx` - Storybook stories
3. `components/cms/layout/sanity-page-header.tsx` - CMS adapter
4. `sanity/schemas/settings.queries.ts` - GROQ queries (new file)

### Files to Modify

1. `sanity/schemas/settings.ts` - Add navigation fields
2. `app/(website)/layout.tsx` - Integrate header component
3. `sanity/sanity.client.ts` - Add navigation data fetching function (optional)

### Files to Reference

1. `components/layout/page-section/page-section.tsx` - Layout pattern example
2. `components/ui/icon.tsx` - Icon usage for mobile menu
3. `app/globals.css` - Typography and color tokens
4. `device-sizes.ts` - Responsive breakpoints
5. `README.md` - Project conventions and architecture

### Files for Phase 2 (Mobile)

1. `components/layout/page-header/mobile-navigation.tsx` - Mobile menu drawer
2. Consider adding shadcn/ui Sheet component for drawer: `pnpm dlx shadcn@latest add sheet`

---

**End of Implementation Plan**
