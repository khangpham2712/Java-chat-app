var stompClient = null;
var listUser = [];
function connect(username) {
    var socket = new SockJS('/hello');
    stompClient = Stomp.over(socket);
    stompClient.connect({ username: username, }, function() {
        console.log('Web Socket is connected');

        stompClient.subscribe('/users/queue/messages', function(message) {
            var Idnguoigui = message.headers.usernguoigui
            var avatarNguoiGui = message.headers.avatarnguoigui
            var typeFile = message.headers.typefile
            var filename = message.headers.filename
            console.log("typefile: "+typeFile)
            if(Number(Idnguoigui) === Number(document.getElementById("idnguoinhan").value)
            && Number(typeFile) === Number(0) ){
                appendNguoiNhan(message.body,avatarNguoiGui)
            }
            else if(Number(Idnguoigui) === Number(document.getElementById("idnguoinhan").value)
            && Number(typeFile) === Number(1) ){
                appendFileNguoiNhan(message.body,avatarNguoiGui, filename)
            }
            else{
                reloadListUser(Idnguoigui,avatarNguoiGui,message.body)
            }
            console.log("nguoigui: "+message.headers.usernguoigui)
        });

    });
}

$(function() {
    $("form").on('submit', function(e) {
        e.preventDefault();
    });
    $("#connect").click(function() {
        connect($("#username").val());
    });
    $("#send").click(function() {
        stompClient.send("/app/hello/"+$("#idnguoinhan").val(), {}, $("#name").val());
        append()
    });
    $('#name').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            stompClient.send("/app/hello/"+$("#idnguoinhan").val(), {}, $("#name").val());
            append()
        }
    });

});

async function myfun(){
    var uploadimg = "http://localhost:8080/api/public/upload";
    const filePath = document.getElementById('sendfile')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    const response = await fetch(uploadimg, {
        method: 'POST',
        headers: new Headers({

        }),
        body: formData
    });
    var linkimage = await response.text();
    console.log(linkimage)
    stompClient.send("/app/file/"+$("#idnguoinhan").val()+"/"+filePath.files[0].name, {}, linkimage);

    const file = filePath.files[0];
    const  fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(fileType)) {
        //khong phai anh
        appendFile(0,filePath.files[0].name,linkimage)
    }
    else{
        // la anh
        appendFile(1,filePath.files[0].name,linkimage)
    }

}

function appendNguoiNhan(message, avatar) {
    let avatarre = avatar.replace("\\c", ":");
    var tinhan = ' <div class="chat-msg receiver" >' +
        '<div class="chat-msg-profile">' +
        '<img class="chat-msg-img" src="'+avatarre+'"/>' +
        '</div>' +
        '<div class="chat-msg-content">' +
        '<div class="chat-msg-text nguoinhan">' + message + '</div>' +
        '</div>' +
        '</div>';
    document.getElementById('noidungchats').innerHTML += tinhan;
    var scroll_to_bottom = document.getElementById('scroll-to-bottom');
    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
}

function appendFileNguoiNhan(message, avatar,filename) {
    let avatarre = avatar.replace("\\c", ":");
    var cont = ''
    if(message.match(/\.(jpeg|jpg|gif|png)$/) != null){
        cont = '<img src="'+message+'"/>'
    }
    else{
        cont = '<a href="'+message+'" download>'+filename+'</a>'
    }
    var tinhan = ' <div class="chat-msg receiver" >' +
        '<div class="chat-msg-profile">' +
        '<img class="chat-msg-img" src="'+avatarre+'"/>' +
        '</div>' +
        '<div class="chat-msg-content">' +
        '<div class="chat-msg-text nguoinhan">' + cont + '</div>' +
        '</div>' +
        '</div>';
    document.getElementById('noidungchats').innerHTML += tinhan;
    var scroll_to_bottom = document.getElementById('scroll-to-bottom');
    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
}

