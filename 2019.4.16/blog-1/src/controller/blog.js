const { exec } = require('../db/mysql')


const getList = (author, keyword) => {

    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    // sql+=`order by date desc;`

    return exec(sql).then(rows => {
        return rows[0]
    })
}

const getDetail = (id) => {
    //先返回假數據
    let sql = `select * from blogs where id='${id}' `
    return exec(sql)
}

const newBlog = (blogData) => {
    //title\content author数据
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()

    const sql = `insert into blogs (title,content,author,date) values ('${title}','${content}','${author}','${createTime}')`

    return exec(sql).then(insertdata => {
        return {
            id: insertdata.id
        }
    })
}

const updateBlog = (updateData) => {
    const content = updateData.content
    const title = updateData.title
    const id = updateData.id
    const createTime = Date.now()

    const sql = `update blogs set title='${title}',content='${content}',date='${createTime}' where id='${id}'`

    return exec(sql).then(result => {
        if (result.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}

const delBlog = (delData) => {
    const id = delData.id
    const sql = `delete from blogs where id='${id}'`
    return exec(sql).then(result => {
        if (result.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}