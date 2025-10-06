const plain = (diff) => {
  const iter = (items, path = '') => {
    return items.flatMap((item) => {
      const { key, type, value, oldValue, newValue, children } = item
      const property = path ? `${path}.${key}` : key
      switch (type) {
        case 'added':
          return [`Property '${property}' was added with value: ${JSON.stringify(value)}`]
        case 'removed':
          return [`Property '${property}' was removed`]
        case 'updated':
          return [`Property '${property}' was updated. From ${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}`]
        case 'nested':
          return iter(children, property)
        case 'unchanged':
          return []
        default:
          return []
      }
    })
  }
  return iter(diff).join('\n')
}

export default plain
