async function loaddskhongphaibanbe() {
    var token = localStorage.getItem("token");
    if (token === null) {
        window.location.replace("login")
    }
    else {
        const res = await fetch('http://localhost:8080/api/user/dschuaketban', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        })
        listuser = await res.json();
        var main = '';
        for(i=0; i<listuser.length; i++){
            main += '<div class="col-sm-12 col-md-6 col-lg-3">'+
                '<div class="single-people">'+
                '<img class="avatar-people" src="'+listuser[i].avatar+'">'+
                '<h4 class="username-people">'+listuser[i].username+'</h4>'+
                '<button onclick="ketban('+listuser[i].id+')" class="btn-primary btn-kb">Kết bạn</button>'+
                '</div>'+
                '</div>'
        }
        document.getElementById("list-peoples").innerHTML = main
    }
}

async function loaddsbanbe() {
    var token = localStorage.getItem("token");
    if (token === null) {
        window.location.replace("login")
    }
    else {
        const res = await fetch('http://localhost:8080/api/user/dsdaketban', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        })
        listuser = await res.json();
        var main = '';
        for(i=0; i<listuser.length; i++){
            main += '<div class="col-sm-12 col-md-6 col-lg-3">'+
                '<div class="single-people">'+
                '<img class="avatar-people" src="'+listuser[i].avatar+'">'+
                '<h4 class="username-people">'+listuser[i].username+'</h4>'+
                '<button onclick="openchat('+listuser[i].id+')" class="btn-primary btn-kb">Chat</button>'+
                '<button onclick="huyketban('+listuser[i].id+')" class="btn-secondary btn-kb">Hủy Kết bạn</button>'+
                '</div>'+
                '</div>'
        }
        document.getElementById("list-people-bb").innerHTML = main
    }
}

async function ketban(id) {
    var token = localStorage.getItem("token");
    if (token === null) {
        window.location.replace("login")
    }
    else {
        const res = await fetch('http://localhost:8080/api/user/follows?id='+id, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        })
        if(res.status < 300){
            alert("kết bạn thành công")
            location.reload();
        }
    }
}

async function huyketban(id) {
    var token = localStorage.getItem("token");
    if (token === null) {
        window.location.replace("login")
    }
    else {
        const res = await fetch('http://localhost:8080/api/user/unfollows?id='+id, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        })
        if(res.status < 300){
            alert("hủy kết bạn thành công")
            location.reload();
        }
    }
}

function openchat(id){
    window.location.href = 'chat?id='+id
}