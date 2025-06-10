import parseFile from './parser.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  return `File 1 keys: ${Object.keys(data1).join(', ')}\nFile 2 keys: ${Object.keys(data2).join(', ')}`;
};

export default genDiff;

