const path = require('path')
const idGenerator = require('./idGenerator')
const shuffle = require('./shuffle')

/**
 * @method createUniqueIdGenerator
 * @param {boolean} canStartWithNumber - 是否可以数字开头
 * @param {boolean} isShuffleAlphabet - 是否打乱字符表
 * @return {Function}
 */
const createUniqueIdGenerator = (canStartWithNumber = false, isShuffleAlphabet = true) => {
    const nameIdMap = {}

    const alphabet = 'ABCEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz0123456789'
    const finalAlphabet = isShuffleAlphabet ? shuffle(alphabet) : alphabet

    const generateNextId = idGenerator(finalAlphabet)

    return function(name) {
        if (nameIdMap[name]) return nameIdMap[name]

        let nextId

        if (!canStartWithNumber) {
            do {
                nextId = generateNextId()
            } while (/^[0-9]/.test(nextId))
        } else {
            nextId = generateNextId()
        }

        nameIdMap[name] = nextId

        return nameIdMap[name]
    }
}

const uniqueIdGenerator = createUniqueIdGenerator()
const uniqueIdGeneratorLocalName = createUniqueIdGenerator(true)

const getComponentName = resourcePath => {
    const extname = path.extname(resourcePath)
    const resourcePathList = resourcePath.replace(extname, '').split('/')
    return `${resourcePathList.slice(-3, -2)}_${resourcePathList.slice(-2, -1)}_${resourcePathList.slice(-1)}`
}

const generateScopedName = (localName, resourcePath) => {
    const componentName = getComponentName(resourcePath)

    const result = `${uniqueIdGenerator(componentName)}_${uniqueIdGeneratorLocalName(localName)}`
    // console.log(`${componentName} ${localName}: ${result}`)
    return result
}

module.exports = generateScopedName
