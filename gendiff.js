import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import yaml from 'js-yaml'
import formatters from './formatters/index.js'

const parse = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  const ext = path.extname(fullPath).toLowerCase()
  const data = fs.readFileSync(fullPath, 'utf-8')

  if (ext === '.json') return JSON.parse(data)
  if (ext === '.yml' || ext === '.yaml') return yaml.load(data)
  throw new Error(`Unsupported file format: ${ext}`)
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parse(filepath1)
  const obj2 = parse(filepath2)

  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))

  const diff = keys.map((key) => {
    const in1 = Object.hasOwn(obj1, key)
    const in2 = Object.hasOwn(obj2, key)

    if (in1 && in2) {
      if (_.isEqual(obj1[key], obj2[key])) return { key, type: 'unchanged', value: obj1[key] }
      return { key, type: 'updated', oldValue: obj1[key], newValue: obj2[key] }
    }
    if (in1) return { key, type: 'removed', value: obj1[key] }
    if (in2) return { key, type: 'added', value: obj2[key] }
    return null
  }).filter(Boolean)

  if (format === 'json') return JSON.stringify(diff, null, 2)
  return formatters[format](diff)
}

export default genDiff
