// Request information
let reqInfo = {url: `http://getpost.itgid.info/index2.php?`,
                params: {auth: `DdC33D7d2C2a7`},
                options: {
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
                }};

// Function to create fetch promise
function reqPromise(reqObj){
    return new Promise((resolve)=>{
        fetch(reqObj.url, reqObj.options)
        .then(req=>{resolve(req.text())})
    });
};

// Function to return result into the target div 
function result(answer, ind){
    document.querySelector(`.out-${ind}`).textContent = answer;
}

// Initialize all buttons
document.querySelectorAll('button')
.forEach((el,ind)=>el.onclick = window[`t${ind+1}`]);

// Task 1 ============================================
/* 
 <p>Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 1. </p>
<p>Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 2. </p>
<p>Два запроса объедините с помощью promiseAll. Результат выведите в out-1 результат. Запускаться функция
    должна по нажатию b-1.</p>
*/

function t1() {
    let info1 = JSON.parse(JSON.stringify(reqInfo));
    let info2 = JSON.parse(JSON.stringify(reqInfo));
    
    info1.params.action = 1;
    info2.params.action = 2;
    // info2.params.name = `Magomed`;
    
    for(let i in info1.params)info1.url += `${i}=${info1.params[i]}&`;
    for(let i in info2.params)info2.url += `${i}=${info2.params[i]}&`;
    info1.options.method = 'GET';
    info2.options.method = 'GET';
    info1.options = null;
    info2.options = null;

    let req1 = reqPromise(info1);
    let req2 = reqPromise(info2);
    
    Promise.all([req1,req2]).then(arr=>result(`Responce-1: ${arr[0]},
    Responce-2: ${arr[1]}`, 1))
}

// ваше событие здесь!!!

// Task 2 ============================================
/* 
 <p> Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 3. Добавьте
параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет сумму чисел.</p>
<p>Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 4.
Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет случайное число в
заданном
диапазоне.</p>
<p>Два запроса объедините с помощью promiseAll.
Выведите в out-2 результат. Запускаться функция должна по нажатию b-2. </p>

*/

function t2() {
    let info1 = JSON.parse(JSON.stringify(reqInfo));
    let info2 = JSON.parse(JSON.stringify(reqInfo));

    info1.params.action = 3;
    info2.params.action = 4;
    info1.params.num1 = Math.floor(Math.random()*100);
    info1.params.num2 = Math.floor(Math.random()*100);
    info2.params.num1 = Math.floor(Math.random()*100);
    info2.params.num2 = Math.floor(Math.random()*100);

    for(let i in info1.params)info1.url += `${i}=${info1.params[i]}&`;
    for(let i in info2.params)info2.url += `${i}=${info2.params[i]}&`;
    info1.options.method = 'GET';
    info2.options.method = 'GET';
    info1.options = null;
    info2.options = null;
    
    let req1 = reqPromise(info1);
    let req2 = reqPromise(info2);

    Promise.all([req1, req2]).then(arr=>result(`Num-1: ${arr[0]},
    Num-2: ${arr[1]}`, 2));
    // Promise.all([req1, req2]).then(arr=>result(arr[0]*1+arr[1]*1, 2));
}

// ваше событие здесь!!!


// Task 3 ============================================
/*  
<p> Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 5.
Если все сделано верно, сервер вернет текущее время и дату. Не забывайте указывать параметр auth (ключ в
чате). </p>
<p> Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 6.
Добавьте
параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет большее число.</p>
<p>Два
запроса объедините с помощью promiseAll.
Выведите в out-3 результат. Запускаться функция должна по нажатию b-3. </p>
                 */

function t3() {
    let info1 = JSON.parse(JSON.stringify(reqInfo));
    let info2 = JSON.parse(JSON.stringify(reqInfo));

    info1.params.action = 5;
    info2.params.action = 6;
    info2.params.num1 = Math.floor(Math.random()*10);
    info2.params.num2 = Math.floor(Math.random()*10);

    for(let i in info1.params)info1.url += `${i}=${info1.params[i]}&`;
    for(let i in info2.params)info2.url += `${i}=${info2.params[i]}&`;
    info1.options.method = 'GET';
    info2.options.method = 'GET';
    info1.options = null;
    info2.options = null;

    let req1 = reqPromise(info1);
    let req2 = reqPromise(info2);

    Promise.all([req1, req2]).then(arr=>result(`Date-time: ${arr[0]}, 
    Biggest number:${arr[1]}`, 3));
}

// ваше событие здесь!!!


// Task 4 ============================================
/*  
 <p> Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 7.
Если все
сделано верно, сервер случайную ссылку на изображение. Не забывайте указывать параметр auth (ключ в
чате). </p>
<p>Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 8. В
качестве параметра по очереди укажите year равный году вашего рождения. Если все правильно сервер вернет
ваш возраст.</p>
<p>Выведите в out-4 результат. Запускаться функция должна по нажатию b-4.</p>

*/

