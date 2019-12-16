const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建Redis客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.log('Redis Error: ', err)
})

function set(key, value) {
    if(typeof val === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if(err) {
                reject(err)
                return
            }
            if(val === null) {
                resolve(null)
                return
            }
            // 若 val 是个字符串形式的对象
            try {
                resolve(JSON.parse(val))
            } catch (err) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}
