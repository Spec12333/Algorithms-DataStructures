function countingSort(arr) {
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let range = max - min + 1;
    let countArr = new Array(range).fill(0);
    let sortedArr = [];
    
    for (let i = 0; i < arr.length; ++i) {
      let index = arr[i] - min;
      countArr[index]++;
    }
    
    for (let i = 0; i < countArr.length; ++i) {
      while (countArr[i]) {
        sortedArr.push(i + min);
        countArr[i]--;
      }
    }

      return sortedArr;
}
  
const arr = [5, 4, 3, 15, 20, 10, 13, 12];
console.log(countingSort(arr));