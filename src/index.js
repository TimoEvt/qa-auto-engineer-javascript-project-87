import fs from 'fs';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const data1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const data2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
  return `File 1 contents:\n${data1}\n\nFile 2 contents:\n${data2}`;
};

export default genDiff;

