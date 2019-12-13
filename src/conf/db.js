// 该环境参数在package.json文件的脚本里定义了，运行时就定义好的。
const env = process.env.NODE_ENV    // 环境参数（环境变量）

// 配置
let MYSQL_CONF

if(env === 'dev') {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "123456",
        port: "3306",
        database: "myblog"
    }
} else if(env === 'production') {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "123456",
        port: "3306",
        database: "myblog"
    }
}

module.exports = {
    MYSQL_CONF
}
