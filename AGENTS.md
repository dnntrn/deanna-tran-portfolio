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
- Preserve all existing features: twinkling logo, ASCII cat easter egg, sparkle burst, dark mode toggle, staggered fade-in animation
