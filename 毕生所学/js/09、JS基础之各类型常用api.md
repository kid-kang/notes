# 常用API

## Number

### toFixed()

四舍五入指定小数位数，返回结果为字符串

```js
let num = 3.1415926
// 保留两位小数
let str1 = num.toFixed(2) // 3.14
// 保留三位小数
let str2 = num.toFixed(3) // 3.142
```

### Number.isNaN()

判断一个数是否是NaN

```js
Number.isNaN('123') // false 

Number.isNaN(456) // false

Number.isNaN(true) // false

Number.isNaN(NaN) // true
```

### Number.isFinite()

检测某个值是否是有限数字

```js
Number.isFinite(123) // true
Number.isFinite(12346546546545646546464646465456456456) // true
Number.isFinite(true) // false
Number.isFinite('abd') // false
Number.isFinite(NaN) // false
```

### Number.isInteger()

检测某个值是否为整数

```js
Number.isInteger(123) // true
Number.isInteger(123.0) // true
Number.isInteger(123.1) // false
Number.isInteger('abc') // false
```

### Number.parseInt()

parseInt() 函数可解析一个字符串，并返回一个整数。

```js
Number.parseInt('123.456') // 123
Number.parseInt('123aaa') // 123
Number.parseInt('123.456aaa') // 123
Number.parseInt('a123') // NaN
```

### Number.parseFloat()

parseInt() 函数可解析一个字符串，并返回一个浮点数。

```js
Number.parseFloat('123.456') // 123.456
Number.parseFloat('123aaa') // 123
Number.parseFloat('123.456aaa') // 123.456
Number.parseFloat('a123') // NaN
```

## String

### charCodeAt() 

返回指定位置的字符串unicode编码

```js
let str = "abcde"
str.charCodeAt(2)   // 99 
```

### String.fromCharCode() 

 通过unicode编码排序值返回对应的字符

```js
String.fromCharCode(99) // c
```

### substring()

substring( startNum , endNum ) 截取字符串

```js
let str = "hello"
str.substring(1,2) // e
// startNum 参数为起始位置(包含), endNum 参数结束位置(不包含)
// endNum 参数不写 默认截取所有的
```

### substr( )

substr(startNum, length)    截取字符串

```js
let str = "hello"
str.substr(1,2) //el
// startNum 参数为起始位置(包含), length 参数截取长度
// length 参数不写 默认截取所有的
```

### slice( )

slice 使用与substring 相同

### trim()  

清除左右空格

```js
let str = " hello  "
str.trim() // "hello"
```

### replace() 

replace( str , repStr )  替换字符串

```js
let str = "12345abcdef"
let str1 = str.replace(2,4)
console.log(str1) // 14345abcdef
// str 参数为查找字符的被替换字符, repStr 参数值 将替换str值
// 如果没有查询到将返回原字符串
```

### split()

字符串切割成数组,从选择器切割

```js
let str = "hello"
console.log(str.split("e"))  // ["h", "llo"]
```

### indexOf()

indexOf( Str[,num])  查找到字符串返回下标,否则返回-1,

```js
let str="hello"
console.log(str.indexOf("e")) // 1
// Str 参数为查找字符, num 参数为查找开始位置
// num参数不写 默认从0开始
```

### lastIndexOf() 

返回结果与indexOf相同, 检索方向为从后往前; 

### includes(),startsWith(),endsWith()

