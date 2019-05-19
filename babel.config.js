const path = require('path')
const generateScopedName = require('./build/utils/createUniqueIdGenerator')
const { localIdentName } = require('./build/config')
const { IS_DEVELOPMENT } = require('./build/env')

module.exports = function(api) {
    api.cache(true)

    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3
            }
        ],
        '@babel/preset-react'
    ]
    const plugins = [
        '@babel/plugin-proposal-class-properties',
        [
            'react-css-modules',
            {
                context: path.resolve(__dirname, './src'),
                generateScopedName: IS_DEVELOPMENT ? localIdentName : generateScopedName,
                filetypes: {
                    '.css': {
                        syntax: 'postcss-scss'
                    },
                    '.scss': {
                        syntax: 'postcss-scss'
                    }
                }
            }
        ]
    ]

    return {
        presets,
        plugins
    }
}
