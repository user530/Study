let a = [
    [1, 2, 3, 4],
    [4, 1, 2, 3],
    [3, 4, 1, 2],
    [2, 3, 4, 1]
];

let b = [[],[],[],[]];
let c = [[],[],[],[]];

for (let i = 1; i < 5 ; i++){
    for (let j = 1; j < 5 ; j++){
        let k = 2*Math.floor(i/3) + Math.floor(j/3);
        let l = 2*((i+1)%2) + (j+1)%2;
        b[j-1][i-1] = a[k][l];
        // console.log(`a[${k}][${l}] = ${a[k][l]}`);
    }
    console.log(b);
}

for (let i = 1; i < 5; i++){
    for (let j = 1; j < 5; j++){
        let m = 1 + Math.floor(i/3) + Math.floor(j/3) * 2;
        let n = 1 + (i+1)%2 + ((j+1)%2) * 2;
        c[i-1][j-1] = a[m-1][n-1]; 
    }
    console.log(c);
}