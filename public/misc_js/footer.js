// for yourself at footer
document.querySelector('.yourself').addEventListener('click', function (e) {
  this.classList.add('anim-shake');
  setTimeout(() => {
    this.classList.remove('anim-shake');
  }, 500);
});