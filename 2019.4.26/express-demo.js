const express = require('express')

//本次app请求的实例

const app = express()

app.use((req,res,next)=>{
    console.log('请求成功...',req.method,req.url)
    next()
})


app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由')
    next()
})

app.use((req,res,next)=>{
    console.log('设置cookie')
    req.cookie={
        userId:'abc123'
    }
    next()
})

// app.use((req,res,next)=>{
//     console.log('处理404')
//     res.json({
//         errno:-1,
//         msg:'404 NOT FOUND'
//     })
//     next()
// })


app.listen(3088,()=>{
    console.log('server is running in prot 3088')
})