function append() {
    var avatar = localStorage.getItem("myavatar");
    var tinhan = ' <div class="chat-msg owner" >' +
        '<div class="chat-msg-profile">' +
        '<img class="chat-msg-img" src="'+avatar+'"/>' +
        '</div>' +
        '<div class="chat-msg-content">' +
        '<div class="chat-msg-text">' + $("#name").val() + '</div>' +
        '</div>' +
        '</div>';
    document.getElementById('noidungchats').innerHTML += tinhan;
    var scroll_to_bottom = document.getElementById('scroll-to-bottom');
    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
    document.getElementById("name").value = ''
}

function appendFile(type,name,link) {
    var avatar = localStorage.getItem("myavatar");
    var files = '';
    if(type == 0){
        files = '<a href="'+link+'" download>'+name+'</a>'
    }
    if(type == 1){
        files = '<img src="'+link+'"/>'
    }
    var tinhan = ' <div class="chat-msg owner" >' +
        '<div class="chat-msg-profile">' +
        '<img class="chat-msg-img" src="'+avatar+'"/>' +
        '</div>' +
        '<div class="chat-msg-content">' +
        '<div class="chat-msg-text">' + files + '</div>' +
        '</div>' +
        '</div>';
    document.getElementById('noidungchats').innerHTML += tinhan;
    var scroll_to_bottom = document.getElementById('scroll-to-bottom');
    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
    document.getElementById("name").value = ''
}

