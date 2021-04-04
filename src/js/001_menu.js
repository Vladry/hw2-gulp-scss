console.log('this is 001_manu.js');

const menuTabs = document.getElementsByClassName('header-menu__tab');
const menuOpenTab = menuTabs[0];
const menuCloseTab = menuTabs[1];
const menuItems = document.getElementsByClassName('header-menu__menu')[0];

const switchActive = ()=>{
    menuOpenTab.classList.toggle('--active');
    menuCloseTab.classList.toggle('--active');
    menuItems.classList.toggle('--active');
};

menuOpenTab.addEventListener('click', switchActive);
menuCloseTab.addEventListener('click', switchActive);
