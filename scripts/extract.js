import { execSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Extract the zip file
execSync('unzip -o /vercel/share/v0-project/landing-pages.zip -d /vercel/share/v0-project/extracted', { stdio: 'inherit' });

// List extracted contents
function listDir(dir, indent = '') {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    console.log(`${indent}${item}${stat.isDirectory() ? '/' : ''}`);
    if (stat.isDirectory()) {
      listDir(fullPath, indent + '  ');
    }
  }
}

console.log('\nExtracted contents:');
listDir('/vercel/share/v0-project/extracted');
