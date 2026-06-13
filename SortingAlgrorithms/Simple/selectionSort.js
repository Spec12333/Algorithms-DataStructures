function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; ++i) {
        let min = i;
        for (let j = i + 1; j < arr.length; ++j) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        let tmp = arr[i];
        arr[i] = arr[min];
        arr[min] = tmp;
    }
    return arr;
}

const arr = [42, 7, 19, 103, 58, 2, 91, 34, 76, 11];
console.log(selectionSort(arr));