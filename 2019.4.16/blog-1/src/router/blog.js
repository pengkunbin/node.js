const {getList,getDetail} = require('../controller/blog')
const { SuccessModel,ErrorModel } = require('../moudle/resModel')


const handleBlogRouter = (req, res) => {
    const url = req.url;
    const method = req.method;
    const path = url.split('?')[0]

    //获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author,keyword)
        return new SuccessModel(listData)
    }

    if (method === 'GET' && path === '/api/blog/detail') {
        const id = req.query.id;
        const data = getDetail(id);
        return new SuccessModel(data)
    }
    if (method === 'POST' && path === '/api/blog/new') {
        return {
            msg: '这是新建博客的接口'
        }
    }
    if (method === 'POST' && path === '/api/blog/update') {
        return {
            msg: '这是更新博客的接口'
        }
    }
}
module.exports = handleBlogRouter