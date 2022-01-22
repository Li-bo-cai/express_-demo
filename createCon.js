var mysql = require('mysql');
function createCon() {
    return mysql.createConnection({
        host: 'localhost', // 数据库地址
        // user: 'root', // 用户名
        // password: 'xiemoumou990524', // 密码
        // database: 'movies', // 数据库名
        user: 'root',
        password: 'root',
        database: 'talkroom',
    })
}

module.exports = createCon