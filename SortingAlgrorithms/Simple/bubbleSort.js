function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; ++i) {
        for (let j = 0; j < arr.length - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
}

const arr = [20, 1, 0, 16, 5, 2, 10, 100];
console.log(bubbleSort(arr));