const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
const webpack = require('webpack')
const target = 'http://localhost:8080'
// const target = 'http://47.101.153.52/'

const devConfig = {
    mode: 'development',
    entry: [require.resolve('react-dev-utils/webpackHotDevClient'), path.resolve(__dirname, '../src/index.js')],
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: '../dist',
        historyApiFallback: true,
        host: 'localhost',
        port: '8888',
        hot: true,
        proxy: {
            "/api": {
                target: target,
                pathRewrite: {"^/api": ""},
                secure: false
            }
        }
    },
    devtool: 'source-map'
}

module.exports = merge(baseConfig, devConfig)