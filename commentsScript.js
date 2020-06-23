
window.onload=myMain;
var server = "http://192.168.0.109:3000";
//var server = "http://localhost:3000";

function myMain(){
    window.dispatchEvent(new Event('resize'));
    myNavigatorFunc();
    getComments();
    document.getElementById("postButton").addEventListener("click",postComment);
    updateComments(JSON.parse(localStorage.getItem("commentsData")));
    timer();
}
function postComment() {
    var url = server + "/comments";
    var xhr = new XMLHttpRequest();
    var params = "";
    var dataList = document.getElementById("commentForm").children;
    for (var i = 0; i < dataList.length - 1; i++) {
        if (i > 0)
            params += '&'
        if (dataList[i].value == '') {
            alert("All fields are required!");
            return false;
        }
        params += dataList[i].getAttribute("name") + '=' + dataList[i].value;
        // params.append(dataList[i].getAttribute("name"),dataList[i].value);
    }
    params+="&likes=0&dislikes=0"
    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            localStorage.setItem("commentsData",this.responseText);
            var answer = JSON.parse(this.responseText);
            updateComments(answer);
        }
        // else 
        // {
        //     alert("Failure: " + this.readyState.toString() + ' ' + this.status.toString());
        //     //Gives an error even though it works???(gives status 0) NVM
        // }
    }
};


function getComments(){
    var url = server + "/comments";
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            localStorage.setItem("commentsData",this.responseText);
            var answer = JSON.parse(this.responseText);
            updateComments(answer);
        }
    }
}

function updateComments(data) {
    var template = document.getElementById("commentTemplate");
    var list = document.getElementById("commentsContainer").children;
    var alreadyIn = [];
    for (var i = 0; i < list.length; i++)
        alreadyIn.push(list[i].getAttribute("id"));

    Object.keys(data.comments).forEach((key, index) => {
        if (!(alreadyIn.includes(key))) {
            var copy = template.cloneNode(true);
            copy.setAttribute("id", key);
            copy.removeAttribute("style");
            copy.getElementsByClassName("profileName")[0].children[0].innerHTML = data.comments[key].nume + ' ' + data.comments[key].prenume+' wrote:';
            copy.getElementsByClassName("commentContent")[0].innerHTML = "<p>" + data.comments[key].message + "</p>";
            copy.getElementsByClassName("commentOptions")[0].children[0].setAttribute("id","edit"+key);
            copy.getElementsByClassName("commentOptions")[0].children[0].addEventListener("click",function(ev){return editComment(ev)});
            copy.getElementsByClassName("commentOptions")[0].children[1].setAttribute("id","delete"+key);
            copy.getElementsByClassName("commentOptions")[0].children[1].addEventListener("click",function(ev){return deleteComment(ev)});
            copy.getElementsByClassName("showOptions")[0].children[0].setAttribute("id","hide"+key);
            copy.getElementsByClassName("showOptions")[0].children[0].addEventListener("click",function(ev){return hideComment(ev)});
            copy.getElementsByClassName("showOptions")[0].children[1].setAttribute("id","show"+key);
            copy.getElementsByClassName("showOptions")[0].children[1].addEventListener("click",function(ev){return showComment(ev)});
            copy.getElementsByClassName("likeOptions")[0].children[0].setAttribute("id","likes"+key);
            copy.getElementsByClassName("likeOptions")[0].children[1].setAttribute("id","like"+key);
            copy.getElementsByClassName("likeOptions")[0].children[1].addEventListener("click",function(ev){return likeComment(ev)});
            copy.getElementsByClassName("likeOptions")[0].children[2].setAttribute("id","dislikes"+key);
            copy.getElementsByClassName("likeOptions")[0].children[3].setAttribute("id","dislike"+key);
            copy.getElementsByClassName("likeOptions")[0].children[3].addEventListener("click",function(ev){return dislikeComment(ev)});
            document.getElementById("commentsContainer").prepend(copy);
        }
        var likes = document.getElementById("likes"+key);
        var dislikes = document.getElementById("dislikes"+key);
        dislikes.innerHTML = data.comments[key].dislikes;
        likes.innerHTML = data.comments[key].likes;
        if((parseInt(dislikes.innerHTML) - parseInt(likes.innerHTML))>5)
            document.getElementById(key).remove();
    
    });
}
function deleteComment(ev){
    if(!confirm("Are you sure you want to delete this comment?"))
        return null;
    var url = server +  "/comments";
    var xhr = new XMLHttpRequest();
    var params = "?who="

    myId = ev.target.getAttribute("id");
    myId = myId.substr(6,myId.length);
    params+=myId;
    url+=params

    xhr.open("DELETE", url, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            localStorage.setItem("commentsData",this.responseText);
            var answer = JSON.parse(this.responseText);
            updateComments(answer);
        }
    }

}
function editComment(ev){
    var url = server + "/comments";
    var xhr = new XMLHttpRequest();
    var params = "who="

    var myId = ev.target.getAttribute("id");
    var myComment = ev.target.parentElement.parentElement.getElementsByClassName("commentContent")[0].firstChild.innerHTML;
    myId = myId.substr(4,myId.length);
    params+=myId;

    var newComment = prompt("Edit comment",myComment);
    if(newComment.length <= 0)
    {
        alert("Comment cannot be empty");
        return null;
    }
    params += "&newMessage=";
    params += newComment;

    xhr.open("PUT", url, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            localStorage.setItem("commentsData",this.responseText);
            var answer = JSON.parse(this.responseText);
            updateComments(answer);
        }
    }
}
function hideComment(ev){
    var myId = ev.target.getAttribute("id").substr(4);
    var myElem = document.getElementById(myId).children;
    for(var i=0 ; i<myElem.length; i++){
        if(!myElem[i].classList.contains("profileName") && !myElem[i].classList.contains("showOptions")){
            myElem[i].style.display="none";
        }

    }
}
function showComment(ev){
    var myId = ev.target.getAttribute("id").substr(4);
    var myElem = document.getElementById(myId).children;
    for(var i=0 ; i<myElem.length; i++){
        if(!myElem[i].classList.contains("profileName") && !myElem[i].classList.contains("showOptions")){
            myElem[i].style.display="block";
        }
    }
}
function likeComment(ev){
    var myId = ev.target.getAttribute("id").substr(4);
    var likeNumber = document.getElementById("likes"+myId);
    likeNumber.innerHTML = parseInt(likeNumber.innerHTML) + 1;

    var url = server + "/comments/like";
    var xhr = new XMLHttpRequest();
    var params = "?who="

    params+=myId;
    url+=params;

    xhr.open("PUT", url, false);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            localStorage.setItem("commentsData",this.responseText);
            var answer = JSON.parse(this.responseText);
            updateComments(answer);
        }
    }
}
function dislikeComment(ev){
    var myId = ev.target.getAttribute("id").substr(7);
    var likeNumber = document.getElementById("dislikes"+myId);
    likeNumber.innerHTML = parseInt(likeNumber.innerHTML) + 1;

    var url = server + "/comments/dislike";
    var xhr = new XMLHttpRequest();
    var params = "?who="

    params+=myId;
    url+=params

    xhr.open("PUT", url, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            localStorage.setItem("commentsData",this.responseText);
            var answer = JSON.parse(this.responseText);
            updateComments(answer);
        }
    }
}

