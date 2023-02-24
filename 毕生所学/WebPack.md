[webpack文档](https://lab.puji.design/webpack-getting-started-manual/)

## 为什么需要webpack

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

   