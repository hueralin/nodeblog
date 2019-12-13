
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
    loginCheck
} = require('../controlloer/user')

const handleUserRouter = (req, res) => {
    const method = req.method

    // 登录
    if(method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        const result = loginCheck(username, password)
        return result.then(userData => {
            if(userData.username) {
                return new SuccessModel("登录成功！")
            } else {
                return new ErrorModel("登录失败！")
            }
        })
    }
}

module.exports = handleUserRouter
