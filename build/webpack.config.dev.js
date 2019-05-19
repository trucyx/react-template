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
const cssLoaderGenerator = require('./css.loader.config')

const cssLoaderWithCssModules = cssLoaderGenerator()
cssLoaderWithCssModules.unshift({
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
                use: cssLoaderWithCssModules
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.resolve('dist')
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            filename: '[name].[hash:8].js'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'piaofang'
        }),
        new ManifestPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
})
