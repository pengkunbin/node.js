const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

//用于处理post data 
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        //如果请求方式不是post,就忽略,返回空
        if (req.method !== 'POST') {
            resolve({})
            return
        } else {
            //如果请求格式不是json,忽略,返回空
            if (req.headers['content-type'] !== 'application/json') {
                resolve({})
                return
            } else {
                let postData = ''
                req.on('data', chunk => {
                    postData += chunk.toString()
                })
                req.on('end', () => {
                    //如果数据为空，返回空
                    if (!postData) {
                        resolve({})
                        return
                    }
                    resolve(JSON.parse(postData))
                })
            }
        }
    })
    return promise
}

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')

    const url = req.url;
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])
    //在处理路由之前，首先执行解析
    getPostData(req).then(postData => {
        req.body = postData

        //处理博客路由
        // if (blogData) {
        //     res.end(JSON.stringify(blogData))
        //     return
        // }
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return
        }

        //处理用户路由
        const userResult = handleUserRouter(req, res)
        // if (userData) {
        //     res.end(JSON.stringify(userData))
        //     return
        // }
        if(userResult){
            userResult.then(userData=>{
                res.end(JSON.stringify(userData))
            })
            return
        }

        //未命中 返回404
        res.writeHead(404, { "Content-type": "text/plain" })
        res.write("404 NOT FOUND\N")
        res.end()
    })
}
module.exports = serverHandle