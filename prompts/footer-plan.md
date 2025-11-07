---
type: 'implementation-plan'
scope: 'feature'
feature_name: 'footer'
source: 'https://www.figma.com/design/zGkat3VFCaj1WLaiP2SVFA/Search-research?node-id=34-431&m=dev'
context_source: 'README.md'
output_file: 'footer-plan.md'
---

## 1. Summary

The footer component is a comprehensive site footer with company branding, contact information, and social media links. It features the WB Cars logo with a separator line, a showcase image, contact details (phone, address, email), and social media icons (Facebook, Instagram). The footer has a dark background (#121212) with yellow accent colors (#f7b402) and follows the project's automotive detailing theme.

## 2. Frontend Plan

- [ ] **Create footer section component** at `components/sections/footer/footer.tsx`
  - Layout: Two-column layout on desktop, single column on mobile
  - Left column: Company logo, decorative line, showcase image
  - Right column: Contact information with icons, social media section
- [ ] **Create footer Storybook story** at `components/sections/footer/footer.stories.tsx`
- [ ] **Required shadcn/ui components**: None new needed (existing Icon component can be used)
- [ ] **Missing components to create**:
  - `SocialMediaLinks` - Component for rendering social media icons with links
  - Contact information icons (phone, location, email) - will use custom SVG icons from design
- [ ] **Folder structure**:
  ```
  components/sections/footer/
  ├── footer.tsx               # Main footer component
  ├── footer.stories.tsx       # Storybook stories
  └── components/             # Sub-components if needed
      └── social-media-links.tsx
  ```
- [ ] **Responsive layout strategy**:
  - Desktop (976px+): Two-column layout with logo+image on left, contact info on right
  - Tablet (768px-975px): Stacked layout, reduce padding
  - Mobile (<768px): Single column, smaller logo, vertical contact layout
- [ ] **Design tokens needed**:
  - Background: `bg-secondary` (#121212) - already defined in globals.css
  - Text colors: `text-foreground` (white), `text-primary` (yellow #f7b402)
  - Typography: Montserrat for contact info, custom font "Uniwars" for "Follow us" (may need fallback)

## 3. Sanity CMS Plan

- [ ] **Schema already exists** - footer content is managed via `settings.ts` schema
- [ ] **Existing fields in settings schema**:
  - `phone` - Contact phone number
  - `mail` - Contact email address
  - `address` - Business address
  - `social` - Array of social media links with platform and URL
- [ ] **Additional fields needed**:
  - `footerImage` - Showcase image (type: image) for the car photo
  - Static logo - WB Cars logo will be served as a static file (no Sanity field needed)
- [ ] **Schema location**: Update `sanity/schemas/settings.ts`
- [ ] **Query requirements**:
  - Fetch settings data including footer fields
  - Query in `sanity/schemas/pages/page.queries.ts` or create footer-specific query

## 4. Integration Plan

- [ ] **CMS adapter component** at `components/cms/sanity-footer.tsx`
  - Transform Sanity settings data to footer component props
  - Handle image URL generation for logo and showcase image
  - Map social media array to social links format
- [ ] **Props interface**:
  ```typescript
  interface FooterProps {
    logo: {
      src: string;
      alt: string;
    };
    showcaseImage: {
      src: string;
      alt: string;
    };
    contact: {
      phone: string;
      address: string;
      email: string;
    };
    socialLinks: Array<{
      platform: 'Facebook' | 'Instagram' | 'Twitter' | 'Linkedin' | 'Youtube';
      url: string;
    }>;
  }
  ```
- [ ] **Register in component mapper** - Add to `components/cms/sanity-components.tsx`
- [ ] **Integration in layout** - Add to `app/(website)/layout.tsx` after main content
- [ ] **Data fetching**: Fetch settings data in layout component using GROQ query

## 5. Asset & Style Plan

- [ ] **Required custom icons**:
  - Phone icon (from Figma design)
  - Location/garage icon (from Figma design)
  - Email/envelope icon (from Figma design)
  - Facebook icon (white version)
  - Instagram icon (white version)
- [ ] **Icon implementation strategy**:
  - Extract SVG icons from Figma design
  - Store as React components in `components/ui/icons/` folder
  - Alternative: Use react-icons library for consistent social media icons
- [ ] **Typography requirements**:
  - Montserrat (already configured): Contact information text
  - "Uniwars" font: "Follow us" heading - needs font loading or fallback
  - Font weights: Regular (400), SemiBold (600), Bold (700)
- [ ] **Layout styling**:
  - Container: Full width with dark background
  - Inner content: Max width with horizontal padding
  - Spacing: Consistent gap between sections using Tailwind spacing scale
- [ ] **Image handling**:
  - Use Next.js Image component for logo and showcase image
  - Responsive image sizing for different breakpoints
  - Proper aspect ratios and object-fit

## 6. Dependencies & Setup

- [ ] **No new dependencies required** - all functionality can be achieved with existing stack
- [ ] **Font considerations**:
  - "Uniwars" font: Check if available via Google Fonts or needs custom font loading
  - Fallback to existing heading font (Michroma) if Uniwars unavailable
- [ ] **Sanity schema update**:
  - Add new fields to existing settings schema
  - Run `pnpm typegen` to regenerate TypeScript types
- [ ] **Optional enhancements**:
  - Consider react-icons for social media icons consistency
  - Add hover animations for social media links
  - Implement proper focus states for accessibility

## 7. Open Questions

- [ ] **Font availability**: Is "Uniwars" font available for web use, or should we use Michroma as fallback for "Follow us" text?
- [ ] **Logo source**: Should the footer logo be the same as the main site logo, or a specific footer variant?
- [ ] **Image content**: Should the showcase image be configurable via CMS, or use a default company image?
- [ ] **Social platforms**: Are Facebook and Instagram the only required social platforms, or should the system support all platforms defined in the settings schema?
- [ ] **Mobile layout**: Should the showcase image be hidden on mobile devices to save space, or maintained with smaller dimensions?
- [ ] **Email link behavior**: Should the email address be a clickable mailto link?
- [ ] **Phone link behavior**: Should the phone number be clickable tel: link on mobile devices?

---

### Implementation Notes

This footer follows the project's established patterns:

- Kebab-case naming convention for all files and folders
- Separation of concerns between CMS adapters and presentational components
- Mobile-first responsive design approach
- Accessibility considerations with semantic HTML and proper ARIA labels
- Integration with existing Sanity CMS settings structure
- Consistent with project's dark theme and yellow accent colors
