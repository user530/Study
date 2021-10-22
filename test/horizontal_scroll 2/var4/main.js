document.addEventListener('scroll', function(){
    const el = document.querySelector('.item');
    let out = '';
    out += window.scrollY + ' / ';
    out += document.body.scrollHeight;
    el.innerHTML = out;
    

})

const a = document.querySelector('.d1');