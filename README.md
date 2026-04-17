##Edge & Elegance Beauty & Barber Studio

> A multi-page front-end website for a beauty and barber studio,  
> built as a group project for **CS130 Web Technology** at VTDI.

---

## Live Pages

| # | Page | File | Description |
|---|---|---|---|
| 1 | Home | `index.html` | Hero slideshow, CTA buttons, |
| 2 | Pricing | `pricing.html` | Service price table grouped by category |
| 3 | Reviews | `reviews.html` | Rating summary, review cards, live review form |
| 4 | Booking | `Booking.html` | Appointment booking form with JS validation |
| 5 | Catalog | `catalog.html` | Services and products grid |
| 6 | FAQ | `FAQ.html` | Accordion frequently asked questions |
| 7 | Team | `team_member.html` | Team member profiles in a 4-column grid |

---

## Technologies Used

| Layer | Technology | Details |
|---|---|---|
| Structure | HTML5 | Semantic elements|
| Style | CSS3 | External `style.css& Booking.css`, Grid, Flexbox, animations |
| Behaviour | Vanilla JavaScript | External `script.js& Booking.js` |
| Navigation | Bootstrap 5.3 | Navbar component |
| Fonts | Google Fonts | Cormorant Garamond + Instrument Sans |

---

## Features

### Image Slideshow (Home Page)
- 5 slides with auto-advance every 5 seconds
- Dot navigation and prev/next arrow buttons
- Animated gold progress bar
- Pause on hover
- Touch swipe support for mobile

### Mobile Navigation
- Hamburger button (☰) appears on screens below 768px
- Three bars animate into an ✕ on open
- Fullscreen overlay drawer with large serif links
- Closes on link click, outside click, or Escape key

### Booking Form
- Fields: Full Name, Email, Phone, Service, Date, Time
- JavaScript client-side validation before submit
- Error messages shown per field on invalid input
- Success overlay on confirmed booking

### FAQ Accordion
- Built with native HTML `<details>` / `<summary>` elements
- No JavaScript required — browser handles open/close
- Submit a question form adds new entries dynamically

### Reviews Page
- Overall star rating with animated bar chart breakdown
- 6 pre-loaded review cards in a responsive 3-column grid
- Leave a Review form with star picker, name, service, and review text
- Submitted reviews inject a new card live at the top of the grid

### Pricing Table
- Three service categories: Grooming, Braiding, Nail Care
- Uses semantic `<thead>`, `<tbody>`, `<td scope>` markup

### Team Page
- 4 team members displayed in a responsive CSS Grid
- Each card uses `<article>`, `<figure>`, `<figcaption>`

---

## Responsive Design

Three breakpoints handled with CSS media queries only:

```css
/* Tablet */
@media (max-width: 1024px) { ... }

/* Mobile */
@media (max-width: 768px)  { ... }

/* Small phones */
@media (max-width: 400px)  { ... }
```

| Breakpoint | Layout |
|---|---|
| Desktop (769px+) | Side-by-side hero, horizontal nav |
| Tablet (≤1024px) | Adjusted padding, 2-column team grid |
| Mobile (≤768px) | Stacked layout, hamburger menu, touch slideshow |
| Small phone (≤400px) | Buttons stack vertically, headings shrink |

---

## Design System

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#0d0d0d` | Page background, button text |
| `--cream` | `#f5f0e8` | Primary text, headings, logo |
| `--gold` | `#c9a96e` | Accents, buttons, italic highlights |
| `--muted` | `#7a7060` | Body copy, nav links, labels |
| `--border` | `rgba(201,169,110,0.25)` | Borders, dividers |

### Typography

| Style | Font | Size | Weight |
|---|---|---|---|
| Display / H1 | Cormorant Garamond | clamp(3.2–5.5rem) | 300 |
| Heading / H2 | Cormorant Garamond | clamp(2.4–3.8rem) | 300 |
| Italic accent | Cormorant Garamond | inherited | 300 italic |
| Eyebrow label | Instrument Sans | 0.68rem | 500 |
| Body copy | Instrument Sans | 0.88–0.92rem | 300 |
| Nav links | Instrument Sans | 0.72rem | 500 |

### Animations

| Name | Used on |
|---|---|
| `fadeDown` | Header entrance |
| `fadeIn` | Toast, scroll hint, success overlays |
| `revealLeft` | Slideshow image panel |
| `revealRight` | Hero article text |
| `scrollDrop` | Scroll indicator loop |

---

## Project Structure

```
edge-and-elegance/
│
├── index.html            ← Home page
├── pricing.html          ← Pricing table
├── reviews.html          ← Customer reviews
├── Booking.html          ← Appointment booking
├── catalog.html          ← Services catalog
├── FAQ.html              ← Frequently asked questions
├── team_member.html      ← Team profiles
│Booking.css&js            ← Booking page Style and javaScript

├── style.css             ← Global stylesheet
├── script.js             ← Global JavaScript
│
└── Images/
    ├── ss.jpg
    ├── ss2.jpg
    ├── ss3.jpg
    ├── ss4.jpg
    ├── ss5.jpg
    └── team photos...
```

---

## Semantic HTML Elements Used

```
<header>    → Site header / page banner
<nav>       → Navigation links
<main>      → Primary page content
<section>   → Thematic content groupings
<article>   → Self-contained content (review cards, team cards)
<aside>     → Supporting content (image slideshow panel)
<figure>    → Image with caption wrapper
<figcaption>→ Image caption
<footer>    → Page footer / copyright
<details>   → FAQ accordion container
<summary>   → FAQ question / accordion trigger
<table>     → Pricing and team data tables
<progress>  → Slideshow auto-advance progress bar
```

 all layout is achieved with  
> semantic HTML5 elements and CSS Grid / Flexbox.

---
## How to Run

1. Download or clone the repository
2. Keep all files in the **same folder** — HTML, CSS, JS, and Images together
3. Open `index.html` in any modern browser
4. No server, build tool, or installation required

```bash
git clone https://github.com/your-username/edge-and-elegance.git
cd edge-and-elegance
open index.html



## Team

| Name | Role |
|---|---|
| Renaldo Frazer | Project Manager / Tester |
| Denicia Deer | UX / UI Designer |
| Shalini Webb | Backend Developer |
| Nikali Jacobs | Backend Developer / Quality Assurance |

---

## Course Information

**Course:** CS130 — Web Technology  
**Institution:** Vocational Training Development Institute (VTDI)  
**Year:** 2026  

---

© 2026 Edge & Elegance Beauty & Barber Studio. All rights reserved.
