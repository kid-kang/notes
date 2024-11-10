//绿3 黄1 红3
let light = (color, delay) => {
  return new Promise(resolve => {
    console.log(color);
    setTimeout(() => resolve(), delay * 1000);
  });
};
//await 只有等到接收到了promise的返回值代码才会继续执行 所以函数返回的promise一定要在合适的时候resolve()
//也就是在定时器结束的时候改变promise状态,让await/.then拿到返回值,以便后续代码继续执行

async function run() {
  await light("绿灯", 3);  //绿灯持续3秒
  await light("黄灯", 1);  //黄灯持续1秒
  await light("红灯", 3);  //红灯持续2秒
  run();   //灯循环
}
run();
