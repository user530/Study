
// Task 1 ============================================
/* Добавьте на блок .div-1 событие клик и по клику запуск функции t1. Функция должна возвращать и выводить на экран содержимое блока (только текст). Вывод осуществляется в out-1.  */

function t1(ev) {
    let out = ev.target.textContent
    document.querySelector('.out-1').textContent = out;
    return out
}

document.querySelector('.div-1').onclick = (e)=>{t1(e)}

// ваше событие здесь!!!

// Task 2 ============================================
/*  Добавьте на блок .div-2 событие клик и по клику запуск функции t2. Функция должна возвращать true или false в зависимости от того, нажата ли клавиша alt или нет в момент клика. Также, выводите на экран результат. Вывод осуществляется в out-2. */

function t2(ev) {
    let out = ev.altKey
    document.querySelector('.out-2').textContent = out;
    return out
}

document.querySelector('.div-2').onclick = (e)=>{t2(e)}
// ваше событие здесь!!!


// Task 3 ============================================
/*  Добавьте на блок .div-3 событие клик. При клике - увеличивайте ширину блока на 5px. Каждый клик - увеличение ширины на 5px. 10 кликов - на 50px. Ширину выводите в out-3. */

let w3 = 75;

function t3(ev) {
    w3 += 5;
    ev.target.style.width = `${w3}px`;
    document.querySelector('.out-3').textContent = `${w3}px`; 
}

document.querySelector('.div-3').onclick = (e)=>t3(e)
// ваше событие здесь!!!


// Task 4 ============================================
/*  Добавьте на блок .div-4 событие двойной клик и по двойному клику запуск функции t4. Функция должна возвращать и выводить на экран содержимое блока (только текст). Вывод осуществляется в out-4. */

function t4(ev) {
    let out = ev.target.textContent;
    document.querySelector('.out-4').textContent = out;
    return out
}

document.querySelector('.div-4').ondblclick = (e)=>t4(e)
// ваше событие здесь!!!

// Task 5 ============================================
/*  Дан блок .div-5.active. Добавьте на него событие двойной клик, по которому удалется класс active если он есть и добавляется если такого класса нет. */

function t5(ev) {
    ev.target.classList.toggle('active');
}

document.querySelector('.div-5').ondblclick = (e)=>t5(e);
// ваше событие здесь!!!

// Task 6 ============================================
/*  Дан блок .div-6 и список .ul-6. При двойном клике на блоке скрывайте .ul-6 еcли он показан и показывайте если скрыт. Скрытие и показ делайте через добавление - удаление класса .hide */

function t6(ev) {
    ev.target.nextElementSibling.classList.toggle('hide');
}

document.querySelector('.div-6').ondblclick = e=>t6(e);
// ваше событие здесь!!!


// Task 7 ============================================
/*  Дан блок .div-7. При клике правой кнопкой мыши на блоке добавляйте ему класс .active. При повторном клике - удаляйте. */

function t7(ev) {
    ev.target.classList.toggle('active');
}

document.querySelector('.div-7').oncontextmenu = e=>t7(e);
// ваше событие здесь!!!

// Task 8 ============================================
/*  Дано checkbox .ch-8. Повесьте на него событие onchange при котором на документе отключается клик правой кнопкой мыши если checkbox выбран и отключает если не выбран. */

function t8(ev) {
    document.oncontextmenu = ()=>{return ev.target.checked};
}

document.querySelector('.ch-8').onchange = e=>t8(e);
// ваше событие здесь!!!


// Task 9 ============================================
/*  Дан блок .div-9. Внутри блока - изображение 1.png. При клике правой кнопкой мыши  - меняйте изображение на 2.png. Надеюсь вы догадаетесь изменить только src изображения? */

function t9(ev) {
    ev.target.setAttribute('src','img/2.png');
}

document.querySelector('.div-9').oncontextmenu = (e)=>t9(e);
// ваше событие здесь!!!


// Task 10 ============================================
/*  Дан блок .div-10. Внутри блока - изображение 1.png. При наведении мыши (mouseenter)  - меняйте изображение на 2.png. */

function t10(ev) {
    ev.target.firstElementChild.setAttribute('src','img/2.png');
}

document.querySelector('.div-10').onmouseenter = (e)=>t10(e);
// ваше событие здесь!!!

