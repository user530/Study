function MakeVector(rowArray){
    let puzzle = [];
    puzzle[0] = rowArray;
    puzzle[1] = rowArray;
    puzzle[2] = rowArray;
    puzzle[3] = rowArray;

    return puzzle
}

function PermuteVector(rowArray, p){
    if (p == 0){
        return rowArray
    }
    let tempArr = [];
    i = 0;

    while (i < rowArray.length){
        tempArr.push(rowArray[i]);
        i++
    }
    
    for (let j = 0; j < p; j++){
        tempArr.push(tempArr[0]);
        tempArr.shift();
    }

    rowArray = [];
    for (let j = 0; j< tempArr.length; j++){
        rowArray.push(tempArr[j]);
    }

    return rowArray;
}

function PermuteRows(puzzleArr, x, y, z){
    puzzleArr[1] = PermuteVector(puzzleArr[1], x);
    puzzleArr[2] = PermuteVector(puzzleArr[2], y);
    puzzleArr[3] = PermuteVector(puzzleArr[3], z);

    return puzzleArr;
}

function LinearSearch(vector, item){
    for (let i = 0; i < vector.length; i++){
        if (vector[i] == item){
            return true;
        }
    }
    return false;
}


function CheckColumn(puzzleArr, j){
    let tempArr = [];
    for (let i = 0; i < puzzleArr.length; i++){
        tempArr[i] = puzzleArr[i][j-1];
    }
    let k = 1;
    let c = 0;
    while (k < 5){
        if (LinearSearch(tempArr, k)){
            c++;
        }
        k++;
    }
    if (c == 4){
        return true;
    }
    return false;
}

function ColCheck(puzzleArr){
    let c = 0;
    for (let i = 1; i <= 4; i++){
        if (CheckColumn(puzzleArr, i)){
            c++
        }
    }
    if (c == 4) return true;
    return false;
}

function ColsFromGrids(puzzleArr){
    let tempArr = [];
    let tempRow = [];

    // console.log(puzzleArr);

    for (let i = 1; i < 5 ; i++){
        tempArr.push([]);
        for (let j = 1; j < 5 ; j++){
            let k = Math.floor(i/3) + 2*Math.floor(j/3);
            let l = (i+1)%2 + 2*((j+1)%2);
            tempArr[i-1][j-1] = puzzleArr[k][l]
        }
    }
    // console.log(tempArr);
    return tempArr;
}

function MakeSolution(rowArray){
    let puzzle = MakeVector(rowArray);
    for (let i = 1; i <= 3; i++){
        for (let j = 1; j <= 3; j++){
            for (let k = 1; k <= 3; k++){
                if (ColCheck(puzzle)&&ColCheck(ColsFromGrids(puzzle))){
                    return puzzle;
                } 
                PermuteRows(puzzle, 0, 0, 1);
            }
            PermuteRows(puzzle, 0, 1, 0);
        }
        PermuteRows(puzzle, 1, 0, 0);
    }
}

function switchPlaces(puzzle, num1, num2){
    let temp;
    let ind1=[];
    let ind2=[];
    for (let i = 0; i < puzzle.length; i++){
        for (let j = 0; j < puzzle[i].length; j++){
            if (puzzle[i][j] == num1) ind1 = j;
            if (puzzle[i][j] == num2) ind2 = j; 
        }
        temp = puzzle[i][ind1];
        puzzle[i][ind1] = puzzle[i][ind2];
        puzzle[i][ind2] = temp;
    }
    return puzzle;
}


function shuffleArray(puzzle, shuffleNumber){
    for (let i = 0; i < shuffleNumber; i++){
        switchPlaces(puzzle,Math.max(1, Math.round(Math.random()*10)%5),
        Math.max(1, Math.round(Math.random()*10)%5))
    }
    return puzzle
}  



// console.log(switchPlaces([1,2,3,4],1,3));
// let puzzle = MakeVector([2, 4, 1, 3]);
// console.log(puzzle);
// // console.log(PermuteVector(puzzle[0], 1));
// // console.log(puzzle);
// console.log(PermuteRows(puzzle, 1, 2, 3));
// console.log(puzzle);
// console.log(CheckColumn(puzzle, 1));
// console.log(ColCheck(ColsFromGrids([[2,4,1,3],[4,1,3,2],[3,2,4,1],[1,3,2,4]])));
// console.log(ColsFromGrids(puzzle));
// console.log(ColCheck([[2,1,4,3],[4,3,2,1],[3,4,1,2],[1,2,3,4]]));
// console.log(ColsFromGrids([[2,4,1,3],[4,1,3,2],[3,2,4,1],[1,3,2,4]]))
// console.log(MakeSolution([1, 2, 3, 4]));
// console.log(switchPlaces(MakeSolution([1, 2, 3, 4]),1,3))
console.log(shuffleArray(MakeSolution([1, 2, 3, 4]), 5))