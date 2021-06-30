// const A = [1, 11, 21, 4, 5, 6, 7, 8, 9, 10];
// let B = [], C = [], D = [];

// const a = 3, b = 1;
// B = initHash(A,a,b);
// C = initHash(A,a,b);
// D = initHash(A,a,b);

// console.log(C);
// console.log(checkData(3,A,B, C, D, a,b));

// function initHash(A,a,b){
//     let n = A.length;
//     let HashArr = new Array(2*n);
//     for (let i = 0; i < n; i++){
//         let arr = new Array(n);
//         arr.fill(-1);
//         HashArr[2*i] = arr;
//         HashArr[2*i+1] = -1;
//     }
    
//     for(let i = 0; i < n; i++){
//         let h = 2*((a*A[i]+b)%n);
//         let ind = HashArr[h + 1] + 1;
//         HashArr[h][ind] = i;
//         HashArr[h + 1]++;
//     }
//     return HashArr
// }


// function checkData(key, A, B,C,D, a, b){
    
//     let n = A.length;
//     let HashArr = new Array(2*n);
//     for (let i = 0; i < n; i++){
//         let arr = new Array(n);
//         arr.fill(-1);
//         HashArr[2*i] = arr;
//         HashArr[2*i+1] = -1;
//     }

//     for(let i = 0; i < n; i++){
//         let h = 2* ((a*A[i]+b)%n);
//         let ind = HashArr[h + 1] + 1;
        
//         HashArr[h][ind] = i;
//         HashArr[h + 1]++;

//         if(B[h][ind] != HashArr[h][ind] || C[h][ind] != HashArr[h][ind] || D[h][ind] != HashArr[h][ind]){
//             return -2;
//         }
//     }

//     let t = 2*((a*key + b)%n)
//     pos = B[t][0];
//     if(A[pos] == key){
//         return pos
//     }
//     return -1
// }


function createHash(A, a, b){
    const B = [];
    for (let i = 0; i < A.length; i++){
        B[i] = [];
    }
    for (let i = 0; i < A.length; i++){
        let ind = (a*A[i] + b)%A.length
        B[ind].push(i);
    }
    return B
}


function Task5(key, A, B, a, b){
    const arr = new Array(A.length);
    arr.fill(0);
    let ind = -1;
    for(let i = 0; i< A.length; i++){
        let h = (a*A[i] + b)%A.length
        
        if (B[h][arr[h]] != i){
            return -2;
        }
        
        arr[h]++
        
        if(A[i] == key){
            ind = i
        }
    }
    
    // const ind = (a*key+b)%A.length
    // for(let i = 0; B[ind][i] != -1; i++){
        //     if( A[B[ind][i]] == key){
            //         return B[ind][i]
            //     }
            // }
            
    return ind;
}
        
const A = [1, 5, 9, 4];
B = createHash(A, 5, 2);

console.log(Task5(14, A, B, 5, 2));