## js在浏览器和node的区别

- 在浏览器中主要由 基础语法(es) bom dom组成
- 在node中最大的区别是node中能能操作文件，而没有dom bom
- nodejs是将谷歌的v8引擎搬到服务端 使得js能被服务器解析并可成为服务端语言
- js擅长处理字符传，而node中大量处理的是2进制，Buffer就是node内置处理二进制的一个类，可以用它的toString()方法转成字符

## Node的模块系统commonjs

```js
//node出来比es6早，所以有自己的一套模块系统 commonjs
//导出一个对象
module.exports  = {}
//导入(可解构赋值)  导入为浅拷贝方式！
const m = require(" ")
```

## Node内置API模块

### path(路径)模块的常用属性

- 我们写路径的时候都是用/、而返回的一般是\
- 在path中`__dirname`代表当前文件夹目录的绝对路径、`__filename`代表当前文件的绝对路径
- path.join(__dirname,"a.js")：以 / 拼接参数  若没有参数则返回`.`
- path.resolve()：与join相似、区别是resolve没传参数就返会`__dirname`
- path.parse(__filename)：参数为`文件路径`、返回![image-20220429234351042](C:\Users\乐此不疲\AppData\Roaming\Typora\typora-user-images\image-20220429234351042.png)
- path.format(obj)：参数为parse的返回结果、是parse的逆向操作
- path.isAbsolute("路径")：判断是否为绝对路径 返回布尔值

### url(网络地址)模块

- url模块中一般只用其中的URL属性、该属性是一个类，所以得new执行

  ```js
  //一般写法:
  const {URL} = require("url") //取出url模块中的URL属性
  let url = new URL("https://www.baidu.com/wzk?wd=草莓")
  
  console.log(url) //结果如下
  {
      href: 'https://www.baidu.com/wzk?wd=%E8%8D%89%E8%8E%93',
      origin: 'https://www.baidu.com',
      protocol: 'https:',
      username: '',
      password: '',
      host: 'www.baidu.com',
      hostname: 'www.baidu.com',
      port: '',
      pathname: '/wzk',
      search: '?wd=%E8%8D%89%E8%8E%93',
      searchParams: URLSearchParams { 'wd' => '草莓' }, //map结构
      hash: ''
  }
  ```

- 解析url中的键值对模块`querystring`的常用属性
  - querystring.parse("wd=%E8%8D%89%E8%8E%93")   返回键值对的对象
    - 参数1：解析的字符串 参数
    - 参数2：每对键值对的分隔、符 默认是`&`
    - 参数3：键值对之间的赋值符号、默认是`=`
  - querystring.stringify(obj)，逆向操作

### fs(读写文件)模块的常用属性

```js
//该模块经常配和path模块一起使用、node中回调第一个参数一般是err、第二个是成功的返回值
const fs = require("fs")

fs.readFile(path,(err,data) => {}) // 读文件
//err,data返回的是buffer二进制 需要toString()转明文

fs.writeFile(path,"写入的内容",{encoding:"utf-8",flag:"a"},(err) => {})  //写文件
//第三个参数中a是在文件中追加内容  默认是w覆盖  第三个参数整个可以不写

fs.mkdir("创建的路径",0777,(err)=>{})  //创建目录  0777是相关权限

fs.readdir(path,(err,res)=>{}) //res返回该目录下所有子集 返回数组

fs.stat(path,(err,res)=>{}) //其中res.isFile()判断是否为文件

fs.unlink(path,err=>{})  //删除文件
fs.rmdir(path,err=>{})  //删除文件夹  鸡肋的是文件夹中有东西就删不了

fs.rename(oldpath,newpath,err=>{})   //移动或重命名文件
```

```js
//fs模块的高级用法
fs.watchFile(path,(cur,pre)=>{})   //监听文件的改动
fs.unwatchFile(path)   //解除监听

let readStream = fs.createReadStream(prth)	//创建读取流
let writeStream = fs.createWriteStream(path) //创建写入流
readStream.on("close",(err)=>{})	//读取断开时触发的事件  相关事件还有"end","error"
writeStream.on("close",(err)=>{})	//写入断开时触发的事件  相关事件还有"finish","error"
readStream.pipe(writeStream)  //创建读写管道
```

### zlib(压缩)模块

```js
const zlib = require("zlib")
const fs = require("fs")

let gzipTransformStream = zlib.createGzip()   //创建Gzip转换流 可双向转换
let readStream = fs.createReadStream(path);		//创建读写流
let writeStream = fs.createWriteStream(path);

readStream.pipe(gzipTransformStream).pipe(writeStream)  //读完=>压缩=>写入
```

### crypto(加密)模块

```js
const crypto = require('crypto')
const pass = 'fy123456'  //待加密数据
const res = crypto.createHash("md5").update(pass).digest("hex")  
//创建哈希对象  //输入待加密的数据   //输出16进制的哈希结果
```

### events(事件)模块

