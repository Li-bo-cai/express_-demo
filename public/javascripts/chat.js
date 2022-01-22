var socket = io();

// 从本地获取用户信息
var user = {
    name: sessionStorage.getItem('name'),
    id: sessionStorage.getItem('id')
}

var headDom = document.querySelector('.head');//获取对方用户名称
// 从地址栏获取接收者信息和房间信息
// 正则获取地址栏参数信息
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
let from_user_id = GetQueryString('from_user_id');
let room_id = GetQueryString('room_id');
let from_user_name = '';
// 发送请求获取用户相关内容
async function getFromUser() {
    // 获取用户名称
    await axios.get('/users/from_user_name', { params: { id: from_user_id } }).then(res => {
        // 渲染聊天框
        headDom.innerHTML = from_user_name = res.data.data.name
    })
    // 获取用户聊天记录
    await axios.post('/users/get_chat', { to_user_id: user.id, from_user_id }).then(res => {
        console.log(res);
        let historyMsgList = res.data.data;
        historyMsgList.forEach(item => {
            if (item.to_user_id == user.id) {
                addMessage('style_send', item.chat)
            } else {
                addMessage('style_on', item.chat)
            }
        });
    })
}
getFromUser();

var chatMsgDom = document.querySelector('.chat-msg') //获取当前聊天框占位
var msgIptInput = document.querySelector('#msg-ipt') //获取当前输入框信息
var sendMsgBtn = document.querySelector('.send-msg') //获取发送按钮

// 监听用户登录并且向后台发送信息（此处会携带房间号发送）
socket.emit('login', { ...user, room_id })

// 获取用户登录的返回信息
socket.on('login', res => {
    console.log(res);
})

//获取用户退出的返回信息
socket.on('logout', (res) => {
    // console.log(res);
    if (res.user.id == user.id) {
        userStateDom.innerHTML = `${res.user.name}已掉线`
    }
})

// 店家发送消息
sendMsgBtn.addEventListener('click', () => {
    //chatInfo 发送者信息，接收者信息，房间id，聊天内容
    chatInfo = {
        to_user_id: user.id,
        to_user_name: user.name,
        from_user_id: from_user_id,
        from_user_name: from_user_name,
        chat: msgIptInput.value,
        room_id: room_id
    }
    console.log(chatInfo);
    axios.post('/users/save_chat', { ...chatInfo }).then(() => {
        // console.log(res);
        socket.emit('chat', { ...user, msg: msgIptInput.value })
        msgIptInput.value = "";
    })
})

// 获取广播消息
socket.on('chat', (chat) => {
    console.log(chat);
    if (chat.id == user.id) {
        addMessage('style_send', chat.msg)
    } else {
        addMessage('style_on', chat.msg)
    }
})

//组件  将获取聊天信息渲染到页面上
function addMessage(youStyle, msg) {
    let li = document.createElement('li');
    li.innerHTML = `<span>${msg}</span>`
    li.className = youStyle
    chatMsgDom.appendChild(li)
}