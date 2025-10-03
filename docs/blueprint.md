# **App Name**: Portfolio Aurora

## Core Features:

- Interactive Project Display: Showcase Machine Learning projects in an interactive grid with project cards sourced from Sanity.io CMS.
- Dynamic Content Fetching: Fetch project content, including README.md, dynamically from Sanity.io.
- Full Project Details Modal: Provide an enhanced modal on project-card click. It displays all of a project's data: title, technologies, description, and README contents rendered from Markdown, using react-markdown, with the LLM being leveraged as a tool.
- Animated UI Elements: Incorporate smooth scrolling and scroll-reveal animations to enhance user experience and engagement.
- Optimized Image Delivery: Utilize next/image to optimize and lazy-load project images.
- Elite Web Performance: Configure code-splitting and dynamic imports (lazy loading) to achieve outstanding scores.
- Accessibility Compliance: Meet a11y requirements to be fully usable for all people.

## Style Guidelines:

- Primary color: Broken white/very light gray (#F5F5F5) for main text on dark backgrounds.
- Background: Pure black (#0A0A0A) for a sleek dark mode.
- Accent: Vibrant and energetic red (#FF0033) for interactive elements.
- Font: 'Inter' (sans-serif) applied globally as a variable font for performance and flexibility. Note: currently only Google Fonts are supported.
- Minimalist design with extensive white space to focus attention on content.
- Aurora UI: Animated background with radial-gradients incorporating the accent color (#FF0033).
- Spotlight Cursor: Customized cursor providing a light focus effect using a radial-gradient, following mouse movement with CSS variables.
- Squishy Buttons: Interactive buttons that elevate on hover and depress on click, enhanced with a red aura/glow.
- Skeleton Loading: Implement shimmer animations within skeleton screens during data fetching from Sanity.io.