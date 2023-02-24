## 创建服务器koa实例

```js
const Koa = require('koa')
const app = new Koa

ctx.body = {}  //响应前端的数据
app.listen(3000)  //监听客户端 返回server对象
```

## 创建路由router实例

```js
const router = require('koa-router')()

router.get('/路由', async ctx => {//路由的响应
  await ctx.render('响应准备渲染的文件夹中渲染的文件')//比如填  index
})

router.post('/路由', async ctx => {
})

//动态路由 多用于仅删除数据操作
router.delete('/koa/:id',async (ctx, next) => {
  console.log(ctx.params)		//{ id: '1' }
})

app  //代码最后写这个固定写法
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)
```

```js
//解决前后端路由冲突
const fs = require('fs');
const { resolve } = require('path')
//方法一: 在后端的跟文件(index.js)最后写
app.use( async ( ctx ) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(resolve(__dirname,'./public/index.html'));
})
//方法二: 在后端的路由文件夹的根路由文件(routers/router.js)最后加
r.get('/:id', ctx => {
    ctx.type = 'html'; 
    ctx.body = fs.createReadStream(resolve(__dirname,'../public/index.html'));
})

```

## @koa/cors模块（解决跨域问题）

```js
const cors = require('@koa/cors')
app.use(cors())//允许跨域请求
```

## koa-views模块（响应解析的视图文档）

```js
const views = require('koa-views')

app.use(views('准备渲染的文件夹路径'), {// 加载解析的文档到app上
  extension: "文件夹中文件的后缀名" //pug   html是默认的
})
//resolve(__dirname,"./views")   点斜杠 别忘了
```

## koa-static模块（静态链接自动响应）

```js
const koaStatic = require('koa-static')

app.use(koaStatic(静态链接的文件夹路径))
//设置了静态资源后所有访问改文件夹内的文件都不要加静态资源目录文件夹名 加了反而出问题
```

## koa-body模块（处理 post 请求）

```js
const { koaBody } = require('koa-body')

app.use(koaBody()) //之后就能在中间件中调取请求的数据返回对象  ctx.request.body（post请求）   ctx.request.query(get请求)
body(opt)//接收文件形式的数据时需要配置 opt是配置对象 详情见代码块文件
```

## koa-session模块

```js
const session = require('koa-session')
const mongoStor = require('connect-mongo')

app.keys = ['secret']	// 密钥
const CONFIG = {
  key: 'koa:sess', //cookie的key。 (默认是 koa:sess) 
  maxAge: 86400000, // cookie的过期时间单位ms(默认是一天)
  overwrite: true,//是否可重写
  httpOnly: true,//不允许前端可见
  singed: true,//这个是对客户端Cookie的签名，也就是用一个特点的字符加密(多一个sig的cookie文件)，保证客户端Cookie不会被伪造出来
  rolling: true //响应时刷新
  
  store: new SessionStore({
            collection: 'navigation', //数据库集合
            connection: Mongoose,     // 数据库链接实例
            expires: 86400, // 默认时间为1天
            name: 'session' // 保存session的表名称
        })
}
app.use(session(CONFIG, app))


//ctx.session.isNew  这是判断用户是否是登录状态  ture为未登录
//delete ctx.session 删除session
```

## cookies的设置和清除

```js
ctx.cookies.set(name, value, {options}); // 通过 options 设置 cookie name 的 value  //{maxAge: 60 * 1000 * 60,httpOnly: true}
ctx.cookies.get('name');// Koa 中获取 Cookie 的值

ctx.cookies.set('name','',{signed:false,maxAge:0}) //清除cookie代码示例
```

## 后端接收文件形式的数据

