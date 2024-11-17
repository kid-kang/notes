//instancof的实现
function myInstanceof(left, right) {
  let right_p = right.prototype;
  let left_p = Object.getPrototypeOf(left);
  while (left_p) {    //left_p部为null  就一直往上找
    if (left_p === right_p) return true;
    else left_p = Object.getPrototypeOf(left_p);
  }
  return false;
}

console.log(myInstanceof(1, Array));           //false
console.log(myInstanceof([1, 2, 3], Array));   //true
