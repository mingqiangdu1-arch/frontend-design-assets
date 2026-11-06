# Compare → annotate → feedback · cross-context composition recipe

**ID:** PR-017 · **Stage:** analyzed · **Reuse:** composition-recipe / adapt-required

A task-first pattern for comparing two versions, collecting structured labels, and recording user feedback. Suitable for design reviews, original media/art-direction comparisons, product catalog proofing, learning exercises and creative portfolios. **Not** a backend approval workflow or an image-processing pipeline.

## 1. Task and page anatomy

| Region | Purpose | Candidate source |
| --- | --- | --- |
| Comparison canvas | Compare before/after or two different visual treatments without hiding their relationship | `UI-060 BeforeAfterCompare` |
| Evaluation metadata | Collect focused descriptors (such as "contrast", "spacing" or "copy") without free-form taxonomy chaos | `UI-061 TagInput` |
| Overall feedback | Give an explicit discrete rating with keyboard-accessible semantics | `UI-062 RatingInput` |
| Notes & evidence | Optional textual rationale and exact changed version ID | Existing `TextAreaField` / application feature |
| Audit/approval | Optional version history, reviewer identity, moderation and persistence | **Must be implemented by the host**; not included in this recipe |

Avoid making the rating substitute for written issue details, or reinterpreting local component state as a saved review.

## 2. Interaction contract

1. User opens two explicitly named versions with sufficient aspect/scale consistency. Default slider position should allow a balanced comparison, not imply which version won.
2. Pointer drags the comparison divider; a **native range input** permits keyboard Arrow, Home/End and assistive technology access. If visual panels contain interactive controls, use separate preview surfaces instead of embedding live form elements in clipped layers.
3. User adds or removes tags. Tag editor trims whitespace, rejects duplicates, supports Enter/comma and Backspace with a visible error. Domain-specific taxonomy, async validation and moderation remain the caller's responsibility.
4. User selects a rating through native radios and can clear it to represent "not rated." Do **not** convert the value to a fake aggregate or submitted review.
5. Explicit **Submit / Save draft / Cancel** belongs to the containing application; only the host can associate feedback with version IDs, enforce permissions or persist data.

## 3. Visual grammar options

- **Creative portfolio / photo study:** large comparison media, compact tag chips, subdued rating. Prefer authentic visual detail over SaaS KPI cards. Where rights are unknown, use original CSS fixtures, not copied external images.
- **Consumer commerce:** mobile-first vertical layout, clear product/variant labels, and stable focus when the comparison changes. Ratings must be clearly identified as user's own input, not store reputation or aggregate review score.
- **Editorial review:** neutral reading surface, notes beside or below the image, tags tied to document revisions. Do not adopt the "playful" visual treatment without an audience reason.
- **Developer/design tool:** dense inspector layout is appropriate for frequent expert comparison; show precise slider percentage and keyboard instructions.

The recipe is **style-neutral as a plan**. The actual React exports currently support only `refined-light-saas`, `precision-dark`, `editorial-warm`, and `playful-pop`. A style-neutral recipe does not make the code universally compatible.

## 4. Fallbacks, performance, and accessibility

- No media: show an explicit empty/error state before opening a compare control. Avoid silently displaying a default stock image.
- Images of different sizes: caller must align aspect/crop/position, document any transformation and preserve alt text in the surrounding context.
- Touch: horizontal comparison gesture should not trap scrolling outside the bounded canvas. Test on real devices; a Playwright pointer smoke is not touch certification.
- Keyboard: focusable range and rating radio controls use native semantics; tags support explicit removal controls. Ensure visible focus across selected theme.
- Reduced motion: no automatic animated slider transition; avoid full-screen autoplay effects.
- External API or storage: do not expose private images, source credentials or user identity through static demo fixtures.

## 5. Minimal React assembly outline (pseudo-implementation)

```tsx
<BeforeAfterCompare label="Version comparison"
 value={position} onValueChange={setPosition}
 before={beforePreview} after={afterPreview}/>
<TagInput label="Review labels" tags={tags} onTagsChange={setTags} maxTags={6}/>
<RatingInput label="My review" value={rating} onValueChange={setRating}/>
{/* Host adds permissions, version identity, save/cancel, errors and actual persistence. */}
```

Verify against [V0.25 API](../packages/ui/README.md), [machine registry](../registry/assets.json) and [Gallery](../playground/component-gallery/README.md); take only the needed components, not the whole demo.
