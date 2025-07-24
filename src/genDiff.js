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

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
