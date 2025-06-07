// Automated year update
 document.getElementById("current-year").textContent = new Date().getFullYear();
// NAVIGATION
      const hamburger = document.querySelector(".hamburger");
      const navbarMenu = document.getElementById("navbarMenu");
      const overlay = document.getElementById("overlay");

      function toggleSidebar() {
        const expanded = hamburger.getAttribute("aria-expanded") === "true";
        hamburger.setAttribute("aria-expanded", !expanded);
        navbarMenu.classList.toggle("active");
        overlay.classList.toggle("active");
      }

      hamburger.addEventListener("click", toggleSidebar);
      overlay.addEventListener("click", toggleSidebar);

      // Accessibility: handle submenu toggle on mobile tap
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      function handleSubmenuToggle() {
        if (mediaQuery.matches) {
          const menuItems = navbarMenu.querySelectorAll(
            'li[aria-haspopup="true"] > a'
          );
          menuItems.forEach((item) => {
            item.setAttribute("tabindex", "0");
            item.onclick = function (e) {
              e.preventDefault();
              const parentLi = this.parentElement;
              const expanded =
                parentLi.getAttribute("aria-expanded") === "true";
              parentLi.setAttribute("aria-expanded", !expanded);
              const submenu = parentLi.querySelector(".submenu-container");
              if (!expanded) {
                submenu.style.maxHeight = submenu.scrollHeight + "px";
              } else {
                submenu.style.maxHeight = "0px";
              }
            };
            const parentLi = item.parentElement;
            const submenu = parentLi.querySelector(".submenu-container");
            submenu.style.maxHeight = "0px";
            parentLi.setAttribute("aria-expanded", "false");
          });
        } else {
          const menuItems = navbarMenu.querySelectorAll(
            'li[aria-haspopup="true"]'
          );
          menuItems.forEach((li) => {
            li.removeAttribute("aria-expanded");
            const submenu = li.querySelector(".submenu-container");
            submenu.style.maxHeight = null;
            const anchor = li.querySelector("a");
            anchor.onclick = null;
            anchor.setAttribute("tabindex", "-1");
          });
        }
      }

      mediaQuery.addListener(handleSubmenuToggle);
      window.addEventListener("load", handleSubmenuToggle);

      // Close icon handler
      const mobileClose = document.getElementById("mobileClose");
      mobileClose.addEventListener("click", () => {
        hamburger.setAttribute("aria-expanded", false);
        navbarMenu.classList.remove("active");
        overlay.classList.remove("active");
      });
// HEADER STICKY
window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

//  SCROLl SECTIONS ACTIVE NAV
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.navbarMenu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active')
        }else{
            sectionsClass.classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')

    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)