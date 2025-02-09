//冒泡排序
function pubbleSort(arr) {
  const len = arr.length
  for (let i = 0; i <= len - 1; i++) {
    for (let j = 0; j <= len - 2 - i; j++) {
      // len-2 使得 j+1 一定存在
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
    }
  }
}

// 插入排序
// 当待排序数组是有序时，是最优的情况，只需当前数跟前一个数比较一下就可以了，这时一共需要比较N- 1次，时间复杂度为O(n);
// 最坏的情况是待排序数组是逆序的，此时需要比较次数最多，总次数记为：1+2+3+…+N-1，所以，插入排序最坏情况下的时间复杂度为O(n^2);
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    //从第二个开始
    for (let j = i; j >= 1; j--) {
      if (arr[j] < arr[j - 1]) [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
      else break
    }
  }
}

// 测试
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
// pubbleSort(arr);
insertSort(arr)
console.log(arr)
