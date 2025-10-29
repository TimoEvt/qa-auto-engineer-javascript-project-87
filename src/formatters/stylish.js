import _ from 'lodash'

const indent = (depth) => ' '.repeat(depth * 4)

const stringify = (value, depth) => {
  if (_.isObject(value)) {
    const lines = Object.entries(value).map(
      ([key, val]) => `${indent(depth + 1)}${key}: ${stringify(val, depth + 1)}`
    );
    return `{\n${lines.join('\n')}\n${indent(depth)}}`
  }
  return String(value)
}

const stylish = (diff, depth = 0) => {
  const lines = diff.map((node) => {
    const currentIndent = indent(depth)
    switch (node.type) {
      case 'added':
        return `${currentIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`
      case 'removed':
        return `${currentIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`
      case 'unchanged':
        return `${currentIndent}  ${node.key}: ${stringify(node.value, depth + 1)}`
      case 'updated':
        return [
          `${currentIndent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
          `${currentIndent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`
        ].join('\n')
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })
  return `{\n${lines.join('\n')}\n${indent(depth)}}`
}

export default stylish
