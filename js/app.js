/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const AllSection = document.querySelectorAll("section"),
      navbarList = document.getElementById("navbar__list"), 
      Fragment = document.createDocumentFragment(),
      myHeader = document.querySelector(".page__header"),
      scrollToTop = document.querySelector('.scroll-to-top');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Hide Navigation Bar function
function HidNavgation() {
    myHeader.style.top = "-60px";
}

// Hide Navigation Bar While Not Scrolling
myHeader.style.top = "0px";
let HideNav = _ => setTimeout(HidNavgation, 6000);

// scroll Go To Top Page
scrollToTop.onclick = e => { 
    
    e.preventDefault();

    window.scrollTo(0,0);

};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// Start Create All Anchors Of Sections 
AllSection.forEach(Section => {
    
    let DataNav = Section.getAttribute('data-nav'),
        ID = Section.getAttribute('id'),
        Title = Section.querySelector(".landing__container h2").textContent,
        liLink = document.createElement('LI');

    liLink.innerHTML = `<a href="#${ID}" class="menu__link" data-nav="${DataNav}" >${Title}</a>`;
    
    Fragment.appendChild(liLink); 
});

navbarList.appendChild(Fragment);

// Storage Of All Anchors In A Variable 
const AllAnchor = document.querySelectorAll("a.menu__link");

// Set The First Anchor In Active Mode
navbarList.children[0].firstElementChild.classList.add('active');

// Add class 'active' to section when near top of viewport
// Start Connecting The Anchor To Its Section
AllAnchor.forEach(Anchor => {
    
    Anchor.onclick = function (e) {
        "use strict";
        e.preventDefault();

        document.querySelector('.active').classList.remove("active");
        this.classList.add('active');

        AllSection.forEach(Section => {

            if (Section.getAttribute('data-nav') === Anchor.getAttribute('data-nav')) {

                window.scrollTo(0,Section.offsetTop);

                document.querySelector('.your-active-class').classList.remove("your-active-class");
                Section.classList.add('your-active-class');

            }

        });
    }

});

// Scroll to anchor ID using scrollTO event
window.onscroll = _ => {
    "use strict";

    // Scroll Up Button On The Page
    if (window.scrollY > AllSection[0].offsetTop) {
        scrollToTop.style.display = "block";
    } else{
       scrollToTop.style.display = "none";
    }  

    AllSection.forEach(Section => {
        
        let SectionTop = Section.offsetTop,
            SectionButtom = (Section.offsetTop + Section.offsetHeight),
            navbarHeight = navbarList.offsetHeight,
            WindowTop = window.scrollY;

        if ((SectionTop - navbarHeight) < WindowTop && SectionButtom > WindowTop) {
            
            AllAnchor.forEach(Anchor => {

                if (Section.getAttribute('data-nav') === Anchor.getAttribute('data-nav')) {

                    document.querySelector('.active').classList.remove("active");
                    Anchor.classList.add("active");

                    document.querySelector('.your-active-class').classList.remove("your-active-class");
                    Section.classList.add('your-active-class');

                }            
            });   
        }
    });
    
    // Hide Navigation Bar While Not Scrolling
    myHeader.style.top = "0px";
    HideNav();

}

/**
 * End Main Functions
 * Begin Events
 * 
*/
