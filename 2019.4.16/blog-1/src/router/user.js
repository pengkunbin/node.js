const handleUserRouter = (req,res)=>{
    const url = req.url;
    const method = req.method;
    const path = url.split('?')[0]

    if(method === 'POST'&& path === '/api/user/login'){
        return{
            msg:'这是登录的接口'
        }
    }
}

module.exports = handleUserRouter