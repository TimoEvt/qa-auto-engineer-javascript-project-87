#!/usr/bin/env node

import genDiff from '../src/genDiff.js'

const [,, ...args] = process.argv

let format = 'stylish'
let files = []

args.forEach((arg, i) => {
  if (arg === '-f') {
    format = args[i + 1]
  } else if (i === 0 || args[i - 1] !== '-f') {
    files.push(arg)
  }
})

const [file1, file2] = files

if (!file1 || !file2) {
  console.error('Usage: gendiff [-f format] file1 file2')
  process.exit(1)
}

try {
  const result = genDiff(file1, file2, format)
  console.log(result)
} catch (err) {
  console.error('Error:', err.message)
  process.exit(1)
}
