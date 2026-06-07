# Agent Instructions for Deanna Tran's Site

## AI Content Sync Rule

If you modify bio text, skills, project descriptions, job details, or contact info anywhere on the site, you **MUST** also update `/public/llms.txt` to reflect those changes.

`/llms.txt` is a plain-text, markdown-formatted file specifically for AI crawlers (LLMs, Perplexity, Gemini, etc.). It should always stay in sync with the live site content. Keep it free of navigation, styling, or HTML markup — just clean, structured text.

### What to sync:
- Bio / introduction paragraphs
- Job title and company
- Skills list
- Project descriptions
- Contact links
- Any new sections that describe Deanna's work or background

### What NOT to put in llms.txt:
- Navigation links
- CSS classes or styling
- HTML tags
- JavaScript
- Anything not relevant to AI context extraction

## Coding Preferences
- Prefer Tailwind CSS utility classes over custom CSS when possible
- Keep custom CSS in `src/styles/global.css` for complex animations, keyframes, and pseudo-element interactions
- Use Astro components and static site generation
- Maintain the fairy-Y2K aesthetic: ephemeral, warm, lowercase casual tone
- Preserve all existing features: twinkling logo, dark mode toggle, staggered fade-in animation

## Resume Sync Rule

If you modify the resume page (`/src/pages/resume.astro`) or any resume-related content (job titles, dates, experience bullets, skills, education, contact info), you **MUST** also update `/public/resume.md` to reflect those changes.

### What to sync:
- Job titles and company names
- Employment dates
- All experience bullets (keep them outcome-focused)
- Skills list
- Education details
- Contact information

### Format for resume.md:
- Use **standard case** (not lowercase) — this file is for ATS and AI parsers
- Use semantic markdown: `#` for name, `##` for sections, `###` for roles
- Dates in italics: `*Apr 2026 – Present*`
- Bullets as `-` list items
- Skills as a comma-separated line or simple list
- Keep the same content as the web resume, just in markdown structure

### Case strategy reminder:
The web resume (`/src/pages/resume.astro`) uses `text-transform: lowercase` in CSS for visual branding, but the underlying HTML uses standard case for ATS compatibility. The markdown file should always be standard case.

### Files involved:
- `/src/pages/resume.astro` — the visual resume page
- `/public/resume.md` — the plain-text companion for ATS/AI parsers
