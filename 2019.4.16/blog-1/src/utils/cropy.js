const crypto = require('crypto')

//密匙

const SELECT_KEY = 'WJiol_8776#'

//md5加密
function md5(content){
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

function genPassword(password){
    const str = `password=${password}&key=${SELECT_KEY}`
    return md5(str)
}

module.exports={
    genPassword
}