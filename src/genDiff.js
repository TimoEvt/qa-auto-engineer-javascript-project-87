import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import formatters from './formatters/index.js'
import yaml from 'js-yaml'

const parse = filepath => {
  const fullPath = path.resolve(process.cwd(), filepath)
  const ext = path.extname(fullPath).toLowerCase()
  const data = fs.readFileSync(fullPath, 'utf-8')
  switch (ext) {
    case '.json':
      return JSON.parse(data)
    case '.yml':
    case '.yaml':
      return yaml.load(data)
    default:
      throw new Error(`Unsupported file format: ${ext}`)
  }
}

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))
  return keys.map(key => {
    const in1 = Object.hasOwn(obj1, key)
    const in2 = Object.hasOwn(obj2, key)
    if (in1 && !in2) return { key, type: 'removed', value: obj1[key] }
    if (!in1 && in2) return { key, type: 'added', value: obj2[key] }
    if (_.isEqual(obj1[key], obj2[key])) return { key, type: 'unchanged', value: obj1[key] }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) return { key, type: 'nested', children: buildDiff(obj1[key], obj2[key]) }
    return { key, type: 'changed', oldValue: obj1[key], value: obj2[key] }
  })
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parse(filepath1)
  const obj2 = parse(filepath2)
  const diff = buildDiff(obj1, obj2)
  return formatters[format](diff)
}

export default genDiff
