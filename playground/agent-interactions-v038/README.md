# Agent Interaction Atelier · V0.38

**Original, standalone, executable interaction materials only.** This folder is a local HTML/CSS/JS specimen of three independent state machines. It is not a running AI client, backend API, marketplace, page builder, component package or real file writer.

| Asset | Standalone ESM source | Behavior | Not supplied |
| --- | --- | --- | --- |
| IP-057 | [timeline-model.mjs](timeline-model.mjs) | Stable tool identity, per-tool monotonic event sequence, late-event guard, truthful partial failure | Remote tool transport and persistent event logs |
| IP-058 | [approval-model.mjs](approval-model.mjs) | Proposal ID/hash/base version, approve/reject, conflict and separate local receipt | Real patch application, file permissions, backend authorization or cryptographic hashing |
| IP-059 | [clarification-model.mjs](clarification-model.mjs) | Single/multi/text questions, unsent draft and attachment-name preservation, idempotent nonce, retry/dismiss | File uploads, remote question queue, durable draft persistence |

Research predecessors IP-054..056 remain **analyzed/research-only**. These three **new** IDs are prototype/adapt-required with actual source and browser evidence. None is a React public export.

## Preview

Run at repository root:
```sh
npm run dev:catalog
```
Then open http://127.0.0.1:8009/playground/agent-interactions-v038/.

Independently start/finish/fail each tool, propose and approve/reject a fictional diff, simulate a local-only patch receipt, interrupt a draft with a structured question, submit/accept or dismiss and verify the original draft remains. No remote network, credentials, accounts, source files or database are accessed.

## Focused verification

```sh
node --test tests/agent-interactions-v038.test.mjs
npm run test:registry
npm run test:browser
```

Node tests assert stale events, partial failures, invalid transitions, hash mismatch, rejection, optimistic concurrency conflict, nonces, retry and restored draft. Playwright covers the three UI panels on Chromium and a narrow viewport.

**Security:** client-side approve/reject is only a visualization. The actual service must authenticate, authorize the exact target, compute and compare the real patch hash, verify the current source revision and produce an audit receipt. The specimen hash and operation receipt are explicit fictional fixtures.

Styles live only inside the independent .ai38 root, provide reduced-motion and forced-colors fallbacks and do not inject a global CSS theme. The models are portable ESM references and need an adapter plus product-specific tests in the destination app. There is no assistive-technology certification, multi-user correctness claim, or production-readiness guarantee.