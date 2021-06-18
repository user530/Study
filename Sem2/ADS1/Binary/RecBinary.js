//let Array = [2, 4, 6, 8, 10, 11, 13, 15, 16, 19, 20];
//
//function BS(arr, item){
//    let L = 0;
//    let R = arr.length - 1;
//    let M = Math.floor((L+R)/2);
//    
//    if(arr[M] == item){return true}
//    else if(arr[M] > item && M - 1 >= L){return BS(arr.slice(L, M), item)}
//    else if (arr[M] < item && M + 1 <= R){return BS(arr.slice(M + 1, R + 1), item)}
//    else return false
//}
//
//console.log(BS(Array, 18));

//-----------------------------------------------------------------------------------

function genRandomArray(n) {
	var arr = [];
	for (var i = 0; i < n; i++) {
		arr[i] = Math.round(10 * Math.random());
	}
	return arr;
}

function swap(array, index1, index2) {
	var saveElement = array[index1];
	array[index1] = array[index2];
	array[index2] = saveElement;
	return array;
}

function bubbleSort(array) {
	var n = array.length;
	for (var i = 1; i < n; i++) {
		var count = 0;
		for (var j = 0; j < n - 1; j++) {
			if (array[j + 1] < array[j]) {
				count++;
				swap(array, j, j + 1);
			}
		}
		if (count == 0) {
			break;
		}
	}
	return array;
}

function search(array, x, left, right) {
	// return a Boolean: true if x is in array between left and right, and false otherwise
    if (left > right) return false
    
    let m = Math.floor((left + right)/2);
    
    if (array[m] == x) return true
    else if (array[m] > x) right = m - 1
    else if (array[m] < x) left = m + 1
    
    return search(array, x, left, right);
}

function binarySearch(array, x) {
	// return a Boolean: true if x is in array, and false otherwise
    let l = 0;
    let r = array.length - 1;
    
    return search(array, x, l, r);
}


// Do not modify the code below this point--------------------------------
module.exports = {
	genRandomArray: genRandomArray,
	swap: swap,
	bubbleSort: bubbleSort,
	search: search,
	binarySearch: binarySearch
}