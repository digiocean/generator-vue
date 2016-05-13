var path = require('path')
var px2rem = require('postcss-px2rem')
var config = require("../config.js")
var utils = require('./utils')

module.exports = {
    entry: {
      app: './src/index.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.css','.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'components': path.resolve(__dirname, '../src/components'),
            'fonts': path.resolve(__dirname, '../src/fonts'),
            'css': path.resolve(__dirname, '../src/css'),
            'svgs': path.resolve(__dirname, '../src/svgs'),
            'images': path.resolve(__dirname, '../src/images'),
            'libs': path.resolve(__dirname, '../src/libs')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: path.resolve(__dirname, '../'),
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css'
        },{
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    vue: {
        postcss: [
            px2rem({
                remUnit: 75
            })
        ]
    }
}
