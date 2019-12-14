
const { exec } = require('../db/mysql')

// 用户登录
const login = (username, password) => {
    let sql = `
        select username, realname from users where username = '${username}' and password = '${password}';
    `
    console.log('SQL: ', sql)
    return exec(sql).then(rows => {
        console.log('LOGIN: ', rows[0])
        return rows[0] || {}
    })
}

module.exports = {
    login
}