async function loadListUserChat(){

    var token = localStorage.getItem("token");
    var username = localStorage.getItem("username");

    var urlAccount = 'http://'+urlFirst+':8080/api/user/getAllUserChat';
    const res = await fetch(urlAccount, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    listUser = await res.json();
    var id = window.location.search.split('=')[1];
    var stt = false;
    if(id != null){
        var url = 'http://'+urlFirst+':8080/api/public/findUserNotDtoById?id='+id;
        const res = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        if(res.status < 300){
            stt = true
            var user = await res.json();
            document.getElementById("userdangchat").innerHTML = user.username
            var u = {
                "user":user,
                "lastContent":'',
                "time":"0 giây",
                "styleContent":''
            }
            var check = true
            for(i=0; i<listUser.length;i++){
                if(listUser[i].user.id == user.id){
                    check = false
                }
            }
            if(check == true){
                listUser.unshift(u)
            }
        }
    }
    var main = ''
    for(i=0; i< listUser.length; i++){
        main += ' <div onclick="loadMessageChat('+listUser[i].user.id+')" class="msg online">\n' +
            '                <img onclick="loadMessageChat('+listUser[i].user.id+')" class="msg-profile" src="'+listUser[i].user.avatar+'" alt="" />\n' +
            '                <div class="msg-detail">\n' +
            '                    <div class="msg-username">'+listUser[i].user.username+'</div>\n' +
            '                    <div class="msg-content">\n' +
            '                        <span id="msg-message" class="msg-message" '+listUser[i].styleContent+'>'+listUser[i].lastContent+'</span>\n' +
            '                        <span class="msg-date">'+listUser[i].time+'</span>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>'
    }
    document.getElementById("listUserWithMe").innerHTML = main
    if(id != null && stt == true){
        loadMessageChat(id)
        document.getElementById("idnguoinhan").value = id
    }
}

async function loadMessageChat(idnguoinhan){
    removeColorContent(idnguoinhan)
    document.getElementById("idnguoinhan").value = idnguoinhan
    for(i=0; i<listUser.length; i++){
        if(listUser[i].user.id == idnguoinhan){
            document.getElementById("userdangchat").innerHTML = listUser[i].user.username
        }
    }
    var token = localStorage.getItem("token");
    var username = localStorage.getItem("username");
    var urlAccount = 'http://'+urlFirst+':8080/api/user/getListChat?idnguoinhan='+idnguoinhan;
    const res = await fetch(urlAccount, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var listChat = await res.json();

    var main = ''

    for(i=0; i< listChat.length; i++){
        var cont = listChat[i].content
        if(listChat[i].typeFile == 1){
            if(listChat[i].content.match(/\.(jpeg|jpg|gif|png)$/) != null){
                cont = '<img src="'+listChat[i].content+'"/>'
            }
            else{
                cont = '<a href="'+listChat[i].content+'" download>'+listChat[i].fileName+'</a>'
            }
        }
        if(listChat[i].sender.username != username){
            main += '<div class="chat-msg receiver">\n' +
    '                    <div class="chat-msg-profile">\n' +
    '                        <img class="chat-msg-img" src="'+listChat[i].sender.avatar+'" alt="">\n' +
    '                    </div>\n' +
    '                    <div class="chat-msg-content">\n' +
    '                        <div class="chat-msg-text nguoinhan">'+cont+'</div>\n' +
    '                    </div>\n' +
    '                </div>'
        }
        else{
            main += ' <div class="chat-msg owner">\n' +
    '                    <div class="chat-msg-profile">\n' +
    '                        <img class="chat-msg-img" src="'+listChat[i].sender.avatar+'" />\n' +
    '                    </div>\n' +
    '                    <div class="chat-msg-content cn-owner">\n' +
    '                        <div class="iconxoa"><i class="fa fa-trash"></i></div>\n' +
    '                        <div class="chat-msg-text">'+cont+'</div>\n' +
    '                    </div>\n' +
    '                </div>'
        }
    }
    document.getElementById("noidungchats").innerHTML = main
    var scroll_to_bottom = document.getElementById('scroll-to-bottom');
    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
}

async function reloadListUser(id, avatars, content){
    var check = false;

    for(i=0; i<listUser.length; i++){
        if(listUser[i].user.id == id){
            check = true;
            listUser[i].lastContent = content
            listUser[i].time = '0 phút'
            listUser[i].styleContent = 'style="color:#000;font-weight:bold;"'
            var user = listUser[0];
            listUser[0] = listUser[i]
            listUser[i] = user
            break
        }
        console.log(listUser[i])
    }
    if(check == false){
        var url = 'http://'+urlFirst+':8080/api/public/findUserNotDtoById?id='+id;
        const res = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        if(res.status < 300){
            stt = true
            var user = await res.json();
            var u = {
                "user":user,
                "lastContent":content,
                "time":"0 giây",
                "styleContent":'style="color:#000;font-weight:bold;"'
            }
            listUser.unshift(u)
        }
    }
    var main = ''
    for(i=0; i< listUser.length; i++){
        main += ' <div onclick="loadMessageChat('+listUser[i].user.id+')" class="msg online">\n' +
            '                <img onclick="loadMessageChat('+listUser[i].user.id+')" class="msg-profile" src="'+listUser[i].user.avatar+'" alt="" />\n' +
            '                <div class="msg-detail">\n' +
            '                    <div class="msg-username">'+listUser[i].user.username+'</div>\n' +
            '                    <div class="msg-content">\n' +
            '                        <span class="msg-message" '+listUser[i].styleContent+'>'+listUser[i].lastContent+'</span>\n' +
            '                        <span class="msg-date">'+listUser[i].time+'</span>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>'
    }
    document.getElementById("listUserWithMe").innerHTML = main
}

function removeColorContent(id){
    for(i=0; i< listUser.length; i++){
        if(listUser[i].user.id == id){
            listUser[i].styleContent = ''
            break
        }
    }
    var main = ''
    for(i=0; i< listUser.length; i++){
        main += ' <div onclick="loadMessageChat('+listUser[i].user.id+')" class="msg online">\n' +
            '                <img onclick="loadMessageChat('+listUser[i].user.id+')" class="msg-profile" src="'+listUser[i].user.avatar+'" alt="" />\n' +
            '                <div class="msg-detail">\n' +
            '                    <div class="msg-username">'+listUser[i].user.username+'</div>\n' +
            '                    <div class="msg-content">\n' +
            '                        <span class="msg-message" '+listUser[i].styleContent+'>'+listUser[i].lastContent+'</span>\n' +
            '                        <span class="msg-date">'+listUser[i].time+'</span>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>'
    }
    document.getElementById("listUserWithMe").innerHTML = main
}

async function addUserFromUrl(){
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://'+urlFirst+':8080/api/public/findUserNotDtoById?id='+id;
        const res = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var user = await res.json();
        var u = {
            "user":user,
            "lastContent":'',
            "time":"0 giây",
            "styleContent":''
        }
        listUser.unshift(u)
        console.log(listUser)
    }
}




