const Koa = require('koa')
const request = require('koa-request')

const app = new Koa()

app.use(function* () {
    const options = {
        url: 'https://box.maoyan.com/promovie/api/box/national.json',
        headers: {
            'User-Agent': 'request'
        }
    }

    const response = yield request(options)
    const info = JSON.parse(response.body)

    this.set({
        'Access-Control-Allow-Origin': '*'
    })
    this.body = info
})

app.listen(process.env.PORT || 3000)
