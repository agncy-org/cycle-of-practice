window.addEventListener("load", loader);
function loader(){
          var x = document.getElementById("loading");
            x.style.display = "none";
            // console.log("done.");
}

var nodePos = 0;
var spinCounter =0;
var sectionPos =0;
var bool = 1;
var cycle=document.getElementById('cycle');
var nodes=document.getElementsByClassName('node');
for(var i=0;i<nodes.length;i++){
  nodes[i].addEventListener("click", clickSpin);
}
var nodeContent=document.getElementsByClassName('noTxnode');
resetNodeContent();
nodeContent[0].style.display="block";
nodeContent[0].style.position="relative";
nodeContent[0].style.opacity="1";
nodeContent[0].style.pointerEvents="auto";

var prevButton=document.getElementsByClassName('prev');
for(var i=0;i<prevButton.length;i++){
  prevButton[i].addEventListener("click", goBack);
}

var nextButton=document.getElementsByClassName('next');
for(var i=0;i<nextButton.length;i++){
  nextButton[i].addEventListener("click", goForward);
}

var begin=document.getElementsByClassName('start')[0].addEventListener("click", start);
var beginAgain=document.getElementsByClassName('restart')[0].addEventListener("click", restartOverview);

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
  // positionCycle();
  // function positionCycle(){
  //   var cycle = document.getElementById("cycle");
  //   var teacherTop = teacher.getBoundingClientRect().top;
  //   cycle.style.transform="translateY(-50%)";
  //   cycle.style.marginTop=`${teacherTop-10}px`;
  //   if(document.body.offsetHeight>document.body.offsetWidth){
  //     var ratio= document.body.offsetHeight-document.body.offsetWidth;
  //     if(document.body.offsetWidth>1024){
  //       teacherTop+=ratio; //best for medium width
  //     }
  //     if(document.body.offsetWidth>640 && document.body.offsetWidth<1024){
  //       teacherTop+=ratio/1.75; //best for medium width
  //     }
  //     if(document.body.offsetWidth<640){
  //       teacherTop+=ratio/300; //best for medium width
  //     }
  //     console.log("portrait");
  //   }else{
  //     console.log("landscape");
  //   }
  //   cycle.style.marginTop=`${teacherTop-10}px`;
  //
  // }
}
function clickSpin(){
  //spin loop to new node position when clicked
  if(nodePos == checkNewNodePosition(this) && bool<0){
    restartOverview();
    sectionPos=0;
    updateURL();
    bool*= -1;
  }
  else{
    if(nodePos == checkNewNodePosition(this)){
      bool*= -1;
    }
    if(nodePos == 5 && checkNewNodePosition(this)==0){
      var difference = -1;
    }
    else{
      var difference = nodePos - checkNewNodePosition(this);
    }
    spinCounter += difference;
    nodePos = checkNewNodePosition(this);
    sectionPos = nodePos+1;
    // console.log(`you are adding ${difference} spin`);
    // console.log(`you are on spin count${spinCounter}`);
    spinSwap();
    scrollUp();
    updateURL();
    bool=-1;
  }
}
function scrollUp(){
  //scroll up current type to new node position
  // console.log(`you are seeing ${nodePos+1}`);
  var typeContent=document.getElementsByClassName('type-content');
  var noTxnodes= typeContent[0].getElementsByClassName('noTxnode');
  typeContent[0].scrollIntoView({
    behavior: 'smooth'
  });
}
function spinSwap(){
  /*spinning loop*/
  for(var i=0;i<nodes.length;i++){
    nodes[i].style.transform=`scale(1)`;
  }
  nodes[nodePos].style.transform=`scale(1.40)`;

  //   cycle.style.transform=`rotate(${60*spinCounter}deg)`;
  //   for(var i=0;i<nodes.length;i++){
  //     nodes[i].style.transform=`rotate(${-60*spinCounter}deg)`;
  //   }
  //   nodes[nodePos].style.transform=`rotate(${-60*spinCounter}deg) scale(1.5)`;
  // }

  /*swapping content*/
  resetNodeContent();
  nodeContent[nodePos+1].style.display="block";
  nodeContent[nodePos+1].style.position="relative";
  nodeContent[nodePos+1].style.opacity="1";
  nodeContent[nodePos+1].style.pointerEvents="auto";
}



(function(){
  history.replaceState({id:"home"}, "++ | overview", "");
})();
window.addEventListener('popstate', function (event) {
  if (history.state && history.state.id === 'home') {
    sectionPos=0;
    restartOverview();
  }else{
    if (history.state && history.state.id === 'reinforce') {
      sectionPos=6;
    }
    if (history.state && history.state.id === 'adapt') {
      sectionPos=5;
    }
    if (history.state && history.state.id === 'act') {
      sectionPos=4;
    }
    if (history.state && history.state.id === 'know') {
      sectionPos=3;
    }
    if (history.state && history.state.id === 'frame') {
      sectionPos=2;
    }
    if (history.state && history.state.id === 'believe') {
      sectionPos=1;
    }
    var difference = nodePos - (sectionPos-1);
    spinCounter += difference;
    nodePos=sectionPos-1;
    spinSwap();
    scrollUp();
  }
}, false);
function goBack(){
  nodePos-=1;
  spinCounter+=1;
  sectionPos--;
  bool*= -1;
  spinSwap();
  scrollUp();
  updateURL();
}
function goForward(){
  nodePos+=1;
  spinCounter-=1;
  sectionPos++;
  spinSwap();
  scrollUp();
  updateURL();
}
function start(){
  nodePos = 0;
  spinCounter=0;
  sectionPos++;
  spinSwap();
  scrollUp();
  updateURL();
}
function restartOverview(){
  for(var i=0;i<nodes.length;i++){
    // nodes[i].style.border="0px solid black";
  }
  nodes[nodePos].style.transform=`scale(1)`;
  resetNodeContent();
  nodeContent[0].style.display="block";
  nodeContent[0].style.position="relative";
  nodeContent[0].style.opacity="1";
  nodeContent[0].style.pointerEvents="auto";
}
function resetNodeContent(){
  for(var i=0;i<nodeContent.length;i++){
    nodeContent[i].style.display="none";
    nodeContent[i].style.position="absolute";
    nodeContent[i].style.opacity="0";
    nodeContent[i].style.pointerEvents="none";
  }
}
function updateURL(){
  switch(sectionPos){
    case 0:
    history.pushState({id:"overview"}, "++", "");
    break;

    case 1:
    history.pushState({id:"believe"}, "++", "");
    break;

    case 2:
    history.pushState({id:"frame"}, "++", "");
    break;

    case 3:
    history.pushState({id:"know"}, "++", "");
    break;

    case 4:
    history.pushState({id:"act"}, "++", "");
    break;

    case 5:
    history.pushState({id:"adapt"}, "++", "");
    break;

    case 6:
    history.pushState({id:"reinforce"}, "++", "");
    break;
  }
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
var scrollTimer;
var header = document.getElementsByClassName("header")[0];
window.addEventListener("scroll",bttSlide);
function bttSlide(){
  if(scrollTimer){
    window.clearTimeout(scrollTimer);
  }
  scrollTimer = window.setTimeout(function(){
    if(window.scrollY>25){
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

var sites = [
  'catalyst.html',
  'director.html',
  'fixer.html',
  'facilitator.html'
];
function randomSite() {
  var i = parseInt(Math.random() * sites.length);
  location.href = sites[i];
}
