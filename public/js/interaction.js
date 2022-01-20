const toggle_menu = document.querySelector('.toggle-menu');
const menu_toggle_btn = document.querySelector('.fa-caret-square-down');
const menu = document.querySelector('.menu');

let menuIsToggled = false;
// for menu toggle
toggle_menu.addEventListener('click', () => {
  menu.classList.toggle('-translate-y-full');
  menu.classList.add('duration-500');
  menu_toggle_btn.classList.toggle('rotate-180');
  menu_toggle_btn.classList.toggle('text-yellow-300');
  menuIsToggled = !menuIsToggled;

  setTimeout(() => {
    menu.classList.remove('duration-500');
  }, 550);
});

// for menu display config
window.addEventListener('resize', () => {
  let width = window.innerWidth;
  if (width > 768) {
    menu.classList.remove('-translate-y-full');
    menu_toggle_btn.classList.remove('rotate-180');
    menuIsToggled = false;
  } else if (width < 768 && menuIsToggled == false) {
    menu.classList.add('-translate-y-full');
  }
});
