//数组去重
function resetArr(arr) {
  let newArr = [];
  arr.forEach(val => {
    if (newArr.indexOf(val) === -1) newArr.push(val);
  });
  return newArr;
};

let arr = [1, 2, 3, 3, 4, 4];
console.log(resetArr(arr));  //[1,2,3,4]

// 法2
const setNewArr = [...new Set(arr)]
