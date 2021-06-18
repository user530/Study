// Create some tools for the regular use
//----------------------------------------------------------------------------
// Function to create local variables
function locStart(){
    let locReq = new XMLHttpRequest();
    let locLink = `http://getpost.itgid.info/index2.php?`;
    let locParams = JSON.parse(JSON.stringify({'auth': `DdC33D7d2C2a7`}));
    let locBody = ``;

    return{'request': locReq, 'link': locLink, 'paramObj': locParams, 'body': locBody};
}

// Function to return the request response text into the target element
function result(request, elClass){
    if(request.readyState == 4 && request.status == 200){
        document.querySelector(elClass).textContent = request.responseText;
    }
}

// Initialize all buttons
const btns = document.querySelectorAll('button');
btns.forEach((val,key)=>val.onclick = window[`t${key + 1}`]);

//----------------------------------------------------------------------------

// Task 1 ============================================
/* Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 1. Выведите в out-1 результат. Запускаться функция должна по нажатию b-1. */

function t1() {
    let ls = locStart();

    ls.paramObj.action = `1`;
    for(i in ls.paramObj)ls.link += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`GET`, ls.link, true);
    ls.request.send();

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-1`);
}

// document.querySelector('.b-1').onclick = t1;
// ваше событие здесь!!!

// Task 2 ============================================
/* Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 2. Добавьте параметр name с вашим именем на латинице. Если все сделано верно, сервер пришлет строку hello ваше имя. Выведите в out-2 результат. Запускаться функция должна по нажатию b-2. */

function t2() {
    let ls = locStart();

    ls.paramObj.action = `2`;
    ls.paramObj.name = `Magomed`;
    for(i in ls.paramObj)ls.link += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`GET`, ls.link, true);
    ls.request.send();

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-2`);
}

// ваше событие здесь!!!


// Task 3 ============================================
/*  Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 3. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет сумму чисел.  Выведите в out-3 результат. Запускаться функция должна по нажатию b-3. */

function t3() {
    let ls = locStart();

    ls.paramObj.action = `3`;
    ls.paramObj.num1 = Math.floor(Math.random()*100);
    ls.paramObj.num2 = Math.floor(Math.random()*100);

    for(i in ls.paramObj)ls.link += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`GET`, ls.link, true);
    ls.request.send();

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-3`);
}

// ваше событие здесь!!!


// Task 4 ============================================
/*  Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 4. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет случайное число в заданном диапазоне. Не забывайте указывать параметр auth (ключ в чате).  Выведите в out-4 результат. Запускаться функция должна по нажатию b-4. */

function t4() {
    let ls = locStart();

    ls.paramObj.action = `4`;
    ls.paramObj.num1 = Math.floor(Math.random()*100);
    ls.paramObj.num2 = Math.floor(Math.random()*100);

    for(i in ls.paramObj)ls.link += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`GET`, ls.link, true);
    ls.request.send();

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-4`);

}

// ваше событие здесь!!!

// Task 5 ============================================
/*  Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 5. Если все сделано верно, сервер вернет текущее время и дату. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-5 результат. Запускаться функция должна по нажатию b-5. */

function t5() {
    let ls = locStart();

    ls.paramObj.action = `5`;

    for(i in ls.paramObj)ls.link += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`GET`, ls.link, true);
    ls.request.send();

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-5`);
}

// ваше событие здесь!!!

// Task 6 ============================================
/*  Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 6. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет большее число. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-6 результат. Запускаться функция должна по нажатию b-6. */

function t6() {
    let ls = locStart();

    ls.paramObj.action = `6`;
    ls.paramObj.num1 = Math.floor(Math.random()*100);
    ls.paramObj.num2 = Math.floor(Math.random()*100);

    for(i in ls.paramObj)ls.link += `${i}=${ls.paramObj[i]}&`;
    
    ls.request.open('GET', ls.link, true);
    ls.request.send();

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-6`);
}

// ваше событие здесь!!!


// Task 7 ============================================
/*  Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 7. Если все сделано верно, сервер случайную ссылку на изображение. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-7 результат. Запускаться функция должна по нажатию b-7. */

function t7() {
    let ls = locStart();

    ls.paramObj.action = "7";
    for(let i in ls.paramObj)ls.link += `${i}=${ls.paramObj[i]}&`;

    ls.request.open('GET', ls.link, true);
    ls.request.send();

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-7`);
}

// ваше событие здесь!!!

// Task 8 ============================================
/* Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 8. В качестве параметра по очереди укажите year равный году вашего рождения. Если все правильно сервер вернет ваш возраст. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-8 результат. Запускаться функция должна по нажатию b-8.*/

function t8() {
    let ls = locStart();

    ls.paramObj.action = `8`;
    ls.paramObj.year = `1990`;

    for(i in ls.paramObj)ls.link += `${i}=${ls.paramObj[i]}&`;

    ls.request.open('GET', ls.link, true);
    ls.request.send();

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-8`);

}

// ваше событие здесь!!!


// Task 9 ============================================
/* Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 9. В качестве параметра по очереди укажите m = 1, d=1, y=1. Если все сделано верно, сервер возвратит дату или месяц или год. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-9 результат. Запускаться функция должна по нажатию b-9. */

