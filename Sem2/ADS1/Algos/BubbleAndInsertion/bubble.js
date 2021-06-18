// 1) Get an array and fill it with random numbers

let Arr = getRandomArray(10);

function getRandomArray(n){
 let Arr = [];

 for (let i = 0 ; i < n ; i++){
     Arr[i] = Math.round(Math.random() * 100);
 }

 return Arr;
}

console.log(Arr);

function swap(Array, index1, index2)
{
    let temp = Array[index1];
    Array[index1] = Array[index2];
    Array[index2] = temp;

    return Array;
}

function bubbleSort(Array){
    let i = 0;
    while (i < Array.length - 2){
        for (let j = 0 ; j < Array.length - i - 2 ; j++){
            if (Array[j] > Array[j+1]){
                swap(Array, j, j+1);
            }
        }
        i++;
    }
    return Array;
}

console.log(bubbleSort(Arr));