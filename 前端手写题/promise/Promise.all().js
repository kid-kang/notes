//Promise.all()实现  //只有一开的return  内部都是resolve/reject
function myAll (arr) {
  return new Promise((resolve, reject) => {   //首先返回一个promise对象
    if (!Array.isArray(arr)) reject("传入的必须是数组");
    let res = [], count = 0;   //计数
    arr.forEach((item, index) => {
      Promise.resolve(item).then(val => { //允许数组内不是promise 但是返回的是promise
        res[index] = val;
        count++;
        if (count === arr.lenght) {
          resolve(res);
        }
      }).catch(err => {
        reject(err);
      });
    });
  });
};