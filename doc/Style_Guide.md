# Pray1209 UI Style Guide

## 1. Color System

### Primary Palette (Sacred & Divine)
| Name | Hex | Variable | Usage |
|------|-----|----------|-------|
| **Midnight Void** | `#0F172A` | `--color-void` | Main Background, Deep Shadows |
| **Cathedral Blue** | `#1E2A5A` | `--color-cathedral` | Secondary Background, Headers |
| **Liturgical Gold** | `#D4AF37` | `--color-gold` | Primary Actions, Borders, Highlights |
| **Soft Gold** | `#EEDCB3` | `--color-gold-soft` | Secondary Text, Subtle Borders |
| **Ivory Light** | `#FAF7F0` | `--color-ivory` | Light Backgrounds, High Contrast Text |

### Functional Colors
| Name | Hex | Variable | Usage |
|------|-----|----------|-------|
| **Legendary Red** | `#E84C4C` | `--color-legendary` | Legendary Item Glows/Badges |
| **Rare Purple** | `#6A5BFF` | `--color-rare` | Rare Item Glows/Badges |
| **Common Silver** | `#E0DFDA` | `--color-common` | Common Items |
| **Error Crimson** | `#D4183D` | `--destructive` | Error States, Destructive Actions |

## 2. Typography

### Headings (Serif / Display)
*   **Font Family**: `Cinzel`, serif.
*   **Weights**: 400 (Regular), 700 (Bold).
*   **Usage**: Page Titles, Modal Headers, Important Stat Numbers.

### Body (Sans-Serif)
*   **Font Family**: `Inter`, sans-serif.
*   **Weights**: 400 (Regular), 500 (Medium).
*   **Usage**: Descriptions, UI Labels, Button Text.

## 3. Spacing & Layout
*   **Base Unit**: `4px` (0.25rem).
*   **Border Radius**:
    *   `sm`: `4px`
    *   `md`: `8px`
    *   `lg`: `16px` (Cards)
    *   `xl`: `24px` (Modals)
    *   `full`: `9999px` (Buttons, Pills)

## 4. UI Effects

### Glassmorphism (Sacred Glass)
```css
.glass-sacred {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
```

### Golden Glow
```css
.glow-gold {
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
}
```
