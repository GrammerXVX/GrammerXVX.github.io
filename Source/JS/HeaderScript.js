document.querySelector('.hamburger-menu').addEventListener('click', function () {
  this.classList.toggle('open');
  document.querySelector('.menu').classList.toggle('open');
});

(function () {
  $('.hamburger-menu').on('click', function () {
    $('.bar').toggleClass('animate');
  })
})();

let timeoutId;

const menuLinks = document.querySelectorAll('.menu a');

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Закрытие меню
    document.querySelector('.menu').style.transform = 'translateX(-100%)';
    // Удаление класса 'open' у гамбургер-меню
    document.querySelector('.hamburger-menu').classList.remove('open');
    // Удаление класса 'animate' у баров гамбургер-меню
    document.querySelectorAll('.bar').forEach(bar => {
      bar.classList.remove('animate');
    });
  });
});


function expandHeader() {
  clearTimeout(timeoutId);
  document.querySelector('header').classList.add('header-expanded');
}

function shrinkHeader() {
  timeoutId = setTimeout(() => {
    document.querySelector('header').classList.remove('header-expanded');
  }, 300); // Задержка в 500 миллисекунд (0.5 секунды)
}

const menu = document.querySelector('.menu');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const bar = document.querySelector('.bar');
    let isMenuOpen = false;

    // Обработчик события для открытия меню
    function menuEvent() {
      if(isMenuOpen){
        menu.style.transform = 'translateX(-100%)';
        isMenuOpen = false;
      }
      else{
        menu.style.transform = 'translateX(0)';
        isMenuOpen = true;
      }
    }
    function mouseEvent(){
      if(isMenuOpen){
        bar.classList.add('animate');
      }
      else{
        bar.classList.remove('animate');
      }
      
    }
    function menuEvents() {
      if(isMenuOpen){
        menu.style.transform = 'translateX(-100%)';
        isMenuOpen = false;
        bar.classList.remove('animate');
      }
      else{
        menu.style.transform = 'translateX(0)';
        isMenuOpen = true;
      }
    }
    // Добавляем обработчик события на наведение мыши на меню
    hamburgerMenu.addEventListener('mouseenter', mouseEvent);

    // Добавляем обработчик события на убирание мыши с меню
    hamburgerMenu.addEventListener('mouseleave', mouseEvent);
    menu.addEventListener('mouseleave', menuEvents);
    hamburgerMenu.addEventListener('click', menuEvent);