function t4() {
    let info1 = JSON.parse(JSON.stringify(reqInfo));
    let info2 = JSON.parse(JSON.stringify(reqInfo));

    info1.params.action = 7;
    info2.params.action = 8;
    info2.params.year = 1990;

    for(let i in info1.params)info1.url += `${i}=${info1.params[i]}&`;
    for(let i in info2.params)info2.url += `${i}=${info2.params[i]}&`;
    info1.options.method = 'GET';
    info2.options.method = 'GET';
    info1.options = null;
    info2.options = null;

    let req1 = reqPromise(info1);
    let req2 = reqPromise(info2);

    Promise.all([req1, req2]).then(arr=>result(`Img link: ${arr[0]},
     ${arr[1]}`, 4));
}

// ваше событие здесь!!!

// Task 5 ============================================
/*  
 <p>Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 1.</p>
<p>Отправьте
POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 2. </p>
<p>Два
запроса объедините с помощью promiseAll. Результат выведите в out-5 результат. Запускаться функция
должна по нажатию b-5.</p>
*/

function t5() {
    let info1 = JSON.parse(JSON.stringify(reqInfo));
    let info2 = JSON.parse(JSON.stringify(reqInfo));

    info1.params.action = 1;
    info2.params.action = 2;
    // info2.params.name = `Magomed`;

    for(let i in info1.params)info1.options.body += `${i}=${info1.params[i]}&`;
    for(let i in info2.params)info2.options.body += `${i}=${info2.params[i]}&`;

    let req1 = reqPromise(info1);
    let req2 = reqPromise(info2);

    Promise.all([req1, req2]).then(arr=>result(`Response-1: ${arr[0]}, 
    Response-2: ${arr[1]}`, 5));
}

// ваше событие здесь!!!

// Task 6 ============================================
/* 
 <p> Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 3.
    Добавьте
    параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет сумму чисел. </p>
<p>Отправьте POST
    запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 4.
    Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет случайное число в
    заданном
    диапазоне.</p>
<p> Два запроса объедините с помощью promiseAll.
    Выведите в
    out-6 результат. Запускаться функция должна по нажатию b-6. </p>
*/

function t6() {
    let info1 = JSON.parse(JSON.stringify(reqInfo));
    let info2 = JSON.parse(JSON.stringify(reqInfo));

    info1.params.action = 3;
    info2.params.action = 4;
    info1.params.num1 = Math.floor(Math.random()*100);
    info1.params.num2 = Math.floor(Math.random()*100);
    info2.params.num1 = Math.floor(Math.random()*100);
    info2.params.num2 = Math.floor(Math.random()*100);

    for(let i in info1.params)info1.options.body += `${i}=${info1.params[i]}&`;
    for(let i in info2.params)info2.options.body += `${i}=${info2.params[i]}&`;

    let req1 = reqPromise(info1);
    let req2 = reqPromise(info2);

    Promise.all([req1, req2]).then(arr=>result(`Sum: ${arr[0]}, 
    Random Num: ${arr[1]}`, 6));
}   

// ваше событие здесь!!!


// Task 7 ============================================
/*  
 <p> Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 5.
Если все сделано верно, сервер вернет текущее время и дату. Не забывайте указывать параметр auth (ключ в
чате).</p>
<p>Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 6.
Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет большее число.</p>
<p>Два запроса объедините с помощью promiseAll.
Выведите в out-7 результат. Запускаться функция должна по нажатию b-7. </p>

*/

function t7() {
    let info1 = JSON.parse(JSON.stringify(reqInfo));
    let info2 = JSON.parse(JSON.stringify(reqInfo));

    info1.params.action = 5;
    info2.params.action = 6;
    info2.params.num1 = Math.floor(Math.random()*100);
    info2.params.num2 = Math.floor(Math.random()*100);

    for(let i in info1.params)info1.options.body += `${i}=${info1.params[i]}&`;
    for(let i in info2.params)info2.options.body += `${i}=${info2.params[i]}&`;

    let req1 = reqPromise(info1);
    let req2 = reqPromise(info2);

    Promise.all([req1, req2]).then(arr=>result(`Date-time: ${arr[0]}, 
    Biggest Num: ${arr[1]}`, 7));
}

// ваше событие здесь!!!

// Task 8 ============================================
/* 
<p> Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 7.
Если все сделано верно, сервер случайную ссылку на изображение. Не забывайте указывать параметр auth
(ключ в
чате).</p>
<p>Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 8. В
качестве параметра по очереди укажите year равный году вашего рождения. Если все правильно сервер вернет
ваш возраст.</p>
<p>Два запроса объедините с помощью promiseAll. Выведите в out-8 результат. Запускаться функция должна по
нажатию b-8.</p>
*/

function t8() {
    let info1 = JSON.parse(JSON.stringify(reqInfo));
    let info2 = JSON.parse(JSON.stringify(reqInfo));

    info1.params.action = 7;
    info2.params.action = 8;
    info2.params.year = 1990;

    for(let i in info1.params)info1.options.body += `${i}=${info1.params[i]}&`;
    for(let i in info2.params)info2.options.body += `${i}=${info2.params[i]}&`;

    let req1 = reqPromise(info1);
    let req2 = reqPromise(info2);

    Promise.all([req1, req2]).then(arr=>result(`Img link: ${arr[0]}, 
    ${arr[1]}`, 8));
}

// ваше событие здесь!!!

