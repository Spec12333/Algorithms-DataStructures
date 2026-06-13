function merge(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    
    left = merge(left);
    right = merge(right);
    return sort(left, right);
}

function sort(left, right) {
    let i = 0;
    let j = 0;
    let sortedArr = [];
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            sortedArr.push(left[i]);
            ++i;
        } else {
            sortedArr.push(right[j]);
            ++j;
        }
    }
    
    while (i < left.length) {
        sortedArr.push(left[i]);
        ++i;
    }
    
    while (j < right.length) {
        sortedArr.push(right[j]);
        ++j;
    }
    return sortedArr;
}

let arr = [5, 4, 3, 15, 20, 10, 13, 12];
console.log(merge(arr));