#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { validateBatch } from '../dist/validator.js';

const [, , filePath] = process.argv;
if (!filePath) {
  console.error('Usage: drp-validate <file.json>');
  process.exit(1);
}

const raw = readFileSync(filePath, 'utf8');
const parsed = JSON.parse(raw);
const report = validateBatch(parsed);
console.log(JSON.stringify(report, null, 2));
process.exit(report.valid ? 0 : 2);
