//////////////////// NAVBAR ///////////////////

window.addEventListener('scroll', function () {
  var navBar = document.getElementById('nav-bar-style');
  var scrollPosition = window.scrollY;

  if (scrollPosition > 200) {
    navBar.style.backgroundColor = '#17344b';
  } else {
    navBar.style.backgroundColor = 'transparent';
  }
});


///////////////// SCROLLSPY ///////////////////

document.addEventListener('DOMContentLoaded', function () {
  const navbarLinks = document.querySelectorAll('#nav-bar-style .nav-link');
  const homeButton = document.getElementById('home-button');
  const navbarList = document.querySelector('.navbar-nav');

  window.addEventListener('scroll', function () {
    let currentSection = '';


    const scrollPosition = window.scrollY;

    document.querySelectorAll('section').forEach((section) => {
      if (
        scrollPosition >= section.offsetTop - 200 &&
        scrollPosition < section.offsetTop + section.offsetHeight - 200
      ) {
        currentSection = section.getAttribute('id');
      }
    });


    navbarLinks.forEach((link) => {
      link.style.color = '#fff';

      if (link.getAttribute('href').substring(1) === currentSection) {
        link.style.color = '#FFC03D';
      }
    });

    if (scrollPosition > homeButton.offsetTop) {
      const existingButton = navbarList.querySelector('.scroll-btn');
      if (!existingButton) {
        const buttonClone = homeButton.cloneNode(true);
        buttonClone.removeAttribute('id');
        buttonClone.classList.add('scroll-btn');

        const listItem = document.createElement('li');
        listItem.classList.add('nav-item', 'scroll-btn');
        listItem.appendChild(buttonClone);
        navbarList.appendChild(listItem);
      }
    } else {
      const existingButton = navbarList.querySelector('.scroll-btn');
      if (existingButton) {
        navbarList.removeChild(existingButton);
      }
    }
  });
});

window.addEventListener('scroll', function () {
  const scrollToTopBtn = document.getElementById('fixed-button');

  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});




/////////////////////// FLEET //////////////////////
const fleetImages = [
  document.querySelector('.fleet-img1'),
  document.querySelector('.fleet-img2'),
  document.querySelector('.fleet-img3')
];

const fleetTables = [
  document.querySelector('.fleet-tbl1'),
  document.querySelector('.fleet-tbl2'),
  document.querySelector('.fleet-tbl3')
];

const fleetButtons = document.querySelectorAll('#fleets-buttons-id');


fleetImages.forEach(image => image.style.display = 'none');
fleetTables.forEach(table => table.style.display = 'none');

fleetImages[0].style.display = 'block';
fleetTables[0].style.display = 'block';


fleetButtons.forEach((button, index) => {
  button.addEventListener('click', function () {

    fleetImages.forEach(image => image.style.display = 'none');
    fleetTables.forEach(table => table.style.display = 'none');


    fleetImages[index].style.display = 'block';
    fleetTables[index].style.display = 'block';


    fleetButtons.forEach(btn => btn.style.backgroundColor = 'white');
    button.style.backgroundColor = '#26577C';
  });
});

