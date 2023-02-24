function Parent(MyName) {
  this.name = MyName;
  this.likeFood = ['水果', '鸡', '烤肉'];   //这是私有属性，每个人喜欢不一定相同
}
Parent.prototype.getName = function () {
  return this.name;
};
let baba = new Parent('爸爸');
//========================原型链继承=====================================
// function Child(MyName) {
//   this.name = MyName;
// }
// Child.prototype = new Parent();

// let chongqingChild = new Child('重庆孩子');
// let guangdongChild = new Child('广东孩子');
// chongqingChild.likeFood.push('花椒');     // 重庆孩子还喜欢吃花椒。。。
// //对比三者的likeFood
// console.log(baba.likeFood);                 //baba     ['水果', '鸡', '烤肉']
// console.log(chongqingChild.likeFood);        //重庆孩子  ["水果", "鸡", "烤肉", "花椒"]
// console.log(guangdongChild.likeFood);        //广东孩子  ["水果", "鸡", "烤肉", "花椒"]   也爱吃花椒了？
// console.log(chongqingChild.getName());      //重庆孩子    

//========================构造函数继承=====================================
// function Child(MyName) {
//   Parent.call(this, MyName);
// }
// let chongqingChild = new Child('重庆孩子');
// let guangdongChild = new Child('广东孩子');
// chongqingChild.likeFood.push('花椒');
// // 对比三者的likeFood
// console.log(baba.likeFood);                 //baba     ['水果', '鸡', '烤肉']
// console.log(chongqingChild.likeFood);        //重庆孩子  ["水果", "鸡", "烤肉", "花椒"]
// console.log(guangdongChild.likeFood);        //广东孩子  ['水果', '鸡', '烤肉']
// console.log(chongqingChild.getName());      //报错

//========================组合式继承=====================================
function Child(MyName) {
  Parent.call(this, MyName);
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;
let chongqingChild = new Child('重庆孩子', 18);
let guangdongChild = new Child('广东孩子', 19);
chongqingChild.likeFood.push('花椒');
//对比三者的likeFood
console.log(baba.likeFood);                 //baba     ['水果', '鸡', '烤肉']
console.log(chongqingChild.likeFood);        //重庆孩子  ["水果", "鸡", "烤肉", "花椒"]
console.log(guangdongChild.likeFood);        //广东孩子  ['水果', '鸡', '烤肉']
console.log(chongqingChild.getName());      //重庆孩子

//========================寄生组合式继承=====================================
// function Child(MyName) {
//   Parent.call(this, MyName);
// }
// (function () {
//   function Demo() { }
//   Demo.prototype = Parent.prototype;
//   Child.prototype = new Demo();           //也就是说共有属性和私有属性分离继承
//   Child.prototype.constructor = Child;
// })();
// let chongqingChild = new Child('重庆孩子');
// let guangdongChild = new Child('广东孩子');
// chongqingChild.likeFood.push('花椒');
// console.log(Parent.prototype === Child.prototype);  //false
// //对比三者的likeFood
// console.log(baba.likeFood);                 //baba     ['水果', '鸡', '烤肉']
// console.log(chongqingChild.likeFood);        //重庆孩子  ["水果", "鸡", "烤肉", "花椒"]
// console.log(guangdongChild.likeFood);        //广东孩子  ['水果', '鸡', '烤肉']
// console.log(chongqingChild.getName());      //重庆孩子