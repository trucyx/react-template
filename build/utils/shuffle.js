function rand(n) {
    return Math.floor(Math.random() * n)
}

function shuffleWithFisherYates(arr = []) {
    const result = arr.slice()
    const len = arr.length
    let i = len
    if (i === 0) return

    let temp

    while (--i) {
        // 0 <= j <= i-1
        const j = rand(i - 1)
        temp = result[i]
        result[i] = result[j]
        result[j] = temp
    }
    return result
}

function shuffle(str) {
    return shuffleWithFisherYates(Array.from(str)).join('')
}

module.exports = shuffle
