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

// Close mobile nav on menu link click
const navLinks = document.querySelectorAll('.navbar-menu a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    // Optional: smooth scroll to section
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }

    // Only close if mobile nav is open
    if (navbarMenu.classList.contains('active')) {
      hamburger.setAttribute("aria-expanded", false);
      navbarMenu.classList.remove("active");
      overlay.classList.remove("active");
    }
  });
});
// 
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.navbar-menu a[href*=' + sectionId + ']');

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active');
        } else {
            sectionsClass.classList.remove('active');
        }
    });
};
window.addEventListener('scroll', scrollActive);
// MARKETING SERVICES MODALS
        var modals = document.querySelectorAll(".modal");

        // Get the buttons that opens the modals
        var btns = document.querySelectorAll("[id^='myBtn']");

        // Get the <span> elements that closes the modals
        var spans = document.querySelectorAll(".close");

        // Loop through each button to add onclick event
        btns.forEach(function (btn, index) {
            btn.onclick = function () {
                modals[index].style.display = "block";
            };
        });

        // Loop through each span to add onclick event
        spans.forEach(function (span) {
            span.onclick = function () {
                span.parentNode.parentNode.style.display = "none";
            };
        });
