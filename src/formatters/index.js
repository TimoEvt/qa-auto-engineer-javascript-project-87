import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const formatters = { stylish, plain, json }

const getFormatter = (formatName) => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatters[formatName]
}

export default getFormatter
