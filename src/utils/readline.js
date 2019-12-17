const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 文件名
const fileName = path.join(__dirname, '../', '../', '/logs/', 'access.log')
// 创建 read stream
const readStream = fs.createReadStream(fileName)

// 创建readline对象
const rl = readline.createInterface({
    // 重点代码
    input: readStream
})

// chromeNum 
let chromeNum = 0
let sum = 0

// 逐行读取
rl.on('line', (lineData) => {
    if(!lineData) return
    // 记录总行数
    sum++
    // 根据当时设置的日志格式进行拆分
    const arr = lineData.split(' -- ')
    if(arr[2] && arr[2].indexOf('Chrome') > 0) {
        chromeNum++
    }
})

// 监听读取完成
rl.on('close', () => {
    console.log('总数：', sum)
    console.log('chrome数：', chromeNum)
    console.log('chrome占比：', chromeNum/sum)
})
