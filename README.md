# FreshFold — Cinematic Laundry Landing Page

A component-based, responsive React + TypeScript landing page for a premium doorstep laundry service.

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS 3
- GSAP + ScrollTrigger for full-screen pinned, scrubbed five-scene scroll storytelling
- Framer Motion for UI transitions, reveals, hover states and modal interactions
- Lenis for smooth scrolling
- Lucide React icons

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (normally http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Project structure
```text
src/
├── components/
│   ├── motion/       # Reusable reveal animation
│   ├── sections/     # Navbar, hero, scroll film, services, process, etc.
│   ├── ui/           # Reusable buttons and UI primitives
│   └── BookingModal.tsx
├── data/             # Services, process steps, FAQs
├── hooks/            # Lenis smooth-scroll setup
├── types/            # Shared TypeScript types
├── App.tsx
├── main.tsx
└── styles.css
```

## Scroll-driven storytelling
`ScrollFilm.tsx` uses GSAP ScrollTrigger to pin the experience for a multi-viewport scroll segment. Its timeline is scrubbed by scroll position, crossfading and scaling full-bleed scene imagery while swapping story copy for pickup, fabric sorting, cleaning, finishing and doorstep delivery. Scrolling backward reverses the timeline naturally. `Hero.tsx` and `Manifesto.tsx` use Framer Motion scroll transforms for parallax.

## Before production
- Replace the FreshFold placeholder brand details, email addresses and sample prices.
- Replace sample testimonial content with verified customer reviews.
- Connect the booking form to your backend API; it currently demonstrates frontend validation and confirmation only.
- Replace remote Unsplash image URLs with licensed/owned optimized assets.
- Configure actual serviceability, pricing, pickup slots, notifications and payment flows.
- Consider adding server-side validation, spam protection and consent text to the booking flow.

## Accessibility and performance
- Semantic sections, labelled form controls and accessible button labels are included.
- `prefers-reduced-motion` is respected in CSS; consider disabling Lenis/GSAP timelines for reduced-motion users in a production accessibility pass.
- ScrollTrigger pins only the dedicated storytelling section; the rest of the page remains a normal responsive document.


## Scroll-scrubbed video film

The pinned FreshFold story is now video-based. Each chapter uses a distinct Pexels stock clip and GSAP scrubs the video's `currentTime` from beginning to end as scroll progress advances. It does not autoplay. Reverse scrolling seeks the footage backwards. Short overlapping dissolves connect the chapters.

### Stock footage sources
- Pickup / laundry cart: https://www.pexels.com/video/a-man-putting-clothes-in-a-laundry-cart-8756630/
- Sorting / laundry routine: https://www.pexels.com/video/man-putting-clothes-in-a-washing-machine-5592508/
- Washing: https://www.pexels.com/video/a-man-putting-clothes-inside-a-washing-machine-5901666/
- Ironing: https://www.pexels.com/video/a-person-ironing-a-shirt-5901669/
- Folding / packing: https://www.pexels.com/video/woman-folding-and-wrapping-the-clothe-7287917/

Pexels lists these clips as free to use under its license at the time of research. Review the current license and download each clip from its source page before production. For best performance and reliable scrubbing, download optimized 1080p MP4s and store them locally under `public/videos/`, then update each `source` in `ScrollFilm.tsx` to the corresponding `/videos/filename.mp4`. Remote source URLs are used in this demo; browser availability, cross-origin range requests and bandwidth can vary.

The fifth chapter uses a folding/packing clip to represent final preparation and dispatch; it is not literal doorstep handover footage. Replace it with locally licensed delivery handover footage if that exact visual is required.
