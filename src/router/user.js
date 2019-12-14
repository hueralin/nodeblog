
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
    login
} = require('../controlloer/user')

const handleUserRouter = (req, res) => {
    const method = req.method

    // 登录
    if(method === 'GET' && req.path === '/api/user/login') {
        // const { username, password } = req.body
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(userData => {
            if(userData.username) {
                // 设置 session
                req.session.username = userData.username
                req.session.realname = userData.realname
                // 因为req.session指向了SESSION_DATA[userId]，
                // 所以，修改req.session时，也修改了SESSION_DATA[userId]
                console.log('request session: ', req.session)
                return new SuccessModel("登录成功！")
            } else {
                return new ErrorModel("登录失败！")
            }
        })
    }
    
    // 登录验证的测试
    if(method === 'GET' && req.path === '/api/user/login-test') {
        if(req.session.username) {
            return Promise.resolve(new SuccessModel(`${req.session} 登录验证成功！`))
        } else {
            return Promise.resolve(new ErrorModel('尚未登录！'))
        }
    }
}

module.exports = handleUserRouter
