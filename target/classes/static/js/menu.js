function loadMenu(){
	var token = localStorage.getItem("token");
	var username = localStorage.getItem("username");
	var authen;
	var account = '';
    if(token === null){
		authen = '<i class="fa fa-user"></i><a href="login"> Đăng Nhập</a>'

	}
	else{
		authen = '<div class="dropdown show btn-logout">'+
					'<a style="background-color: #FFBA00;border: none;" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
					'<i class="fa fa-user"></i> '+username+''+
					'</a>'+
					'<div class="dropdown-menu"  aria-labelledby="dropdownMenuLink">'+
					'<a class="dropdown-item" href="profile">Tài khoản</a>'+
					'<a class="dropdown-item" href="myPost">Bài đăng</a>'+
					'<a class="dropdown-item" href="updateUser">Cập nhật thông tin</a>'+
					'<a class="dropdown-item" href="#" onclick="logout()">Đăng xuất</a>'+
					'</div>'+
				'</div>'
		account = '<a style="font-size: 15px;" id="link" class="nav-link" href="profile"><i class="fa fa-user"></i> Tài khoản</a>';
	}
	const main = '<div class="container">'+
	'<div class="col-md-12" >'+
		'<div class="row list-header">'+
			'<div class="col-md-2">'+
				'<img src="http://res.cloudinary.com/dxccmy7an/image/upload/v1668998819/nzcpegq01g8ols0kzyoe.png" class="logo-header">'+
			'</div>'+
			'<div class="col-md-4">'+
				'<a style="font-size: 15px;" id="link" class="nav-link" href="listpeople"><i class="fa fa-newspaper"></i> danh sách bạn bè</a>'+
			'</div>'+
			'<div class="col-md-2">'+
				'<a style="font-size: 15px;" id="link" class="nav-link" href="chat"><i class="fa fa-comment"></i> Chat</a>'+
			'</div>'+
			'<div class="col-md-2">'+
				authen+
			'</div>'+
		'</div>'+
		'</div >'+
		'</div > ';
document.getElementById("header").innerHTML = main
}
