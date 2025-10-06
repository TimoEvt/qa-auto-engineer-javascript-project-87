import fs from 'fs'
import path from 'path'
import formatters from './formatters/index.js'

// функция для парсинга JSON
const parseFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  const ext = path.extname(fullPath)
  const data = fs.readFileSync(fullPath, 'utf-8')

  if (ext === '.json') return JSON.parse(data)

  throw new Error(`Unsupported file format: ${ext}`)
}

// основная функция genDiff
const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parseFile(filepath1)
  const obj2 = parseFile(filepath2)

  const buildDiff = (o1, o2) => {
    const keys = Array.from(new Set([...Object.keys(o1), ...Object.keys(o2)])).sort()

    return keys.map((key) => {
      if (!(key in o1)) return { key, type: 'added', value: o2[key] }
      if (!(key in o2)) return { key, type: 'removed', value: o1[key] }
      if (o1[key] !== o2[key]) return { key, type: 'updated', oldValue: o1[key], newValue: o2[key] }
      if (typeof o1[key] === 'object' && typeof o2[key] === 'object') {
        return { key, type: 'nested', children: buildDiff(o1[key], o2[key]) }
      }
      return { key, type: 'unchanged', value: o1[key] }
    })
  }

  const diffTree = buildDiff(obj1, obj2)
  return formatters[formatName](diffTree)
}

export default genDiff

