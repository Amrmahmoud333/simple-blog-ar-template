let prevScrollPos = window.pageYOffset;
let currentScrollPos = window.pageYOffset;

const changeTop = (element, scrollUp, scrollDown) => {
  if (element)
    element.style.top =
      prevScrollPos > currentScrollPos ? scrollUp : scrollDown;
};
window.onscroll = () => {
  if (window.innerWidth < 768) return;

  currentScrollPos = window.pageYOffset;
  const header = document.getElementsByTagName('header')[0];
  const shareLinks = document.getElementsByClassName('share-links')[0];

  if (header) changeTop(header, '0', '-150px');
  if (shareLinks) changeTop(shareLinks, '0', '-190px');

  prevScrollPos = currentScrollPos;
};
