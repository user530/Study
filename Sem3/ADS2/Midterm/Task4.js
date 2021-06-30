function createArr(A,a,b){
    const n2 = A.length*A.length
    const arr = new Array(n2);
    arr.fill(-1)
    for (let i = 0; i < A.length; i++){
        let ind = (a*A[i] + b)%(n2)
        for(let j = 0; j < n2; j++){
            if(arr[(ind+j)%n2] == -1){
                arr[(ind+j)%n2] = i
                break
            }
        }
    }
    return arr
}

function check(key, A, B, a, b){
    const arr = new Array(A.length*A.length);
    arr.fill(-1);
    let ind = -1;

    for(let i = 0; i < A.length; i++){
        let h = (a*A[i]+b)%(A.length*A.length)
        for(let j = 0; j < A.length*A.length; j++){
            let n = (h+j)%(A.length*A.length)
            if(arr[n] == -1){
                if(B[n] != i){
                    return -2
                }
                arr[n] = 0;
                break
            }
        }
        if (A[i] == key && ind == -1){
            ind = i
        }
    }
    return ind
}

const A = [7,5,6]
const B = createArr(A, 1, 0);
B[5] = 2
console.log(B);
console.log(check(16, A, B, 1,0));