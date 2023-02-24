// 归并排序是一种稳定的排序方法。
// T(n) = O(nlogn)。

function mergeSort(arr) {
	const len = arr.length;
	if (len < 2) return arr;

	// len >> 1 和 Math.floor(len / 2) 等价
	const middle = Math.floor(len / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle);

	return merge(mergeSort(left), mergeSort(right));
};

function merge(left, right) {
	const res = [];

	while (left.length && right.length) {
		// 注意: 判断的条件是小于或等于，如果只是小于，那么排序将不稳定.
		if (left[0] <= right[0]) res.push(left.shift());
		else res.push(right.shift());
	}

	while (left.length) res.push(left.shift());
	while (right.length) res.push(right.shift());

	return res;
};

// 测试
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(mergeSort(arr));