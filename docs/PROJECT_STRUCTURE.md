# Project Structure

## Overview
This is a pixel-perfect "Create Event" page built with React, TypeScript, Vite, Tailwind CSS, and Lucide React icons.

## Directory Structure

```
src/
├── components/
│   ├── ui/                      # Reusable base UI components
│   │   ├── Button.tsx           # Customizable button with variants
│   │   ├── Card.tsx             # Glass-morphism card component
│   │   ├── Input.tsx            # Input with icon support
│   │   ├── Textarea.tsx         # Textarea with glass styling
│   │   └── index.ts             # Barrel export
│   │
│   └── event/                   # Event-specific components
│       ├── PreviewCard.tsx      # "YOU'RE INVITED" preview card
│       ├── ChangeBackgroundButton.tsx
│       ├── PhoneInput.tsx       # Phone input with save icon
│       ├── DetailsGroup.tsx     # Calendar, Location, Cost inputs
│       ├── ActionChips.tsx      # Action pill buttons
│       ├── CustomizeBanner.tsx  # Decorative customize banner
│       └── index.ts             # Barrel export
│
├── layouts/
│   └── MainLayout.tsx           # Global gradient background wrapper
│
├── pages/
│   └── CreateEvent.tsx          # Main create event page
│
├── App.tsx                      # Router and app entry
├── main.tsx                     # React DOM entry
└── index.css                    # Global styles + Tailwind

```

## Design Specifications

### Layout
- **Background:** Linear gradient from Deep Violet (#2e1065) to Soft Pink (#ec4899)
- **Global Margin:** 95px on x-axis
- **Header Height:** 80px
- **Grid Layout:**
  - Left Column: 43% width
  - Gap: 48px (using gap-12 = 3rem = 48px)
  - Right Column: Remaining width

### Components

#### Base UI Components (`src/components/ui/`)

**Button**
- Variants: `glass`, `glass-dark`, `primary`, `secondary`
- Sizes: `sm`, `md`, `lg`
- Features: Icon support, full-width option, hover effects

**Card**
- Variants: `glass`, `glass-dark`, `solid`
- Features: Backdrop blur, customizable opacity

**Input**
- Variants: `glass`, `glass-dark`, `transparent`
- Features: Icon integration, glassmorphism styling

**Textarea**
- Variants: `glass`, `glass-dark`
- Features: Auto-height, glassmorphism styling

#### Event Components (`src/components/event/`)

**PreviewCard**
- Square aspect ratio
- Gradient background with abstract shapes
- "YOU'RE INVITED" text overlay
- Edit button in bottom-right corner

**PhoneInput**
- Save icon + input + arrow button
- Dark glass background

**DetailsGroup**
- Three stacked inputs with 1px dividers
- Calendar, Map Pin, and Banknote icons
- Dark glass container

**ActionChips**
- Pills with + icons
- Options: Capacity, Photo gallery, Links, Show more

**CustomizeBanner**
- Dark violet gradient background
- Floating decorative icons (Megaphone, Link, Dice)
- Centered customize button

### Styling System

**Colors:**
- Deep Violet: `#2e1065`
- Soft Pink: `#ec4899`
- Dark Purple: `#1e1b4b`
- Glass effects: `bg-white/10`, `bg-black/20` with `backdrop-blur-md`

**Typography:**
- Font: Inter (Google Fonts)
- Event title: `text-4xl font-bold`
- Header: `text-2xl font-bold`

**Glassmorphism:**
- Semi-transparent backgrounds (`/10`, `/20`, `/30`)
- Backdrop blur effects
- White text with opacity variations

## Tech Stack

- **Framework:** React 19.2.0 with TypeScript
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 4.1.18
- **Icons:** Lucide React
- **Routing:** React Router DOM 7.13.0
- **State Management:** Recoil 0.7.7 (ready for use)

## Development

### Running the App
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Component Usage Examples

### Using Base Components
```tsx
import { Button, Card, Input } from '@/components/ui';

<Button variant="glass" size="lg" icon={Rocket}>
  Go Live
</Button>

<Card variant="glass-dark">
  <Input icon={Calendar} placeholder="Select date" />
</Card>
```

### Customizing Components
All components accept standard HTML attributes and can be styled with Tailwind classes:

```tsx
<Button className="mt-4 shadow-lg" fullWidth>
  Custom Button
</Button>
```

## Future Enhancements

1. Add form validation with React Hook Form
2. Implement date picker component
3. Add image upload for background
4. Connect to backend API
5. Add animations with Framer Motion
6. Implement responsive design for mobile
7. Add accessibility features (ARIA labels)
8. Create more page variants

## Notes

- All spacing follows the 8px grid system
- Components are designed to be reusable and composable
- Glass-morphism effects are extensively used for modern UI
- The layout is optimized for desktop (1440px+)

