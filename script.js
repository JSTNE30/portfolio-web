/*=============== PRELOADER ===============*/
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 1000);
});

/*=============== MENU SHOW Y HIDDEN ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 50,
              sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-up class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*=============== SKILLS ANIMATION ===============*/
const skillBars = document.querySelectorAll('.skills__percentage');

function animateSkills() {
    skillBars.forEach(skill => {
        const styleWidth = getComputedStyle(skill).getPropertyValue('--width');
        skill.style.width = styleWidth || '0%';
    });
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
            
            // If this is a skill bar, animate it
            if (reveals[i].querySelector('.skills__percentage')) {
                const skillBars = reveals[i].querySelectorAll('.skills__percentage');
                skillBars.forEach(skill => {
                    // Get width from the parent's text value
                    const width = skill.parentElement.previousElementSibling.querySelector('.skills__number').textContent;
                    skill.style.width = width;
                });
            }
        }
    }
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

/*=============== PROJECTS FILTER ===============*/
const filterButtons = document.querySelectorAll('.projects__filter');
const projectCards = document.querySelectorAll('.projects__card');

function filterProjects(e) {
    const filter = e.target.getAttribute('data-filter');
    
    // Remove active class from all filter buttons
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to clicked button
    e.target.classList.add('active');
    
    // Filter projects
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || filter === category) {
            card.style.display = 'block';
            
            // Add animation
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, 200);
        } else {
            card.style.transform = 'translateY(20px)';
            card.style.opacity = '0';
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 500);
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', filterProjects);
});

/*=============== FORM SUBMISSION ===============*/
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // You can add form validation here
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            // Here you would typically send the form data to a server
            // For this demo, we'll just clear the form
            alert('Thanks for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill out all fields');
        }
    });
}

/*=============== INITIALIZE ===============*/
// Initial reveal call to show elements that are already in viewport on page load
document.addEventListener('DOMContentLoaded', () => {
    reveal();
});