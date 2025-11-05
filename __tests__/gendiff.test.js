import genDiff from '../src/genDiff.js'

test('genDiff compares flat JSON objects correctly', () => {
  const file1 = '__tests__/fixtures/file1.json'
  const file2 = '__tests__/fixtures/file2.json'

  const expected = JSON.stringify([
    { key: 'a', type: 'unchanged', value: 1 },
    { key: 'b', type: 'updated', oldValue: 2, newValue: 3 },
    { key: 'c', type: 'added', value: 4 },
  ], null, 2)

  const result = genDiff(file1, file2, 'json')
  expect(result).toBe(expected)
})
