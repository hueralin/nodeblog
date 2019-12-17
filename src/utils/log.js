const fs = require('fs')
const path = require('path')

// 生成 write stream 的方法
function createWriteStream(fileName) {
    const fullName = path.join(__dirname, '../', '../', '/logs/', fileName)
    const writeStream = fs.createWriteStream(fullName, {
        // 注意这里，若不是追加，则在每次重启服务后，日志文件会被覆盖（清空）
        flags: 'a'  // 追加
    })
    return writeStream
}

// 写日志函数
function writeLog(writeStream, log) {
    writeStream.write(log + '\n')   // 关键代码
}

// 生成access.log的writeStream
const accessWriteStream = createWriteStream('access.log')

// 写访问日志
function access(log) {
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}
