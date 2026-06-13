function countingSort(arr) {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let range = max - min + 1;
    let rangeArr = new Array(range).fill(0);
    
    for (let i = 0; i < arr.length; ++i) {
        rangeArr[arr[i] - min]++;
    }
    for (let i = 1; i < rangeArr.length; ++i) {
        rangeArr[i] = rangeArr[i] + rangeArr[i - 1];
    }
    let res = [];
    for (let i = arr.length - 1; i >= 0; --i) {
        res[--rangeArr[arr[i] - min]] = arr[i];
    }
    return res;
}

let arr = [5, 4, 3, 15, 20, 10, 13, 12];
console.log(countingSort(arr));