/**
 * @fileOverview webapck production config
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.config.base')
const cssLoader = require('./css-loader')

module.exports = merge(baseConfig, {
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoader(true)
                })
                // format
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: [
                //         {
                //             loader: 'css-loader',
                //             options: {
                //                 minimize: true,
                //                 module: true,
                //                 localIdentName: '[name]__[local]___[hash:base64:5]'
                //             }
                //         },
                //         {
                //             loader: 'postcss-loader'
                //         },
                //         {
                //             loader: 'sass-loader'
                //         }
                //     ]
                // })
            }
        ]
    },
    output: {
        path: path.resolve('dist')
    },
    plugins: [
        new CleanWebpackPlugin([
            'dist'
        ], {
            root: path.resolve()
        }),
        new HtmlWebpackPlugin({
            title: 'piaofang'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            },
            comments: false
        }),
        new BundleAnalyzerPlugin(),
        new ExtractTextPlugin('css/[name].css')
    ],
    stats: { children: false }
})
