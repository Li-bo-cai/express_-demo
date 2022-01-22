var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var createCon = require('../createCon')

router.post('/get_chatroom', (req, res) => {
    const { to_user_id, from_user_id } = req.body;
    // console.log(req.body);
    let con = createCon();
    let sql = `SELECT * FROM user_room WHERE (to_user_id = ${mysql.escape(to_user_id)} or to_user_id =${mysql.escape(from_user_id)}) AND (from_user_id = ${mysql.escape(from_user_id)} or from_user_id=${mysql.escape(to_user_id)}) `
    con.query(sql, (err, data) => {
        console.log(data);
        if (data.length == 0) {
            let _sql = `INSERT INTO  user_room(to_user_id,from_user_id) VALUES(${to_user_id},${from_user_id})`
            let _con = createCon();
            _con.query(_sql, (err, data) => {
                res.send({
                    code: 1,
                    msg: '用户聊天房间创建成功',
                    data: data,
                })
            })
        } else {
            res.send({
                code: 1,
                msg: '用户聊天房间查询成功',
                data: data[0],
            })
        }

    })
})

module.exports = router;