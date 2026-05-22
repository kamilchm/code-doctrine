#!/usr/bin/env node
import { mkdirSync, existsSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillName = 'code-doctrine';
const skillSourceDir = join(__dirname, 'skills', skillName);
const agentsSectionPath = join(skillSourceDir, 'AGENTS-section.md');
const AGENTS_SECTION_START = '<!-- code-doctrine:managed:start -->';
const AGENTS_SECTION_END = '<!-- code-doctrine:managed:end -->';

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function collectFiles(dir, current = dir) {
  const files = [];
  for (const name of readdirSync(current)) {
    const fullPath = join(current, name);
    const info = statSync(fullPath);
    if (info.isDirectory()) {
      files.push(...collectFiles(dir, fullPath));
      continue;
    }
    files.push(relative(dir, fullPath));
  }
  return files.sort();
}

function planCopyTree(sourceDir, targetDir) {
  const results = { install: [], unchanged: [], conflicted: [] };

  for (const relPath of collectFiles(sourceDir)) {
    const sourcePath = join(sourceDir, relPath);
    const targetPath = join(targetDir, relPath);
    const nextContent = readFileSync(sourcePath, 'utf8');

    if (!existsSync(targetPath)) {
      results.install.push({ sourcePath, targetPath });
      continue;
    }

    const currentContent = readFileSync(targetPath, 'utf8');
    if (currentContent === nextContent) {
      results.unchanged.push(targetPath);
      continue;
    }

    results.conflicted.push({ sourcePath, targetPath });
  }

  return results;
}

function applyCopyPlan(results, force) {
  for (const entry of results.install) {
    ensureDir(dirname(entry.targetPath));
    writeFileSync(entry.targetPath, readFileSync(entry.sourcePath, 'utf8'), 'utf8');
  }

  if (!force) return;

  for (const entry of results.conflicted) {
    ensureDir(dirname(entry.targetPath));
    writeFileSync(entry.targetPath, readFileSync(entry.sourcePath, 'utf8'), 'utf8');
  }
}

function buildManagedAgentsBlock(section) {
  return `${AGENTS_SECTION_START}\n${section.trim()}\n${AGENTS_SECTION_END}\n`;
}

function replaceMarkedBlock(content, startMarker, endMarker, replacement) {
  if (!content.includes(startMarker) || !content.includes(endMarker)) return null;
  const pattern = new RegExp(`${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}\\n?`, 'm');
  return content.replace(pattern, replacement);
}

function upsertManagedAgentsSection(targetPath, section) {
  const managedBlock = buildManagedAgentsBlock(section);
  const current = existsSync(targetPath) ? readFileSync(targetPath, 'utf8') : '';
  const normalizedSection = section.trim();

  let nextContent = replaceMarkedBlock(current, AGENTS_SECTION_START, AGENTS_SECTION_END, managedBlock);

  if (nextContent === null && current.includes(normalizedSection)) {
    nextContent = current.replace(normalizedSection, managedBlock.trimEnd());
    if (!nextContent.endsWith('\n')) nextContent += '\n';
  }

  if (nextContent === null) {
    if (current.trim().length === 0) nextContent = managedBlock;
    else nextContent = `${managedBlock}\n${current.trimStart()}`;
  }

  if (nextContent === current) return 'unchanged';
  ensureDir(dirname(targetPath));
  writeFileSync(targetPath, nextContent, 'utf8');
  return current ? 'updated' : 'created';
}

function installSkillInto(targetRoot, force) {
  ensureDir(targetRoot);
  const skillTargetDir = join(targetRoot, 'skills', skillName);
  const plan = planCopyTree(skillSourceDir, skillTargetDir);

  if (plan.conflicted.length > 0 && !force) {
    const message = [
      `Conflicting files (${plan.conflicted.length}):`,
      ...plan.conflicted.map((entry) => `- ${entry.targetPath}`),
      '',
      'Re-run with --force to overwrite the conflicting managed files.',
    ].join('\n');
    throw new Error(message);
  }

  applyCopyPlan(plan, force);
  const agentsStatus = upsertManagedAgentsSection(join(targetRoot, 'AGENTS.md'), readFileSync(agentsSectionPath, 'utf8'));
  return {
    installedCount: plan.install.length + (force ? plan.conflicted.length : 0),
    unchangedCount: plan.unchanged.length,
    conflictCount: plan.conflicted.length,
    conflicts: plan.conflicted.map((entry) => entry.targetPath),
    agentsStatus,
    skillTargetDir,
  };
}

function installOpenCode({ mode, projectDir, force }) {
  const targetRoot = mode === 'global'
    ? join(os.homedir(), '.config', 'opencode')
    : join(projectDir, '.opencode');
  const result = installSkillInto(targetRoot, force);
  return {
    target: 'opencode',
    targetRoot,
    ...result,
  };
}

function installPi({ piDir, force }) {
  const targetRoot = piDir ?? join(os.homedir(), '.pi', 'agent');
  const result = installSkillInto(targetRoot, force);
  return {
    target: 'pi',
    targetRoot,
    ...result,
  };
}

function printHelp() {
  console.log(`code-doctrine\n\nUsage:\n  code-doctrine install opencode [--project [path] | --global] [--force]\n  code-doctrine install pi [--pi-dir path] [--force]\n  code-doctrine install all [--project [path] | --global] [--pi-dir path] [--force]\n  code-doctrine --help\n\nExamples:\n  npx code-doctrine install opencode --project\n  npx code-doctrine install opencode --global\n  npx code-doctrine install pi\n  npx code-doctrine install all --global\n`);
}

function parseArgs(argv) {
  const args = [...argv];
  if (args.length === 0 || args.includes('--help') || args.includes('-h') || args[0] === 'help') {
    return { help: true };
  }

  const command = args.shift();
  if (command !== 'install') throw new Error(`Unknown command: ${command}`);

  const target = args.shift();
  if (!target || !['opencode', 'pi', 'all'].includes(target)) {
    throw new Error('Expected install target: opencode, pi, or all');
  }

  let mode = 'project';
  let projectDir = process.cwd();
  let force = false;
  let piDir = null;

  while (args.length > 0) {
    const arg = args.shift();
    if (arg === '--global') {
      mode = 'global';
      continue;
    }
    if (arg === '--project') {
      mode = 'project';
      if (args[0] && !args[0].startsWith('--')) projectDir = resolve(args.shift());
      continue;
    }
    if (arg === '--force') {
      force = true;
      continue;
    }
    if (arg === '--pi-dir') {
      const value = args.shift();
      if (!value || value.startsWith('--')) throw new Error('Missing path after --pi-dir');
      piDir = resolve(value);
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    help: false,
    command,
    target,
    mode,
    projectDir,
    force,
    piDir,
  };
}

function printResult(result) {
  console.log(`\n✅ ${result.target} setup complete`);
  console.log(`Target root: ${result.targetRoot}`);
  console.log(`Skill path: ${result.skillTargetDir}`);
  console.log(`Installed or updated: ${result.installedCount}`);
  console.log(`Unchanged: ${result.unchangedCount}`);
  console.log(`Conflicts handled: ${result.conflictCount}`);
  console.log(`AGENTS.md: ${result.agentsStatus}`);

  if (result.conflicts.length > 0) {
    console.log('\nOverwritten conflicting files due to --force:');
    for (const path of result.conflicts) console.log(`- ${path}`);
  }
}

try {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.help) {
    printHelp();
    process.exit(0);
  }

  const results = [];
  if (parsed.target === 'opencode' || parsed.target === 'all') {
    console.log(`🎯 Installing code-doctrine for OpenCode (${parsed.mode})...`);
    results.push(installOpenCode(parsed));
  }
  if (parsed.target === 'pi' || parsed.target === 'all') {
    console.log('🎯 Installing code-doctrine for Pi...');
    results.push(installPi(parsed));
  }

  for (const result of results) printResult(result);
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
