//节流   普通定时器版本 缺点：第一次不能立马触发
function demo(delay, fn, ...args) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(this, ...args);
        timer = null;
      }, delay);
    }
  };
}


//时间戳+定时器   节流
function throttle(delay, fn, ...args) {
  let timer, start = 0;
  return function () {
    let end = Date.now();
    let remainder = delay - (end - start);
    clearTimeout(timer);
    if (remainder <= 0) {
      fn.call(this, ...args);
      start = end;
    } else {
      timer = setTimeout(() => {
        fn.call(this, ...args);
        start = end;
      }, remainder);
    }
  };
}

let fun = (a) => {
  console.log(a);
};

window.onwheel = throttle(1000, fun, 1111111);
// window.onwheel = demo(1000, fun, 1111111)



//防抖

function debounce(delay, fn, ...arg) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, ...arg);
    }, delay);
  };
}

function func() {
  console.log(this.value);
}

let inp = document.querySelector("input");  //拿到input节点
inp.oninput = debounce(500, func);
