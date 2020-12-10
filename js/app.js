// $(document).foundation();
window.addEventListener("load", loader);
function loader(){
          var x = document.getElementById("loading");
            x.style.display = "none";
            // console.log("done.");
}

var nodePos = 0;
var spinCounter=0;
var scrollPos = 0;
var bool = 1;
var scrollTimer;
var cycle=document.getElementById('cycle');
var nodes=document.getElementsByClassName('node');
var btt=document.getElementById('btt');
var header = document.getElementsByClassName("header")[0];
for(var i=0;i<nodes.length;i++){
  nodes[i].addEventListener("click", clickSpin);
  nodes[i].addEventListener("onkeydown", clickSpin);
}
var content=document.getElementById('scrollContent');
content.addEventListener("scroll", scrollSpin);
var imgs=document.getElementsByClassName('ttimg');
imgs[0].style.opacity="1";

(function(){
  setAspectRatio();
})();
window.addEventListener("resize", setAspectRatio);
function setAspectRatio(){
  var loopWrapper = document.getElementById("loopWrapper");
  var framework = document.getElementById("framework");
  var teacher = document.getElementById("personaBox");
  if(framework.offsetHeight>framework.offsetWidth){
    loopWrapper.style.width="100%";
    loopWrapper.style.height=`${loopWrapper.offsetWidth*1}px`;
  }
  else{
    loopWrapper.style.height="90%";
    loopWrapper.style.width=`${loopWrapper.offsetHeight}px`;
  }
}
function scrollSpin(){
  //spin loop to new node position when scrolled
  var txnodes= document.getElementsByClassName('txnode');
  var bottom= content.getBoundingClientRect().bottom;
  var contentPos = 0;
  for (var i=0;i<txnodes.length;i++){
    var top = txnodes[i].getBoundingClientRect().top;
    if(top<bottom*.75){
      contentPos++;
    }
  }
  if(contentPos>0){
    nodePos=contentPos-1;
    if(scrollPos != contentPos-1){
      if(scrollPos==-1){
        scrollPos = contentPos-1;
        // console.log(`you are now on node ${nodePos+1}`);
        spin();
      }
      else{
        if(scrollPos > contentPos-1){
          spinCounter +=1;
          scrollPos = contentPos-1;
          // console.log(`you are now on node ${nodePos+1}`);
          spin();
        }
        if(scrollPos < contentPos-1){
          spinCounter -= 1;
          scrollPos = contentPos-1;
          // console.log(`you are now on node ${nodePos+1}`);
          spin();
        }
      }
    }
  }
  else if(scrollPos == contentPos){
    // console.log("you are now on the overview");
    reset();
    scrollPos = -1;
    bool*= -1;
  }
}
function clickSpin(){
  //spin loop to new node position when clicked
  content.removeEventListener("scroll", scrollSpin);
  if(nodePos == checkNewNodePosition(this) && bool<0){
    reset();
    bool*= -1;
  }else{
    if(nodePos == checkNewNodePosition(this)){
      bool*= -1;
    }
    if(nodePos == 5 && checkNewNodePosition(this)==0){
      var difference = -1;
    }else{
      var difference = nodePos - checkNewNodePosition(this);
    }
    spinCounter += difference;
    nodePos = checkNewNodePosition(this);
    scrollPos = nodePos;
    // console.log(`you are adding ${difference*-1} spin`);
    // console.log(`you are on spin count${spinCounter*-1}`);
    spin();
    scrollUp();
    bool=-1;
  }
  setTimeout(reAddScrollEvent, 750);
}
function spin(){
  for(var i=0;i<nodes.length;i++){
    nodes[i].style.transform=`scale(1)`;
  }
  nodes[nodePos].style.transform=`scale(1.40)`;
}

function scrollUp(){
  //scroll up current type to new node position
  var txnodes= document.getElementsByClassName('txnode');
  txnodes[nodePos].scrollIntoView({
    behavior: 'smooth'
  });

}
function checkNewNodePosition(clicked){
  //what node was just clicked?
  for(var i=0;i<nodes.length;i++){
    if(nodes[i]==clicked){
      // console.log(`you are on node ${i+1}`);
      return i;
    }
  }
}
function reset(){
  content.removeEventListener("scroll", scrollSpin);
  nodePos = 0;
  spinCounter = Math.ceil(spinCounter/6)*6;
  scrollPos = 0;
  spin();
  nodes[nodePos].style.transform=`scale(1)`;
  //   nodes[nodePos].style.transform=`rotate(${-60*spinCounter}deg) scale(1)`;
  var top = document.getElementsByClassName('tt-overview')[0].scrollIntoView({
    behavior:"smooth"
  })
  setTimeout(reAddScrollEvent, 750);
}
window.addEventListener("scroll",bttSlide);
function bttSlide(){
  if(scrollTimer){
    window.clearTimeout(scrollTimer);
  }
  scrollTimer = window.setTimeout(function(){
    if(window.scrollY>50){
      header.style.boxShadow="0px -4px 8px black";
    }else{
      header.style.boxShadow="0px 0px 0px black";
    }
    if(window.scrollY>2500){
      btt.style.transform="translateX(0%)";
      header.style.boxShadow="0px 0px 4px black";
    }else{
      btt.style.transform="translateX(100%)";
    }
    // console.log("fire");
  },50);
}

function backToTop(){
  reset();
  var top = document.getElementsByClassName('tt-overview')[0].scrollIntoView({
    behavior:"smooth"
  })
}
function backToTopTop(){
  reset();
  var toptop = document.body.scrollIntoView({
    behavior:"smooth"
  })
}
function reAddScrollEvent(){
  content.addEventListener("scroll", scrollSpin);
}
