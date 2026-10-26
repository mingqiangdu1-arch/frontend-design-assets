# Reuse prompt for Codex / software agents · V0.8

You are implementing one explicitly selected frontend page based on the user's requirements, not blindly cloning all sample UI.

1. Read the assembly brief produced by `node scripts/compose-page.mjs --template=TPL-002 --format=markdown`.
2. Confirm task, primary audience, target devices, content structure, interaction goals, visual choice and technical stack.
3. Read source/demo and chosen scoped Token CSS. Preserve style-specific typography and responsive layout; do not substitute one universal app shell.
4. Treat React components listed in the brief as CANDIDATES, not automatically integrated demo modules. Copying an HTML prototype is not the same as installing a React package.
5. Implement real busy/error/empty/retry/undo states only with grounded backend/API contracts and correct authorization; do not invent endpoints.
6. Validate focus, touch, 390px/768px/1440px, CJK and reduced-motion. Record screenshots and test failures when possible.
7. Return a mapping of implemented sections to source files and their status, including what remains untested.

Do not alter this asset repository or any business product unless directly requested. Do not mark output production-ready without release evidence.