function t9() {
    let ls = locStart();

    ls.paramObj.action = `9`;
    // ls.paramObj.m = `1`;
    // ls.paramObj.d = `1`;
    ls.paramObj.y = `1`;

    for(i in ls.paramObj)ls.link += `${i}=${ls.paramObj[i]}&`
    
    ls.request.open(`GET`, ls.link, true);
    ls.request.send();

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-9`);

}

// ваше событие здесь!!!


// Task 10 ============================================
/*  Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 1. Если все сделано верно, сервер пришлет строку hello. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-10 результат. Запускаться функция должна по нажатию b-10.

*/

function t10() {
    let ls = locStart();

    ls.paramObj.action = `1`;
    for(i in ls.paramObj)ls.body += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`POST`, ls.link, true);
    ls.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ls.request.send(ls.body);

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-10`);
}
// Task 11 ============================================
/*  Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 2. Добавьте параметр name с вашим именем на латинице. Если все сделано верно, сервер пришлет строку hello ваше имя. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-11 результат. Запускаться функция должна по нажатию b-11. */

function t11() {
    let ls = locStart();

    ls.paramObj.action = `2`;
    ls.paramObj.name = `Magomed`;
    for(i in ls.paramObj)ls.body += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`POST`, ls.link, true);
    ls.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ls.request.send(ls.body);

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-11`);
}

// ваше событие здесь!!!

// Task 12 ============================================
/*  Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 3. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет сумму чисел. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-12 результат. Запускаться функция должна по нажатию b-12.*/

function t12() {
    let ls = locStart();

    ls.paramObj.action = `3`;
    ls.paramObj.num1 = Math.floor(Math.random()*100);
    ls.paramObj.num2 = Math.floor(Math.random()*100);
    for(i in ls.paramObj)ls.body += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`POST`, ls.link, true);
    ls.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ls.request.send(ls.body);

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-12`);
}

// ваше событие здесь!!!

// Task 13 ============================================
/*  Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 4. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет случайное число в заданном диапазоне. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-13 результат. Запускаться функция должна по нажатию b-13.*/

function t13() {
    let ls = locStart();

    ls.paramObj.action = `4`;
    ls.paramObj.num1 = Math.floor(Math.random()*100);
    ls.paramObj.num2 = Math.floor(Math.random()*100);
    for(i in ls.paramObj)ls.body += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`POST`, ls.link, true);
    ls.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ls.request.send(ls.body);

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-13`);
}

// ваше событие здесь!!!

// Task 14 ============================================
/*  Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 5. Если все сделано верно, сервер вернет текущее время и дату. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-14 результат. Запускаться функция должна по нажатию b-14.*/

function t14() {
    let ls = locStart();

    ls.paramObj.action = `5`;
    for(i in ls.paramObj)ls.body += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`POST`, ls.link, true);
    ls.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ls.request.send(ls.body);

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-14`);
}

// ваше событие здесь!!!

// Task 15============================================
/*  Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 6. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет большее число. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-15 результат. Запускаться функция должна по нажатию b-15. */

function t15() {
    let ls = locStart();

    ls.paramObj.action = `6`;
    ls.paramObj.num1 = Math.floor(Math.random()*100);
    ls.paramObj.num2 = Math.floor(Math.random()*100);
    for(i in ls.paramObj)ls.body += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`POST`, ls.link, true);
    ls.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ls.request.send(ls.body);

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-15`);
}

// ваше событие здесь!!!

// Task 16 ============================================
/*  Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 7. Если все сделано верно, сервер случайную ссылку на изображение. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-16 результат. Запускаться функция должна по нажатию b-16. */

function t16() {
    let ls = locStart();

    ls.paramObj.action = `7`;
    for(i in ls.paramObj)ls.body += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`POST`, ls.link, true);
    ls.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ls.request.send(ls.body);

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-16`);
}

// ваше событие здесь!!!

// Task 17 ============================================
/*  Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 8. В качестве параметра по очереди укажите year равный году вашего рождения. Если все правильно сервер вернет ваш возраст. Не забывайте указывать параметр auth (ключ в чате).Выведите в out-17 результат. Запускаться функция должна по нажатию b-17. */

function t17() {
    let ls = locStart();

    ls.paramObj.action = `8`;
    ls.paramObj.year = 1990;
    for(i in ls.paramObj)ls.body += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`POST`, ls.link, true);
    ls.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ls.request.send(ls.body);

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-17`);
}

// ваше событие здесь!!!

// Task 18 ============================================
/*  Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 9. В качестве параметра по очереди укажите m = 1, d=1, y=1. Если все сделано верно, сервер возвратит дату или месяц или год. Не забывайте указывать параметр auth (ключ в чате). Выведите в out-18 результат. Запускаться функция должна по нажатию b-18. */

function t18() {
    let ls = locStart();

    ls.paramObj.action = `9`;
    ls.paramObj.m = 1;
    // ls.paramObj.d = 1;
    // ls.paramObj.y = 1;
    for(i in ls.paramObj)ls.body += `${i}=${ls.paramObj[i]}&`;

    ls.request.open(`POST`, ls.link, true);
    ls.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ls.request.send(ls.body);

    ls.request.onreadystatechange = ()=>result(ls.request, `.out-18`);
}

// ваше событие здесь!!!

