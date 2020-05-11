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
/****************Making a dropdown button&deciding based on how much space*/
window.addEventListener('resize',function(){
    var screenWidth = document.body.clientWidth;
    var myLength=0,optimal=0;
    var navElem = document.getElementById("navLiElem").getElementsByTagName("li");
    var navDrop = document.getElementById("navLiDropdownElem");
    // document.getElementById("what").innerHTML=screenWidth;
    for (var i=0; i<navElem.length; i++)
    {
        myLength+=navElem[i].offsetWidth;
    }
    //document.getElementById("what").innerHTML+=myLength;
    if(screenWidth/3>=200)
        optimal=screenWidth/3;
    else 
        optimal=screenWidth/2;
    for( var i=navElem.length-2; i>0; i--){
        if(myLength-navElem[i].offsetWidth < optimal)
            break;
        myLength -= navElem[i].offsetWidth;
        navDrop.insertBefore(navElem[i],navDrop.childNodes[0]);
    }

    //navDrop.style.left = navElem[navElem.length-1].offsetLeft;
    var posLeft = navElem[navElem.length-1].offsetLeft;// - navElem[navElem.length-1].offsetWidth;

    document.getElementById("dropdownMenu").style.left = posLeft.toString() + 'px';
    //navDrop.style.left = 500;
})

function myMain(){

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
    //window.dispatchEvent(new Event('resize'));

}
function myScrollTransistion(elem,elem2){
    elem.addEventListener("click",function(){
        var newPos = document.getElementById(elem2).offsetTop-document.getElementById("mainNavBar").clientHeight;
        window.scroll({
            top:newPos,
            behavior: 'smooth'
        });
    })
}