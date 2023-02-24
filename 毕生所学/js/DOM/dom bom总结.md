## 01 初识DOM

### 1.获取元素

a.通过id过去元素

document.getElementById("id名")

b.通过class名获取元素，拿到元素节点集合

document.getElementByClassNama("className")

c.通过通过标签名获取元素，得到元素集合

document.getElementByTagName("tagName")

d.通过选择器获取元素，拿到单个元素，即使有多个，也只那第一个符合条件的元素

document.querySelector("...")

e.通过选择器获取元素，拿到集合，无满足条件的情况，返回空集合

document.querySelectorAll("...")

f.html标签的获取

document.documentElement

g.head标签的获取

document.head

h.body标签的获取

document.body

i.title标签的获取

document.title

### 2.操作html内容

innerHtml 解析html标签

innerText 不解析html标签

### 3.监听事件

a.鼠标事件

onclick 点击事件

ondblclick 双击事件

onmouseenter onmouseover 鼠标划入事件

onmouseleave onmouseout 鼠标划出事件

onmousemove 鼠标移动事件

onmouseup 鼠标左键抬起事件

onmousedown 鼠标左键按下事件

oncontextmenu 右键菜单操作时

b.键盘事件

onkeypress onkeydown 键抬起

onkeyup 键按下

c.系统时间 window

onload 加载完毕事件

onerror 加载出错后事件

onresize 窗口调整大小时触发事件

onscroll 滚动时事件

d.表单事件

onfocus 获取焦点时事件

onblur 失去焦点时事件

onchange 内容改变时事件

onreset 重置后事件

onselect 选择时事件

onsubmit 提交时事件

## 02 dom进阶

### 1.获取样式

document.getElementById('IdName')
只能获取行内样式，对外部样式和内部样式无效

window.getComputedStyle(参数)
参数就填你需要获取样式的元素，返回一个css样式对象，里面存储元素的所有css样式。只能获取，不能修改。window. 可以省略。
eg.
getComputedStyle(box).backgroundColor
window.getComputedStyle(box, 'after').backgroundColor

### 2.操作样式

a.行内样式
let box = document.getElementById('box')

// box.style.background-color = 'blue' //错误写法

box.style.backgroundColor = 'blue' //正确写法
box.style['background-color'] = 'blue' //正确写法

box.style.float = 'left' //最好改成 cssFloat
box.style.cssFloat = 'left' //最好改成 cssFloat
box.style.color = '#fff'
box.style.fontSize = '20px'

b.可以设置多条样式,通常不像上面那么操作，而是直接通过修改类名的方式来替代
c.box.style.cssText 返回所有的内部style样式字符串

### 3.类名的操作

classList 这个对象可以操作类名
box.classList.add() 添加类名
box.classList.remove() 移除类名
box.classList.toggle() 有则删 无则加 (适用于 简单的开关)
box.classList.replace('queque','chenzhuo') 替换类名  前面是旧值 后面是新值 
box.classList.contains('queque') 判断类名是否存在 存在 返回true 不存在 返回false

### 4.自定义属性

就像这个样子的
let box = document.querySelector('.box')
box.switch = false

### 5.操作标签属性

标签合法属性 标签中自带的属性，eg id class title src alt name (合法属性 可以通过 . 操作)box.id 注意点(class类名 需要 box.className访问 src返回绝对路径 )

自定义标签属性 (又要放到标签内部 但又不属于合法属性 )  既不能通过 对象. 去访问 也不能通过对象.去修改  

自定义属性 box.queque = '520' 在js中认为定义的属性叫自定义属性 arr = [1,2,3] arr.queque = '123'认为给的就是自定义属性 ，arr.length 本身就存在的属性 

box.queque 访问 js环境内的自定义属性 访问不到标签的内部的自定义属性 <div queque=''> 访问不到 queque

setAttribute('属性名','属性值') 设置自定义标签属性(可以设置合法标签属性 但是不要使用)

getAttribute('queque') 获取自定义标签属性值 (可以获取合法标签属性值)

removeAttribute('queque') 移除自定义标签属性 (可以移除合法)



box.setAttribute('data-queque','520')

box.setAttribute('data-liuyi','5201')

box.setAttribute('data-liujunhao','5202')

console.log(box.dataset);

console.log(box.dataset.liujunhao);

## 03 节点获取

### 1.节点类型

document 顶层节点

documentType doctype标签

Element 元素节点

Attribute 属性节点

