function chatready(io) {
    // 在线用户
    var onlineUsers = {};
    //当前在线人数
    var onlineCount = 0;
    io.on('connection', (socket) => {
        // console.log('a user connected');
        //当前房间号
        var room_id = null;
        // 监听新用户加入
        socket.on('login', (user) => {
            // 将新加入用户的唯一标识作为socket名称
            // socket.id = user.id;
            // 判断是否携带room_id
            if (user.room_id) {
                room_id = user.room_id;
                console.log('加入房间成功');
                // 加入该房间  打印房间信息
                socket.join(room_id);
            }
            if (!onlineUsers.hasOwnProperty(user.id)) {
                onlineUsers[user.id] = user;
                onlineCount++; //在线人数+1
            }
            io.emit('login', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: user })
            console.log(user.id + '号' + user.name + '加入了' + room_id + '号聊天室');
        })
        // console.log(onlineCount);
        // 监听用户退出
        socket.on('disconnect', () => {
            // 将退出的用户从在线列表删除
            if (onlineUsers.hasOwnProperty(socket.id)) {
                var user = { ...onlineUsers[socket.id] };
                // console.log(user);
                // 删除
                delete onlineUsers[socket.id];
                onlineCount--;

                //给客户端广播用户退出
                io.emit('logout', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: user })
                console.log(user.id + '号' + user.name + '退出聊天室');
            }
            // console.log('user disconnected');
        });

        // console.log(room_id);

        //监听用户发消息
        socket.on('chat', (chat) => {
            if (room_id) {
                // 获取房间号
                var room = [...socket.rooms][1];
                console.log(room);
                io.to(room).emit('chat', chat)
            } else {
                io.emit('chat message', chat)
            }
        })

        // // 将消息发送给本次房间的所有人 通过room_id判断
        // socket.on(room_id, (chat) => {
        //     console.log('加入房间成功', '当前房间' + room_id);
        //     // 加入该房间  打印房间信息
        //     socket.join(room_id);
        //     // 获取房间号
        //     var room = [...socket.rooms][1];
        //     // console.log(room);
        //     io.to(room).emit('chat message', chat)
        // })
    })

}
module.exports = chatready