// Область видимость возникает не в момент инициализации функции, а в момент её вызова. Сколько вызовов - столько областей видимости и возникает
function f(){};

// Лябмда функция
const lambdaFun = () => {console.log('Lambla fired!');};
lambdaFun();

// Функция является объектом
// Поэтому если присвоить переменной ссылку на функцию - мы получаем 

// Так как в ЖС функуция это объект - её можно передавать как аргумент или возвращать её как результат.

function fun(){
    console.log('Fun - fired');
}

function fun2(callback){
    callback();
}

fun2(fun);


function getSum(...args){
    return [0, ...args].reduce((a,b)=> a + b)
}

console.log(getSum(0,1,2,3,4,5));

// Сборщик мусора - очищает области видимости которые не используются

function getSummator(a){
    let x = 10;
    return function(b){
        return a+b;
    }
}

const add10 = getSummator(10);

console.log({add10});

console.log(add10(7));

// Пример применения

function getByItems(array){
    let i = 0;
    return function(){
        const item = array[i];
        i = (i + 1) % array.length;

        return array[i];
    }
}

const names = ['A', 'B', 'C'];

const nextName = getByItems(names);

console.log(nextName());
console.log(nextName());
console.log(nextName());
console.log(nextName());
console.log(nextName());
console.log(nextName());