```js
const Event = require("events")
let myEvent = new Event()    //时间模块的实例对象

myEvent.on("wzk",callback)   	//注册自定义事件
myEvent.once("wanzi",callback)  //注册一次性的自定义事件
myEvent.emit("wzk")     	 	//触发自定义事件
myEvent.removeListener("wzk",callback)  //事件解绑
```

### http模块

```js
const http = require("http")

http.createServer((request,response)=>{
    let {url, method, headers} = request //这里可以根据不同的请求响应不同的文件

    response.writeHead(200,{    //配置响应头
        "Content-Type":"text/plain;charset=utf-8" //纯文本
    })
    response.write("你好")  //响应体  可以返回读取的html文件
    response.end()   //发送响应报文
}).listen(8080,"127.0.0.1") //127.0.0.1代表本地
```

## requset请求第三方包(爬数据)

```js
const request = require("request")

request.get(url,(err,re)=>{console.log(res.body)})
```

## express框架

### 基础用法: 安装包是加 -S 为生成环境

```js
const express = require("express")
let app = express()  //创建express

//静态资源管理
app.use(express.static(__dirname))	//app.use()使用中间件(封装好的方法) 
//static：自动在所写目录下找所有静态资源、起点为该目录下的index.html文件


//解析接收到的数据
app.use(express.json())	//解析JSON格式的数据
app.use(express.urlencoded({extended:false})); //解析url-encoded数据（原始表单）


//解决跨域、该模块需要下载
const cors = require("cors")
app.use(cors())		//开启跨域中间件


//解析cookie格式、该模块需要下载		
const cookieParser = require("cookie-parser")
app.use(cookieParser())


//监听路由的请求 路由可以写正则 动态路由:id  可通过next()使用多个回调称为路由中间件
app.post("/", (req, res, next)=>{next()},(req, res)=>{}) 


//将一类子路由挂载到一个中间件中
app.use("/video", video)  //导入自己写的video子路由文件
//在video文件中写各种子路由
const express = require("express")
const video = express()  //创建另一个express，express可以通过中间件挂载到另一个express上
video.get("/index", (req, res)=>{
    res.send("video index");
})
video.get("/login", (req, res)=>{
    res.send("video login");
})
module.exports = {video}


//req一些常用的属性:
req.path   		//获取请求的路由  多用于动态路由
req.query  		//获取前端通过get请求传过来的json数据
req.body		//获取前端通过post请求传过来的json数据
req.cookies		//拿到cookie
//res一些常用的属性:
res.send("响应内容")   		  //相当于原生的response.write()、只能在最后一个回调用一次
res.set({响应头配置})   			 //批量设置响应头
res.cookie("键", "值", {配置})	 //给前端设置cookie
res.clearCookie('键');
res.redirect("url")		       //重定向
res.download(filePath, fileName, (err, data)=>{	  //使客户端下载文件
    res.sendFile(filePath);
})


//开启服务器
app.listen(8080,"url"); //监听本地第二个参数可不写 127.0.0.1代表本地
```

### 基于express的解析表单数据multer包

https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md

```js
const express = require("express")
const multer = require("multer")   //该模块需要下载 不是express自带的 只是基于express的中间件

// 创建1个关于数据如何存储的配置信息
let storage = multer.diskStorage({
    destination:function(req, file, callback){
        callback(null, `${__dirname}/images`) //接收到客户端上传的文件后 指定存储的目录
    },
    filename:function(req, file, callback){
        callback(null, file.originalname)	//文件命名
    }
})

let upload = multer({ //创建一个函数，专门处理上传的业务。
    storage  // 配置信息
})


//upload.array("avatar", 9)第一个参数是文件name属性值 第二个指定最大文件数量  该函数写在路由监听的第二个参数中  如下示例   upload.single
app.post("/api/data", upload.array("avatar", 9), (req, res)=>{  
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据，如果存在的话
    res.send("上传成功")
})
```

## session+Mongo存储

```js
const app = require("express")()
const session = require("express-session")  //该模块需要下载 
const mongoStore = require("connect-mongo")  //该模块需要下载 

//基础配置session
app.use(session({
    name:"wzk",
    //秘钥字符串，服务端生成session的签名，可随意写
    secret: "fly",
    //给前端设置cookie相关的设置，一般配置maxAge即可
    cookie: {maxAge:7*24*60*60*1000},
    //向服务发送请求后，是否重置cookie时间，建议true
    rolling: true,
    //是否强制重新保存session，即使它没有发生变化，建议false
    resave: false,
    //是否在session还未初始化时就存储，有利于前后鉴权，建议true
    saveUninitialized: true,
    
    //修改session的默认存储方式
    store: mongoStore.create({
        mongoUrl:"mongodb://localhost:27017/blog"  //数据库连接地址
    })
}))


//登录成功时可以通过req.session. 设置字段
//req.session.destroy()  销毁当前session
```

## 后端解决history模式路由刷新404的问题

- connect-history-api-fallback库

- ```js
  //npm install --save connect-history-api-fallback
  const history = require('connect-history-api-fallback')
  app.use(history())  //在static之前使用
  ```
