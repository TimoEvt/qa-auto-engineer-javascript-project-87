import genDiff from '../src/genDiff.js'
import path from 'path'

const file1 = path.resolve('__tests__/fixtures/file1.yml')
const file2 = path.resolve('__tests__/fixtures/file2.yml')

test('gendiff plain format', () => {
  const diff = genDiff(file1, file2, 'plain')
  const expected = `
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`.trim()
  expect(diff).toBe(expected)
})
