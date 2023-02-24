// 创建 Ajax 对象
const XHR = new XMLHttpRequest();

// 告诉 Ajax 请求地址以及请求方法
XHR.open("GET", "url");   //第三个参数默认是true是异步  false是同步

// 发送请求
XHR.send();

// 获取服务器的响应数据
XHR.onload = function () {
  if (XHR.status === 200) {
    console.log(JSON.parse(XHR.responseText));
  } else {
    console.log(XHR.statusText);
  }
};

// XHR.setRequestHeader("Accept", "application/json");