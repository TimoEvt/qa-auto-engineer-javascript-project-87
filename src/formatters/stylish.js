import _ from 'lodash'

const indent = (depth) => ' '.repeat(depth * 4 - 2)

const stringify = (value, depth) => {
  if (_.isObject(value)) {
    const lines = Object.entries(value).map(
      ([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`
    )
    return `{\n${lines.join('\n')}\n${' '.repeat(depth * 4)}}`
  }
  return String(value)
}

const stylish = (diff, depth = 1) => {
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`
      case 'removed':
        return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`
      case 'unchanged':
        return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`
      case 'changed':
      case 'updated':
        return [
          `${indent(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`
        ].join('\n')
      case 'nested':
        return `${indent(depth)}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${indent(depth)}  }`
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })

  return `{\n${lines.join('\n')}\n}`
}

export default stylish
