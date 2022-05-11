window.onload=function(){
    user=localStorage.getItem('user')
    if(user!=null && user!='none')
    {
    var a=document.getElementById('user');
    a.innerHTML="User: "+user;
    }
    req=new XMLHttpRequest();
    req.open('POST','http://127.0.0.1:5000/getuserdetails',true)
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var userdetails=JSON.parse(this.responseText);
            console.log(userdetails);
            var userhtml=document.getElementById('user_data')
            for(let i=0;i<Object.keys(userdetails.userdata).length;i++)
            {
                userhtml.innerHTML+="<li> Booking Id: "+userdetails.userdata[i].bookingid+"    Date: "+userdetails.userdata[i].date+"       Timing: "+userdetails.userdata[i].timing+"</li>";
            }
    }
    }
    req.send('user='+localStorage.getItem('user'));
}