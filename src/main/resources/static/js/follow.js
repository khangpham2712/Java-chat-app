async function follow(id) {
    var token = localStorage.getItem("token");
    if (token === null) {
        alert("bạn chưa đăng nhập")
    }
    else {
        var follow = {
            "me":{
                "id":id
            }
        }
        const res = await fetch('http://'+urlFirst+':8080/api/user/follows', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(follow)
        })
        if(res.status < 300){
            alert("theo dõi thành công")
            location.reload();
        }
    }
}

async function unfollow(id) {
    var token = localStorage.getItem("token");
    if (token === null) {
        alert("bạn chưa đăng nhập")
    }
    else {
        const res = await fetch('http://'+urlFirst+':8080/api/user/unfollow?id='+id, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        })
        if(res.status < 300){
            alert("hủy theo dõi thành công")
            location.reload();
        }

    }
}