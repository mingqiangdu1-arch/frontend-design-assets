# Known open issues and verification boundaries · V0.5

| ID | Area | Severity | Current state | What would close it |
| --- | --- | --- | --- | --- |
| QA-01 | Real browser visual hierarchy, clipping and font fallbacks | Medium | Automated Chromium smoke and screenshots are added; screenshots are not manually approved | Review at 390, 768, 1440 on Chrome/Edge/Firefox/Safari and compare intended design |
| QA-02 | Command palette and arrow navigation | Medium | Scoped row arrows and command arrow focus implemented; Chromium smoke path added | Screen-reader test on Windows/macOS and keyboard walkthrough; confirm focus restoration across modal close |
| QA-03 | Token contrast | Medium | Critical text-on-surface pairs audited at 4.5:1, adjusted Editorial/Pop muted text | Inspect all component hardcoded colors, focus rings, status and nontext visual contrast (3:1) |
| QA-04 | Touch hit areas and long localized labels | Medium | Responsive CSS exists, no complete touch audit | Test iOS/Android touch targets with CJK strings at 200% zoom |
| QA-05 | Reduced motion and animation comfort | Medium | Tokens/CSS have reduced-motion overrides | Evaluate actual motion and screen reader live region behavior |
| QA-06 | Styled React components, portals and integration | High | Reference components have style scope and portal issues | Create isolated story harness, TypeScript check, then target-project integration tests |
| QA-07 | SaaS v0.2 / v0.3 playground E2E | Medium | Pure logic tests only | Add browser tests for bulk selection, undo, invalid form, dialog dirty guard, AND/OR UI |
| QA-08 | Repo asset maturity claims | Low | Stage labels remain prototype / reference implementation | Evidence links to CI/manual acceptance before promoting statuses |

**Important:** A green workflow is only evidence for the specific checks it ran. The repository is a **reference/design research collection**, not a production-level distributed UI package.