> includes((str[,num])  返回布尔值，表示是否找到了参数字符串
>
> startsWith((str[,num])   返回布尔值，表示参数字符串是否在原字符串的头部
>
> endsWith((str[,num])     返回布尔值，表示参数字符串是否在原字符串的尾部

```js
let str = "apple banana";
str.includes("apple") // true


let str = "http://www.baidu.com";
str.startsWith("http");      // true
str.startsWith("https");      // false

let str = "http://www.baidu.com";
str.endsWith("com");      // true
str.endsWith("cn");      // false

// Str 参数为查找字符, num 参数为查找开始位置
// num参数不写 默认从0开始
```

### repeat()

repeat(n)  将字符串重复n次

```js
let str = "夏栀";
let repstr = str.repeat(3);
console.log(repstr);  //夏栀夏栀夏栀
// n 参数为重复几次   参数如果是小数，会被向下取整
```

## Array

### push() 

  push(data[,data])   依次往数组最后添加数组项 ,可以添加多个

```javascript
let arr = [1,2,3]
let arr1 = arr.push(4,5)
console.log(arr)  // [1,2,3,4,5]  
// 返回值新数组的length    改变原数组
```

### pop()  

删除数组最后一项

```javascript
let arr = [1,2,3]
let arr1 = arr.pop()
console.log(arr) // [1,2]
// 返回值是删除的数值  改变原数组
```

### shift() 

移除数组中第一项并返回该项

```javascript
let arr = [1,2,3]
let arr1 = arr.shift()
console.log(arr)     // [2,3]
// 返回值是删除的数值   改变原数组
```

### unshift()

 在数组前添加任意数组项,可以添加多个

```javascript
let arr = [1,2,3]
let arr1 = arr.unshift(0)    // 改变原数组       
console.log(arr) // [0,1,2,3] 
// 返回值新数组的length          改变原数组
```

### splice()

splice(index,num,info)  具有截取,替换,添加方法

```javascript
//- index 从数组第几个项开始
//- num  截取的数量 
//- info 从截取位置开始添加数组项
//- 会改变原数组  返回截取的数组

let arr = [1,2,3,4,5]
arr.splice(2,3,"a","b")
console.log(arr)

//1)截取方法     截取数量
let arr = [1,2,3,4]
arr.splice(1,2)

//2)添加方法    截取数量为零
arr.splice(1,0,1)
arr.splice(1,0,1,2,3)  // 添加多个  

//4)替代方法    截取数量与添加相同
arr.splice(0,0,5)
```

### sort() 

sort( function ) 数组排序

```javascript
// function 参数为一个函数体   函数体接收两个形参
// 不传参数 根据ASCII码表 来比较数组中的第一个值排序

let arr = [22,44,11,33,55]
arr.sort(function(a,b){
    return a - b //从小到大排列
    return b - a //从大到小排列
})
console.log(arr)
```

### concat() 

合并两个数组为一个新的数组  不改变原数组

```javascript
let arr1 = [1,2,3]
let arr2 = ["a","b","c"]
let arr = arr1.concat(arr2)
console.log(arr)
```

### join()

 join(str)  根据参数规则返回新的字符串 不改变原数组

```javascript
let arr = [1,2,3,4]
let arr1 = arr.join("-")
console.log(arr1) // 1-2-3-4
// 将数组合并成字符串
```

### reverse()

 反转数组顺序

```js
let arr = [1,2,3,4]
let arr1 = arr.reverse()
console.log(arr1)  // [4, 3, 2, 1]
```

### slice()

slice(startNum,endNum)   截取数组

```js
let arr = [1,2,3,4]
arr.slice(1,3)
// startNum 参数为起始位置(包含), endNum 参数结束位置(不包含)
// endNum 参数不写 默认截取所有的  后减前等于个数
```

### Array.isArray()

判断是否是数组

```js
let arr = [1,2,3]
console.log(Array.isArray(arr))//true
```

### Array.from()

把类数组(获取一组元素,arguments)对象转成数组

### indexOf(Str[,num])  

查找到数组项返回下标, 否则返回-1,    与字符串使用一样

```js
let arr = [1,2,3]
arr.indexOf(2)
// Str 参数为查找字符, num 参数为查找开始位置
// num参数不写 默认从0开始
```

### includes()

查看数组中是否包含参数的值,返回布尔值

```js
var arr = ["apple" , "origan","banana"];
var a = arr.includes("apple");
console.log(a);   // true

var b = arr.includes("apple2");
console.log(b);   // false
```

### forEach

循环数组,无返回值

```js
var arr = ["a","b","c","d"]
arr.forEach(function(value,index,arr){
    console.log(value,index,arr);
})
```

### map

正常情况下,需要配合return使用,返回新数组,如果没有return,这个就相当于forEach

map如果没有return 则返回元素项数个undefined组成的新数组

```js
// 整理数据结构
let arr= [
    {title: "aa",read: 100},
    {title: "bb",read: 20},
    {title: "cc",read: 50}
]
let newArr = arr.map((item,index,arr) => {
    let json = {};
    json.shop = `*${item.title}--`;
    json.price = `￥${item.read}元`
    return json;
})
console.log(arr);
console.log(newArr);
```

### reduce

用的极少,比如求数组的和,阶乘都可以

```js
let arr = [1,2,3,4,5,6,7,8,9,10]
let res = arr.reduce((prev,cur,index,arr) => {
    return prev + cur;
})
console.log(res);  //55
// prev是上一次的运算结果,cur是当前的值,index是当前的下标,arr是当前的数组
```

## Object

Object.assign(目标对象,需要合并的对象)

```js
let json = {a:1};
let json2 = {b:2};
let json3 = {c:3};

let obj = Object.assign({},json,json2,json3);
console.log(obj);     // {a: 1, b: 2, c: 3}
```

