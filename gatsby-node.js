const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve('src/'),
      },
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    },
  })
}
