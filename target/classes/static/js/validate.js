function checkInputRegis(){
    var username = document.getElementById("username").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    const filePath = document.getElementById('file')

    if(username.length < 6){
        alert("độ dài username phải lớn hơn 5!")
        return false
    }
    if(password.length < 6){
        alert("độ dài mật khẩu phải lớn hơn 5")
        return false
    }
    if(email == ''){
        alert("khÔng được để trống email")
        return false
    }
    if(filePath.files.length === 0){
        alert("hãy chọn ảnh đại diện")
        return false
    }
    return true
}
