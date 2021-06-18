// our encoded message
var encoded = ["w","r","e","r","s","h","i","w","r","e","r","w","r","s","h"];

// r is most common (appears 5 times); w appears (3 times); e, s, h appear twice; i appears once
// this is an array of the appears: what appears more commonly is to the left
var letters = ["r", "w", "e", "s", "h", "i"];

// this makes an array of all permutations
function permutations(letters) {
	var n = letters.length;
	if (n <= 1) {
		return [letters];
	}
	var s = [];
	for (var i = 0; i < n; i++) {
		var v = [];

		if (i == 0) {
			v = letters.slice(1, n);
		} else if (i == n) {
			v = letters.slice(0, n-1);
		} else {
			for (var k = 0; k < i; k++) {
				v[k] = letters[k];
			}
			for (k = i + 1; k < n; k++) {
				v[k - 1] = letters[k];
			}
		}

		var w = permutations(v);
		var p = [];
		p[0] = letters[i];
		for (var j = 0; j < w.length; j++) {
			for (var k = 1; k < n; k++) {
				p[k] = w[j][k - 1];
			}
			s.push(p.slice());
 		}
	}
	return s;
}

// this assigns a number to each letter: the more common the letter, the higher the value of the number
function frequencyOrder(letter) {
	var frequency = ["e", "i", "s", "h", "r", "w"];
	for (var i = 0; i < 6; i++) {
		if (frequency[i] == letter) {
			return 6 - i;
		}
	}
}

console.log(mergeSort(permutations(letters)));

//merges two sorted arrays to produce a third sorted array
function merge(array1, array2) {
    let i = 0;
    let j = 0;
    let res = [];
    while (i < array1.length && j < array2.length){
        if(frequencyOrder(array1[i][0]) > frequencyOrder(array2[j][0])){
            res.push(array1[i]);
            i++;
        }
        else{
            res.push(array2[j]);
            j++;
        }
    }
    while(i < array1.length){
        res.push(array1[i]);
        i++;
    }
    while(j < array2.length){
        res.push(array2[j]);
        j++;
    }
    return res;
}

//recursively does merge sort
function mergeSort(array) {
    let l = 0;
    let r = array.length - 1;
    let m = Math.floor((l + r)/2);

    if (l == r){
        return array.slice(0, 1);
        }
    else{
        return merge(mergeSort(array.slice(l, m + 1)), mergeSort(array.slice(m+1,r + 1)));
    }
    
}


//Do not alter anything below this----------------------------------
module.exports = {
	permutations : permutations,
	frequencyOrder : frequencyOrder,
	merge : merge,
	mergeSort : mergeSort
}