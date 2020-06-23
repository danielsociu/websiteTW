window.onload=myMain;

function myMain(){
    window.dispatchEvent(new Event('resize'));
    var body = document.getElementsByTagName("body")[0];
    body.innerHTML += '<p id="timeSpent"></p>';
    timer();
    myNavigatorFunc();
    var quizButton = document.getElementById("sendData");
    quizButton.onclick=getTotalScore;
}

function getTotalScore(){
    var answers = document.getElementById("quiz").getElementsByTagName("input");
    var correctAns=Number(0);
    var lastAnswer=Number(localStorage.getItem("lastAnswer"));
    for (var i=0; i<answers.length; i++){
        if(answers[i].checked)
            correctAns += Number(answers[i].value);
    }
    localStorage.setItem("lastAnswer",correctAns+1);
    if(lastAnswer)
        alert("Last time u got "+(lastAnswer-1).toString()+" correct\nNow " +correctAns.toString()+ " correct answers!");
    else
        alert("You got "+correctAns.toString() + " correct answers!");
}

/****************Making a dropdown button&deciding based on how much space*/
window.addEventListener('resize',function(){
    var screenWidth = document.body.clientWidth;
    var myLength=0,optimal=0;
    var nav = document.getElementById("navLiElem").children[0];
    var navElem = document.getElementById("navLiElem").getElementsByTagName("li");
    var navDrop = document.getElementById("navLiDropdownElem");
    var navDropElem = document.getElementById("navLiDropdownElem").getElementsByTagName("li");
    // document.getElementById("what").innerHTML=screenWidth;
    for (var i=0; i<navElem.length; i++)
    {
        myLength+=navElem[i].offsetWidth;
    }
    //document.getElementById("what").innerHTML+=myLength;
    var sider = document.getElementById("sideMainMenu");
    if(sider==null){
        optimal = ((screenWidth*screenWidth+200*screenWidth)/5000)+100;
        optimal = Math.min(optimal,screenWidth);
        // if(screenWidth/3>=200)
        //     optimal=screenWidth/3;

    }else
        optimal = sider.offsetWidth + navElem[navElem.length - 1].offsetWidth;

    for( var i=navElem.length-2; i>0; i--){
        if(myLength-navElem[i].offsetWidth < optimal)
            break;
        myLength -= navElem[i].offsetWidth;
        navDrop.insertBefore(navElem[i],navDrop.childNodes[0]);
    }

    for( var i=0; i<navDropElem.length; i++){
        if(myLength >= optimal)
            break;
        myLength += navDropElem[i].offsetWidth;
        nav.insertBefore(navDropElem[i],nav.lastElementChild);
    }
    //navDrop.style.left = navElem[navElem.length-1].offsetLeft;
    var posLeft = myLength-navElem[navElem.length-1].offsetWidth; 
    var mainNavBarHeight = document.getElementById("mainNavBar").offsetHeight;
    var moreButton = document.getElementById("dropdownMenuPage");

    document.getElementById("dropdownMenu").style.marginLeft = posLeft.toString() + 'px';
    document.getElementById("dropdownMenu").style.top = mainNavBarHeight.toString() + 'px';
    //navDrop.style.left = 500;        if(screenWidth/3>=200)
    if (navDropElem.length == 0)
        moreButton.style.display = "none";
    else
        moreButton.style.display = "inline-block";

});

function myNavigatorFunc(){
    var navMore = document.getElementById("dropdownMenuPage").firstChild;
    navMore.addEventListener('click',function(){
        var navMoreContent= document.getElementById("dropdownMenu");
        var theDisplay = getComputedStyle(navMoreContent).display;
        if (theDisplay=="none")
            navMoreContent.style.display="block";
        else
            navMoreContent.style.display="none";
    });
}
/// Adding the footer with the time spend on each page as a total with localStorage
var myInterval,start;
function timer(){
    var getIp,answer;
    var answer;

    myTimer = document.getElementById("timeSpent");

    var url = "https://ip.nf/me.json";
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            answer = JSON.parse(this.responseText);
            getIp = answer.ip.ip;
            getIp = getIp + ":" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
            if (localStorage.getItem(getIp) === null) {
                start = new Date();
                localStorage.setItem(getIp, start);
            }
            else
                start = localStorage.getItem(getIp);

            //updateTimeSpent(getIp,start);
            start = new Date(start);
            setInterval(function () { dataSpentInserter(start, myTimer); }, 1000);
        } else if (this.status == 404 || this.status == 500||this.status==0) {
            alert("Couldnt get Ip, default timer");
            getIp = "timer";
            getIp = getIp + ":" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
            if (localStorage.getItem(getIp) === null) {
                start = new Date();
                localStorage.setItem(getIp, start);
            }
            else
                start = localStorage.getItem(getIp);

            //updateTimeSpent(getIp,start);
            start = new Date(start);
            setInterval(function () { dataSpentInserter(start, myTimer); }, 1000);
        }
    }

}
function dataSpentInserter(start, myTimer) {
    var myDate = new Date();
    var data = '';
    var sec = myDate - start;
    sec /= 1000;
    data = Math.floor(sec / 3600) % 24;
    data += ":" + Math.floor(sec / 60) % 60;
    data += ":" + Math.floor(sec % 60);
    myTimer.innerHTML = data;
    //setTimeout(function(){dataSpentInserter(start,myTimer);},1000);
}

// function updateSpentRegularly(start,myTimer){
//     myInterval = setTimeout(functionk){
//         dataSpentInserter(start,myTimer);
//     },1000);
// }