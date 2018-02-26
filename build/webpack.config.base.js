/**
 * @fileOverview webapck base config
 */
const path = require('path')

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192 // 8k
                }
            },
            {
                test: /\.gif$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: './fonts/',
                            useRelativePath: true
                        }
                    }
                ]
            }
        ]
    },
    entry: {
        piaofang: './src/pages/index',
        vendor: [
            'axios',
            'es6-promise',
            'classnames',
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[chunkhash:8].js',
        // filename: '[name].js',
        libraryTarget: 'var'
    },
    externals: [
        {
            // 'zepto-modules': 'zepto',
            // 'react': true,
            // 'react-dom': true
        }
    ],
    resolve: {
        modules: [
            'node_modules',
            path.resolve('./src')
        ],
        enforceExtension: false,
        extensions: ['.js', '.jsx', '.css', '.scss'],
        alias: {}
    }
}
