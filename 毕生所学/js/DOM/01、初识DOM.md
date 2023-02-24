# 初识DOM

> DOM（Document Object Model）文档对象模型，是W3C组织推荐的处理可扩展置标语言的标准编程接口。

## 获取节点

DOM为我们提供了一个全局内置对象`document`，要操作HTML标签，我们可以调用`document`对象中的各种方法来获取页面中的标签（在js中我们可以称之为 **元素** 或者 **节点**）：

- 通过ID获取

  eg：`document.getElementById("main")`

- 通过选择器获取

  eg：`document.querySelector("#main .nav")` 

  eg：`document.querySelectorAll(#banner li)`

- 通过class名获取

  eg：`document.getElementsByClassName("left")`

- 通过标签名获取

  eg：`document.getElementsByTagName("p")`

- 特殊标签的获取

  获取html标签 `document.documentElement`

  获取head标签 `document.head`

  获取body标签 `document.body`

  获取title标签 `document.title`

一般情况下，推荐使用 **ID获取** 或者 **选择器获取** ，比较方便。

## 操作HTML内容

`节点.innerHTML` 获取/修改 元素的HTML内容，

`节点.innerText` 获取/修改 元素的文本内容（老版本FF不支持这个属性，使用 `.textContent` 代替）。

## 监听事件

- 事件种类

  鼠标事件： `onclick 左键单击` `ondblclick 左键双击` `onmouseover onmouseenter 鼠标移入` `onmouseout onmouseleave鼠标移出` `onmousedown 鼠标按下` `onmousmove 鼠标移动` `onmouseup 鼠标抬起` `oncontextmenu 右键单击`

  键盘事件：`onkeydown onkeypress 键按下` `onkeyup 键抬起`

  系统事件： `onload 加载完成后` `onerror 加载出错后` `onresize 窗口调整大小时` `onscroll 滚动时` 

  表单事件： `onfocus 获取焦点后` `onblur 失去焦点后` `onchange 改变内容后` `onreset 重置后` `onselect 选择后` `onsubmit 提交后`

- 监听事件写法

  `节点.事件 = 函数`。

  eg：`document.getElementById("main").onclick = function(){alert(1)};`

  这里的函数称之为 **事件函数**，事件函数不会自执行，而是当事件触发时执行。

- 事件函数this指向

  在事件函数中，关键词 `this` 就表示触发事件的这个节点对象。

## 操作节点的标签属性

- 合法标签属性

  直接使用 `节点.属性` 的方式。eg：`console.log(节点.id);` `节点.title = "新的title"`。 

  class名字不能 `.class` ，而是使用 `.className` 代替。

- 自定义的标签属性

  不能直接使用 `.` 操作。

  设置`setAttribute` 获取`getAttribute` 移除`removeAttribute` 。

## 操作样式

- 修改样式

  元素样式由`css`控制，JavaScript想要改变元素的样式，那么就相当于要改变css。

  元素css样式的书写位置有三种：**外部样式表**、**内部样式表**、**行内样式**。js来操作样式时，本质上就相当于要操作这三种位置的css。

  - **外部样式表** ：前端的 js 不能修改一个外部的文件，所以无法通过直接修改外部样式来改变元素。
  - **内部样式表**：内部样式放置到`style`标签中，而style又在当前页面中，所以能够被js控制。但是操作来比较麻烦，所以不推荐。
  - **行内样式**：直接写在标签中，并且优先级最高。js操作样式的**最常用**方式。

  `节点.style.属性` 来控制单个的行内样式。

  `节点.style.cssText` 来控制节点的所有行内样式。

  当单个标签操作的样式比较多时，使用 **改变class来改变样式** 的形式会方便很多。

- 获取样式

  `.style` 只能获取行内样式，要获取元素的最终显示样式使用 `getComputedStyle(节点)`。

## 类名的操作

使用 `.className` 可以来操作标签的类名，但是需要新加一个类名，或者去掉某个类名时，使用`.className`较为麻烦。所以推荐使用新API`.classList` 来操作类名。

添加：`节点.classList.add("类名")`

移除：`节点.classList.remove("类名")`

切换（有则删，无则加）：`节点.classList.toggle("类名")`

是否有某个类名（得到布尔值）：`节点.classList.contain("类名")`





