const transform = (diff) => diff.map(item => {
  switch(item.type) {
    case 'unchanged':
      return { key: item.key, type: 'unchanged', value: item.value }
    case 'added':
      return { key: item.key, type: 'added', value: item.value }
    case 'removed':
      return { key: item.key, type: 'removed', value: item.value }
    case 'changed':
      return { key: item.key, type: 'updated', oldValue: item.oldValue, newValue: item.value }
    case 'nested':
      return { key: item.key, type: 'nested', children: transform(item.children) }
    default:
      return item
  }
})

const json = (diff) => JSON.stringify(transform(diff), null, 2)

export default json

