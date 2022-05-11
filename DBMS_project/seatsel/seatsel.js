var prev=[-1];
var seats=[-1];
var seatsbooked=0;
var seatsel;
var user;
window.onload=function(){
    user=localStorage.getItem('user')
    if(user!=null && user!='none')
    {
    var a=document.getElementById('user');
    a.innerHTML="User: "+user;
    }
    else{
        a.innerHTML="Please <a href='../login/login.html'>Log in</a> Here"
    }
    for(i=1;i<13;i++)
    {
        seats.push(0);
    }
    req=new XMLHttpRequest();
    req.open("POST","http://127.0.0.1:5000/seatseldata",true)
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    req.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var a=JSON.parse(this.responseText);
            for(i=0;i<Object.keys(a).length;i++)
            {
                str='seat-'+a[i];
                var unchck=document.getElementById(str);
                unchck.setAttribute("disabled","disbaled");
            }

        }
        
    }
    str='username='+user+'&movie='+sessionStorage.getItem('movieid')+'&theatre='+sessionStorage.getItem('theatre')+'&timing='+sessionStorage.getItem('timing')+'&date='+sessionStorage.getItem('date')
    req.send(str)
    setInterval(boxcheck,20);

}

function find(arr,n)
{
    for(i=0;i<arr.length;i++)
    {
        if(arr[i]==n)
        {
            return true;
        }
    }
    return false;
}
function boxcheck(){
var bookedseats=document.getElementById('booked');
for(var i=1;i<13;i++){
    var str='seat-'+String(i);
    if(document.getElementById(str).checked && seatsbooked<10 && seats[i]!=1){
        seats[i]=1;
        seatsbooked++;   
    }
    else if(document.getElementById(str).checked==false)
    {
        if(seats[i]==1)
        {
            seats[i]=0;
            seatsbooked--;
        }
    }
    else if(seatsbooked>=10){
        if(document.getElementById(str).checked==false)
        {
            var unchck=document.getElementById(str);
            unchck.setAttribute("disabled","disbaled");
        }    
    }
    }
    bookedseats.innerHTML="Seats Booked are:"
        for(i=1;i<13;i++)
        {
            if(seats[i]==1)
            {
                console.log(seatsel)
                bookedseats.innerHTML+=' S'+String(i)+',';
            }
        }
}
function send_bookdata(){
    var req=new XMLHttpRequest();
    req.open("POST", 'http://127.0.0.1:5000/bookdata', true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState ==4 && this.status == 200) {
        var a=this.responseText;
        console.log(a);
        sessionStorage.setItem('seats',seatstr)
        sessionStorage.setItem('bookingid',a)
        window.location.replace('../confirmation/confirmation.html')
    }
    }
    var seatstr='';
    for(i=1;i<13;i++){
        if(seats[i]==1)
        {
            seatstr+=String(i)+',';
        }
    }
    str='username='+localStorage.getItem('user')+'&seats='+seatstr+'&movie='+sessionStorage.getItem('movieid')+'&theatre='+sessionStorage.getItem('theatre')+'&timing='+sessionStorage.getItem('timing')+'&date='+sessionStorage.getItem('date')
    req.send(str);
}