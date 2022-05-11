window.onload=function(){
    user=localStorage.getItem('user')
    console.log(user)
    if(user!=null && user!='none')
    {
        var a=document.getElementById('user');
        a.innerHTML="User: "+user;
    }
    else{
        var a=document.getElementById('user');
        a.innerHTML="Please <a href='../login/login.html'>Log in</a> Here"
    }
    var bookingid=sessionStorage.getItem('bookingid');
    var bookhtml=document.getElementById('bookingid');
    bookhtml.innerHTML+="Your Booking Id is: "+bookingid;
    var info=document.getElementById('confirmation');
    info.innerHTML+="Theatre: "+sessionStorage.getItem('theatre')+'<br>';
    info.innerHTML+="<pre>Date:"+sessionStorage.getItem('date')+"       Time: "+sessionStorage.getItem('timing')+'</pre>';
    req=new XMLHttpRequest();
    req.open('POST','http://127.0.0.1:5000/getmoviename',true)
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var moviename=this.responseText;
            info.innerHTML+="Movie: "+moviename.toUpperCase()+"<br>";
    }
    }
    req.send('movieid='+sessionStorage.getItem('movieid'));
}

window.onunload=function(){
    sessionStorage.removeItem('date');
    sessionStorage.removeItem('timing');
    sessionStorage.removeItem('movieid');
    sessionStorage.removeItem('theatre');
    window.location.replace('../index/index.html')
}
function proceed(){
    sessionStorage.removeItem('date');
    sessionStorage.removeItem('timing');
    sessionStorage.removeItem('movieid');
    sessionStorage.removeItem('theatre');
    window.location.replace('../index/index.html');
}
