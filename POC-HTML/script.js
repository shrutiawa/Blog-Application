// Published Blog JSON Data
$(() => {
    $.getJSON("./lib/data.json", function (data, status, jqxhr) {
        $(data.blogs).each(function (idx, val) {
            var poster= val.bannerUrl;
            var sponsored=val.sponsored
            var title=val.title
            var description=val.description;
            var modifiedDate=val.modified;
            var uname = val.user.name;
            if(sponsored===true){
                $(".images").append(`<div class="json-container"><img src="${poster}" alt="1">
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="user"> <img src="/images/user-1.jpg" alt="user"></div>
                <p> ${uname} &bull; ${modifiedDate}`);
                
            }
            else{
                $(".images").append(`<div class="json-container"><img src="${poster}" alt="1">
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="user"> <img src="/images/user-1.jpg" alt="user"></div>
                <p> ${uname} &bull; ${modifiedDate}`)
            }
    })
    })
    })
    
    
    {/* // hamburger code
    function menuHandler(){
        const overlay=document.getElementsByClassName("overlay")[0];
        const mainmenu=document.getElementsByClassName("hamburger-info")[0];
        const closeListicon=document.getElementsByClassName("fa-xmark")[0];
            mainmenu.classList.add("show-hamburger")
            overlay.classList.add("show-overlay")
    
    
    
    
    }
    function closeHandler(){
        const overlay=document.getElementsByClassName("overlay")[0];
        const mainmenu=document.getElementsByClassName("hamburger-info")[0];
    
    
        if(mainmenu.classList.contains("show-hamburger") && overlay.classList.contains("show-overlay")){
            mainmenu.classList.remove("show-hamburger")
            overlay.classList.remove("show-overlay")
    
        }
    }
    
    
    
    function init(){
        document.getElementsByClassName("hamburger")[0].addEventListener("click",menuHandler)
        document.getElementsByClassName("close")[0].addEventListener("click",closeHandler)
    }
    
    
    
    document.addEventListener("DOMContentLoaded",init) */}
    
    
    