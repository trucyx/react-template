module.exports = function(isProduction) {
    return [
        {
            loader: 'css-loader',
            options: {
                // module: true,
                // localIdentName: '[name]__[local]___[hash:base64:5]',
                minimize: isProduction
            }
        },
        {
            loader: 'postcss-loader'
        },
        {
            loader: 'sass-loader'
        }
    ]
}
