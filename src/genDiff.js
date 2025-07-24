import fs from 'fs';
import _ from 'lodash';

const readJson = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf-8'));

const genDiff = (filepath1, filepath2) => {
  const data1 = readJson(filepath1);
  const data2 = readJson(filepath2);

  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const lines = keys.map((key) => {
    const val1 = data1[key];
    const val2 = data2[key];

    if (!(key in data1)) {
      return `  + ${key}: ${val2}`;
    }
    if (!(key in data2)) {
      return `  - ${key}: ${val1}`;
    }
    if (_.isEqual(val1, val2)) {
      return `    ${key}: ${val1}`;
    }
    return `  - ${key}: ${val1}\n  + ${key}: ${val2}`;
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
