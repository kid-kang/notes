function myNew(Fn, ...args) {
  const obj = {} // 创建一个对象，因为new操作符会返回一个对象
  obj.__proto__ = Fn.prototype // 将对象与构造函数原型链接起来
  const res = Fn.call(obj, ...args) // 将构造函数中的this指向这个对象，并传递参数并执行
  return res instanceof Object ? res : obj // 判断构造函数是否有引用类型的返回值
}
