const target = {
  name: 'wzk',
  arr: [1, 2, 3],
  obj: { age: 18 },
  date: new Date(),
  reg: new RegExp(/\d/g),
  fn: function () { }
};

//普通的深拷贝
console.log('JSON深拷贝', JSON.parse(JSON.stringify(target)));
// 缺点:
// 1、日期类型的数据会直接变成字符串的形式，而不是对象的形式
// 2、正则类型的数据会变成空对象{}
// 3、函数会丢失
// 4、如果存在对象的循环引用会报错


//全面的深拷贝
function deepCope(target) {
  try {
    // 排除循环引用的情况
    JSON.stringify(target);

    // target是 undefined、null、number、boolean、string 等基本数据类型时直接返回;
    if (target === null || !['object', 'function'].includes(typeof target)) return target;

    // 日期 or 正则 or 函数
    if (target instanceof Date) return new Date(target);
    if (target instanceof RegExp) return new RegExp(target);
    if (target instanceof Function) return new Function('return ' + target.toString())();

    // 数组 or 对象
    const res = Array.isArray(target) ? [] : {};
    for (let i in target) res[i] = deepCope(target[i]);
    return res;
  } catch {
    console.log('存在循环引用');
    return target;
  }
}

//  测试
const newVal = deepCope(target);
console.log("old", target);
console.log("new", newVal);
console.log('判断是否相等', newVal === target, newVal.fn === target.fn);

// 存在循环引用测试
const source = {
  str: 'hello',
  arr: [1, 2, 3],
};
source.loop = source;
console.log(deepCope(source));


//函数的深复制
//法一:
//  new Function('return '+ target.toString())();
//法二:
//  target.bind(res);

// 成熟的第三方库
// lodash  ->  cloneDeep()
