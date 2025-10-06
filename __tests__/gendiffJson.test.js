import genDiff from '../src/genDiff.js'

test('gendiff json format', () => {
  const file1 = 'sample/file1.json'
  const file2 = 'sample/file2.json'
  const expected = JSON.stringify([
    { key: 'a', type: 'unchanged', value: 1 },
    { key: 'b', type: 'updated', oldValue: 2, newValue: 3 }
  ], null, 2)

  expect(genDiff(file1, file2, 'json')).toBe(expected)
})


