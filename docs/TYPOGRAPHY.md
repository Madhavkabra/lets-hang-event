# Typography System

## Font Families

### 1. Syne (Brand Font)
- **Usage:** Brand name "let's hang"
- **Import:** Google Fonts
- **Weights:** 700 (Bold)
- **Tailwind:** `font-syne`

### 2. Inter
- **Usage:** Buttons, UI elements
- **Import:** Google Fonts
- **Weights:** 400, 500, 600, 700
- **Tailwind:** `font-inter`

### 3. SF Pro Display (System Font)
- **Usage:** Body text, titles, callouts
- **Fallback:** System fonts (-apple-system, BlinkMacSystemFont)
- **Weights:** 400, 500, 600
- **Tailwind:** `font-sf-pro`

---

## Typography Tokens

### Header Brand
**Usage:** "let's hang" logo
```tsx
<h1 className="font-syne text-header-brand text-white">
  let's hang
</h1>
```
- Font: Syne
- Size: 32px
- Weight: 700
- Line Height: 100%
- Letter Spacing: -0.29px

---

### Event Title
**Usage:** Main event name input
```tsx
<input className="font-sf-pro text-event-title text-white" />
```
- Font: SF Pro Display
- Size: 48px
- Weight: 600
- Line Height: 100%
- Letter Spacing: 0%

---

### Title 1 / Regular
**Usage:** Section headings
```tsx
<h2 className="font-sf-pro text-title-1 text-white text-center">
  Section Title
</h2>
```
- Font: SF Pro Display
- Size: 20px
- Weight: 600
- Line Height: 100%
- Letter Spacing: 0%

---

### Title 2 / Emphasized
**Usage:** Important secondary titles
```tsx
<h3 className="font-sf-pro text-title-2 text-white text-center">
  Subtitle
</h3>
```
- Font: SF Pro Display
- Size: 16px
- Weight: 600
- Line Height: 100%
- Letter Spacing: 0%

---

### Title 2 / Regular
**Usage:** Regular secondary titles
```tsx
<h3 className="font-sf-pro text-title-2-medium text-white text-center">
  Subtitle
</h3>
```
- Font: SF Pro Display
- Size: 16px
- Weight: 500
- Line Height: 100%
- Letter Spacing: 0%

---

### Body / Regular
**Usage:** Body text, descriptions
```tsx
<p className="font-sf-pro text-body text-white">
  Body text content
</p>
```
- Font: SF Pro Display
- Size: 16px
- Weight: 500
- Line Height: 100%
- Letter Spacing: 0%

---

### Callout / Regular
**Usage:** Small labels, captions
```tsx
<span className="font-sf-pro text-callout text-white">
  Small text
</span>
```
- Font: SF Pro Display
- Size: 14px
- Weight: 400
- Line Height: 100%
- Letter Spacing: 0%

---

### Button Text
**Usage:** Button labels
```tsx
<button className="font-inter text-button text-white text-center">
  Click me
</button>
```
- Font: Inter
- Size: 16px
- Weight: 500
- Line Height: 100%
- Letter Spacing: 0%

---

## Usage Examples

### Complete Component Example

```tsx
import { Button } from '@/components/ui';

function EventCard() {
  return (
    <div className="space-y-4">
      {/* Event Title */}
      <h2 className="font-sf-pro text-event-title text-white">
        Summer BBQ Party
      </h2>
      
      {/* Section Title */}
      <h3 className="font-sf-pro text-title-1 text-white/90">
        Event Details
      </h3>
      
      {/* Body Text */}
      <p className="font-sf-pro text-body text-white/80">
        Join us for an amazing summer celebration with food, music, and friends!
      </p>
      
      {/* Small Label */}
      <span className="font-sf-pro text-callout text-white/60">
        Limited spots available
      </span>
      
      {/* Button */}
      <Button className="font-inter text-button">
        RSVP Now
      </Button>
    </div>
  );
}
```

---

## Quick Reference Table

| Token | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| `text-header-brand` | Syne | 32px | 700 | Brand logo |
| `text-event-title` | SF Pro | 48px | 600 | Event name |
| `text-title-1` | SF Pro | 20px | 600 | Section headers |
| `text-title-2` | SF Pro | 16px | 600 | Important subtitles |
| `text-title-2-medium` | SF Pro | 16px | 500 | Regular subtitles |
| `text-body` | SF Pro | 16px | 500 | Body text |
| `text-callout` | SF Pro | 14px | 400 | Small labels |
| `text-button` | Inter | 16px | 500 | Button text |

---

## Font Loading

All fonts are loaded via Google Fonts in `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&display=swap');
```

SF Pro Display uses system fonts via the font stack:
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif
```

---

## Design System Alignment

All typography follows the design specifications with:
- ✅ 100% line-height for all tokens
- ✅ Precise letter-spacing values
- ✅ Correct font weights
- ✅ Proper font families

---

## Notes

- **SF Pro Display** is a system font on Apple devices. On other systems, it falls back to the system UI font.
- All line-heights are set to **100%** as per design specs.
- Letter spacing is minimal (0% or slightly negative) for modern, tight typography.
- Font weights use numerical values (400, 500, 600, 700) for precision.

