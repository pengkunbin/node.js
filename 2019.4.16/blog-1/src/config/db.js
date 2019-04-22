const env = process.env.NOED_ENV  //获取生产环境

let MYSQL_CONF
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
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
}
module.exports = {
    MYSQL_CONF
}