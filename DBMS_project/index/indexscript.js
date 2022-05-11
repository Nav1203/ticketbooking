
var slidePosition = 1;

// forward/Back controls
function plusSlides(n) {
  SlideShow(slidePosition += n);
}

//  images controls
function currentSlide(n) {
  SlideShow(slidePosition = n);
}

function SlideShow(n) {
  var i;
  var slides = document.getElementsByClassName("Containers");
  var circles = document.getElementsByClassName("dots");
  if (n > slides.length) {slidePosition = 1}
  if (n < 1) {slidePosition = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < circles.length; i++) {
      circles[i].className = circles[i].className.replace(" enable", "");
  }
  slides[slidePosition-1].style.display = "block";
  circles[slidePosition-1].className += " enable";
} 

function openMainMenu(){

  window.location.assign("../main/main.html");

}
function bookmovie(n)
{
  if(n==1)
  {
    sessionStorage.setItem('movieid',101);
  }
  else if(n==2){
    sessionStorage.setItem('movieid',102);
  }
  else if(n==3){
    sessionStorage.setItem('movieid',103);
  }
  window.location.assign('../booking/bookpage.html');
}

window.onload=function(){
  SlideShow(slidePosition);
  let user=localStorage.getItem('user');
  if(user!=null && user!='none')
  {
    var a=document.getElementById('user');
    a.innerHTML="User: "+user;
  }
}