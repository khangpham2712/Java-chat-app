var userUpdate = null;
async function loadUserUpdate() {
    var token = localStorage.getItem("token");
    const res = await fetch('http://' + urlFirst + ':8080/api/userlogged', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })
    })
    userUpdate = await res.json();
    console.log(userUpdate)
    document.getElementById("email").value = userUpdate.email
    document.getElementById("phone").value = userUpdate.phone
    document.getElementById("img-preview").src = userUpdate.avatar

    loadAddressUserUpdate(userUpdate.village.town.province.id, userUpdate.village.town.id, userUpdate.village.id)
}


async function updateUser(){
    document.getElementById("img_loading").style.width = '50%';
    var token = localStorage.getItem("token");
    var url = 'http://'+urlFirst+':8080/api/updateUser'
    var email = document.getElementById("email").value
    var phone = document.getElementById("phone").value
    var village = document.getElementById("xa").value


    //upload image
    var uploadimg = 'http://'+urlFirst+':8080/api/public/upload';
    const filePath = document.getElementById('file')
    var linkimage = userUpdate.avatar
    if(filePath.files.length != 0){
        const formData = new FormData()
        formData.append("file", filePath.files[0])
        const response = await fetch(uploadimg, {
            method: 'POST',
            headers: new Headers({

            }),
            body: formData
        });
        linkimage = await response.text();
    }

    var users = {
        "id":userUpdate.id,
        "email":email,
        "phone":phone,
        "village": {
            "id": village
        },
        "avatar":linkimage
    }
    const resp = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(users)
    });
    var result = await resp.text();
    if(result === '0' || resp.status > 300){
        alert("update thất bại")
    }
    else if(result === '1' || resp.status < 300){
        alert("update thành công")
    }
    document.getElementById("img_loading").style.width = '0%';
}

async function loadAddressUserUpdate(idtinh, idhuyen, idxa) {

    var urladd = 'http://'+urlFirst+':8080/api/public/province';
    const response = await fetch(urladd, {
        method: 'GET',
        headers: new Headers({

        })
    });
    var province = await response.json();

    var tinh = document.getElementById("tinh");
    var huyen = document.getElementById("huyen");
    var xa = document.getElementById("xa");

    var pro = null
    console.log(province)
    for (i = 0; i < province.length; i++) {
        var option = document.createElement("option");
        option.text = province[i].name;
        option.value = province[i].id;
        tinh.add(option);
        if(province[i].id == idtinh){
            pro = province[i]
        }
    }
    document.getElementById("tinh").value = idtinh

    var hu = null
    for(i=0; i< pro.towns.length; i++){
        var option = document.createElement("option");
        option.text = pro.towns[i].name;
        option.value = pro.towns[i].id;
        huyen.add(option);
        if(pro.towns[i].id == idhuyen){
            hu = pro.towns[i]
        }
    }
    document.getElementById("huyen").value = idhuyen

    for(i=0; i<hu.villages.length; i++){
        var option = document.createElement("option");
        option.text = hu.villages[i].name;
        option.value = hu.villages[i].id;
        xa.add(option);
    }
    document.getElementById("xa").value = idxa

    tinh.onchange = function () {
        huyen.innerHTML = '';
        for (i = 0; i < province.length; i++) {
            if (Number(province[i].id) === Number(tinh.value)) {
                for (j = 0; j < province[i].towns.length; j++) {
                    var option = document.createElement("option");
                    option.text = province[i].towns[j].name;
                    option.value = province[i].towns[j].id;
                    huyen.add(option);
                }
            }
        }
    }

    huyen.onchange = function () {
        xa.innerHTML = '';
        for (i = 0; i < province.length; i++) {
            if (Number(province[i].id) === Number(tinh.value)) {
                for (j = 0; j < province[i].towns.length; j++) {
                    if (Number(province[i].towns[j].id) === Number(huyen.value)) {
                        console.log(province[i].towns[j])
                        for (k = 0; k < province[i].towns[j].villages.length; k++) {
                            var option = document.createElement("option");
                            option.text = province[i].towns[j].villages[k].name;
                            option.value = province[i].towns[j].villages[k].id;
                            xa.add(option);
                        }
                    }
                }
            }
        }
    }

}