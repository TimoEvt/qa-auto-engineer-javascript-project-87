import fs from 'fs'
import path from 'path'

const getFileContent = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(fullPath, 'utf-8')
}

export default getFileContent
