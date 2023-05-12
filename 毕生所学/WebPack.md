[webpack文档](https://lab.puji.design/webpack-getting-started-manual/)

### 什么是构建工具？

##### 不用构建工具：

稍微改一点点东西, 非常麻烦

将App.ts ---> tsc ---> App.js ---> React-complier ---> js文件

每次改一点 ---> 这个顺序还不能错 

##### 构建工具：

我们写的代码一变化 ---> 构建工具帮我们自动去tsc, react-compiler, less, babel, uglifyjs全部挨个走一遍 ---> js

构建工具能够帮你把tsc, react-compiler, less, babel, uglifyjs全部集成到一起

我们只需要关心我们写的代码就好了 

> 打包: 将我们写的浏览器不认识的代码 交给构建工具进行编译处理的过程就叫做打包, 打包完成以后会给我们一个浏览器可以认识的文件

一个构建工具他到底承担了哪些脏活累活:

1. 模块化开发支持: 支持直接从node_modules里引入代码 + 多种模块化支持
2. 处理代码兼容性: 比如babel语法降级, less,ts 语法转换(**不是构建工具做的, 构建工具将这些语法对应的处理工具集成进来自动化处理**)
3. 提高项目性能: 压缩文件, **代码分割**
4. 优化开发体验: 
   - 热更新
   - 跨域的问题

### vite为什么比webpack启动的更快

webpack支持多种模块化：ESmodule，common.js等

他一开始必须要统一模块化代码, 所以意味着他需要将所有的依赖全部读一遍

 webpack更多的关注兼容性, 而vite关注浏览器端的开发体验



### 为什么ESmodule导入只能是绝对或相对路径

### 为什么导入`import _ from 'lodash'`的时候不去node_modules去找一下呢？

- 因为ESmodule是基于浏览器端的，lodash里可能还嵌套引入了上百种js文件，浏览器是通过网络请求文件的，所以这样会造成网络多包传输的性能问题(也是原生esmodule规范不敢支持node_modules的原因之一), 有了依赖预构建以后无论他有多少的额外export 和import, vite都会尽可能的将他们进行集成最后只生成一个或者几个模块
- **依赖预构建**: 首先vite会找到对应的依赖, 然后调用esbuild(对js语法进行处理的一个库), 将其他规范的代码转换成esmodule规范, 然后放到当前目录下的node_modules/.vite/deps, 同时对esmodule规范的各个模块进行统一集成 



## 为什么需要构建工具？

**浏览器的运行效率问题**

我们如果不使用任何打包工具，还是按照最原始的写法，其实在开发中就会变得麻烦，比如说我们如果编写的代码文件比较多，此时我们就需要发送多次http请求，如果其中一个文件没有请求回来，此时如果下面的文件对该文件存在一些依赖，就会导致页面中的部分功能没有办法实现。

**浏览器对新技术的支持度不够**
比如说我们编写一些比较高级的语法，但是部分浏览器是不支持的，此时我们就需要设置一些pollfill去解决该问题。在例如我们编写的TS和Vue文件，这些浏览器都不能识别，而webpack就会使用对应的babel对其进行转化，转化为浏览器可以识别的文件。

**webpack如何做的**
webpack中存在五大模块。`Entry`,`Output`,`Loader`,`Plugins`,`Mode`。首先会根据入口文件进行收集依赖，并且在`Output`中进行输出依赖，并且在其中使用`loader`和`plugins`对文件进行相应的转化。



### 全局安装-g与本地安装

> 总结：全局安装安装一次重复使用，本地安装使用什么安装什么。
>
> 总结：只要提供指令的包都建议使用全局安装；其它包打包是提供一个功能，用于解决某一需求，建议安装成本地包。

### src   bulid文件

- src 放静态资源，其中应该有一个入口起点文件index.js,其中要引入所有资源
- bulid 该文件夹根据配置文件通过webpack指令后自动生成，且生成打包后浏览器可解析的文件build.js 

### 运行指令……

![image-20220108202324773](C:\Users\乐此不疲\AppData\Roaming\Typora\typora-user-images\image-20220108202324773.png)

### 文件配置

1. 构建webpack.config.js配置文件

   ```js
   //基本配置
   const { resolve } = require('path')
   module.exports = {
   	entry:'./src/index.js',//入口文件
   	output: {//打包好的文件放在哪
   		filename: 'bulid.js',
   		path: resolve(__dirname,'build')
   	},
   	module: {//loader配置  也就是让webpack能处理非js文件
   		rules: [
   			
   		]
   	},
   	plugins: [//plugins配置 优化压缩等
       	
   	],
   	mode: 'development'//开发模式
   	//mode: 'production'
   }
   ```

   ```js
   const { resolve } = require('path')
   const HWP = require('html-webpack-pulgin')//引入html的插件
   
   //+css less html 样式图片 img图片 配置
   module.exports = {
   	entry:'./src/index.js',//入口文件
   	output: {//打包好的文件放在哪
   		filename: 'bulid.js',
   		path: resolve(__dirname,'build')
   	},
   	module: {//loader配置  也就是让webpack能处理哪些非js文件
   		rules: [
               //css处理
   			{//安装use中相应的包，use作用的顺序从后往前 
                   test: /\.css$/,
                   use: ['style-loader','css-loader']//将css转commonjs字符串再加到创建的style标签中去
               },
               //less处理
               {//注意这里需要加一个less包 一起4个loader
                   test: /\.less$/,
                   use: ['style-loader','css-loader','less-loader']
               },
               //样式中的图片处理
               {
                   test: /\.(png|jpg|gif)$/,
                   //注意这里要下url-loader和file-loader两个包
                   loader: "url-loader",//一个loader可以直接代替use
                   options: {
                       limit: 8 * 1024 ,//图片小于8kb就被base64处理 可直接解析 大于则直接下载到bulid文件夹中，缺点是体积变大了 ，优点是减少网络请求
                       esModule: false,//使用commonjs解析
                       name: '[hash:10].[ext]'//取hash前十位做图片名，扩展名不变
                   }
               },
               //html中img标签中的图片
               {//html内
                   test: /\.html$/,
                   loader: "html-loader"
               },
   		]
   	},
   	plugins: [//插件配置项 优化压缩等 
       	//先安装 html-webpack-pulgin 包
           new HWP({//功能: 在bulid中默认创建一个内容相同的html文件 并且自动引入了打包好后的bulid.js
               template: './src/html.html'
           })
   	],
   	mode: 'development'//开发模式
   	//mode: 'production'
   }
   ```

   