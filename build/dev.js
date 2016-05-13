var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var utils = require('./utils')
var chalk = require('chalk')
var ora = require('ora')
var webpackConfig = require('./webpack.dev.config')

var port = process.argv[2] || config.dev.port

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true,
        chunks: false
    }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler,{
    log:log
})

function log(){
    if(arguments[0].indexOf("building")>-1){
        console.log(chalk.gray(" - "))
        return
    }
    console.log(chalk.gray(" > "+arguments[0]))
}
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)
app.use(hotMiddleware)

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log(chalk.blue(' # Access URLs:'))
    console.log(chalk.gray(' ----------------------------------------'))
    console.log('     Local: ' + chalk.green('http://localhost:' + port))
    console.log('  External: ' + chalk.green('http://' + utils.ip + ':' + port))
    console.log(chalk.gray(' ----------------------------------------'))
    console.log('')
})
