const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req,res)=>{
    console.log(req.method)                             //GET
    const url = req.url                                 //获取完整的url
    req.query = querystring.parse(url.split('?')[1])    //解析queryString
    res.end(JSON.stringify(req.query))                  //将querystring返回
});

server.listen(8000);