
const btns = document.querySelectorAll('[type=submit]');

btns.forEach((btn)=>btn.onclick = (e)=>createReq(e.target));

function createReq(element){
    
    const inpClass = element.
                        closest('.contact-form')
                        .getAttribute('data');
    
    const formFields = document.querySelectorAll(`.${inpClass}`);
    
    const req = new XMLHttpRequest();
    let properties = ``;
    
    const url = `index2.php?`;

    for(let field of formFields){
        if(field.getAttribute('type') !== 'file'){
            properties += `${field.name}=${field.value}&`;
        }

    }
    
    req.open('POST', url, true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send(properties);

    req.addEventListener('readystatechange', ()=>{
        if(req.readyState === 4 && req.status === 200){
            alert('Форма отправлена!');
        }
    });

    console.log(req)
}