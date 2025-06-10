#!/usr/bin/env node
import genDiff from '../src/genDiff.js';

const [,, filepath1, filepath2] = process.argv;

if (!filepath1 || !filepath2) {
  console.error('Please provide two file paths');
  process.exit(1);
}

console.log(genDiff(filepath1, filepath2));

