const {VueLoaderPlugin} = require('vue-loader')
const path = require('path')
const glob = require('glob')

const demos = glob.sync('src/lib-components/**/*.md')
// const demos = glob.sync('docs/!(basic).md')
const demoSections = [].concat(
  demos.map(filePath => ({
    name: path.basename(filePath, '.md'),
    content: filePath
  }))
)

module.exports = {
  styleguideDir: 'docs',
  pagePerSection: true,
  ribbon: {
    url: 'https://github.com/Deeeeeee/vue-complex-component'
  },
  renderRootJsx: path.join(__dirname, 'styleguide/root.js'),
  require: [path.join(__dirname, 'styleguide/requires.js')],
  sections: [
    {
      name: 'Components',
      components: 'src/lib-components/**/*.vue',
      usageMode: 'expand'
    }
    // {
    //   name: 'Demo',
    //   sections: demoSections
    // }
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.styl(us)?$/,
          loaders: ['vue-style-loader', 'css-loader', 'stylus-loader']
        },
        {
          test: /\.(woff2?|eot|[ot]tf)(\?.*)?$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  }
}
