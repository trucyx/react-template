const generateScopedName = require('./utils/createUniqueIdGenerator')
const { localIdentName } = require('./config')
const { IS_DEVELOPMENT } = require('./env')

module.exports = function cssLoaderGenerator(useCssModules = true) {
    const cssLoaderOptions = {
        modules: useCssModules
    }

    if (useCssModules) {
        if (IS_DEVELOPMENT) {
            cssLoaderOptions.localIdentName = localIdentName
        } else {
            cssLoaderOptions.getLocalIdent = function(context, localIdentName, localName) {
                return generateScopedName(localName, context.resourcePath)
            }
        }
    }

    return [
        {
            loader: 'css-loader',
            options: cssLoaderOptions
        },
        {
            loader: 'postcss-loader'
        },
        {
            loader: 'sass-loader'
        }
    ]
}
