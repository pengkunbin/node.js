const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require('../moudle/resModel')
const { set } = require('../db/redis')

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const url = req.url;

    const method = req.method;
    const path = url.split('?')[0]
    console.log('path:', path)


    //登录
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                //添加session
                req.session.username = data.username
                req.session.realname = data.realname

                //同步到redis
                set(req.sessionId,req.session)

                return new SuccessModel()
            } else {
                return new ErrorModel('登录失败')
            }
        })
    }

    //登录验证的测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.session.username) {
            return Promise.resolve(
                new SuccessModel({
                    session: req.session
                })
            )
        }
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}

module.exports = { handleUserRouter, getCookieExpires }