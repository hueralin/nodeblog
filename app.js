const qs = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 异步处理 post data
const getPostData = (req) => {
	const promise = new Promise((resolve, reject) => {
		if(req.method !== 'POST') {
			resolve({})
			return
		}
		// 文本格式不为json，也直接过去
		if(req.headers['content-type'] !== 'application/json') {
			resolve({})
			return
		}
		let postData = ''
		req.on('data', (chunk) => {
			postData += chunk.toString()
		})
		req.on('end', () => {
			if(postData === '') {
				resolve({})
				return
			}
			resolve(JSON.parse(postData))
		})
	})
	return promise
}

const serverHandle = (req, res) => {
    // 设置返回格式
	res.setHeader('Content-type', 'application/json') 
	
	// 获取 path
	const url = req.url
	req.path = url.split('?')[0]

	// 解析query
	req.query = qs.parse(url.split('?')[1])

	// 解析cookie
	req.cookie = {}
	console.log('从前端传过来的cookie：', req.headers.cookie)
	const cookieStr = req.headers.cookie || ''
	cookieStr.split(';').forEach(item => {
		if(!item) {
			return
		}
		const keyvalpair = item.split('=')
		// 因为在前端操作cookie时，默认在key前面追加一个空格，所以要去掉
		const key = keyvalpair[0].trim()
		const value = keyvalpair[1].trim()
		req.cookie[key] = value
	})
	console.log('Cookie: ', req.cookie)

	// 必须在处理所有路由之前处理 post data
	getPostData(req).then((postData) => {
		// 下面的所有路由都可以在req里面获取body
		req.body = postData

		// 处理 blog 路由
		// handleBlogRouter返回值也是一个promise
		// const blogData = handleBlogRouter(req, res)
		// if(blogData) {
		//   res.end(JSON.stringify(blogData))
		//   return
		// }
		const blogResult = handleBlogRouter(req, res)
		if(blogResult) {
			blogResult.then(blogData => {
				res.end(JSON.stringify(blogData))
			})
			return
		}
		
		// 处理 user 路由
		// const userData = handleUserRouter(req, res)
		// if(userData) {
		//   res.end(JSON.stringify(userData))
		//   return
		// }
		const userResult = handleUserRouter(req, res)
		if(userResult) {
			userResult.then(userData => {
				res.end(JSON.stringify(userData))
			})
			return
		}
	
		// 未命中路由，返回404
		res.writeHead(404, { "Content-type": "text/plain" })
		res.write("404 Not found!\n")
		res.end()
	})
}

module.exports = serverHandle
