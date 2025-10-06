import genDiff from '../src/genDiff.js'

test('genDiff compares flat JSON objects correctly', () => {
  const file1 = '__tests__/fixtures/file1.json'
  const file2 = '__tests__/fixtures/file2.json'
  const expected = `{
  a: 1
- b: 2
+ b: 3
+ c: 4
}`

  const result = genDiff(file1, file2)
  expect(result).toEqual(expected)
})

