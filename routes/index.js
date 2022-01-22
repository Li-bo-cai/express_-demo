var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var createCon = require('../createCon')

// router.get('/', function( req,res ) {
//   res.render(__filename+'/index.html')
// } )

// 登录跳转页面
router.post('/login', (req, res) => {
  const { name, pwd } = req.body;
  let sql = `SELECT * FROM user WHERE name = ${mysql.escape(name)} AND pwd = ${mysql.escape(pwd)}`
  let con = createCon()
  con.query(sql, (err, data) => {
    if (data.length != 0) {
      res.send({
        code: 1,
        msg: '登录成功',
        data: data[0],
      })
    } else {
      res.send({
        code: 0,
        msg: '登录失败'
      })
    }
  })
})

//点击时建立房间链接

module.exports = router;