
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
    login
} = require('../controlloer/user')

// 设置cookie的过期时间
const setCookieExpires = () => {
	const d = new Date()
	// getTime获得的是一长串的毫秒时间
	// Date.now()获得的也是一长串的毫秒时间
	d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
	// 设置cookie的标准时间格式 "Sat, 14 Dec 2019 07:45:54 GMT"
	return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method

    // 登录
    if(method === 'GET' && req.path === '/api/user/login') {
        // const { username, password } = req.body
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(userData => {
            if(userData.username) {
                // 将登录信息保存在cookie，并返回给前端
                res.setHeader('Set-Cookie', `username=${username}; path=/; expires=${setCookieExpires()}; httpOnly`)
                return new SuccessModel("登录成功！")
            } else {
                return new ErrorModel("登录失败！")
            }
        })
    }
    
    // 登录验证的测试
    if(method === 'GET' && req.path === '/api/user/login-test') {
        if(req.cookie.username) {
            return Promise.resolve(new SuccessModel(`${req.cookie.username} 登录验证成功！`))
        } else {
            return Promise.resolve(new ErrorModel('尚未登录！'))
        }
    }
}

module.exports = handleUserRouter
