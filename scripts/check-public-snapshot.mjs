// Conservative preflight for a clean Git checkout; does not audit history.
import { execFileSync } from 'node:child_process';
import { existsSync, lstatSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';

const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();
const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, maxBuffer: 16 * 1024 * 1024 }).toString('utf8').split('\0').filter(Boolean);
const findings = [];
const skipped = [];
const reviewSignals = [];
const approvedBinaries = [];
const inspected = new Map();

const privateNotion = /https?:\/\/(?:[a-z0-9-]+\.)*notion\.(?:com|so|site)\/[^\s"'<>)]*(?:[0-9a-f]{32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;
// Construct marker patterns without embedding example credentials.
const keyHeader = new RegExp('-----BEGIN (?:[A-Z0-9 ]+ )?' + 'PRIVATE KEY-----');
const tokenPattern = /(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,}|sk-proj-[A-Za-z0-9_-]{30,}|AKIA[A-Z0-9]{16})/;
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const personalEmailPattern = /\b[A-Za-z0-9._%+-]+@(?:gmail|qq|163|126|outlook|hotmail|icloud)\.com\b/i;

for (const file of tracked) {
  const path = join(root, file);
  const name = basename(file);
  if ((/^\.env(?:\.|$)/i.test(name) && name !== '.env.example') || /^(?:id_(?:rsa|ed25519|ecdsa)|credentials\.json)$/i.test(name) || /^applications\/local\//.test(file)) {
    findings.push({ file, reason: 'review sensitive filename' });
  }
  if (!existsSync(path)) {
    findings.push({ file, reason: 'tracked path missing in checkout' });
    continue;
  }
  const stat = lstatSync(path);
  if (!stat.isFile()) {
    skipped.push(file);
    continue;
  }

  // Allow curated public showcase PNG screenshots under docs/media/screenshots/ with magic-byte and size checks.
  if (/^docs\/media\/screenshots\/[a-z0-9._-]+\.png$/i.test(file)) {
    const data = readFileSync(path);
    if (stat.size > 2 * 1024 * 1024) {
      findings.push({ file, reason: 'showcase screenshot exceeds 2MB limit' });
    } else if (data.length < 8 || !data.subarray(0, 8).equals(pngMagic)) {
      findings.push({ file, reason: 'showcase screenshot is not a valid PNG' });
    } else {
      approvedBinaries.push({ file, bytes: data.length });
    }
    continue;
  }

  if (stat.size > 5 * 1024 * 1024) {
    skipped.push(file);
    continue;
  }
  const data = readFileSync(path);
  if (data.includes(0)) {
    skipped.push(file);
    continue;
  }
  const content = data.toString('utf8');
  inspected.set(file, { bytes: data.length, content });

  if (privateNotion.test(content)) findings.push({ file, reason: 'Notion page identifier in URL' });
  if (keyHeader.test(content) || tokenPattern.test(content)) findings.push({ file, reason: 'possible credential; inspect privately' });
  if (personalEmailPattern.test(content) && !file.startsWith('tests/') && !file.startsWith('playground/') && file !== 'scripts/check-public-snapshot.mjs') {
    findings.push({ file, reason: 'possible personal email address; inspect privacy' });
  }
  if (file.endsWith('.json') && /"(?:notion|notionCatalog)"\s*:/.test(content)) {
    findings.push({ file, reason: 'internal mapping field' });
  }

  // Review signals are not automatic proof of a privacy or licensing violation.
  if (/https?:\/\/github\.com\/mingqiangdu1-arch\/frontend-design-assets\/(?:pull\/\d+|actions\/runs\/\d+|commit\/)/i.test(content)) {
    reviewSignals.push({ file, reason: 'legacy repository evidence link; review portability' });
  }
  if (/(?:^|[\s"'`(])(?:[A-Za-z]:[\\/](?:Users|Documents and Settings)[\\/]|\/(?:home|Users)\/[a-z0-9._-]+\/)/im.test(content)) {
    reviewSignals.push({ file, reason: 'possible local user path; inspect context' });
  }
  if (/<(?:script|img|iframe|link)\b[^>]*(?:src|href)\s*=\s*["']https?:\/\//i.test(content) || /!\[[^\]]*\]\(https?:\/\//i.test(content)) {
    reviewSignals.push({ file, reason: 'remote media or executable resource; review source and rights' });
  }
}

const registry = JSON.parse(readFileSync(join(root, 'registry/assets.json'), 'utf8'));
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const missing = registry.assets.filter(asset => typeof asset.license !== 'string' || !asset.license.trim());
const missingByType = Object.create(null);
for (const asset of missing) missingByType[asset.type] = (missingByType[asset.type] || 0) + 1;

const rootLicense = tracked.some(file => /^(?:LICENSE|COPYING)(?:\.[^/]+)?$/i.test(file));
const scopeNotice = tracked.includes('NOTICE.md');
const pkgLicenseDeclared = typeof pkg.license === 'string' && pkg.license.trim().length > 0;

const heldPrefixes = [
  '.agents/skills/vercel-react-best-practices/',
  '.agents/skills/vercel-composition-patterns/'
];
const heldPaths = tracked.filter(file => heldPrefixes.some(prefix => file.startsWith(prefix)) || file === '.agents/skills/VERCEL_MIT_LICENSE.txt');

const skillManifest = JSON.parse(readFileSync(join(root, '.agents/skills/EXTERNAL_SOURCES.json'), 'utf8'));
const bundledSkills = skillManifest.entries;
const externalSkills = skillManifest.externalReferences || [];
const localSkillPaths = tracked.filter(file => /^\.agents\/skills\/[^/]+\/SKILL\.md$/.test(file));
const skillIssues = [];

for (const entry of bundledSkills) {
  if (!entry.localDirectory || !tracked.includes(entry.localDirectory + '/SKILL.md')) {
    skillIssues.push({ id: entry.id, reason: 'missing bundled skill entry' });
  }
}
for (const entry of externalSkills) {
  if (
    entry.distribution !== 'external-reference-only' ||
    entry.localDirectory ||
    entry.bundledFileCount !== 0 ||
    !/^[0-9a-f]{40}$/.test(entry.sourceCommit || '') ||
    !entry.sourceUrl?.includes(entry.sourceCommit)
  ) {
    skillIssues.push({ id: entry.id, reason: 'invalid external-only skill metadata' });
  }
}
if (heldPaths.length) skillIssues.push({ reason: 'excluded skill files present', count: heldPaths.length });

const skillDistribution = {
  localSkillCount: localSkillPaths.length,
  bundledSkillCount: bundledSkills.length,
  externalReferenceCount: externalSkills.length,
  issues: skillIssues
};

console.log(JSON.stringify({
  skillDistribution,
  trackedFiles: tracked.length,
  inspectedFiles: inspected.size,
  approvedBinaries,
  findings,
  skipped,
  reviewSignals,
  heldPaths,
  licensing: {
    rootLicense,
    scopeNotice,
    pkgLicenseDeclared,
    missingEntryLicense: missing.length,
    missingByType,
    missingIds: missing.map(a => a.id)
  }
}, null, 2));

const release = process.argv.includes('--release');
if (
  findings.length ||
  skillIssues.length ||
  (release && (!rootLicense || !scopeNotice || !pkgLicenseDeclared || missing.length || skipped.length || heldPaths.length))
) {
  process.exitCode = 1;
}
// Even a zero exit code does not establish redistribution rights or history safety.
