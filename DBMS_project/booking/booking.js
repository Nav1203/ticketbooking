var theatre_chck;
var date_chck;
window.onload=function(){
    var a=localStorage.getItem('user')
    var b=document.getElementById('user')
    b.innerHTML="User: "+a;
    req=new XMLHttpRequest();
    req.open('POST','http://127.0.0.1:5000/theatreinfo',true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    req.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState ==4 && this.status == 200) {
            var a=JSON.parse(this.responseText);
            var b=document.getElementById("Theatre")
            for(let i=0;i<Object.keys(a).length;i++)
            {
                b.innerHTML+="<option value='1' class='options_1'>"+a[i]+"</option>"
                console.log(a[i])
            }
        }
    }
    str='movieid='+sessionStorage.getItem('movieid');
    req.send(str);
    setInterval(chckdates,50)
    setInterval(chcktiming,100)
}
function chckdates(){
   var a=document.getElementById('Theatre');
   var c=document.getElementById('Date');
   var b=a.options[a.selectedIndex].text;
   var d=c.options[c.selectedIndex].text;
   var chck='<option value="0" class="options_1">Date</option>';
   if(a.options[a.selectedIndex].text!='Theatre' && d=='Date' && chck==c.innerHTML)
   {
        console.log('true');
        theatre_chck=b;
        req=new XMLHttpRequest();
        req.open("POST","http://127.0.0.1:5000/getdates",true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.onreadystatechange=function(){
            if(this.readyState==4 && this.status==200)
            {
                var arr=JSON.parse(this.responseText);
                var Date=document.getElementById('Date');
                for(let i=0;i<Object.keys(arr).length;i++)
                {
                    var html_txt="<option value='"+i+1+"' class='options_1'>"+arr[i]+"</option>";
                    Date.innerHTML+=html_txt;
                }
            }
        }
        str='movie='+sessionStorage.getItem('movieid')+'&theatre='+b;
        req.send(str);
   }
   else if((b=='Theatre'||b!=theatre_chck) && c.innerHTML!=chck )
   {
       theatre_chck='none';
       c.innerHTML=chck;
   }
}
function chcktiming(){
    var a=document.getElementById('Date');
    var c=document.getElementById('Timing');
    var b=a.options[a.selectedIndex].text;
    var d=c.options[c.selectedIndex].text;
    var chck='<option value="0" class="options_1">Timing</option>';
    if(a.options[a.selectedIndex].text!='Date' && d=='Timing' && chck==c.innerHTML)
    {
         console.log('true')
         date_chck=b;
         req=new XMLHttpRequest();
         req.open("POST","http://127.0.0.1:5000/gettimings",true);
         req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
         req.onreadystatechange=function(){
             if(this.readyState==4 && this.status==200)
             {
                 var arr=JSON.parse(this.responseText);
                 var Timing=document.getElementById('Timing');
                 for(let i=0;i<Object.keys(arr).length;i++)
                 {
                     var html_txt="<option value='"+i+1+"' class='options_1'>"+arr[i]+"</option>";
                     Timing.innerHTML+=html_txt;
                 }
             }
         }
         var theatre=document.getElementById('Theatre')
         var thename=theatre.options[theatre.selectedIndex].text;
         str='movie='+sessionStorage.getItem('movieid')+'&theatre='+thename+'&date='+b;
         req.send(str);
    }
    else if((b=='Date'||date_chck!=b) && c.innerHTML!=chck)
    {
        date_chck='none';
        c.innerHTML=chck;
    }
 }
function proceed()
{
    const err=document.getElementById('error')
    const sel=document.getElementById('Theatre');
    const sel2=document.getElementById('Timing');
    const sel3=document.getElementById('Date');
    const val=sel.options[sel.selectedIndex].value;
    const val2=sel2.options[sel2.selectedIndex].value;
    const txt=sel.options[sel.selectedIndex].text;
    const txt2=sel2.options[sel2.selectedIndex].text;
    const txt3=sel3.options[sel3.selectedIndex].text;
    console.log(txt);
    console.log(txt2);
    if(val==0 || val2==0)
    {
        err.innerHTML="Sorry! There seems to be a mistake in the Choice!<br>Please Choose valid options!"
    }
    else
    {
        err.innerHTML=" ";
        sessionStorage.setItem('theatre',txt);
        sessionStorage.setItem('timing',txt2);
        sessionStorage.setItem('date',txt3);
        window.location.assign('../seatsel/seatsel.html');
    }
}