/****************Making a dropdown button&deciding based on how much space*/
window.addEventListener('resize', function () {
    var screenWidth = document.body.clientWidth;
    var myLength = 0, optimal = 0;
    var nav = document.getElementById("navLiElem").children[0];
    var navElem = document.getElementById("navLiElem").getElementsByTagName("li");
    var navDrop = document.getElementById("navLiDropdownElem");
    var navDropElem = document.getElementById("navLiDropdownElem").getElementsByTagName("li");
    // document.getElementById("what").innerHTML=screenWidth;
    for (var i = 0; i < navElem.length; i++) {
        myLength += navElem[i].offsetWidth;
    }
    //document.getElementById("what").innerHTML+=myLength;
    var sider = document.getElementById("sideMainMenu");
    if (sider == null) {
        optimal = ((screenWidth * screenWidth + 200 * screenWidth) / 5000) + 100;
        optimal = Math.min(optimal, screenWidth);
        // if(screenWidth/3>=200)
        //     optimal=screenWidth/3;

    } else
        optimal = sider.offsetWidth + navElem[navElem.length - 1].offsetWidth;

    for (var i = navElem.length - 2; i > 0; i--) {
        if (myLength - navElem[i].offsetWidth < optimal)
            break;
        myLength -= navElem[i].offsetWidth;
        navDrop.insertBefore(navElem[i], navDrop.childNodes[0]);
    }

    for (var i = 0; i < navDropElem.length; i++) {
        if (myLength >= optimal)
            break;
        myLength += navDropElem[i].offsetWidth;
        nav.insertBefore(navDropElem[i], nav.lastElementChild);
    }
    //navDrop.style.left = navElem[navElem.length-1].offsetLeft;
    var posLeft = myLength - navElem[navElem.length - 1].offsetWidth;
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

function myNavigatorFunc() {
    var navMore = document.getElementById("dropdownMenuPage").firstChild;
    navMore.addEventListener('click', function () {
        var navMoreContent = document.getElementById("dropdownMenu");
        var theDisplay = getComputedStyle(navMoreContent).display;
        if (theDisplay == "none")
            navMoreContent.style.display = "block";
        else
            navMoreContent.style.display = "none";
    });
}

/// Adding the footer with the time spend on each page as a total with localStorage
var myInterval;
function timer(){
    var getIp,answer,start;
    var body = document.getElementsByTagName("body")[0];
    body.innerHTML += '<p id="timeSpent"></p>';

    myTimer = document.getElementById("timeSpent");

    var url = "https://ip.nf/me.json";
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            answer = JSON.parse(this.responseText);
        }
    }
    if(answer == null)
    {
        alert("Couldnt get Ip, default timer");
        getIp = "timer";
    }
    else
        getIp = answer.ip.ip;

    getIp =getIp + ":" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    if(localStorage.getItem(getIp) === null)
    {
        start = new Date();
        localStorage.setItem(getIp,start);
    }
    else
        start = localStorage.getItem(getIp);
    
    //updateTimeSpent(getIp,start);
    start = new Date(start);
    dataSpentInserter(start,myTimer);
}
function dataSpentInserter(start,myTimer)
{
    var myDate = new Date();
    var data='';
    var sec = myDate - start;
    sec /= 1000;
    data = Math.floor(sec/3600)%24;
    data += ":" + Math.floor(sec/60)%60;
    data += ":" + Math.floor(sec%60);
    myTimer.innerHTML = data;
    updateSpentRegularly(start,myTimer);
}

function updateSpentRegularly(start,myTimer){
    myInterval = setTimeout(function(){
        dataSpentInserter(start,myTimer);
    },1000);
}
