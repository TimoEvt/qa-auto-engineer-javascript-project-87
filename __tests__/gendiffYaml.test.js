import genDiff from '../src/genDiff.js';

test('gendiff compares flat YAML files correctly', () => {
  const file1 = '__tests__/fixtures/file1.yml';
  const file2 = '__tests__/fixtures/file2.yml';
  const expected = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;

  const result = genDiff(file1, file2);
  expect(result).toBe(expected);
});
