async function regis() {
    if(checkInputRegis() == false){
        return
    }
    //loading
    document.getElementById("img_loading").style.width = '50%';

    //upload image
    var uploadimg = 'http://'+urlFirst+':8080/api/public/upload';
    const filePath = document.getElementById('file')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    const response = await fetch(uploadimg, {
        method: 'POST',
        headers: new Headers({

        }),
        body: formData
    });
    var linkimage = await response.text();



    var url = 'http://'+urlFirst+':8080/api/register'
    var username = document.getElementById("username").value
    var email = document.getElementById("email").value
    var langKey = 'en'
    var password = document.getElementById("password").value
    var user = {
        "username": username,
        "email": email,
        "langKey": langKey,
        "avatar": linkimage,
        "password": password,
        "authorities": [
            "ROLE_USER"
        ]
    }
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var result = await res.text();
    console.log(result)
    if (result === '1') {
        alert("email đã tồn tại")
    }
    else if (result === '2') {
        alert("username đã tồn tại")
    }
    else if (result === '0') {
        alert("đăng ký thành công! hãy check email của bạn")
        window.location.replace("keyactive")
    }
    document.getElementById("img_loading").style.width = '0%';
}