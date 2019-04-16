const http = require('http')
const fs = require('fs')
http.createServer(function (request, response) {
    console.log('request come', request.url)
    const html = fs.readFileSync('test.html','utf8')
    response.writeHead(200,{
        'Content-Type':'text/html',
        'Set-Cookie':['id=123;max-age=2','abc=456;HttpOnly']
    })
    response.end(html)
}).listen(8888)