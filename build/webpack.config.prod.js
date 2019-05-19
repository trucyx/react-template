/**
 * @fileOverview webapck production config
 */
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.config.base')
const cssLoaderGenerator = require('./css.loader.config')


module.exports = merge(baseConfig, {
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoaderGenerator()
                })
            }
        ]
    },
    output: {
        path: path.resolve('dist')
    },
    optimization: {},
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'piaofang'
        }),
        new BundleAnalyzerPlugin(),
        new ExtractTextPlugin('css/[name].css')
    ],
    stats: { children: false }
})
