/*------------------------------------------ preloader screen ----------------------*/
let preloader =  setTimeout(() => {
    let preloader = document.querySelector(".preloader");
    preloader.style.cssText = "opacity:0";
    setTimeout(() => {
        preloader.style.cssText = " display: none;";
    }, 510)
}, 3000)

/*---------------------------------------- darck moode -----------------------------*/
// save mode in local storage
if(localStorage.getItem("l&d-mode") == null){
    localStorage.setItem("l&d-mode","light");
}

let theam = document.querySelector("#theam-mode > img");
theam.addEventListener("click",(eo) => {
   let mode =  document.body.classList.toggle("darck");
    if(mode) {
        theam.src = "dark theme icon/sun.png";
        localStorage.setItem("l&d-mode","darck");
    }else{
        theam.src = " dark theme icon/moon.png";
        localStorage.setItem("l&d-mode","light");
    }
});

if(localStorage.getItem("l&d-mode") === "darck"){
    document.body.classList.add("darck");
    theam.src = "dark theme icon/sun.png";
}
 if(localStorage.getItem("l&d-mode") == "light"){
    document.body.classList.remove("darck");
    theam.src = " dark theme icon/moon.png";
}

/*------------------------------------------------navbar height-------------------- */
let navbar = document.querySelector(".header-section");
window.onscroll = function(){
    // progress navegation function
    progressBar();
    // scroll by links
    scrollBy();

    if(this.scrollY > 50){
        navbar.style.cssText = `
                padding:10px 0px; background: var(--back);
                box-shadow: 0rem .5rem 1rem rgba(0,0,0,0.2);
        ` ;
        document.querySelector(".scrollTop").style.right = "15px";
    }else{
        navbar.style.cssText = "padding:20px 0px";
        document.querySelector(".scrollTop").style.right = "-100%";
    }
};

function scrollBy() {
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll(".nav-list .nav-item a");

    sections.forEach((item) => {
        let top = window.scrollY;
        let offset = item.offsetTop - 25;
        let height = item.offsetHeight;
        let id = item.id;
        if(top >= offset && top < offset + height){
            navLinks.forEach((link) => {
                link.classList.remove("active");
                document.querySelector(`.nav-list .nav-item a[href*=${id}]`).classList.add("active");
            });
        }
    });
}

function progressBar() {
    const {scrollTop , scrollHeight} = document.documentElement;
    const scrollPercent = scrollTop / (scrollHeight - this.innerHeight) * 100 + '%';
    let loadBar = document.querySelector("#load-bar");
    loadBar.style.cssText = `width: ${scrollPercent}`;
}

// to top button
document.querySelector(".scrollTop").addEventListener("click",(eo) => {
    window.scrollTo(this.scrollY,0);
});

/*--------------------------------------------options text color---------------- */
if(localStorage.getItem("text-color") == null){
    localStorage.setItem("text-color","")
}

let colorBoxItem = document.querySelectorAll(".body-color");
// get css variable
let rootCss = document.querySelector(':root');
// get svg element
let svg = document.querySelectorAll("div > svg");

colorBoxItem.forEach( (item,i) => {
    item.addEventListener("click", eo =>{
        //get id value forom element
        let option = eo.target.id;

        // change color svg 
        svgColor(option);
        
        // change the value of css var
        rootCss.style.setProperty('--option', `${option}`);
        localStorage.setItem("text-color",option);
    });
});
let loclColor = localStorage.getItem("text-color");
rootCss.style.setProperty('--option', `${loclColor}`);
function svgColor(color){
    svg.forEach(ele => {
        ele.querySelector("path").setAttribute("fill",`${color}`);
    });
}
svgColor(loclColor);

/*------------------------------------------ auto writing [my name]-------------------------  */
let myTitle = document.querySelector(".writing");
let outoText = "Abdo Ibrahem a web developer ";
let arrText = outoText.split("");
let charCount = 0;

