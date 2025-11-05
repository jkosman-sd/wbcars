# Core2 - Business Card Website

A modern, SEO-optimized business card website built with Next.js and Sanity CMS, with strong emphasis on mobile responsiveness and accessibility.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Development Conventions](#development-conventions)
- [Architecture Overview](#architecture-overview)
- [Adding New Features](#adding-new-features)
- [Getting Started](#getting-started)
- [Key Principles](#key-principles)

---

## 🎯 Project Overview

This is a business card website (strona wizytówka) designed to showcase services, portfolio, or company information. The project prioritizes:

- **SEO optimization** - Server-side rendering, metadata management, sitemap generation
- **Mobile-first design** - Responsive across all device sizes
- **Accessibility** - WCAG compliance, semantic HTML, keyboard navigation
- **Content management** - Flexible page building through Sanity CMS
- **Performance** - Optimized images, code splitting, and fast loading times

---

## 🛠️ Tech Stack

### Core Technologies

- **Next.js 15+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Sanity CMS** - Headless content management system
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library

### Additional Tools

- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting and formatting
- **Storybook** - Component development and documentation environment
- **next-sitemap** - Automatic sitemap generation
- **Vercel Analytics** - (Optional) Performance and analytics tracking

---

## 📁 Folder Structure

```
core2/
├── app/                          # Next.js App Router
│   ├── (website)/               # Main website routes
│   │   ├── layout.tsx          # Website layout wrapper
│   │   ├── page.tsx            # Homepage
│   │   └── [...slug]/          # Dynamic pages from Sanity
│   │       └── page.tsx        # Dynamic page renderer
│   ├── (sanity)/               # Sanity Studio routes
│   │   ├── layout.tsx          # Studio layout
│   │   └── studio/             # Sanity Studio UI
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles with tailwind class definitions
│   └── robots.ts               # Robots.txt configuration
│
├── components/                  # React components
│   ├── cms/                    # Sanity CMS-specific components
│   │   ├── sanity-component.tsx      # Single component mapper
│   │   ├── sanity-components.tsx     # Component registry
│   │   ├── sanity-types.ts           # CMS type definitions
│   │   └── page/                     # Page-level CMS components
│   │       ├── sanity-page.tsx       # Page component
│   │       └── components/           # Section components
│   │           └── sanity-image-section.tsx
│   │
│   ├── layout/                 # Layout components
│   │   └── page-section/       # Section wrapper component
│   │       └── page-section.tsx
│   │
│   ├── sections/               # Presentational section components
│   │   └── image-section/      # Image section
│   │       └── image-section.tsx
│   │
│   └── ui/                     # shadcn/ui components
│       ├── button.tsx
│       ├── icon.tsx
│       └── rich-text/          # Rich text renderer
│           ├── rich-text.tsx
│           └── text-components.tsx
│
├── sanity/                      # Sanity configuration
│   ├── sanity.api.ts           # API constants
│   ├── sanity.cli.ts           # CLI configuration
│   ├── sanity.client.ts        # Client setup
│   ├── sanity.config.ts        # Studio configuration
│   ├── plugins/                # Custom Sanity plugins
│   │   └── singleton-plugin.ts
│   └── schemas/                # Content schemas
│       ├── index.ts            # Schema registry
│       ├── schema.json         # Generated schema types
│       ├── settings.ts         # Site settings schema
│       ├── pages/              # Page schemas
│       │   ├── page.ts
│       │   └── page.queries.ts # GROQ queries for pages
│       └── sections/           # Section schemas
│           ├── block-content-section.ts
│           └── image-section.ts
│
├── lib/                         # Utility functions
│   ├── utils.ts                # General utilities
│   ├── result.ts               # Result type helpers
│   └── assert-unreachable.ts   # TypeScript exhaustiveness checking
│
├── features/                    # Feature modules (currently empty)
├── public/                      # Static assets
├── components.json              # shadcn/ui configuration
├── device-sizes.ts              # Responsive breakpoint definitions
├── next.config.ts               # Next.js configuration
├── next-sitemap.config.js       # Sitemap generation config
├── sanity-typegen.json          # Sanity type generation config
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

---

## 📐 Development Conventions

### Naming Conventions

**Critical: All file and folder names MUST use kebab-case**

- ✅ **Files**: `image-section.tsx`, `sanity-page.tsx`, `page-section.tsx`
- ✅ **Folders**: `image-section/`, `page-section/`, `rich-text/`
- ✅ **Components**: PascalCase for component names (e.g., `ImageSection`, `SanityPage`)
- ✅ **Variables/Functions**: camelCase (e.g., `fetchPageData`, `imageUrl`)
- ✅ **Types/Interfaces**: PascalCase (e.g., `PageSection`, `ImageSectionProps`)

### Component Organization Patterns

1. **CMS Components** (`components/cms/`)
   - Components that directly map to Sanity schemas
   - Naming pattern: `sanity-[schema-name].tsx`
   - Example: `sanity-image-section.tsx` maps to `image-section` schema
   - These act as adapters between Sanity data and presentational components

2. **Layout Components** (`components/layout/`)
   - Structural/wrapper components
   - Naming pattern: descriptive kebab-case names
   - Example: `page-section/page-section.tsx` - wraps content sections

3. **Section Components** (`components/sections/`)
   - Pure presentational components
   - Naming pattern: `[section-name]/[section-name].tsx`
   - Example: `image-section/image-section.tsx`
   - Should be reusable and independent of CMS
   - **Each section should have a corresponding `.stories.tsx` file for Storybook**

4. **UI Components** (`components/ui/`)
   - shadcn/ui and custom base components
   - Naming pattern: kebab-case
   - Example: `button.tsx`, `icon.tsx`

### File Structure Pattern

Each component should follow this folder structure:

```
component-name/
├── component-name.tsx        # Main component file
├── component-name.stories.tsx # Storybook stories (for section components)
├── types.ts                  # (Optional) Component-specific types
└── utils.ts                  # (Optional) Component-specific utilities
```

### Code Style

- **TypeScript**: Strict mode enabled, always define types
- **Imports**: Organize imports (React → Next.js → Third-party → Internal → Types)
- **Props**: Define explicit prop interfaces for all components
- **Accessibility**: Always include ARIA labels, semantic HTML, keyboard navigation
- **Mobile-first**: Write styles mobile-first, use responsive breakpoints from `device-sizes.ts`
- **Tailwind-first**: Always try to use existing tailwind class, if missing add a new one

### Accessibility Requirements

- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, `<section>`)
- Include proper heading hierarchy (h1 → h2 → h3)
- Add `alt` text for all images
- Ensure keyboard navigation works for interactive elements
- Use ARIA labels where appropriate
- Test with screen readers
- Maintain color contrast ratios (WCAG AA minimum)

### SEO Requirements

- Generate proper metadata in `layout.tsx` and `page.tsx`
- Use Next.js `Metadata` API for dynamic meta tags
- Include Open Graph and Twitter Card metadata
- Implement structured data (JSON-LD) where applicable
- Generate sitemap via `next-sitemap`
- Configure `robots.txt` appropriately

---

## 🏛️ Architecture Overview

### Data Flow

```
Sanity CMS → GROQ Queries → Next.js Server Components → React Components → User
     ↑                                                           ↓
     └────────────── Content Updates (Sanity Studio) ───────────┘
```

### Component Hierarchy

1. **Route Level** (`app/(website)/[...slug]/page.tsx`)
   - Fetches page data from Sanity using GROQ queries
   - Passes data to page components

2. **Page Level** (`components/cms/page/sanity-page.tsx`)
   - Receives page data structure
   - Maps sections to appropriate components

3. **Section Level** (`components/cms/page/components/sanity-*.tsx`)
   - Adapter components that transform Sanity data
   - Pass transformed props to presentational components

4. **Presentation Level** (`components/sections/*/`)
   - Pure presentational components
   - Receive typed props and render UI
   - Independent of CMS structure

### Sanity Schema Architecture

- **Singleton Pages**: Settings, homepage (managed via singleton plugin)
- **Dynamic Pages**: Pages with dynamic slugs
- **Sections**: Modular content blocks (image section, text section, etc.)
- **Portable Text**: Rich text content with custom components

---

## ➕ Adding New Features

### Adding a New Section Type

When adding a new content section (e.g., "Hero Section", "Contact Form"):

1. **Create Sanity Schema** (`sanity/schemas/sections/[section-name].ts`)

   ```typescript
   export const heroSection = {
     name: 'hero-section',
     type: 'object',
     title: 'Hero Section',
     fields: [
       // Define your fields here
     ]
   }
   ```

2. **Register Schema** (add to `sanity/schemas/index.ts`)

3. **Create CMS Adapter Component** (`components/cms/page/components/sanity-hero-section.tsx`)

   ```typescript
   import { HeroSection } from '@/components/sections/hero-section/hero-section'

   export function SanityHeroSection(props: /* Sanity data type */) {
     // Transform Sanity data to component props
     return <HeroSection {...transformedProps} />
   }
   ```

4. **Create Presentational Component** (`components/sections/hero-section/hero-section.tsx`)

   ```typescript
   export function HeroSection(props: HeroSectionProps) {
     // Pure presentational component
     // Focus on accessibility and responsiveness
   }
   ```

5. **Create Storybook Story** (`components/sections/hero-section/hero-section.stories.tsx`)

   ```typescript
   import type { Meta, StoryObj } from '@storybook/react'
   import { HeroSection } from './hero-section'

   const meta: Meta<typeof HeroSection> = {
     title: 'Sections/HeroSection',
     component: HeroSection,
   }

   export default meta
   type Story = StoryObj<typeof HeroSection>

   export const Default: Story = {
     args: {
       // Add component props
     },
   }
   ```

6. **Register in Component Mapper** (`components/cms/sanity-components.tsx`)

   ```typescript
   const componentsMap = {
     'hero-section': SanityHeroSection,
     // ... other sections
   }
   ```

7. **Add GROQ Query** (update `sanity/schemas/pages/page.queries.ts`)

8. **Test in Storybook** - Run `pnpm storybook` and verify the component renders correctly

### Adding a New Page Route

For static routes (non-Sanity managed):

1. Create route folder in `app/(website)/[route-name]/`
2. Add `page.tsx` with appropriate metadata
3. Implement page component following accessibility guidelines
4. Update sitemap configuration if needed

### Adding UI Components

For new shadcn/ui components:

1. Run: `pnpm dlx shadcn@latest add [component-name]`
2. Component will be added to `components/ui/`
3. Follow existing patterns for customization

### Extending Utilities

Add shared utilities to `lib/`:

- `lib/utils.ts` - General purpose utilities
- `lib/result.ts` - Result type patterns for error handling
- New utility files should use kebab-case naming

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript compiler check
pnpm storybook    # Start Storybook on port 6006
pnpm build-storybook  # Build Storybook for deployment
pnpm typegen # Generate TypeScript types from schemas
```

### Sanity Commands

```bash
pnpm sanity deploy         # Deploy Sanity Studio
```

---

## 🎨 Storybook

This project uses Storybook for component development and documentation. Storybook provides an isolated environment to develop, test, and document UI components.

### Running Storybook

Start Storybook development server:

```bash
pnpm storybook
```

Storybook will be available at http://localhost:6006

### Creating Stories

Stories are located in `components/sections/[component-name]/` folders alongside the components they document.

Example story structure:

```typescript
// components/sections/image-section/image-section.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ImageSection } from './image-section'

const meta: Meta<typeof ImageSection> = {
  title: 'Sections/ImageSection',
  component: ImageSection,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ImageSection>

export const Default: Story = {
  args: {
    // Component props
  },
}
```

### Storybook Configuration

- **Stories Location**: Components in `components/**/*.stories.tsx` and `stories/**/*.stories.tsx`
- **Framework**: `@storybook/nextjs` - Full Next.js feature support
- **Addons**:
  - `@storybook/addon-mcp` - Model Context Protocol integration
- **Static Files**: Served from `public/` directory

### Best Practices for Stories

1. **Create stories for all section components** - Each component in `components/sections/` should have a corresponding `.stories.tsx` file
2. **Use meaningful story names** - Default, WithCustomContent, Loading, Error, etc.
3. **Document component variants** - Show different states and configurations
4. **Include accessibility notes** - Document ARIA labels, keyboard navigation
5. **Test responsive behavior** - Use Storybook's viewport addon to test mobile/desktop views

### Building Storybook

To build a static version of Storybook for deployment:

```bash
pnpm build-storybook
```

The static build will be created in `storybook-static/` directory.

---

## 🎯 Key Principles

### For AI Assistants / Future Development

When working on this codebase, always follow these principles:

1. **Naming is Sacred**: Never deviate from kebab-case for files/folders. This is non-negotiable.

2. **Separation of Concerns**:
   - CMS components (`components/cms/`) only handle data transformation
   - Section components (`components/sections/`) only handle presentation
   - Keep business logic in appropriate places

3. **Accessibility First**:
   - Every interactive element must be keyboard accessible
   - Every image must have meaningful alt text
   - Test with screen readers when possible

4. **Mobile First**:
   - Write mobile styles first
   - Use responsive breakpoints from `device-sizes.ts`
   - Test on real devices when possible

5. **Type Safety**:
   - Always define explicit TypeScript types
   - Use Sanity's generated types when available
   - Avoid `any` type unless absolutely necessary

6. **Component Composition**:
   - Build small, focused components
   - Compose larger features from smaller components
   - Keep components reusable and testable

7. **Performance**:
   - Use Next.js Image component for all images
   - Implement proper code splitting
   - Minimize client-side JavaScript

8. **SEO & Metadata**:
   - Every page must have proper metadata
   - Use semantic HTML
   - Generate structured data where applicable

9. **Additional**:
   - Use icons like this - <Icon name='Instagram' className='size-8 text-primary' />

## 📚 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)

---

**Built with ❤️ using Next.js and Sanity CMS**