// Task 11 ============================================
/*  Дан блок .div-11. Внутри блока - изображение 1.png. При наведении мыши (mouseenter)  - меняйте изображение на 2.png. При уведении мыши - mouseleave - возвращайте исходное изображение. */

function t11(ev) {
   let src = '';
   if(ev.type == 'mouseenter'){
       src = `img/2.png`;
   }else{
    src = `img/1.png`;
   }
   ev.target.firstElementChild.setAttribute('src',src);
}

document.querySelector('.div-11').onmouseenter = (e)=>t11(e);
document.querySelector('.div-11').onmouseleave = (e)=>t11(e);

// ваше событие здесь!!!

// Task 12 ============================================
/*  Дан блок .div-12. Добавьте на него событие mousedown - при нажатии кнопки мыши - добавляйте ему класс active. */

document.querySelector('.div-12').onmousedown = (e)=>{e.target.classList.add('active')}
// ваше событие здесь!!!


// Task 13 ============================================
/*  Дан блок .div-13. Добавьте на него событие mousedown - при нажатии кнопки мыши - добавляйте ему класс active. Добавьте ему событие mouseup - при отпускании мыши - удаляйте класс active. */

document.querySelector('.div-13').onmousedown = (e)=>{
    e.target.classList.add('active')};
document.querySelector('.div-13').onmouseup = (e)=>{
    e.target.classList.remove('active');};

// ваше событие здесь!!!


// Task 14 ============================================
/*  Дан блок .div-14. При нажатии кнопки b-14 добавляйте к нему событие onclick - которое, при клике добавляем блоку div-14 класс active. */

function t14() {
    document.querySelector('.div-14').onclick = (e)=>e.target.classList.add('active');
}
document.querySelector('.b-14').onclick = t14;


// Task 15 ============================================
/*  Дан блок .div-15. Добавьте на него событие move. При каждом движении мыши увеличивайте число внутри на 1. */

function t15(ev) {
    ev.target.innerText = +ev.target.innerText + 1;
}
document.querySelector('.div-15').onmousemove = (e)=>t15(e)
// ваше событие здесь!!!


// Task 16 ============================================
/*  Дан блок .div-16. Добавьте на него событие move. При каждом движении мыши увеличивайте ширину блока на 1px. */

function t16(ev) {
    let w = window.getComputedStyle(ev.target).width;
    w = +w.slice(0,w.indexOf('px')) + 1;
    ev.target.style.width = `${w}px`;
}
document.querySelector('.div-16').onmousemove = (e)=>t16(e);
// ваше событие здесь!!!

// Task 17 ============================================
/*  Дано две кнопки - b-17_on и b-17_off. Напишите фукнции t17On и t17Off которые включают и отключают событие move в задании 16. */

function t17On() {
    document.querySelector('.div-16').onmousemove = (e)=>t16(e);
}

function t17Off() {
    document.querySelector('.div-16').onmousemove = ()=>{};
}

document.querySelector('.b-17_on').onclick = t17On;
document.querySelector('.b-17_off').onclick = t17Off;

// ваше событие здесь!!!
// ваше событие здесь!!!

// Task 18 ============================================
/*  Дан блок div-18. Напишите фукнцию t18 которая выводит в данный блок его ширину при событии onmouseenter. */

function t18(ev) {
    ev.target.textContent = window.getComputedStyle(ev.target).width;
}

document.querySelector('.div-18').onmouseenter = e=>t18(e);
// ваше событие здесь!!!

// Task 19 ============================================
/*  Дан блок div-19. Напишите фукнцию t19 которая выводит в данный блок его классы при событии onmouseout. */

function t19(ev) {
    let out = '';
    ev.target.classList.forEach((v)=>out+=`${v} `);
    ev.target.textContent = out;
}

document.querySelector('.div-19').onmouseout = (e)=>t19(e);
// ваше событие здесь!!!


// Task 20 ============================================
/*  Дан элемент progress. Напишите фукнцию t20 которая увеличивает его value на 1 при каждом событии mousemove внутри progress. */

function t20(ev) {
    ev.target.value++;
}

document.querySelector('progress').onmousemove = (e)=>t20(e);
// ваше событие здесь!!!