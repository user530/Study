function createEl(parent, type, name, atrObj) {
    let el = document.createElement(type);
    el.id = `${name}`;
    for(let i in atrObj){
        el.setAttribute(i, atrObj[i]);
    }
    parent.appendChild(el);

    if(el.getAttribute(`type`) != `hidden` && el.getAttribute(`type`) != `submit`){
        let elLab = document.createElement('label');
        elLab.setAttribute(`for`, `${parent.lastChild.id}`);
        elLab.textContent = name;
        parent.insertBefore(elLab, el);
    }
}

const form = document.querySelector('#post');

createEl(form, `input`, `key`, {'type': `hidden`, 'name': `auth`, 'value': `DdC33D7d2C2a7`});
createEl(form, `input`, `action`, {'type': `number`, 'name': `action`});

document.querySelector('#action').addEventListener('change', ev=>{
    switch(ev.target.value){
        case '2':
            createEl(form, `input`, `name`, {'type': `text`, 'name': `name`});
            break
        default: 
            alert('LEL');
    }
})

createEl(form, `input`, `subm`, {'type': `submit`, 'value': `Request`});


// const key = document.createElement('input');
// key.setAttribute(`type`, `hidden`);
// key.setAttribute(`name`, `auth`);
// key.setAttribute(`value`, `DdC33D7d2C2a7`);

// form.append(key);

// const labAct = document.createElement('label');
// labAct.setAttribute(`for`, `action`);
// labAct.innerText = `Action Code:`;

// const act = document.createElement('input');
// act.id = `action`
// act.setAttribute(`type`, `number`);
// act.setAttribute(`name`, `action`);

// const subm = document.createElement('input');
// subm.setAttribute(`type`, `submit`);
// subm.setAttribute(`value`, `Request`);

// form.append(labAct);
// form.append(act);
// form.append(subm);