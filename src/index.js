import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import getFormatter from './formatters/index.js'
import _ from 'lodash'

const getData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const ext = path.extname(filepath)
  const data = fs.readFileSync(absolutePath, 'utf8')

  if (ext === '.json') return JSON.parse(data)
  if (ext === '.yml' || ext === '.yaml') return yaml.load(data)
  throw new Error(`Unsupported file type: ${ext}`)
}

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))

  return keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) return { key, type: 'removed', value: obj1[key] }
    if (!Object.hasOwn(obj1, key)) return { key, type: 'added', value: obj2[key] }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) return { key, type: 'nested', children: buildDiff(obj1[key], obj2[key]) }
    if (!_.isEqual(obj1[key], obj2[key])) return { key, type: 'changed', oldValue: obj1[key], value: obj2[key] }
    return { key, type: 'unchanged', value: obj1[key] }
  })
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = getData(filepath1)
  const obj2 = getData(filepath2)
  const diff = buildDiff(obj1, obj2)
  const formatter = getFormatter(format)
  return formatter(diff)
}

export default genDiff
