//new操作符实现
function myNew(Fn, ...args) {
  let res = {};                                  //创建一个对象，因为new操作符会返回一个对象
  res.__proto__ = Fn.prototype;                  //将对象与构造函数原型链接起来
  let obj = Fn.call(res, ...args);               //将构造函数中的this指向这个对象，并传递参数并执行
  return typeof obj === "object" ? obj : res;    //判断构造函数是否有引用类型的返回值
}

//测试
function Foo(name, age) {
  this.name = name;
  this.age = age;
}
console.log(myNew(Foo, 'Chocolate', 18));