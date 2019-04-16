const http = require('http')
const queryString = require('queryString')

const server =  http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    const path = url.split('?')[0];
    const query = queryString.parse(url.split('?')[1])

    res.setHeader('Content-type','application/json')
    
    const resData = {
        url,
        method,
        path,
        query
    }

    if(method === 'GET'){
        res.end(JSON.stringify(resData));
    }
    if(method === 'POST'){
        let postData = ''
        req.on('data',chunk =>{
            postData += chunk.toString()
        })
        req.on('end',()=>{
            resData.postData = postData;
            res.end(
                JSON.stringify(resdata)
            )
        })
    }
})
server.listen(8000)