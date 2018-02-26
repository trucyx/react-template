/**
 * @fileOverview webapck dev server config
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const devConfig = require('./webpack.config.dev.js')

module.exports = merge(devConfig, {
    devServer: {
        contentBase: './demos',
        hot: true,
        host: 'localhost',
        stats: {
            colors: true
        }
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})
