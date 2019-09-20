process.env.NODE_ENV = 'production'
const merge = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base')
const prodConfig = {
    mode: 'production',
    plugins:[
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 2,
            minSize: 0,
            name: 'common'
        }
    }
}

module.exports = merge(baseConfig, prodConfig)