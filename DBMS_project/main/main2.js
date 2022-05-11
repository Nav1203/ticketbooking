const button=document.getElementsByClassName('but');
window.onload=function(){
    var user=localStorage.getItem('user');
    if(user!=null && user!='none')
  {
    var a=document.getElementById('user');
    a.innerHTML="User: <a href='../user/user.html'>"+user+'</a>';
  }
}
function bookmovie(n)
{
    if (n == 1) 
    {
        sessionStorage.setItem('movieid',101)
        console.log('1');
    }
    else if (n == 2) 
    {
        sessionStorage.setItem('movieid',102)
        console.log('2');
    }
    else if (n == 3) 
    {
        sessionStorage.setItem('movieid',103)
        console.log('3');
    }
    window.location.assign('../booking/bookpage.html');
}
function trailer(n)
{
    const trail=['https://www.youtube.com/watch?v=8Qn_spdM5Zg','https://www.youtube.com/watch?v=zAGVQLHvwOY','https://www.youtube.com/watch?v=8g18jFHCLXk',''];
    window.location.assign(trail[n-1]);
}
button.addEventListener('click',bookmovie);