// Source https://github.com/rollup/rollup-starter-lib/blob/typescript/rollup.config.js

import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import pkg from './package.json'

const input = 'src/index.tsx'
const external = [
  'react',
  'react-dom',
  'styled-jsx/server',
  'exenv',
  'classcat',
  'lodash.isempty',
  'lodash.debounce',
  'react-transition-group/TransitionGroup',
  'react-day-picker',
  'lodash.isstring',
  'lodash.isequal',
  'country-telephone-data',
  'react-transition-group/Transition',
]
const extensions = ['.ts', '.tsx', '.js', '.jsx']

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  typescript({ tsconfig: 'tsconfig.json' }),
  babel({
    extensions,
    exclude: 'node_modules/**',
  }),
  resolve({ extensions }), // so Rollup can find `ms`
]

export default [
  // browser-friendly UMD build
  // {
  //   external: id => /^react|styled-jsx/.test(id),
  //   input,
  //   output: {
  //     name: 'ui-library',
  //     file: pkg.browser,
  //     format: 'umd',
  //   },
  //   plugins: [
  //     ...plugins,
  //     commonjs({
  //       include: 'node_modules/**',
  //       namedExports: {
  //         'node_modules/react/index.js': [
  //           'Component',
  //           'forwardRef',
  //           'Ref',
  //           'PureComponent',
  //           'Fragment',
  //           'Children',
  //           'createElement',
  //           'cloneElement',
  //         ],
  //         'node_modules/react-dom/index.js': ['createPortal'],
  //         'node_modules/styled-jsx/server.js': ['flushToHTML'],
  //       },
  //     }), // so Rollup can convert `ms` to an ES module
  //   ],
  // },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    external,
    input,
    plugins,
    output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],
  },
]
