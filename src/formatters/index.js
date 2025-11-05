// src/formatters/index.js

import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const formatters = { stylish, plain, json }

const getFormatter = (formatName) => {
  const formatter = formatters[formatName]
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatter
}

export default getFormatter