text 文本节点

comment 注释节点

documentFragment 不属于dom树(文档树) 后面会讲用处



常用节点 Element text Attribute

### 2.获取节点

box.childNodes 获取box的所有子节点(节点里面的节点不会获取)*(元素节点 注释 所有节点类型都可以获取)* 

*box.children 获取box的所有 元素子节点 (元素节点里面的元素节点不会获取)*

*box.parentNode 获取box的父节点* 

*box.offsetParent 获取box的定位父级 如果没有定位父级 就返回body* 

*firstChild 返回第一个子节点* 

*firstElementChild 返回第一个元素节点*

*lastChild 同1 最后一个节点*

*lastElementChild 同2 最后一个元素节点* 

*nextSibling 同1 下一个兄弟节点*

*nextElementSibling 同2 下一个兄弟元素节点*

*previousSibling 同1 返回上一个兄弟节点*

*previousElementSibling 同2 返回上一个兄弟节点*

### 3.*节点属性*

*box.childNodes[0].nodeName 把当前的节点名称返回 如果是元素节点的话 就返回元素名(全部大写)*

*.nodeType 节点类型 类型用对应的序号代替 1 是元素类型 2是属性类型 3是文本类型 记住 13 就可以了(一般用于判断)*

*nodeValue 返回节点值 只有 文本 属性节点可以操作* 

*tagName 返回元素节点名 元素节点去操作 返回大写的 元素名*

*getAtrributeNode() 方法 获取属性节点的方法 返回属性节点(对象)* 

*区别 getAttribute() 返回字符串 返回属性值*

*document.createAttribute('zhuque') 创建属性节点*

*设置属性节点*

*box.setAttributeNode(zhuque)*

## 04 节点操作

节点 节点类型 节点属性 方法 documentFragment 文档片段节点

### 1.操作标签节点

创建标签节点 h5标签的兼容 ie低版本 section article aside header 

let box = document.createElement('p') 

创建文本节点

let text = document.createTextNode('文本节点的内容')

添加标签节点对象 添加到目标节点对象的 末尾

wrap.appendChild(box) 

已有的节点 添加到wrap中的话 原来的位置会被剪切下来 

创建一个仓库 (文档片段节点)

let frag = document.createDocumentFragment()

### 2.标签节点的方法

appendChild 末尾添加

insertBefore(新节点,参照物节点) 在元素节点 某个子节点前添加新子节点

replaceChild(新节点,被替换节点) 替换节点

复制节点 节点是独一无二的对象 页面中只有存在一次

let cloneBox = wrap.children[2].cloneNode(true) //深复制 里面的所有节点也会复制

let cloneBox1 = wrap.children[2].cloneNode(false) //浅复制 只复制外层元素节点

## 05 BOM

### 1.各种尺寸的获取

1.获取窗口 内部的高度和宽度 (滚动条包括在内 不包括调试窗口)

window.innerWidth

window.innerHeight

2.获取 文档可视区域的宽高 (不包括滚动条)

document.documentElement.clientHeight

document.documentElement.clientWidth

### 2.元素 各种宽高

1.获取元素内容宽高 包括内容宽高 + padding (border不加)

wrap.clientWidth  

wrap.clientHeight

2.获取元素实际宽高 包括内容宽高 + padding + border 

wrap.offsetWidth

wrap.offsetHeight

3.获取元素 内容 +padding 如果子元素超出父元素 也会加上超出部分的宽高

如果元素加上 overflow scroll 会把padding 的一半计算进去

wrap.scrollHeight

wrap.scrollWidth

### 3.元素的各种距离

1.获取元素到 !定位父级! 的距离 (不会计算父级的border区域)

offsetTop/offsetLeft 

2.元素.getBoundingClientRect() 相对于视口左上角 跟左 上 方位相关 返回一个对象

bottom: 素的底部到视口顶部的距离

height: 元素的高度

left: 元素的左边到视口左边的距离

right: 元素的右边到视口左边的距离

top: 元素的上边到视口上边的距离

width: 元素的宽度

x: 元素x轴的位置

y: 元素y轴的位置

## 06 BOM

### 1.Screen 显示屏幕对象

window.screen.availHeight: 1040 屏幕的高度 不包括任务栏

window.screen.availWidth: 1920 屏幕的宽度

window.screen.height: 1080 包括任务栏

window.screen.width: 1920

### 2.location 用户当前的URL的信息

url

