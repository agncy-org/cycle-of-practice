/*open welcome splash*/
var tutorial = 1;
var introPos=0;
let unlock = sessionStorage.getItem('welcomeKey');
var about=document.getElementById('about');
var welcome=document.getElementById('welcome');
var main=document.getElementsByClassName('main')[0];
var header = document.getElementsByClassName("header")[0];
var blocker=document.getElementById('blocker');

var nextIntro=document.getElementsByClassName('next-intro');
var prevIntro=document.getElementsByClassName('prev-intro');
var open=document.getElementsByClassName('key');
for(var i=0;i<open.length;i++){
  open[i].addEventListener("click", openSesame);
}
for(var i=0;i<nextIntro.length;i++){
  nextIntro[i].addEventListener("click", nextWelcome);
}
for(var i=0;i<prevIntro.length;i++){
  prevIntro[i].addEventListener("click", prevWelcome);
}
var introPages=document.getElementsByClassName('intro-page');
var dots=document.getElementsByClassName('dot');

var openClose = 1;
var mobileInfo = document.getElementById('mobileInfo');
var infoModal = document.getElementById('infoModal');
mobileInfo.addEventListener("click", openCloseModal);

(function(){
  if(unlock=='0'){
  }else if(tutorial==1){
    password();
    walkthrough();
  }
})();

function password(){
  var password;
  var pass1="8na853";
  password = prompt("Please enter your password",'');
  if(password==pass1){
    alert("password correct");
  }else{
    while(password!=pass1){
      var password = prompt('Incorrect - Please Try Again.','');  
    }
  }
}

function walkthrough(){
  openClose = -1;
  openCloseModal();
  sessionStorage.clear();
  blur();
  introPos=0;
  resetWelcomeContent();
  welcome.style.display="block";
}
function nextWelcome(){
  introPos+=1;
  resetWelcomeContent();
}
function prevWelcome(){
  introPos-=1;
  resetWelcomeContent();
}
function resetWelcomeContent(){
  for(var i=0;i<introPages.length;i++){
    introPages[i].style.opacity="0";
    introPages[i].style.pointerEvents="none";
    dots[i].style.background="white";
  }
  dots[introPos].style.background="#4baad0";
  introPages[introPos].style.opacity="1";
  introPages[introPos].style.pointerEvents="auto";
}
function openSesame(){
  blocker.style.display="none";
  main.style.filter="none";
  header.style.filter="none";
  document.body.style.overflow="scroll";
  welcome.style.display="none";
  about.style.display="none";
  sessionStorage.setItem('welcomeKey', '0');
}
function blur(){
  main.style.filter="blur(15px)";
  header.style.filter="blur(15px)";
  document.body.style.overflow="hidden";
  blocker.style.display="block";
}
function showAbout(){
  openClose = -1;
  openCloseModal();
  blur();
  about.style.display="block";
}
function closeAbout(){
  openSesame();
}

/*mobile modal*/
function openCloseModal(){
  if(openClose==1){
    infoModal.style.opacity="1";
    infoModal.style.pointerEvents="auto";
    mobileInfo.children[0].innerHTML = "×";
    mobileInfo.style.borderRadius="50%";
    openClose*= -1;
  }else{
    infoModal.style.opacity="0";
    infoModal.style.pointerEvents="none";
    mobileInfo.children[0].innerHTML = "i";
    mobileInfo.style.borderRadius="0%";
    openClose*= -1;
  }
}
