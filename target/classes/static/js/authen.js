async function login() {
    var url = 'http://'+urlFirst+':8080/api/authenticate'
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var user = {
        "username": username,
        "password": password
    }
    console.log(user)
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var token = await response.text();


    if(response.status > 300){
        alert("tài khoản hoặc mật khẩu không chính xác")
    }
    if(response.status < 300){

        window.localStorage.setItem('token', token);

        var urlAccount = 'http://'+urlFirst+':8080/api/userlogged';
        const res = await fetch(urlAccount, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer '+token,
                'Content-Type': 'application/json'
            })
        });

        var account = await res.json();
        window.localStorage.setItem('username', account.username);
        window.localStorage.setItem('myavatar', account.avatar);
        console.log(account)
        var check = 0;
        for(i=0; i<account.authorities.length; i++){
            if(account.authorities[i].name === 'ROLE_ADMIN'){
                check = 1;
            }
        }
        if(check === 0){
            window.location.replace("trang-chu")
        }
        if(check === 1){
            window.location.replace("admin/trang-chu")
        }
    }
}

async function checkRegisKey(){
    var url = 'http://'+urlFirst+':8080/api/confirm-regis?key='
    var key = document.getElementById("key").value
    url = url + key;
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({

        })
    });
    if(res.status > 300){
        alert("xác thực thất bại!")
    }
    else{
        alert("xác thực thành công")
        window.location.replace("login")
    }
}

async function sendRequestForgotPassword(){
    var url = 'http://'+urlFirst+':8080/api/resetpass-init'
    var email = document.getElementById("email").value
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({

        }),
        body:email
    });
    if(res.status > 300){
        alert("thất bại!")
    }
    else{
        alert("check email của bạn")
        window.location.replace("keyforget")
    }
}

async function checkKeyForget(){
    var url = 'http://'+urlFirst+':8080/api/resetpass-finish'
    var key = document.getElementById("key").value
    var newPassword = document.getElementById("password").value
    var access = {
        "key":key,
        "newPassword":newPassword
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(access)
    });

    if(response.status >300){
        alert("xác thực key thất bại")
    }
    else{
        alert("thành công")
        window.location.replace("login")
    }
}

function logoutAdmin(){
    localStorage.removeItem("token");
    window.location.replace("../login")
}

async function logout(){
    localStorage.removeItem("token");
    window.location.replace("login?logout=t")
    await new Promise(r => setTimeout(r, 3000));
    window.location.replace("trang-chu")
}

async function checkLogout(){
    var t = window.location.search.split('=')[1];
    if (t != null) {
        await new Promise(r => setTimeout(r, 500));
        window.location.replace("trang-chu")
    }
}