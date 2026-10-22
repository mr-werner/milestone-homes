# Milestone Homes: Blueprint WebStudio Concept

This is an independent, unofficial redesign concept for https://www.milestonehomesok.com/, the site of a custom home builder in the Tulsa, Oklahoma area.
Preview: https://mh.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

It is a one-page Vite + React 19 build. Content and components are in `src/App.jsx`, styles in `src/styles.css`, and the Blueprint WebStudio concept widget in `src/concept.jsx`.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

- Vercel project `milestone-homes` (framework Vite, team mrwerner-s-projects). Pushes to `main` deploy automatically.
- Domain `mh.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.
- Environment variables (all optional):
  - `VITE_CONCEPT_END_DATE`: countdown end (defaults to 2026-11-30).
  - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`: used by the appointment form (`api/contact.js`). Without them, the form shows a demo message.
  - `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`: used by `api/google-reviews.js`. The page doesn't use this yet because the current site has no Google rating to show.
- The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the studio site. Add `mh.blueprintwebstudio.com` to `allowedOrigins` in blueprint-digital.

## Design

- **Palette** is taken from the logo: navy `#152B49` and gold `#ECAE1D`, plus a warm paper/cream neutral. The original navy-plate logo sits directly on the navy header, and the favicon is the mountain "M" cut from the logo.
- **Type**:
  - Marcellus for headings, a flared-serif cap style close to the logo's "MILESTONE".
  - Figtree for body text.
  - IBM Plex Mono for the drafting annotations: sheet numbers, specs and dimensions.
- **Motif** is the drafting table:
  - Blueprint grid paper on the navy sections.
  - Dimension lines around the hero photo ("Kalispell plan · 3,974 sq ft").
  - An architect's title block ("Project: Your home · Sheet A-1").
  - Plans laid out as drawing sheets numbered A-01 to A-18.
  - Their own hand-drawn elevations, inverted into white blueprint lines and drifting across the plans section.
- **Section order:**
  1. Announcement line and sticky header with a Schedule button.
  2. Hero: "We can help you build your dream home" (their own headline), Schedule an Appointment, and "Call Allison".
  3. Stats: 1,700+ homes, 25 neighborhoods, 1984, 3rd generation.
  4. Building Made Simple: Meet Up / Dream Up / Team Up, plus three ways to build.
  5. Floor plan browser: filter by lot size and bedrooms, sort by size, and click a plan for the full sheet with "Ask about this plan".
  6. Communities: school district, lot size, lot and home prices, plus plat / covenants / available-lots PDFs.
  7. For Sale: recently sold homes and lots.
  8. Gallery with tabs and a lightbox.
  9. About: Beale-to-Milestone timeline, Rob and Bailey, values.
  10. Testimonials, verbatim, with HBA / OSHBA CPB / NAHB badges.
  11. Appointment form, with the plan prefilled when coming from a plan.
  12. Footer.

## What changed from the current site

- **Phone numbers:** the current site shows four different ones:
  - 918-232-4084 in the "Call Allison" block and the footer.
  - 918-951-7000, which is where that "918.232.4084" button actually dials (`tel:1-918-951-7000`).
  - 918-298-2101 on the Contact page.
  - 918.921.9481 printed on every plan sheet.

  The concept uses one number everywhere.
- **Plans:** these were only image carousels, so plan names and specs were not searchable or filterable. All 18 are now real text cards with bed/bath/sq ft, filters and a full-sheet view.
- **Community links:**
  - Hickory Falls "Available Homes" opens the same PDF as "Available Lots".
  - StoneCreek "Available Homes" goes to the Plans page.
  - The Grove's Plat, Covenants and Available Lots buttons all go to a "coming-soon" page.

  The concept shows only working documents and says "available on request" for The Grove.
- **Founding history:** the home page says "Since 1984", the Build page says "over 36 years", and the About page says Milestone was founded in 1993. The concept states both facts plainly: Rob started building in 1984, and he founded Milestone in 1993.
- **Copy fixes:**
  - The Build page's `<title>` is "ABOUT" and its URL is `/copy-of-about`; the concept uses an anchor called `#build`.
  - Typos are fixed: "foucsed", "floorpans", "a experience".
- **Appointments:** "Schedule an Appointment" was a bare `mailto:` link. It is now a real appointment form (interest, plan, preferred date) and appears in the header on every scroll position.
- **For Sale:** the page listed three homes, all marked SOLD. These are now shown honestly as recently sold, with a prompt to ask about upcoming homes and lots.
- **Layout:** checked at 1280px and 390px with no sideways scrolling. On phones, plans become a swipeable row.

## Owner should confirm

- **Main phone number** (see above): the concept uses 918-232-4084, Allison's number from the home page and footer. What is Allison's title, and should the site use a main office line instead?
- **Address:** 9802 S 33rd W Ave, Tulsa, OK 74037. ZIP 74037 is Jenks; confirm this is the office for appointments. No office hours appear on the current site, so none are shown.
- **Plan grouping:** plans 01–09 (Alpine … Whistler) are treated as standard lots and 10–18 (California … Prairie) as "Plans for Larger Lots", based on the two carousels.
  - Tennessee appears twice (3 bed / 2,626 sq ft and 4 bed / 3,120 sq ft, which has no "sq ft" label on the sheet). Are these two versions of one plan?
  - The Whitefish sheet says "3/5 Bedrooms | 2/3 Baths".
- **Community prices** are copied from the Communities page: Hickory Falls lots from $95,000 with homes from the $500s; StoneCreek lots from $155,000 with homes from the high $700s; The Grove lots from $98,000 with homes from the $450s. Are they still current, and is The Grove's lot size also ½+ acre?
- **Communities shown:** are Hickory Falls, StoneCreek and The Grove still the active communities? What should the two "New Development · Coming Soon" slots be called, if they can be announced?
- **Process copy:** the one-line descriptions under Meet Up / Dream Up / Team Up were written for the concept; the original site gives only the three names.
- **Bios:** Rob's and Bailey's are condensed from the About page. Confirm the board positions are current. Bailey has no portrait on the current site except a beach photo, so an initials tile is used; a headshot would be better.
- **Photo captions:** the lake photo is labelled "Rob & Bailey Miles" and the red-dress photo is used as Allison; both are assumed from the home page "The Team" and "Call Allison" blocks.
- **Badges:** "OSHBA Certified Professional Builder" comes from the badge image on their footer. Confirm the certification is current.
- **Testimonials:** these are the three from the About page, quoted verbatim. That includes "Stonebrooke" as written, which may mean StoneCreek. There is no Google rating on the current site, so no rating is shown.

## Photo sources

- All photos, plan sheets, hand-drawn elevations, the logo and the badges come from milestonehomesok.com (Wix media). They were downloaded and resized, and the elevations were cropped from their plan sheets. Nothing is from Unsplash.
- Before a real launch:
  - Replace them with original full-resolution files from Milestone.
  - Confirm that the rendering-style plan images (Alpine, Banff) may be used.
  - Confirm photo permission for the people pictured (Rob, Bailey, Allison).
