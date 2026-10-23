# Changelog

## 2026-10-23 · Multi-style / multi-application architecture correction

- Removed Refined Light SaaS as implicit **repository-wide default**.
- Introduced independent `styles/` Style Profiles, `applications/` Application Profiles and explicit asset reuse/style/app metadata.
- Kept the original Attio × Vercel study as the `refined-light-saas` collection without forcing future apps into it.
- Scoped the Refined Light CSS design tokens with `data-design-theme`; existing standalone HTML demo remains unchanged.
- Extended registry checks and Codex reuse rules to reject accidental global theme assumptions and incompatible references.

The existing React examples remain style-bound and **not production validated**. Portal style scoping is a known integration gap.

---

## 2026-10-23 · Repository initialization

- Established a living asset repository independent of AI WORKFLOW PLATFORM.
- Collected visual direction, color/typography/layout tokens, component and interaction research, source registry, Notion links and reuse policies.
- Imported the standalone HTML interaction lab as an **initial prototype** (not production code).
- Introduced machine-readable registry, asset template, page recipes and validation script.
- Also committed 9 React/TSX reference components with separate CSS and dependency declarations. These are examples and have **not** passed target-project integration tests.
- Initial archived UI Kit V0.1.0 remains historic; previous PNG screenshots and full ZIP are not included.

Subsequent commits should describe **what changed**, **which asset IDs**, **how verified**, and **why**.
