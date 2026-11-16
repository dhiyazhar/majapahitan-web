# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Four audiences, served with equal weight:

- **Students and teachers**: learners studying Majapahit history and culture, for school or university work.
- **General public**: curious Indonesians and visitors browsing the heritage online.
- **Researchers and academics**: scholars who need publications, citations, and artefact and site data.
- **Artists and contributors**: creators who submit contemporary Majapahitan works to the public gallery.

No audience outranks another. A surface may lead with one audience, but the site as a whole must not shut any of them out.

## Product Purpose

Museum Virtual Majapahitan is the online museum of PUISBM (Universitas Negeri Surabaya). It makes the heritage of Majapahit reachable online: its sites, artefacts, manuscripts, and living art. Success means each audience finds what it came for. Learners understand the history, the public explores, researchers get usable scholarship, and artists find a place to show work.

## Positioning

Three things together, with equal weight:

1. **University research base**: PUISBM at UNESA backs the museum with curated scholarship, publications, and conservation work. It is more than a showcase.
2. **Living tradition**: authentic artefacts sit next to contemporary Majapahitan art and public submissions.
3. **Virtual access**: 3D tours, a virtual map, and digital collections make remote heritage reachable.

## Operating Context

- Content is managed in Payload CMS by museum staff. Collections: Berita, Publikasi, Programs, KaryaMuseum, KaryaPublik, Situs, Artefak, Pages, Media, Users.
- Public submission flow: artists send works through `/partisipasi/kirim-karya`, and curators review them before publication.
- Publications link out to an external E-Library and carry SINTA, DOI, and APA 7th citation data.
- Programs are events (exhibitions, webinars, performances) with a schedule, venue, and sign-up action. They are not blog posts.

## Capabilities and Constraints

- Site language is Indonesian. An ID/EN language switch is planned (roadmap phase 4) but is not built.
- Planned and not yet built: 3D/360° virtual tour viewer, digital guest book, virtual volunteer program.
- Data comes through `lib/payload.ts`. It falls back to seam data when a CMS collection is empty.
- Stack is fixed by the existing codebase: Next.js 16, React 19, Tailwind CSS v4, Payload CMS 3 on PostgreSQL. Cloudflare R2 media storage is planned.

## Brand Commitments

- Name: **Museum Virtual Majapahitan**, operated by **PUISBM – Universitas Negeri Surabaya**.
- The home page (`/`) is the designer-delivered reference for the site. Other routes extend it.

## Evidence on Hand

Nothing is confirmed yet. All current text, images, logos, people, partners, news, publications, programs, and collection entries are placeholders (see `lib/content.ts` and `public/images/README.md`). Future work must not invent artefact facts, dates, team members, partners, statistics, testimonials, or publication data, and must not present placeholders as real.

## Product Principles

1. **Scholarship first.** Historical and artefact claims must be traceable to the museum's research. No decorative pseudo-history.
2. **Every audience has a door.** Learners, the public, researchers, and artists each need a clear path from the home page.
3. **Heritage and the living tradition side by side.** Contemporary and public work sits next to authentic artefacts, not in a lesser corner.
4. **Programs are events, not articles.** Show when, where, and how to join. No reading-time or blog conventions.
5. **Honest placeholders.** Missing content stays visibly missing until real material arrives.

## Accessibility & Inclusion

- Article and long-form body text targets WCAG AAA contrast.
- The gallery lightbox must stay keyboard navigable (arrow keys, Escape) and lock body scroll.
- Content must work for Indonesian readers on phones as well as on desktop.
