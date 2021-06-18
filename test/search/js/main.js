const inp = document.querySelector('input'),
    art = document.querySelector('p');

function addText() {
    inp.addEventListener('input', (e) => {
        console.log(inp.value)
        if (inp.value.length == 0) {
            art.classList.add('none')
            art.classList.remove('activ')
            console.log(inp.value.length)
        } else {
            art.classList.add('activ')
            art.classList.remove('none')
            let t=inp.value.length*27
            art.style.left = `${t}px`
            console.log(t)
            console.log(inp.value.length)
        }
    })
}
addText();