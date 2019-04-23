const {getList,getDetail,newBlog,updataBlog,delBlog} = require('../controller/blog')
const { SuccessModel,ErrorModel } = require('../moudle/resModel')


const handleBlogRouter = (req, res) => {
    const url = req.url;
    const method = req.method;
    const path = url.split('?')[0]

    //获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author,keyword)
        // return new SuccessModel(listData)
        const result = getList(author,keyword)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })
    }

    if (method === 'GET' && path === '/api/blog/detail') {
        const id = req.query.id;
        // const data = getDetail(id);
        // return new SuccessModel(data)
        const result = getDetail(id)
        return result.then(detailData=>{
            return new SuccessModel(detailData)
        })
    }

    if (method === 'POST' && path === '/api/blog/new') {
        const blogData = req.body;
        const result = newBlog(blogData)
        return result.then(id=>{
            return new SuccessModel(id)
        })
    }

    if (method === 'POST' && path === '/api/blog/update') {
        //id就是更新博客的id
        const updateData = req.body;
        const result = updataBlog(updateData)
        return result.then(data=>{
            if(data){
                return new SuccessModel()
            }else{
                return new ErrorModel('更新博客失败')
            }
        })
    }
    if(method === 'POST' && path === '/api/blog/delete'){
        const delData = req.body;
        const result = delBlog(delData)
        return result.then(data=>{
            if(data){
                return new SuccessModel()
            }else{
                return new ErrorModel('删除博客失败')
            }
        })
    }
}
module.exports = handleBlogRouter