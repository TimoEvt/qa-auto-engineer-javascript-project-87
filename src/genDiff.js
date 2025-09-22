import parseFile from './parser.js';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const lines = keys.map((key) => {
    const val1 = data1[key];
    const val2 = data2[key];

    if (!Object.hasOwn(data1, key)) {
      // ключ есть только во втором файле — добавлен
      return `  + ${key}: ${val2}`;
    }
    if (!Object.hasOwn(data2, key)) {
      // ключ есть только в первом — удалён
      return `  - ${key}: ${val1}`;
    }
    if (_.isEqual(val1, val2)) {
      // значение не изменилось
      return `    ${key}: ${val1}`;
    }
    // значение изменилось
    return `  - ${key}: ${val1}\n  + ${key}: ${val2}`;
  });

import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const parse = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const ext = path.extname(fullPath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  if (ext === '.json') return JSON.parse(data);
  throw new Error(`Unsupported file format: ${ext}`);
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const lines = keys.flatMap((key) => {
    const in1 = Object.hasOwn(obj1, key);
    const in2 = Object.hasOwn(obj2, key);
    if (in1 && in2) {
      if (_.isEqual(obj1[key], obj2[key])) return `    ${key}: ${obj1[key]}`;
      return [`  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
    }
    if (in1) return `  - ${key}: ${obj1[key]}`;
    if (in2) return `  + ${key}: ${obj2[key]}`;
    return [];
  });
 dbee13e (Fix genDiff: implement full diff output and add lodash dependency)
  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
