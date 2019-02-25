const webpack = require('webpack')
const path = require('path')
const appData = require('./data.json')
const index = appData.articleList
const content = appData.articles

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    before(app) {
      app.get('/api/index', function (req, res) {
        res.json({
          errno: 0,
          data: index
        })
      })
      app.get('/api/content', function (req, res) {
        res.json({
          errno: 0,
          data: content
        })
      })
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
  },
  publicPath: ''
}
