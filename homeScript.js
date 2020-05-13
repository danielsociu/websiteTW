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
    // window.dispatchEvent(new Event('resize'));

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
function myScrollTransistion(elem,elem2){
    elem.addEventListener("click",function(){
        var newPos = document.getElementById(elem2).offsetTop-document.getElementById("mainNavBar").clientHeight;
        window.scroll({
            top:newPos,
            behavior: 'smooth'
        });
    })
}