# V0.56 · Multiscript editorial and typography originals

Six self-contained **new** CSS/semantic HTML specimens focused on multilingual Chinese/Japanese/English reading. Unlike V0.53's general editorial layouts, this pack is specifically about **script behaviour, native pronunciation annotations, line-breaking rules, paired translation, tabular numbers, and punctuation-led quotation**.

| ID | CSS family | Use | Truth / boundary |
| --- | --- | --- | --- |
| FX-106 | `.fx56-vertical-cover` | CJK vertical display title and side explanation | Native `writing-mode: vertical-rl`; not a full vertical pagination engine |
| FX-107 | `.fx56-ruby-reader` | Chinese pinyin/Japanese furigana examples | Actual `ruby`/`rt`, no transliteration or translation runtime |
| FX-108 | `.fx56-parallel-lines` | Parallel language or translation alignment | Two columns on wide screens, stacked on mobile; no automated alignment engine |
| FX-109 | `.fx56-linebreak-study` | Japanese line-breaking in a controlled reading width | CSS `line-break: strict` as progressive enhancement, browser/font support varies |
| FX-110 | `.fx56-number-ledger` | Number-heavy bilingual label/data metadata | Tabular numeral typography with **fictional values**, no live data/API |
| FX-111 | `.fx56-punctuation-quote` | Readable, typographic CJK quotations | Selectable semantic blockquote, not speech/audio |

Source: [multiscript-atoms.css](multiscript-atoms.css). Paired sample markup: [independent source gallery](../../../playground/multiscript-v056/index.html). Extract **one** `.fx56-*` family and its matching HTML, not the gallery shell.

- No `:root` override, global reset, script, webfont download, external image/media or third-party source.
- CJK font stack contains **font names only**, no bundled font files. Font availability and glyph metrics vary by platform.
- All semantic text remains actual copyable text. Use correct `lang` attributes for mixed-script inline spans, and protect reading order when adapting.
- Visual QA on real browsers, contrast checks, locale-driven edge cases and target-host accessibility have **not been completed**. Reference implementation does not mean production certification.
