const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getBlogList, 
        getBlogDetail,
        newBlog,
        updateBlog,
        deleteBlog
    } = require('../controlloer/blog')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keywords = req.query.keywords || ''
        // const listData = getBlogList(author, keywords)
        // return new SuccessModel(listData)
        const result = getBlogList(author, keywords)
        // 返回的也是一个promise
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const result = getBlogDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 新建博客
    if(method === 'POST' && req.path === '/api/blog/new') {
        // const data = newBlog(req.body)
        // return new SuccessModel(data)

        // 新建时必须登录，获取用户，这里只是简单模拟一下
        const author = 'zhangsan'
        req.body.author = author
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新博客
    if(method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        return result.then(val => {
            if(val) {
                return new SuccessModel('更新成功！')
            } else {
                return new ErrorModel('更新失败！')
            }
        })
    }

    // 删除博客
    if(method === 'POST' && req.path === '/api/blog/delete') {
        // 假作者
        const author = 'zhangsan'
        const result = deleteBlog(req.query.id, author)
        return result.then(val => {
            if(result) {
                return new SuccessModel('博客删除成功！')
            } else {
                return new ErrorModel('博客删除失败！')
            }
        })
    }
}

module.exports = handleBlogRouter
