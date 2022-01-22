var socket = io();

// 从本地获取用户信息
var user = {
    name: sessionStorage.getItem('name'),
    id: sessionStorage.getItem('id')
}

var onlineUsersListDom = document.querySelector('#onlineUsersList');//获取用户列表信息
var userStateDom = document.querySelector('.userState') //获取当前用户状态

//用户在线人数
var userList = [];// 用户列表

// 监听用户登录并且向后台发送信息
socket.emit('login', user)

// 获取用户登录的返回信息
socket.on('login', (res) => {
    // console.log(res);
    // 在线状态加载
    if (res.user.id == user.id) {
        userStateDom.innerHTML = `${res.user.name}在线中`
    }
    // 获取在线人数
    // onlineusersDom.innerHTML = res.onlineCount - 1;
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
})

//获取用户退出的返回信息
socket.on('logout', (res) => {
    // console.log(res);
    if (res.user.id == user.id) {
        userStateDom.innerHTML = `${res.user.name}已掉线`
    }
})

// 用户列表渲染
function sendUserList() {
    if (userList.length == 0) {
        return
    }
    onlineUsersListDom.innerHTML = '';
    userList.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = item.name + '-----------在线';
        li.className = 'user';
        li.setAttribute('data-id', item.id)
        onlineUsersListDom.appendChild(li);
    })

}

// 点击用户事件
onlineUsersListDom.addEventListener('click', (e) => {
    console.log(e.target.nodeName);
    if (e.target.nodeName === "LI") {
        console.log(e.target);
        let to_user_id = user.id;  //获取发送者id
        let from_user_id = e.target.dataset.id;  //获取接受者id
        axios.post('/create/get_chatroom', { to_user_id, from_user_id }).then(res => {
            console.log(res);
            if (res.data.data.room_id) {
                location.href = './chat.html?from_user_id=' + from_user_id + '&room_id=' + res.data.data.room_id;
            } else {
                axios.post('/create/get_chatroom', { to_user_id, from_user_id }).then(res => {
                    console.log(res);
                    if (res.data.data.room_id) {
                        location.href = './chat.html?from_user_id=' + from_user_id + '&room_id=' + res.data.data.room_id;
                    } else {
                        alert('请检查网络，或者代码')
                    }
                })
            }
        })
    }
})