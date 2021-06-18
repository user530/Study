$(document).ready(function () {
    let scrl = window.pageYOffset, elem = document.querySelector('.footer-logo');

document.onscroll = ()=>{
    scrl = window.pageYOffset;
    if(scrl>= 0.9*(elem.getBoundingClientRect().y + scrl)){
        document.querySelector('.scroll-icon').style.display = 'none'}
    else document.querySelector('.scroll-icon').style.display = 'block';
}

})

/* Move - hide */
document.onmousemove = (function() {
      var onmousestop = function() {
        document.querySelector('.scroll-icon').style.opacity = 1
      }, thread;
        
      return function() {
        clearTimeout(thread);
        thread = setTimeout(onmousestop, 3000);
      };
    })();

document.documentElement.onmousemove = ()=>{document.querySelector('.scroll-icon').style.opacity = 0}

/* Scroll - hide */
window.onscroll = (function() {
    var onscrollstop = function() {
        console.log('lel')
      document.querySelector('.scroll-icon').style.opacity = 1
    }, scrl_thread;
    
    return function() {
      clearTimeout(scrl_thread);
      scrl_thread = setTimeout(onscrollstop, 3000);
    };
  })();

document.addEventListener('scroll', ()=>document.querySelector('.scroll-icon').style.opacity = 0);