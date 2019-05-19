/**
 * @fileOverview webapck base config
 */
const path = require('path')
const { IS_DEVELOPMENT } = require('./env')

module.exports = {
    mode: IS_DEVELOPMENT ? 'development' : 'production',
    context: path.resolve(__dirname, '../src'),
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
                    limit: 4096 // 4k
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
        piaofang: 'pages/index',
        vendor: [
            'classnames',
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[chunkhash:8].js',
        libraryTarget: 'var'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'vendor',
            filename: '[name].[chunkhash:8].js'
        }
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
