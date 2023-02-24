// 思路：通过Promise.race和异步函数
async function promiseLimit(urls, limit, httpFn) {
  let allPromise = [];//存放所有promise实例
  let pool = []; //并发池
  for (let url of urls) {
    if (pool.length >= limit) await Promise.race(pool);
    //等到并发池有空位后开始执行下一个异步
    let p = Promise.resolve(httpFn(url));  //如果非promise 则转成promise
    pool.push(p);
    allPromise.push(p);

    //等p有结果了后再移出并发池
    p.then(() => pool.splice(pool.indexOf(p), 1));
  }
  // 返回有并发控制的 Promise.all
  return Promise.all(allPromise);
}

// 请求地址
let urls = ['bytedance.com', 'tencent.com', 'alibaba.com', 'microsoft.com', 'apple.com', 'hulu.com', 'amazon.com'];

//自定义请求函数
let http = (url) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(`任务${url}完成`), 1000);
  });
};

promiseLimit(urls, 3, http).then(res => console.log(res));