const autoWriting = () => {
    myTitle.innerHTML += arrText[charCount];
    charCount++;

    if(charCount == 13){
        clearInterval(charTimer);
        setTimeout(() => {
             myTitle.innerHTML = "";
             // cal charLoping function
             charLoping();
        }, 750);
    }
    if(charCount > arrText.length-1){
        clearInterval(charTimer);
        setTimeout(() => {
            myTitle.innerHTML = "";
            charCount = 0;
            // cal charLoping function
            charLoping();
        }, 1000);
    }
};

let charTimer; 
function charLoping(){
    charTimer = setInterval(() => {
        autoWriting();
    }, 150);
};
charLoping();
/*-----------------------------------------------------responseve navbar--------------------- */
let navBtn = document.querySelector(".toggle-nav");
let navList = document.querySelector(".nav-list");

navBtn.addEventListener("click",(eo) => {
    navList.classList.toggle("open-close");
    navBtn.classList.toggle("animation");
});

// close nav list when click on any nav link
document.addEventListener("click",(eo) => {
    if(eo.target.closest(".nav-item")){
         navList.classList.remove("open-close");
         navBtn.classList.remove("animation");
    }
})

/*---------------------------------------------------------open video ------------------------- */
let theVideo = document.querySelector(".video");
let closeVideo = document.querySelector(".close-video");
let mainVideo = document.getElementsByTagName("video")[0];

theVideo.addEventListener("click",(eo) => {
    let videoPopup = document.querySelector(".video-popup");
    videoPopup.style.display = "flex";
    setTimeout(() => {
        mainVideo.style.transform = "scale(1)";
    }, 40);
});

closeVideo.addEventListener("click",(eo) => {
        mainVideo.style.transform = "scale(0)";
        setTimeout(() => {
            let videoPopup = document.querySelector(".video-popup");
            videoPopup.style.display = "none";
        },330);
});

/*----------------------------------------------- fullScreen WebSite-------------------- */
let fullScreenBtn = document.querySelector("#full-screen");
fullScreenBtn.addEventListener("click",(eo) => {
    let doc  = window.document;
    let docEl = doc.documentElement;
   { // if(!doc.fullscreenElement){
    //     docEl.requestFullscreen();
    // }else {
    //     doc.exitFullscreen();
    // }
   }
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
       requestFullScreen.call(docEl);
       fullScreenBtn.innerHTML = "fullscreen_exit";
    }
    else {
       cancelFullScreen.call(doc);
       fullScreenBtn.innerHTML = "fullscreen";
    }
});

/*------------------------------------------------- this code is mode of---------------------------- */
// let allSections = document.querySelectorAll(".section");
// let allLinkLi = document.querySelectorAll(".nav-item");

// allLinkLi.forEach((item) => {
//     item.addEventListener("click",(eo) => {
//         allLinkLi.forEach( item => {
//             item.classList.remove("active");
//         });
//         item.classList.add("active");
//         let itemId = item.querySelector("a").getAttribute("href").slice(1);
//         console.log(itemId);
//         allSections.forEach((item) => {
//             if(item.id == itemId) {
//                 item.classList.add("active");
//             }else {
//                 item.classList.remove("active");
//             }
//         });
//     });
// });



/*----------------------------------------------about taps ------------------------------- */
let tabsParent = document.querySelector(".tabs");
const toggleTabs = (box) => {
    box.addEventListener("click",(eo) => {
        if(eo.target.classList.contains("tabs-item") && !eo.target.classList.contains("active")){
            let target = eo.target.getAttribute("data-tabs");
            box.querySelector(".tabs-item.active").classList.remove("active");
            eo.target.classList.add("active");
            
           let containerTabsInfo = document.querySelector(".container-tabs-info");
           containerTabsInfo.querySelector(".active").classList.remove("active");
           document.querySelector(`${target}`).classList.add("active");
        }
    });
};
toggleTabs(tabsParent);


/*---------------------------------------------- Swiper slider  ------------------------------- */
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
       el: "",
    },
});
