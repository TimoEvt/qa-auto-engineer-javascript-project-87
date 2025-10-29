const plain = (diff) => {
  const iter = (data, path = '') => {
    return data
      .filter(item => item.type !== 'unchanged')
      .map(item => {
        const property = path ? `${path}.${item.key}` : item.key
        switch (item.type) {
          case 'added':
            return `Property '${property}' was added with value: ${formatValue(item.value)}`
          case 'removed':
            return `Property '${property}' was removed`
          case 'changed':
            return `Property '${property}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.value)}`
          case 'nested':
            return iter(item.children, property)
          default:
            return ''
        }
      })
      .flat()
      .join('\n')
  }

  const formatValue = (val) => {
    if (typeof val === 'object' && val !== null) return '[complex value]'
    if (typeof val === 'string') return `'${val}'`
    return val
  }

  return iter(diff)
}

export default plain

