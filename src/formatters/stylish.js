const stylish = (diff) => {
  const lines = diff.map((item) => {
    const { key, type, value, oldValue, newValue } = item
    switch (type) {
      case 'added':
        return `Property '${key}' was added with value: ${JSON.stringify(value)}`
      case 'removed':
        return `Property '${key}' was removed`
      case 'updated':
        return `Property '${key}' was updated. From ${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}`
      case 'unchanged':
        return ''
      default:
        return ''
    }
  }).filter(Boolean)
  return lines.join('\n')
}

export default stylish
