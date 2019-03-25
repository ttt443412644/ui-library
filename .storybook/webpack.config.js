const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
      plugins: ['babel-plugin-typescript-to-proptypes'],
    },
  })
  config.resolve.extensions.push('.ts', '.tsx')
  config.resolve.plugins = [new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })]
  return config
}
