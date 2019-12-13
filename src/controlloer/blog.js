const { exec } = require('../db/mysql')

// 获取博客列表
const getBlogList = (author, keywords) => {
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keywords) {
        sql += `and title like '%${keywords}%' `
    }
    sql += `order by createtime desc`
    console.log('SQL: ', sql)
    // 返回 promise
    return exec(sql)
}

// 获取博客详情
const getBlogDetail = (blogId) => {
    let sql = `select * from blogs where 1=1 `
    if(blogId) {
        sql += `and id = ${blogId}`
    }
    console.log('SQL: ', sql)
    // 返回 promise
    // 查询出的结果都是数组
    return exec(sql).then(rows => {
        return rows[0]
    })
}

// 新建博客
const newBlog = (blogDate = {}) => {
    const title = blogDate.title
    const content = blogDate.content
    const author = blogDate.author
    const createtime = Date.now()
    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', '${createtime}', '${author}');
    `
    console.log('SQL: ', sql)
    // insertDate 插入完后返回插入信息
    return exec(sql).then(insertDate => {
        console.log('insertDate: ', insertDate)
        return {
            id: insertDate.insertId
        }
    })
}

// 更新博客
const updateBlog = (id, blogDate = {}) => {
    const title = blogDate.title
    const content = blogDate.content
    let sql = `update blogs set title = '${title}', content = '${content}' where id = ${id};`
    console.log('SQL: ', sql)
    return exec(sql).then(updateData => {
        console.log('updateData: ', updateData)
        if(updateData.affectedRows > 0) {
            // 更新成功
            return true
        } else {
            return false
        }
    })
}

// 删除博客
const deleteBlog = (id, author) => {
    // 为什么要加上author？
    // 防止别人删除你的博客
    const sql = `delete from blogs where id = ${id} and author = '${author}';`
    console.log('SQL: ', sql)
    return exec(sql).then(deleteData => {
        console.log('deleteData: ', deleteData)
        if(deleteData.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}

module.exports = {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
