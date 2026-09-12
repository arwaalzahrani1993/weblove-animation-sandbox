# Weblove Animation Sandbox

## Stack

- Vite, React, TypeScript, Tailwind CSS
- GSAP and @gsap/react
- Framer Motion
- Lenis
- Three.js, React Three Fiber, and Drei
- Lucide icons

## Project structure

- Reusable UI: `src/components`
- Motion utilities: `src/animations`
- 3D scenes: `src/scenes`
- Shared helpers: `src/lib`
- Page copy: `src/copy.ts`

## Performance budget

- Keep Lighthouse Performance at 90 or higher.
- Keep LCP below 2.5 seconds and CLS below 0.1.
- Prefer animating `transform` and `opacity`; do not animate layout properties such as `width`, `top`, or `left`.
- Respect `prefers-reduced-motion` and remove non-essential motion when it is enabled.
- Lazy-load heavy 3D scenes and provide a lightweight fallback for weak devices.
- Build mobile-first and verify every lesson on a phone-sized viewport.

## Accessibility

- Use semantic HTML and visible keyboard focus.
- Decorative visuals must be hidden from assistive technology.
- Maintain readable contrast and meaningful alternative text.
