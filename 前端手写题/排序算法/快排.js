// 快速排序的特点:
//  稳定性：快排是一种不稳定排序
//  比较性：因为排序时元素之间需要比较，所以是比较排序
//  时间复杂度：快排的时间复杂度为O(nlogn)
//  空间复杂度：排序时需要另外申请空间，并且随着数列规模增大而增大，其复杂度为：O(nlogn)
//  快速排序有一个缺点就是对于小规模的数据集性能不是很好。

function quickSort(arr) {
  if (arr.length <= 1) return arr;   //递归要有返回值、递归出口 不能等于1 要<=1
  let right = [], left = [], key = arr.shift();  //取首项

  arr.forEach(value => {
    if (value >= key) right.push(value);
    else left.push(value);
  });

  return quickSort(left).concat(key, quickSort(right));  //递归入口
}

// 测试
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort(arr));