hash : #(位置标志符) 后面的内容 (不会传输到后台去的)

host : 当前的域名(主机名) + 端口号

hostname : 当前主机名

href: 返回完整的 url 

origin 域名

pathname 路径 文件存储在服务端

port 端口

protocol 协议

search (get提交)返回url ? 后面的内容 wd = 123 & value = 234

### 3.History 历史信息(记录浏览器窗口中访问过的URL)

下节课再讲

## 07 滚动 + 事件对象

### 1.BOM收尾

window.location

url

search //? get拼接上的内容 & 

href 返回完整的url 可以设置

hostname host主机

pathname 

port 端口号

reload 重新加载

window.history.back() 返回当前窗口的上一条 历史记录 

window.history.forward() 返回当前窗口的下一条 历史记录 

window.history.go() 返回窗口任意 历史记录 -1 后退一条 1 前进一条 

window.open('https://www.baidu.com','跳转方式')

window.navigator.userAgent 返回浏览器的信息 (标识符) 

### 2.滚动距离

1.滚动方法 

scrollTo(x,y) x水平 y垂直 x y 相对于文档的起点 

scrollBy(x,y) 相对于上一次的基础进行增加移动 (轻微的移动)

2.滚动距离

scrollTop/scrollLeft 页面滚动宽高

获取元素的滚动距离，能onscroll滚动的盒子必须是内容超出了盒子且盒子出现滚动条 

### 3.事件对象

1.event事件对象 直接访问 event(写法固定)或者window,event 或者 事件函数 传入第一个参数 那么这个参数即事件对象 

2.(当改变this指向 bind传参时 形参一一接收实参 还有多的 就接受事件对象)

let wrap = document.getElementById('wrap')

let fn = run.bind(wrap,1,2,3)

wrap.onclick = fn

function run(a,b,c,d){

​	console.log(a,b,c,d);

}

3.event对象内的属性

clientX / clientY 获取鼠标到文档可视区域的 left 和 top距离

offsetX / offsetY 鼠标相对于事件源(当前的点击的盒子)left 和top的距离 

pageX pageY 获取 鼠标到文档起始区的 left top的距离

4.事件冒泡

1.冒泡模式 谷歌提出来 微软 捕获模式

当事件被触发时，会生成一个泡泡沿着dom结构一层一层向上传递(往长辈身上去冒) ，在传递过程中，如果发现有其他的节点恰好有同类型事件，那么这节点的这个事件也会被触发 (点小触大)

2.阻止事件冒泡 

event.stopPropagation()

## 08 默认行为

### 1.默认行为

阻止默认行为

event.preventDefault()

### 2.事件监听

dom0级

同类型的事件一个对象只能绑定一个事件函数，重复绑定下面的就会覆盖上面的

事件解绑 清除这个事件 对象.事件 = null

dom2级 

addEventListener('type',callback)  第一个参数on+type事件类型 把on去掉 第二个参数callback回调函数(事件函数) 第三个参数 bool 决定 是按 冒泡模式 还是捕获模式 不写 默认冒泡 true 捕获 false 冒泡 

捕获 从大到小 

冒泡 从小到大 

父级捕获 父级先跑 

父级冒泡 父级垫底 

存在捕获模式的话 先去找 最外层的捕获父级 即存在捕获先执行捕获，在执行冒泡

可以绑定多个同类型事件  哪个先定义 哪个先执行 

解绑事件监听

document.removeEventListener('click',fn) 必须 回调函数必须具名 通过名字去 移除 

## 09 滚轮事件

### 1.滚轮事件

onmousewheel

event.wheelDelta 记录滚轮的方向 120 往上滚 -120 往下滚 

兼容 火狐

DOMMouseScroll 只能通过监听的方式去添加

event.detail 记录滚轮方向 -3 往上滚 3 往下滚

## 10 事件代理

### 1.事件代理

事件代理（Event Delegation），又称之为事件委托。是JavaScript中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定在子元素的响应事件（click、keydown......）委托给父元素，让父元素担当事件监听的职务。事件代理的原理是DOM元素的事件冒泡。

eg.

setTimeout(()=>{

​    let box = document.createElement('div')

​    box.id = 'wrap'

​    box.innerHTML = '雀雀'

​    document.body.appendChild(box)

   },100)

document.addEventListener('click',()=>{

​    // console.log(event.target); //事件源

​    if(event.target.id === 'wrap'){

​     console.log(1);

​    }

   })

记住，一定要绑他爹上

