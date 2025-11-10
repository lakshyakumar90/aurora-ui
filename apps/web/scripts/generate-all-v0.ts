#!/usr/bin/env node

import { componentRegistry } from "../src/lib/component-registry";
import { registerExample } from "./generate-v0-json";

const componentNames = Object.keys(componentRegistry);

console.log(`> Generating JSON files for ${componentNames.length} components...\n`);

let successCount = 0;
let errorCount = 0;

for (const name of componentNames) {
  try {
    registerExample(name);
    successCount++;
  } catch (err) {
    console.error(`> ❌ Failed to generate ${name}.json`);
    errorCount++;
  }
}

console.log(`\n> ✅ Success: ${successCount}`);
if (errorCount > 0) {
  console.log(`> ❌ Errors: ${errorCount}`);
  process.exit(1);
}