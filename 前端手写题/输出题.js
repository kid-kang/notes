//=======================事件循环机制=====================================
setTimeout(() => {
  Promise.resolve().then(() => console.log(4));
  console.log(3);
});

Promise.resolve().then(() => {
  setTimeout(() => {
    console.log(1);
  });
  console.log(2);
});
// 2 3 4 1


//=================promise的捕获==then中return和不return的区别=================
Promise.resolve().then(() => {
  return new Error('error!!!');
}).then(res => {
  console.log("then: ", res);
}).catch(err => {
  console.log("catch: ", err);
});
// "then: " "Error: error!!!"
// 返回任意一个非 promise 的值都会被包裹成 promise 对象，因此这里的return new Error('error!!!')也被包裹成了return Promise.resolve(new Error('error!!!'))，因此它会被then捕获而不是catch。

Promise.resolve().then(
  (res) => {
    throw new Error('error!!!');
  },
  (err) => {
    console.log('fail1', err);
  })
  .catch(() => { console.log('fail2', err); });
// 在then的第一参数中抛出了错误，那么他就会直接跳过第二个参数，而是被后面的catch捕获到。


//===========================promise的值透传================================
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log);
//1
//.then 或.catch 的参数期望是函数，传入非函数则会发生值透传。


//===========================promise的值透传================================
Promise.resolve('1')
  .then(res => {
    console.log(res);
  })
  .finally(() => {
    console.log('finally');
  });
Promise.resolve('2')
  .finally(() => {
    console.log('finally2');
    return '我是finally2返回的值';
  })
  .then(res => {
    console.log('finally2后面的then函数');
  });
// 1
// finally2
// finally
// finally2后面的then函数
//解释： .finally()方法的回调函数不接受任何的参数,finally也属于微任务,返回值无用


//===========================async、await================================
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
async1();
console.log('start');
// async1 start
// async2
// start
// async1 end
//解释：可以理解为await下面之后的语句相当于放在Promise.then中。


//===========================全局对象与this================================
function a(xx) {
  this.x = xx;
  return this;
};
var x = a(5);
var y = a(6);

console.log(x.x);  // undefined
console.log(y.x)  // 6
  // 解释：函数a是在全局作用域调用，所以函数内部的this指向window对象。**所以 this.x = 5 就相当于：window.x = 5。**之后 return this，也就是说 var x = a(5) 中的x变量的值是window，这里的x将函数内部的x的值覆盖了。然后执行console.log(x.x)， 也就是console.log(window.x)，而window对象中没有x属性，所以会输出undefined。
  // 当指向y.x时，会给全局变量中的x赋值为6，所以会打印出6。


  //===========================作用域================================
  (function () {
    var x = y = 1;
  })();

console.log(y); // 1
console.log(x); // Uncaught ReferenceError: x is not defined
// 首先执行y = 1, 因为y没有使用var声明，所以它是一个全局变量
// x是在函数内定义的所以x是一个局部变量，函数执行完被回收


//===========================变量提升================================
var friendName = 'World';
(function () {
  if (typeof friendName === 'undefined') {
    var friendName = 'Jack';
    console.log('Goodbye ' + friendName);
  } else {
    console.log('Hello ' + friendName);
  }
})();
//Goodbye Jack    var 变量提升 到函数的顶部
