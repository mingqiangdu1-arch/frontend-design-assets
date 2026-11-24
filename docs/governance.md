# Long-lived maintenance rules

## Never treat the archive as a finite delivery

The collection is intentionally open-ended. Curate useful new materials from community suggestions, public research, original work and evidence-backed implementation. No automatic background monitoring is implied.

## Duplicate handling

Before adding a case, check same URL, named component and interaction behavior. Cross-link variants. If a better solution supersedes an older one, mark the old as deprecated with replacement ID; never silently erase its reasoning.

## Stable identifiers and status

Use immutable IDs. Record source, license, authoring date, stage, dependency and validation evidence. Use a conservative maturity label until testing occurs.

## Public and private knowledge boundaries

GitHub is authoritative for public source, demos and registries. Maintainers may keep separate private research notes, but do not commit private page IDs, access links, real project profiles or internal decisions. Public entries cite public source evidence; any private mapping must remain outside the public repository and its history.

## Design directions and application contexts

There is **no global default theme**. `refined-light-saas` is merely the first explicit `styleId`. Every app chooses its own style(s) through an Application Profile. A shared interaction behavior may be adapted across contexts, but its exact CSS/structure cannot be assumed portable.

Do not require the same navigation, type scale, density, screen layout or animation grammar for different product types. Every new style must have its own profile; never overwrite the current design series to make an unrelated new app look different.

## Public maintenance

Follow [release maintenance](release-maintenance.md), [contribution guidance](../CONTRIBUTING.md), and [publication gates](publication-readiness.md). Use focused changes and proportional evidence; do not duplicate the existing validation framework.
