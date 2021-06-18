
let serv = {'url': 'http://getpost.itgid.info/index2.php?', 
            'params': {'auth': `DdC33D7d2C2a7`},
            'options': {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: ''
              }
            }

// Output the result into div.out-X
function answer(res, ind){
    document.querySelector(`.out-${ind}`).textContent = res;
}

// Assign each function to button;
let btns = document.querySelectorAll('button');
btns.forEach((el,key)=>el.onclick = ()=>{window[`t${key+1}`]()}); 

// Task 1 ============================================
/* Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 1. Выведите в out-1 результат. Запускаться функция должна по нажатию b-1. */

async function t1() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 1;
    for(let i in info.params)info.url +=`${i}=${info.params[i]}&`;
    
    let req = await fetch(info.url);
    let txt = await req.text();
    answer(txt,1);
}

// ваше событие здесь!!!

// Task 2 ============================================
/* Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 2. Добавьте параметр name с вашим именем на латинице. Если все сделано верно, сервер пришлет строку hello ваше имя. Выведите в out-2 результат. Запускаться функция должна по нажатию b-2. */

async function t2() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 2;
    info.params.name = `Magomed`;
    for(let i in info.params)info.url += `${i}=${info.params[i]}&`;
    
    let req = await fetch(info.url);
    let txt = await req.text();
    answer(txt, 2);
}

// ваше событие здесь!!!


// Task 3 ============================================
/*  Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 3. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет сумму чисел.  Выведите в out-3 результат. Запускаться функция должна по нажатию b-3. */

function t3() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 3;
    info.params.num1 = Math.floor(Math.random()*100);
    info.params.num2 = Math.floor(Math.random()*100);
    for(let i in info.params)info.url += `${i}=${info.params[i]}&`;

    fetch(info.url)
    .then(response=>response.text())
    .then(respText=>answer(respText,3))
}

// ваше событие здесь!!!


// Task 4 ============================================
/*  Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 4. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет случайное число в заданном диапазоне. Не забывайте указывать параметр auth (ключ в чате).  Выведите в out-4 результат. Запускаться функция должна по нажатию b-4. */

async function t4() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 4;
    info.params.num1 = Math.floor(Math.random()*100);
    info.params.num2 = Math.floor(Math.random()*100);
    for(let i in info.params)info.url += `${i}=${info.params[i]}&`;
    
    fetch(info.url)
    .then(response=>response.text())
    .then(ans=>answer(ans,4));
}

// ваше событие здесь!!!

// Task 5 ============================================
/*  Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 5. Если все сделано верно, сервер вернет текущее время и дату. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-5 результат. Запускаться функция должна по нажатию b-5. */

async function t5() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 5;
    for(let i in info.params)info.url += `${i}=${info.params[i]}&`;

    let request = await fetch(info.url)
    let ans = await request.text();
    answer(ans, 5);
}

// ваше событие здесь!!!

// Task 6 ============================================
/*  Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 6. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет большее число. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-6 результат. Запускаться функция должна по нажатию b-6. */

function t6() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 6;
    info.params.num1 = Math.floor(Math.random()*10);
    info.params.num2 = Math.floor(Math.random()*10);
    for(let i in info.params)info.url += `${i}=${info.params[i]}&`

    fetch(info.url)
    .then(request=>request.text())
    .then(text=>answer(text, 6));
}

// ваше событие здесь!!!


// Task 7 ============================================
/*  Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 7. Если все сделано верно, сервер случайную ссылку на изображение. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-7 результат. Запускаться функция должна по нажатию b-7. */

async function t7() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 7;
    for(let i in info.params)info.url += `${i}=${info.params[i]}&`

    let request = await fetch(info.url);
    let txt = await request.text();
    answer(txt, 7); 
}

// ваше событие здесь!!!

// Task 8 ============================================
/* Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 8. В качестве параметра по очереди укажите year равный году вашего рождения. Если все правильно сервер вернет ваш возраст. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-8 результат. Запускаться функция должна по нажатию b-8.*/

function t8() {
    const info = JSON.parse(JSON.stringify(serv));
    info.params.action = 8;
    info.params.year = 1990;
    for(let i in info.params)info.url += `${i}=${info.params[i]}&`;

    fetch(info.url)
    .then(request=>request.text())
    .then(text=>answer(text, 8));

}

// ваше событие здесь!!!


// Task 9 ============================================
/* Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 9. В качестве параметра по очереди укажите m = 1, d=1, y=1. Если все сделано верно, сервер возвратит дату или месяц или год. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-9 результат. Запускаться функция должна по нажатию b-9. */

async function t9() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 9;
    // info.params.m = 1;
    // info.params.d = 1;
    info.params.y = 1;
    for(let i in info.params)info.url += `${i}=${info.params[i]}&`;

    let request = await fetch(info.url);
    let text = await request.text();
    answer(text, 9);
}

