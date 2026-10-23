# Long-lived maintenance rules

## Never treat the archive as a finite delivery

The collection is intentionally open-ended. New cases should be continuously added when the user requests research, provides a link or screenshot, or selects a previously cataloged pattern for implementation. No automatic background monitoring is implied.

## Duplicate handling

Before adding a case, check same URL, named component and interaction behavior. Cross-link variants. If a better solution supersedes an older one, mark the old as deprecated with replacement ID; never silently erase its reasoning.

## Stable identifiers and status

Use immutable IDs. Record source, license, authoring date, stage, dependency and validation evidence. Use a conservative maturity label until testing occurs.

## Notion synchronization

Notion remains the long-term master for qualitative research and decisions. GitHub is the authoritative copy for committed source/demo files. Each promotion should record the other side's link when available; automate later only if desired.

## Design directions and application contexts

There is **no global default theme**. `refined-light-saas` is merely the first explicit `styleId`. Every app chooses its own style(s) through an Application Profile. A shared interaction behavior may be adapted across contexts, but its exact CSS/structure cannot be assumed portable.

Do not require the same navigation, type scale, density, screen layout or animation grammar for different product types. Every new style must have its own profile; never overwrite the current design series to make an unrelated new app look different.
