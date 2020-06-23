window.onload=myMain;
var mytime;
function myMain(){
    window.dispatchEvent(new Event('resize'));
    myNavigatorFunc();
    document.getElementById("sendButton").addEventListener("click",updateAge);
    timer();
}
/// II -> task ul 1
function daysInMonth (month, year) { 
    return new Date(year, month, 0).getDate(); 
} 
function updateAge(){
    var data = document.getElementById("ageInput").value;
    document.getElementById("ageInput").value=null;
    data=data.split('#');
    if(data == ""){
    {
        alert("Enter your birth date");
        return -1;
    }   
    }else{
        if(data.length!=3)
        {
            alert("Enter the format DD#MM#YYYY");
            return -1;
        }
        for(var x=0;x<data.length;x++){
            if(isNaN(data[x])){
                alert("Enter the format DD#MM#YYYY");
                return -1;
            }
            if(x<2 && data[x].length > 2){
                alert("Enter the format DD#MM#YYYY");
                return -1;
            }
            if(x==2 && data[x].length != 4){
                alert("Enter the format DD#MM#YYYY");
                return -1;
            }
        }
    }
    for(var x=0;x<data.length;x++)
        data[x]=parseInt(data[x]);
    if(data[0]>31||data[1]>12||data[0]<1||data[1]<1||data[2]<1900){
        alert("Please enter a valid date DD#MM#YYYY");
        return -1;
    }
    if(daysInMonth(data[1],data[0])<data[0]){
        alert(daysInMonth(data[1],data[0])+" days in this month!")
        alert("Please enter a valid date DD#MM#YYYY, month has less days");
        return -1;
    }

    var today = new Date();
    var birthDate = new Date(data[2],data[1]-1,data[0]);
    if(birthDate>today){
        alert("Please enter a valid date DD#MM#YYYY");
        return -1;
    }
    // by now the date is sure to be a birth date of someone alive, or capable enough to input it.
    document.getElementById("birthDate").innerHTML = "Your birth date is: " + data[0] + '/' +data[1] + '/' +data[2];
    clearInterval(mytime);
    putData(birthDate);
}
function putData(birthDate){
    var loc = document.getElementById("showAge");
    var data = "Your age is: ";
    var dateNow = new Date();
    years = dateNow.getFullYear() - birthDate.getFullYear();
    months = dateNow.getMonth() - birthDate.getMonth();
    days = dateNow.getDate() - birthDate.getDate();
    hours = dateNow.getHours() - birthDate.getHours();
    minutes = dateNow.getMinutes() -birthDate.getMinutes();
    start = dateNow.getSeconds() - birthDate.getSeconds();
    if(months<0 || (months==0 & days<0))
        years--;
    if(months<0)
        months = 12+months;
    if(days<0)
    {
        days = daysInMonth(birthDate.getMonth()+1,dateNow.getFullYear())+days;
        months--;
    }
    data =data + years + " years ";
    data =data + months + " months ";
    data =data + days + " days ";
    data =data + hours + " hours ";
    data =data + minutes + " minutes ";
    data =data + start  + " start ";
    data =data + "old!"
    loc.innerHTML=data;
    updateRegular(birthDate);
}
function updateRegular(birthDate){
    mytime=setTimeout(function(){putData(birthDate);},1000);
}
/// End of II -> task ul 1

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
