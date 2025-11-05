import genDiff from '../src/genDiff.js'

test('gendiff compares flat YAML files correctly', () => {
  const file1 = '__tests__/fixtures/file1.yml'
  const file2 = '__tests__/fixtures/file2.yml'
  const expected = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`

  const result = genDiff(file1, file2, 'plain')
  expect(result).toBe(expected)
})
