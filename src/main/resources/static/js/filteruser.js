async function checkUser(){ 

    var token = localStorage.getItem("token");
    if(token === null){
		alert("hãy đăng nhập để sử dụng chức năng này!")
		window.location.replace("login")
	}
	else{
		const res = await fetch('http://'+urlFirst+':8080/api/userlogged', { 
		     method: 'POST', 
		     headers: new Headers({ 
		     	'Authorization': 'Bearer '+token, 
		        'Content-Type': 'application/json',
		     })
		    })
		var user = await res.json();
		var check = 0;
	    for(i=0; i<user.authorities.length; i++){
	    	if(user.authorities[i].name === 'ROLE_USER'){
	    		check = 1;
	    	}
	    }
	    if(check === 1){
	    	
	    }
	    else{
	    	window.location.replace("login")
	    }
	}
}
