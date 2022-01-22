var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var createCon = require('../createCon')

//获取ID用户
router.get('/from_user_name', (req, res) => {
  const { id } = req.query;
  let con = createCon();
  let sql = `SELECT name FROM user WHERE id = ${mysql.escape(id)}`
  con.query(sql, (err, data) => {
    if (data.length != 0) {
      res.send({
        code: 1,
        msg: '获取ID用户',
        data: data[0],
      })
    } else {
      res.send({
        code: 0,
        msg: '获取失败'
      })
    }
  })
})

// 消息存放机制
router.post('/save_chat', (req, res) => {
  const { to_user_id, to_user_name, from_user_id, from_user_name, chat, room_id } = req.body;
  let sql = `INSERT INTO user_chat(to_user_id, to_user_name, from_user_id, from_user_name, chat, room_id) VALUES(${to_user_id},'${to_user_name}',${from_user_id},'${from_user_name}','${chat}',${room_id})`
  console.log(sql);
  let con = createCon();
  con.query(sql, (err, data) => {
    console.log(data);
    res.send({
      code: 1,
      msg: '消息存放成功',
      data: data,
    })
  })
})

//获取聊天记录
router.post('/get_chat', (req, res) => {
  const { to_user_id, from_user_id } = req.body;
  let sql = `SELECT * FROM user_chat WHERE (to_user_id = ${mysql.escape(to_user_id)} or to_user_id =${mysql.escape(from_user_id)}) AND (from_user_id = ${mysql.escape(from_user_id)} or from_user_id=${mysql.escape(to_user_id)})`
  let con = createCon();
  con.query(sql, (err, data) => {
    res.send({
      code: 1,
      msg: '获取成功',
      data: data,
    })
  })
})


module.exports = router;
