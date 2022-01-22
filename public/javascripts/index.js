var socket = io();

// 从本地获取用户信息
var user = {
    name: sessionStorage.getItem('name'),
    id: sessionStorage.getItem('id')
}
var msgVal = document.querySelector('#chat_message');// 聊天输入框
var userListDom = document.querySelector('#userList');// 用户列表
var disconnectBtn = document.querySelector('#disconnect')// 退出登录
var onlineusersDom = document.querySelector('.onlineusers')//用户在线人数
var userList = [];// 用户列表

// 监听用户登录并且向后台发送信息
socket.emit('login', user)

// 获取用户登录的返回信息
socket.on('login', (res) => {
    console.log(res);
    // 在线状态加载
    onlinState(res);
})

//获取用户退出的返回信息
socket.on('logout', (res) => {
    console.log(res);
    // 在线状态加载
    onlinState(res);
})


//用户登录、退出事件流程
function onlinState(res) {
    // 获取在线人数
    onlineusersDom.innerHTML = res.onlineCount - 1;
    // 清空userList
    userList = [];
    // 判断登录用户中是否有别的用户，排除自己，渲染其他
    for (let key in res.onlineUsers) {
        (res.onlineUsers[key].id != user.id) ? userList.push(res.onlineUsers[key]) : '';
    }
    let obj = {};
    userList = userList.reduce((pre, cur) => {
        obj[cur.id] ? '' : obj[cur.id] = true && pre.push(cur);
        return pre;
    }, []);
    sendUserList();
    // console.log(userList);
}

// 用户列表渲染
function sendUserList() {
    if (userList.length == 0) {
        return
    }
    userListDom.innerHTML = '';
    userList.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = item.name;
        li.className = 'user'
        userListDom.appendChild(li)
    })

}

// 点击发送消息
btn.addEventListener('click', () => {
    socket.emit('chat message', { ...user, msg: msgVal.value })
    msgVal.value = "";
})
// 获取广播消息
socket.on('chat message', (chat) => {
    if (chat.id == user.id) {
        addMessage('style_send', chat.msg)
    } else {
        addMessage('style_on', chat.msg)
    }
})
//组件  将获取聊天信息渲染到页面上
function addMessage(youStyle, msg) {
    let ul = document.querySelector('#messages');
    let li = document.createElement('li');
    li.innerHTML = msg;
    li.className = youStyle
    ul.appendChild(li)
}

// 点击退出登录
disconnectBtn.addEventListener('click', () => {
    socket.disconnect()
    location.href = './login.html';
    localStorage.clear()
})