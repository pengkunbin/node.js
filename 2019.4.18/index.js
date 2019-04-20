//nodejs如何读取文件

const fs = require("fs")
const path = require("path")

// const fullFileName = path.resolve(__dirname,"files","a.json")

// fs.readFile(fullFileName,(err,data)=>{
//     if(err){
//         console.error(err)
//         return
//     }else{
//         console.log(data.toString())
//     }
// })

//callback方式

function getFileContent(fileName, callback) {
    const fullFileName = path.resolve(__dirname, "files", fileName)

    fs.readFile(fullFileName, (err, data) => {
        if (err) {
            console.error(err)
            return
        } else {
            callback(
                JSON.parse(data.toString())
            )
        }
    })
}

//callback hell 回调地狱调用方法
getFileContent('a.json',(dataA)=>{
    console.log(dataA)
    getFileContent(dataA.next,(dataB)=>{
        console.log(dataB)
        getFileContent(dataB.next,(dataC)=>{
            console.log(dataC)
        })
    })
})

//promise获取文件内容
// promise.js