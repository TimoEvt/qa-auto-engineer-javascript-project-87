#!/usr/bin/env node

import genDiff from '../src/genDiff.js'

const [,, file1, file2] = process.argv

if (!file1 || !file2) {
  console.error('Usage: gendiff file1 file2')
  process.exit(1)
}

try {
  const result = genDiff(file1, file2, 'json')
  console.log(result)
} catch (err) {
  console.error('Error:', err.message)
  process.exit(1)
}

