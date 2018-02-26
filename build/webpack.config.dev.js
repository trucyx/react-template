/**
 * @fileOverview webapck develop config
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const baseConfig = require('./webpack.config.base')
const cssLoader = require('./css-loader')

const styleLoader = cssLoader(false)
styleLoader.unshift({
    loader: 'style-loader'
})

module.exports = merge(baseConfig, {
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: styleLoader
                // format
                // use: [
                //     {
                //         loader: 'style-loader'
                //     },
                //     {
                //         loader: 'css-loader',
                //         options: {
                //             minimize: false,
                //             module: true,
                //             localIdentName: '[name]__[local]___[hash:base64:5]'
                //         }
                //     },
                //     {
                //         loader: 'postcss-loader'
                //     },
                //     {
                //         loader: 'sass-loader'
                //     }
                // ]
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
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
        new ManifestPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].[hash:8].js'
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
})