// ваше событие здесь!!!


// Task 10 ============================================
/*  Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 1. Если все сделано верно, сервер пришлет строку hello. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-10 результат. Запускаться функция должна по нажатию b-10.

*/

function t10() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 1;
    for(let i in info.params)info.options.body += `${i}=${info.params[i]}&`

    fetch(info.url, info.options)
    .then(req=>req.text())
    .then(txt=>answer(txt, 10));
}
// Task 11 ============================================
/*  Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 2. Добавьте параметр name с вашим именем на латинице. Если все сделано верно, сервер пришлет строку hello ваше имя. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-11 результат. Запускаться функция должна по нажатию b-11. */

async function t11() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 2;
    info.params.name = 'Magomed';
    for(let i in info.params)info.options.body += `${i}=${info.params[i]}&`;
    
    let req = await fetch(info.url, info.options);
    let txt = await req.text();
    answer(txt, 11);

}

// ваше событие здесь!!!

// Task 12 ============================================
/*  Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 3. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет сумму чисел. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-12 результат. Запускаться функция должна по нажатию b-12.*/

function t12() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 3;
    info.params.num1 = Math.floor(Math.random() * 50);
    info.params.num2 = Math.floor(Math.random() * 50);
    for(let i in info.params)info.options.body += `${i}=${info.params[i]}&`;

    fetch(info.url, info.options)
    .then(req=>req.text())
    .then(txt=>answer(txt, 12));
}

// ваше событие здесь!!!

// Task 13 ============================================
/*  Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 4. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет случайное число в заданном диапазоне. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-13 результат. Запускаться функция должна по нажатию b-13.*/

async function t13() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 4;
    info.params.num1 = Math.floor(Math.random() * 100);
    info.params.num2 = Math.floor(Math.random() * 100);
    for(let i in info.params)info.options.body += `${i}=${info.params[i]}&`; 

    let req = await fetch(info.url, info.options);
    let txt = await req.text();
    answer(txt, 13);
}

// ваше событие здесь!!!

// Task 14 ============================================
/*  Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 5. Если все сделано верно, сервер вернет текущее время и дату. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-14 результат. Запускаться функция должна по нажатию b-14.*/

function t14() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 5;
    for(let i in info.params)info.options.body += `${i}=${info.params[i]}&`;

    fetch(info.url, info.options)
    .then(req=>req.text())
    .then(txt=>answer(txt, 14));
}

// ваше событие здесь!!!

// Task 15============================================
/*  Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 6. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет большее число. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-15 результат. Запускаться функция должна по нажатию b-15. */

async function t15() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 6;
    info.params.num1 = Math.floor(Math.random() * 100);
    info.params.num2 = Math.floor(Math.random() * 100);
    for(let i in info.params)info.options.body += `${i}=${info.params[i]}&`;

    let req = await fetch(info.url, info.options);
    let txt = await req.text();
    answer(txt, 15);
}

// ваше событие здесь!!!

// Task 16 ============================================
/*  Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 7. Если все сделано верно, сервер случайную ссылку на изображение. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-16 результат. Запускаться функция должна по нажатию b-16. */

function t16() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 7;
    for(let i in info.params)info.options.body += `${i}=${info.params[i]}&`;

    fetch(info.url, info.options)
    .then(req=>req.text())
    .then(txt=>answer(txt, 16));
}

// ваше событие здесь!!!

// Task 17 ============================================
/*  Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 8. В качестве параметра по очереди укажите year равный году вашего рождения. Если все правильно сервер вернет ваш возраст. Не забывайте указывать параметр auth (ключ в чате).Выведите в out-17 результат. Запускаться функция должна по нажатию b-17. */

async function t17() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 8;
    info.params.year = 1990;
    for(let i in info.params)info.options.body += `${i}=${info.params[i]}&`;

    let req = await fetch(info.url, info.options);
    let txt = await req.text();
    answer(txt, 17);
}

// ваше событие здесь!!!

// Task 18 ============================================
/*  Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 9. В качестве параметра по очереди укажите m = 1, d=1, y=1. Если все сделано верно, сервер возвратит дату или месяц или год. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-18 результат. Запускаться функция должна по нажатию b-18. */

function t18() {
    let info = JSON.parse(JSON.stringify(serv));
    info.params.action = 9;
    // info.params.m = 1;
    // info.params.d = 1;
    info.params.y = 1;
    for(let i in info.params)info.options.body += `${i}=${info.params[i]}&`;

    fetch(info.url, info.options)
    .then(req=>req.text())
    .then(ans=>answer(ans, 18));
}

// ваше событие здесь!!!

