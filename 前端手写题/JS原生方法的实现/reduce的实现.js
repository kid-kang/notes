Array.prototype.myReduce = function (fn, init) {
  //判断是否有init、init值可能是0、所以得判断init不是不是undefined
  let isInit = init === undefined ? false : true //undefined不能有双引号、不然就是字符了
  //初始化返回值
  let res = isInit ? init : this[0]
  //循环调用回调函数
  for (let i = isInit ? 0 : 1; i < this.length; i++) {
    res = fn(res, this[i], i, this)
  }
  return res
}

//测试
let arr = [1, 2, 3, 4]
let answer = arr.myReduce((res, cur) => {
  return res + cur
})
let answer2 = arr.myReduce((res, cur) => {
  return res * cur
}, 0)

console.log(answer, answer2) //10  0
