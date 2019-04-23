const {login} = require("../controller/user")
const { SuccessModel,ErrorModel } = require('../moudle/resModel')


const handleUserRouter = (req,res)=>{
    const url = req.url;
    const method = req.method;
    const path = url.split('?')[0]

    if(method === 'POST'&& path === '/api/user/login'){
        const logindata = req.body
        const result = login(logindata)
        return result.then(data=>{
            if(data.username){
                return new SuccessModel()
            }else{
                return new ErrorModel('登录失败')
            }
        })
    }
}

module.exports = handleUserRouter