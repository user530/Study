
// Task 1 ============================================
/* Дан input .i-1. Напишите функцию t1, которая выводит в .out-1 символ и возвращает его. Во всех последующих задачах - работаем с латиницей и цифрами.*/

function t1(ev) {
    document.querySelector('.out-1').textContent = ev.key;
    return ev.key
}

document.querySelector('.i-1').onkeypress = (e)=>t1(e);
// ваше событие здесь!!!

// Task 2 ============================================
/*  Дан input .i-2. Напишите функцию t2, которая выводит в .out-2 код символа и возвращает его. */

function t2(ev) {
    document.querySelector('.out-2').textContent = ev.charCode
}

document.querySelector('.i-2').onkeypress = e=>t2(e);
// ваше событие здесь!!!


// Task 3 ============================================
/*  Дан input .i-3. Напишите функцию t3, которая выводит на страницу true если введен символ и false если цифра. Для определения - используйте код клавиши. */

let w3 = 75;

function t3(ev) {
    let out = ev.charCode<47||ev.charCode>57
    document.querySelector('.out-3').textContent = out;
    return out
}

document.querySelector('.i-3').onkeypress = e=>t3(e);
// ваше событие здесь!!!


// Task 4 ============================================
/*  Дан input .i-4. Напишите функцию t4, которая выводит в .out-4 только символы в нижнем регистре. Т.е. ввели ab4Bci в out получаем ab4bci. */

function t4(ev) {
    document.querySelector('.out-4').textContent += ev.key.toLowerCase();
}

document.querySelector('.i-4').onkeypress = e=>t4(e);
// ваше событие здесь!!!

// Task 5 ============================================
/*  Дан input .i-5. Напишите функцию t5, которая выводит в .out-5 все вводимые символы в верхнем регистре. Т.е. пользователь ввел AbCd и функция выведет ABCD. */

function t5(ev) {
    document.querySelector('.out-5').textContent += ev.key.toUpperCase();
}

document.querySelector('.i-5').onkeypress = e=>t5(e);
// ваше событие здесь!!!

// Task 6 ============================================
/*  Дан input .i-6. Напишите функцию t6, которая выводит в .i-6 только символы в нижнем регистре.  */

function t6(ev) {
    document.querySelector('.out-6').textContent += ev.key.toLowerCase();
}

document.querySelector('.i-6').onkeypress = e=>t6(e);
// ваше событие здесь!!!


// Task 7 ============================================
/*  Дан input .i-7. Напишите функцию t7, которая выводит в .out-7 случаный символ из массива a7 при каждом вводе символа. */

function t7() {
    const a7 = [];
    for(let i = 33; a7.length < 90; i++){
        a7.push(String.fromCharCode(i));
    }

    document.querySelector('.out-7').textContent = 
        a7[Math.floor(Math.random()*(a7.length-1))];
    return false
}

document.querySelector('.i-7').onkeypress = ()=>{t7()};
// ваше событие здесь!!!

// Task 8 ============================================
/*  Дан input .i-8. Напишите функцию t8, которая выводит в .out-8 вводимый в input текст, но заменяет i на 1, o на 0, l на 7. */

function t8(ev) {
    let ch = '';
    switch(ev.charCode){
        case 108:
            ch = '7';
            break;
        case 111:
            ch = '0';
            break;
        case 105:
            ch = '1';
            break
        default:
            ch = ev.key;
    }
    document.querySelector('.out-8').textContent += ch;
}

document.querySelector('.i-8').onkeypress = e=>t8(e);
// ваше событие здесь!!!


// Task 9 ============================================
/* Дан input .i-9. Напишите функцию t8, выводит в .out-9 количество нажатых клавиш стрелка вниз. */

function t9(el) {
    let out9 = document.querySelector('.out-9')
    if(el.key == 'ArrowDown')out9.textContent = +out9.textContent + 1;  
}

document.querySelector('.i-9').onkeydown = e=>t9(e);
// ваше событие здесь!!!


// Task 10 ============================================
/*  Дан input .i-10 и изображение 1.png. Добавьте событие на input, при нажатии клавиш стрелка вправо и стрелка влево увеличивать ширину изображения. Клавиши стрелка вверх и вниз - увеличивать высоту изображения. Одно нажатие клавиши - 1px. */

function t10(ev) {
    let img = document.querySelector('img');
    let wdth = window.getComputedStyle(img).width;
    let w = +wdth.slice(0, wdth.indexOf('px'));
    let hght = window.getComputedStyle(img).height;
    let h = +hght.slice(0, hght.indexOf('px'));
    switch(ev.key){
        case 'ArrowLeft':
            // img.style.width = `${w-1}px`;
            // break
        case 'ArrowRight':
            img.style.width = `${w+1}px`;
            break
        case 'ArrowDown':
            // img.style.height = `${h-1}px`;
            // break
        case 'ArrowUp':
            img.style.height = `${h+1}px`;
            break
    }
}

document.querySelector('.i-10').onkeydown = e=>t10(e);
// ваше событие здесь!!!

// Task 11 ============================================
/*  Проект. 
1. Выполните в html верстку клавиш клавиатуры. Сверстайте – блок цифровых клавиш от 1 до 0. И ряд клавиш q – p. Добавьте клавишу левый shift, левый  alt, левый ctrl,  пробел, enter.
2. Добавьте на input .i-11 событие onkeypress или onkeyup или onkeydown ( по вашему выбору). Когда событие происходит ( ввод символа в input) необходимо подсветить ( добавить класс active) клавише с таким символом. Со всех остальных клавиш – удалить класс active.
3. Если вводится следующий символ – повторить удаление active и подсветить клавишу с введенным символом.
4. Ограничения проекта – тестируются только указанные клавиши в латинской раскладке. Комбинации клавиш не тестируются. Т.е. нажиматься shift+A, ctrl+shift – не будут. Все символы вводятся в нижнем регистре.
*/

// Set data attr to all elements 
document.querySelectorAll('.keyboard-row').forEach((el,i)=>{
    switch(i){
        // First row - numbers, so the form is 'Digit#'
        case 0:
            for(let j of el.children)j.setAttribute(`key`,`Digit${j.textContent}`);
            break
        // Second row - letters, so the form is 'Key#'
        case 1:
            for(let j of el.children)j.setAttribute(`key`, `Key${j.textContent}`);
            break
        // Last row - other, for ctrl,shift and alt we add 'Left' in the end
        case 2:
            for(let j of el.children){
                let atr = `${j.textContent}`;
                if(j.textContent!='Space'&&j.textContent!='Enter'){
                    atr += `Left`;
                }
                j.setAttribute(`key`, atr);
            }
            break
    }
}) 

function t11(ev) {
    let a = document.querySelector('.key.active');
    if(a){
        a.classList.remove('active');
    }

    let k = document.querySelector(`.key[key=${ev.code}`);
    if(k){
        k.classList.add('active');
    }
}

document.querySelector('.i-11').onkeydown = e=>t11(e);
// ваше событие здесь!!!

