// src/utils/scroll-lock.js
const $body = document.querySelector('body');
const classes = [ 'overflow-hidden', 'md:overflow-auto'];

function enableScrollLock() {
  $body.classList.add(...classes);
}

function disableScrollLock() {
  $body.classList.remove(...classes);
}

export {
  enableScrollLock,
  disableScrollLock
};
