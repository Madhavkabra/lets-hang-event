# Component Tree

## Visual Hierarchy

```
App
└── Router
    └── MainLayout (Gradient Background)
        └── CreateEvent Page
            ├── Header
            │   └── "let's hang" Logo
            │
            └── Main Content (Flex Row, gap-12)
                │
                ├── Left Column (43% width)
                │   ├── PreviewCard
                │   │   ├── Gradient Background
                │   │   ├── "YOU'RE INVITED" Text
                │   │   └── Edit Button (bottom-right)
                │   │
                │   └── ChangeBackgroundButton
                │
                └── Right Column (Remaining width)
                    ├── Event Title Input (text-4xl)
                    │
                    ├── PhoneInput
                    │   ├── Save Icon
                    │   ├── Input Field
                    │   └── Arrow Button
                    │
                    ├── DetailsGroup (Card with dividers)
                    │   ├── Calendar + Date Input
                    │   ├── MapPin + Location Input
                    │   └── Banknote + Cost Input
                    │
                    ├── Description Textarea
                    │
                    ├── ActionChips (Flex row)
                    │   ├── "+ Capacity"
                    │   ├── "+ Photo gallery"
                    │   ├── "+ Links"
                    │   └── "Show more"
                    │
                    ├── CustomizeBanner
                    │   ├── Floating Icons (Decorative)
                    │   │   ├── Megaphone
                    │   │   ├── Link
                    │   │   └── Dice
                    │   ├── Text: "Customize your event your way"
                    │   └── Customize Button
                    │
                    └── Go Live Button (Rocket Icon)
```

## Component Relationships

### Atomic Design Pattern

**Atoms (Base UI)**
- Button
- Input
- Textarea
- Card

**Molecules (Event Components)**
- PreviewCard (Card + Edit Button)
- ChangeBackgroundButton (Button wrapper)
- PhoneInput (Icons + Input + Button)
- ActionChips (Multiple Buttons)

**Organisms**
- DetailsGroup (Card + Multiple Inputs)
- CustomizeBanner (Card + Icons + Button)

**Templates**
- MainLayout (Background wrapper)

**Pages**
- CreateEvent (Complete page composition)

## Data Flow

```
User Input → Component State → (Future: Recoil/API)
                                      ↓
                              Backend/Database
```

## Styling Flow

```
Tailwind Config
    ↓
Custom Colors & Extensions
    ↓
Global CSS (index.css)
    ↓
Component-level Tailwind Classes
    ↓
Props-based Variants
```

## Icon Usage Map

| Component | Icon | Purpose |
|-----------|------|---------|
| PreviewCard | Edit | Edit background |
| PhoneInput | Save | Save draft |
| PhoneInput | ArrowRight | Submit phone |
| DetailsGroup | Calendar | Date picker |
| DetailsGroup | MapPin | Location |
| DetailsGroup | Banknote | Cost |
| ActionChips | Plus | Add item |
| CustomizeBanner | Megaphone | Decoration |
| CustomizeBanner | Link2 | Decoration |
| CustomizeBanner | Dices | Decoration |
| Go Live Button | Rocket | Launch event |

## Responsive Strategy (Future)

```
Desktop (Default)
    ↓
Tablet (≤1024px)
    - Reduce margins
    - Adjust column widths
    ↓
Mobile (≤768px)
    - Stack columns vertically
    - Full-width components
    - Smaller text sizes
```

