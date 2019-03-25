const { transpile } = require('typescript')
const { process } = require('babel-jest')
const tsConfig = require('../tsconfig.json')

const moduleFileExtensions = ['ts', 'tsx']

module.exports = {
  process(src, path) {
    if (moduleFileExtensions.some(extension => path.endsWith(extension))) {
      src = transpile(src, {
        ...tsConfig.compilerOptions,
        jsx: "preserve",
      }, path, [])
      src = process(src, path, { moduleFileExtensions })
    }

    return src
  },
}
