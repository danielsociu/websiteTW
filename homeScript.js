window.onload=myMain;

/*******************Making the active menu**/
window.addEventListener('scroll',function(){
    //var totalScroll = window.pageYOffset;
    if(document.getElementsByClassName('sideMenuActive')[0]==undefined)
        return 0;
    var aTags = document.getElementById("sideMainMenu").children;
    for (var i=0; i<aTags.length ; i++){
        var ider = aTags[i].id.slice(0,aTags[i].id.lastIndexOf("Menu"));
        var element = document.getElementById(ider);
        if((element.getBoundingClientRect().top - document.getElementById("mainNavBar").clientHeight - 1)<=0){
            var activeElem=document.getElementsByClassName('sideMenuActive');
            for(var j=0; j<activeElem.length; j++)
                activeElem[j].classList.remove('sideMenuActive');
            aTags[i].classList.add('sideMenuActive');
        }
    }
});

function myMain(){
    window.dispatchEvent(new Event('resize'));
    myNavigatorFunc();
    animateTitle("myTitle");

    /****************Making scrolling button animation */
    var aTags = document.getElementById("sideMainMenu").children;
    aTags[0].classList.add('sideMenuActive');
    for (var i=0; i<aTags.length ; i++){
        var tempTarget=aTags[i].id;
        tempTarget = tempTarget.slice(0,tempTarget.lastIndexOf("Menu"));
        myScrollTransistion(aTags[i],tempTarget);
        // aTags[i].addEventListener("click",function() {
        //     var newPos = document.getElementById(tempTarget).offsetTop;//-document.getElementById("mainNavBar").clientHeight;
        //     window.scroll({
        //         top:newPos,
        //         behavior: 'smooth'
        //     });
        // })
    }
}
/// II -> task ul 3.
var animatedTitleInterval;
var indexTitle=-1;
function animateTitle(titleTag){
    var titleContainer = document.getElementById(titleTag);
    var content = titleContainer.innerHTML;
    var newContent = "";
    for (var x=0; x<content.length; x++)
        newContent =newContent + "<span style='visibility:hidden'>"+content[x]+"</span>";
    titleContainer.innerHTML = newContent;
    titleContainer.style.visibility="visible";
    titleContainer = document.getElementById(titleTag).children;
    indexTitle = -1;
    buildTitle(titleContainer);
}
function buildTitle(titleContainer){
    if(indexTitle==-1)
    {
        indexTitle = indexTitle + 1;
        buildTitleInterval(titleContainer);
        return -1;
    }
    if((titleContainer.length - indexTitle -1) < indexTitle)
        clearInterval(animatedTitleInterval);
    else
    {
        if (indexTitle == (titleContainer.length - indexTitle))
            titleContainer[indexTitle].style.visibility = "visible";
        else {
            titleContainer[indexTitle].style.visibility = "visible";
            titleContainer[titleContainer.length - indexTitle - 1].style.visibility = "visible";
        }
        indexTitle = indexTitle + 1;
    }
}
function buildTitleInterval(titleContainer) {
    animatedTitleInterval = setInterval(function () { buildTitle(titleContainer); }, 100);
}
function myScrollTransistion(elem, elem2) {
    elem.addEventListener("click", function () {
        var newPos = document.getElementById(elem2).offsetTop - document.getElementById("mainNavBar").clientHeight;
        window.scroll({
            top: newPos,
            behavior: 'smooth'
        });
    })
}
/// END OF II -> task ul 3.
// ************************** MENU STUFFS ****************************************
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