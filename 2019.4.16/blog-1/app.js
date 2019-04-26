const handleBlogRouter = require('./src/router/blog')
const {get,set} = require('./src/db/redis')
const {handleUserRouter,getCookieExpires} = require('./src/router/user')
const querystring = require('querystring')
//session 数据
const SESSION_DATA = {}


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
    //解析path
    const url = req.url;
    req.path = url.split('?')[0]
    //解析query
    req.query = querystring.parse(url.split('?')[1])
    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0]
        const val = arr[1]
        req.cookie[key] = val
    })
    //解析session
    // let needSetCookie = false
    // let userId = req.cookie.userid
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId]={}
    // }
    // req.session = SESSION_DATA[userId]


    //解析session 使用redis
    let needSetCookie = false
    let userId = req.cookie.userid
    if(!userId){
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        //初始化 redis 中的 session的值
        set(userId,{})
    }
    //获取session
    req.sessionId = userId
    get(req.sessionId).then(sessionData=>{
        if(sessionData == null){
            //初始化 redis 中的 session的值
            set(req.sessionId,{})
            //设置session
            req.session = {}
        }else{
            //设置session
            req.session = sessionData
        }

        //处理postData

        getPostData(req)

        //在处理路由之前，首先执行解析
    }).then(postData => {
        req.body = postData

        //处理博客路由
        // if (blogData) {
        //     res.end(JSON.stringify(blogData))
        //     return
        // }
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/;httpOnly;expires=${getCookieExpires()}`)
                }
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
        console.log(userResult)
        if (userResult) {
            userResult.then(userData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/;httpOnly;expires=${getCookieExpires()}`)
                }
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