window.onload=function(){
    if(localStorage.getItem('user')!=null)
    {
        localStorage.removeItem('user');
    }
}
function handleSubmit() {
    console.log('a');
    const form = document.querySelector('#login');
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());
    console.log(value.Uname)
    checkPW(value.Uname,value.Pass)
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}

function checkPW(username,pw)
{
    req=new XMLHttpRequest();
    req.open("POST", 'http://127.0.0.1:5000/getjsdata', true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    req.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState ==4 && this.status == 200) {
        //var confirm=this.responseText;
        console.log(this.responseText);
        executePWauth(this.responseText,username);
    }
    }
    console.log(pw)
    var str="username="+username+"&password="+pw;
    req.send(str);
}
function executePWauth(c,u){
    var a=document.getElementById('confirmation');
    if(c=='false')
    {
        a.innerHTML='Username/Password was wrong<br>Please Try Again!';
    }
    else
    {
        a.innerHTML="Success!";
        window.onbeforeunload=function(){
            localStorage.setItem('user',u);
        }
        window.location.assign('../index/index.html');
    }
}