const http = require('http')
const serverHandle = require('../app')

const server = http.createServer((req, res) => {
    serverHandle(req, res)
})

server.listen(3000, () => {
    console.log('listening on 3000 port...')
})