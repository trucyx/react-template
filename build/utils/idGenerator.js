const defaultAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/**
 * 递增 id 生成器
 *
 * @method increaseIdGenerator
 * @param {string} alphabet - 字符集
 * @param {string} lastId - 上一个生成的 id
 * @return {Function} - id 函数
 */
function increaseIdGenerator(alphabet = defaultAlphabet, lastId = '') {
    const alphabetIndexList = lastId.split('').map(ch => alphabet.indexOf(ch))
    const maxIndex = alphabet.length - 1

    function nextId() {
        let i
        for (i = alphabetIndexList.length - 1; i >= 0; i--) {
            if (alphabetIndexList[i] === maxIndex) {
                alphabetIndexList[i] = 0
                continue
            }
            alphabetIndexList[i]++
            break
        }
        if (i < 0) alphabetIndexList.unshift(0)
        return alphabetIndexList.map(index => alphabet[index]).join('')
    }

    return nextId
}

module.exports = increaseIdGenerator
