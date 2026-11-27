# As-built UE handoff / 交互稿交付模板

Use only relevant fields. This is a documentation template, not a generator or test report.

## Header
- Product/module; source revision/date; role; viewport(s)
- Input: source, safe runtime, screenshot or fixture
- Included routes/states; exclusions; access limitations

## Screen cards
| ID | Screen / state | User goal | UI artifact | Layout / scrolling | Evidence |
| --- | --- | --- | --- | --- | --- |
| S-01 | … | … | relative screenshot or schematic | … | observed / code / simulated / unknown + anchor |

Place each screen's annotation near its capture or drawing. Use the original visible control label and a matching rule ID; avoid annotating every decorative detail.

## Interaction and data matrix
| Rule | From | Control / action | Condition | Feedback → destination | Data effect / recovery | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| R-01 | S-01 | … | … | … → S-02 | … | … |

Use the same screen ID for an in-place state update if no separate screen is necessary. Unknown conditions, persistence, or failure behavior stay explicitly unknown. List unresolved server rules separately.

## Worked example (fictional, not tested)

A synthetic inventory list has a search field and a detail drawer. Illustrative screen IDs:
- S-01: inventory list, filter bar above a scrolling table.
- S-02: detail drawer, opened beside the list.
- S-03: list with empty results.

| Rule | From | Control / action | Condition | Feedback → destination | Data effect / recovery | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| R-01 | S-01 | Item name / click | Row exists | Detail drawer → S-02 | Read selected item; persistence unknown | simulated example |
| R-02 | S-02 | Close / click | Drawer open | Return to S-01 | No intended write; filter retention unknown | simulated example |
| R-03 | S-01 | Search / submit | No matching item | Empty message → S-03 | Filter list; clear search to retry | simulated example |

The example demonstrates formatting only; it is not evidence for any real application.

## Acceptance note
- Coverage: required screens/states, exclusions, unresolved paths.
- Accuracy: actual label, target, rule, evidence, data boundary.
- Delivery: opened requested file; readable annotations; no real data leakage.
- Results: passed / failed / not exercised / out of scope; links to evidence.
