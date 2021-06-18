const newItemField = document.querySelector('#newItemText');
const newItemBtn = document.querySelector('input[type=submit]');
const toDoList = document.querySelector('ul');
const filter = document.querySelector('#filter');


// Add new Task
newItemBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    event.target.onclick = createToDo(newItemField.value);
})

// Function to create the new item
function createToDo(name){
    const listItem = document.createElement('li');
    const delBtn = document.createElement('button');

    listItem.classList.add('list-group-item');
    listItem.innerHTML = name;

    delBtn.classList.add('btn', 'btn-light', 'btn-sm', 'float-right');
    delBtn.type = 'button';
    delBtn.setAttribute('data-action', 'delete');
    delBtn.innerText = `Удалить`;

    delBtn.onclick = (e)=>{
        if(confirm('Вы действительно хотите удалить задачу?'))
        e.target.parentElement.remove();
    }

    listItem.append(delBtn);

    hide(listItem);

    toDoList.prepend(listItem);
    newItemField.value = '';
    
}

// Initial tasks
const initTasks = [`Приготовить завтрак`, `Съездить на вокзал`, `Заправить авто`,
`Переобуться`, `Заехать в гараж`, `Сходить в спортзал`, `Посмотреть урок по JS`,
`Сделать домашку`, `Приготовить ужин`];

initTasks.map((task)=>createToDo(task));

// Filter
filter.oninput = (e)=>{
    for(const li of toDoList.children){
        hide(li);
    }
    
}

function hide(elem){
    const ent = String.fromCharCode(10);
    const text = elem.innerText.slice(0, elem.innerText.indexOf(ent));
    let disp = 'block'; 
    if(!text.toLowerCase().includes(filter.value.toLowerCase())){
        disp = 'none';
    }
    elem.style.display = disp;
}