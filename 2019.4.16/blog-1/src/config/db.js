const env = process.env.NOED_ENV  //获取生产环境

let MYSQL_CONF
let REDIS_CONF
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }
    REDIS_CONF = {
        host:'127.0.0.1',
        port:6379
    }
}
else if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }
    REDIS_CONF = {
        host:'127.0.0.1',
        port:6379
    } 
}
module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}