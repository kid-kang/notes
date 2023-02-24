# ajax

*ajax* 即“Asynchronous Javascript And XML”（异步 JavaScript 和 XML），是指一种创建交互式网页应用的网页开发技术。

ajax可以在不刷新页面的前提下向后端 发送/请求 数据，在开发中是必然会用的技术。

## 原生的ajax

```js
var xhr;
if (window.XMLHttpRequest) {　 // 标准浏览器
    xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) { // 低版本IE
    try {
        xhr = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
        try {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (e) {}
    }
}
if (xhr) {
    xhr.onreadystatechange = onReadyStateChange;
    xhr.open('POST', '/url', true);
    // 设置 Content-Type 为 application/x-www-form-urlencoded
    // 以表单的形式传递数据
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('username=admin&password=root');
}

// onreadystatechange 方法
function onReadyStateChange() {
    /*
    xhr.readyState：
        0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪
     */
    if (xhr.readyState === 4) {
        // 请求处理到了最后一步
        /*
        xhr.status 状态码
            100+  请求已被接受，需要继续处理
            200+  请求已成功被接受和处理
            300+  通常代表重定向
            400+  客户端请求发生了错误
            500+  服务端发生了错误
         */
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText);//xhr.responseText请求返回的文本内容
        } else {
            console.log('There was a problem with the request.');
        }
    } else {
        // 请求还没处理到最后一步
        console.log('still not ready...');
    }
}
```

没用经过封装的原生ajax看起来非常复杂，使用起来代码也极为不协调，并且如果需要多次顺序请求，就会出现回调地狱，所以一般我们不会直接使用原生ajax。

## jQuery的ajax

使用jQuery的ajax之前需要先引入jQuery库。我们可以下载jQ源码来引入，或者直接从各种CDN库引入，比如引入jq3.3.1版本：`<script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>`。

```js
$.ajax({
    method : "POST" //请求方式
    ,url : "/url" //请求地址
    ,data : {} //需要发送的数据
    ,dataType : "json" //对请求返回的数据预处理
    ,success : function(data){} //请求成功的回调函数
    ,error : function(err){} //请求失败的回调函数
});

//另外有单独的  $.get()  $.post() 方法快捷使用
```

jq的ajax用起来就好多了，但是还是没有解决回调地狱的问题。

## fetch与axios

fetch与axios都使用了ES6的Promise方案来解决回调地狱的问题，所以目前我们在使用ajax的时候，比较多的都是采用这两种方案。从功能与完善度来讲，**axios更好用**。

- fetch

  fetch是ES6引入的新API，所以只要浏览器支持ES6，那么对fetch就是支持的，不需要额外的引入。

  **基础使用：**

  ```js
  fetch("/url",{method:"post"}) //路径，各项参数
      .then((res)=>{
      	return res.json(); //将返回的数据格式化
  	})
      .then((data)=>{
      	console.log(data); //最终拿到的数据
  	});
  ```

  fetch是一个底层的API，很多功能使用起来并不完美，比如它会把400/500这种状态码当成成功来处理，默认也不带cookie，并且不支持超时控制与阶段监听。所以，一般情况下，我们**推荐使用axios，而不是fetch**。

- axios

  axios是一个基于Promise的HTTP库，可以用在浏览器和node.js中。原生js并不支持axios，浏览器环境需要引入axios `<script src="https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"></script>` ，node环境需要安装对应的包。

  **基础使用：**

  ```js
  //get
  axios
      .get(
          "http://api.afei.fun" //url
          ,{params : {name : "affei",age : 18}} //传过去的数据
      )
      .then(res=>{
          console.log(res);
      })
      .catch(err=>{
          console.log(err);
      });
  ```

  ```js
  //post
  axios
      .post(
          "http://api.afei.fun" //url
          ,{name:"afei",age:18} //传过去的参数
      )
      .then(res=>{
          console.log(res);
      })
      .catch(err=>{
          console.log(err);
      });
  ```

  **直接执行：**

  ```js
  //直接执行axios，各项参数额外配置
  axios({
          method : "post"
          ,url : "http://api.afei.fun"
          ,data : {name:"afei",age:18}
  	})
      .then(res=>{
      	console.log(res);
  	})
      .catch(err=>{
      	console.log(err);
  	});
  ```

  

