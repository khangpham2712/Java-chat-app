function loadMenu(){
    var authen = '';
    var account = '';
    authen = '<div class="dropdown show btn-logout">'+
        '<a style="background-color: #FFBA00;border: none;" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
        '<i class="fa fa-user"></i> '+username+''+
        '</a>'+
        '<div class="dropdown-menu"  aria-labelledby="dropdownMenuLink">'+
        '<a class="dropdown-item" href="profile.html">Tài khoản</a>'+
        '<a class="dropdown-item" href="myPost.html">Bài đăng</a>'+
        '<a class="dropdown-item" href="#" onclick="logout()">Đăng xuất</a>'+
        '</div>'+
        '</div>'
    account = '<a style="font-size: 15px;" id="link" class="nav-link" href="profile.html"><i class="fa fa-user"></i> Tài khoản</a>';

    const main = '<div class="container">'+
        '<div class="col-md-12" >'+
        '<div class="row list-header">'+
        '<div class="col-md-2">'+
        '<img src="http://res.cloudinary.com/dxccmy7an/image/upload/v1668216522/r6zn7cfbloerjau5t2e0.png" class="logo-header">'+
        '</div>'+
        '<div class="col-md-2">'+
        '<a style="font-size: 15px;" id="link" class="nav-link" href="admin.html"><i class="fa fa-home"></i> Trang chủ</a>'+
        '</div>'+
        '<div class="col-md-2">'+
        '<a style="font-size: 15px;" id="link" class="nav-link" href="PostARoomSearch.html"><i class="fa fa-newspaper"></i> Quản lý tin</a>'+
        '</div>'+
        '<div class="col-md-2">'+
        '<a style="font-size: 15px;" id="link" class="nav-link" onclick="loadChat()" href="#"><i class="fa fa-comment"></i> Chat</a>'+
        '</div>'+
        '<div class="col-md-2">'+
        '	<a style="font-size: 15px;" id="link" data-toggle="modal" data-target=".bd-example-modal-lg" aria-label="Search" class="nav-link" href="#"><i class="fa fa-search"></i> Tìm kiếm</a>'+
        '</div>'+
        '<div class="col-md-2">'+
        account+
        '</div>'+
        '</div>'+
        '</div >'+
        '<div class="col-md-12 header-bottom">'+
        '<div class="row">'+
        '<div class="col-lg-8 col-sm-6 col-md-6">'+
        '<div class="search-header">'+
        '<div class="row">'+
        '<div class="col-sm-10">'+
        '<form id="form-search" method="get" action="PostARoomSearch.html"><input name="search" class="form-control mr-sm-2" placeholder="Xã/Thị trấn, Quận, Thành phố" aria-label="Search" type="text" name="" id="input-search-header" class="form-control"></form>'+
        '</div>'+
        '<div class="col-sm-2">'+
        '<button class="btn-search-form" form="form-search"><i class="fa fa-search" id="search-header-icon"></i></button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="col-lg-2 col-md-2 header-login">'+
        authen+
        '</div>'+
        '<div class="col-lg-2 col-sm-4 col-md-4">'+
        '<button class="btn-dangtin"><i class="fa fa-edit"></i> <a style="color:#fff" href="upload.html">Đăng tin</a></button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div > ';
    document.getElementById("header").innerHTML = main
}