```js
//配置opt对象
let opt = {
  multipart: true,//支持多文件上传
  strict:false, //支持delete请求
  encoding: "gzip",//接收的文件形式gzip压缩形式 但接收的是没有压缩的
  formidable: {
    uploadDir: resolve(__dirname, "uploadDir"), // 设置接收的文件的存放地址，
    maxFileSize: 1024 * 500,//文件大小
    // 保持默认文件后缀名
    keepExtensions: true,
      
    //onFileBegin(name,file){文件上传前的一些设置操作 file.path可以控制文件保存整个的路径 所以也可以控制重命名文件命}  详情见下图
  }
}

//post路由内使用 koaBody()
router.post('/update', 
            
            async (ctx, next) => {
  try {//写一个中间件检擦接收的文件是否符合配置opt
    await next()
  }catch{}
}, 
    
            koaBody(opt), 
           	async ctx => {
  ctx.body = "123"
})
```

![image.png](https://tva1.sinaimg.cn/large/007dOMStgy1h7rxpkd8vuj30xn0cajt9.jpg)

## fs模块

```js
const fs = require('fs');
//读取文件readFile函数
//readFile(filename,[options],callback); 

/**
 * filename, 必选参数，文件名
 * [options],可选参数，可指定flag（文件操作选项，如r+ 读写；w+ 读写，文件不存在则创建）及encoding属性
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
```

```js
//写文件
// fs.writeFile(filename,data,[options],callback);

/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */

//以追加方式写文件  // fs.appendFile(filename,data,[options],callback);
```

```js
//创建目录;
//fs.mkdir(path, [mode], callback);

/**
 * path, 被创建目录的完整路径及目录名；
 * [mode], 目录权限，默认0777
 * [callback(err)], 创建完目录回调函数,err错误对象
 */
```

```js
//读取目录;
//fs.readdir(path, callback);

/**
 * path, 要读取目录的完整路径及目录名；
 * [callback(err, files)], 读完目录回调函数；err错误对象，files数组，存放读取到的目录中的所有文件名
 */
```

```js
//移动,重命名文件或目录
//fs.rename(oldPath, newPath, callback);

/**
 * oldPath, 原目录/文件的完整路径及名；
 * newPath, 新目录/文件的完整路径及名；如果新路径与原路径相同，而只文件名不同，则是重命名
 * [callback(err)], 操作完成回调函数；err操作失败对象
 */
```

```js
//rs.pipe(destination, [options]);
/**
 * destination 必须一个可写入流数据对象
 * [opations] end 默认为true，表示读取完成立即关闭文件；
 */

const rs = fs.createReadStream(__dirname + '/test/Until You.mp3');
const ws = fs.createWriteStream(__dirname + '/test/untiyou.mp3');
rs.pipe(ws);
rs.on('data', function (data) {
  console.log('数据可读')
});
rs.on('end', function () {
  console.log('文件读取完成');
  //ws.end('再见')
});
```

## URL模块

```js
const URL = require('url').URL
let u = "http://fy:123456@nodejs.cn:8080/api/url?aaa=bbb#123"
let a = new URL(u)

console.log(a)  //返回
URL {
  href: 'http://fy:123456@nodejs.cn:8080/api/url?aaa=bbb#123',
  origin: 'http://nodejs.cn:8080',
  protocol: 'http:',
  username: 'fy',
  password: '123456',
  host: 'nodejs.cn:8080',
  hostname: 'nodejs.cn',
  port: '8080',
  pathname: '/api/url',
  search: '?aaa=bbb',
  searchParams: URLSearchParams { 'aaa' => 'bbb' },
  hash: '#123'  //位置的标识符
}
```

## crypto不可逆加密模块

```js
//无论数据多长  加密后的都是固定长度
const crypto = require('crypto')
const pass = 'fy123456' 
const hash = crypto.createHash("md5")  //创建md5哈希对象  还有sha1，sha256 sha512
hash.update(pass)               //输入待加密的数据
let res = hash.digest("hex")    //输出16进制的哈希结果  还有一个是 base64 的哈希结果 一般不常用

console.log(res) //// md5  3863e14eee210c0c7cb8a7aaf8daf55d
```

## pm2 start index.js

- pm2 stop index.js