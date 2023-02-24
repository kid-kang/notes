## Sass环境变量配置安装 （第一种）

### 官网下载

1.官网地址：sass-lang.com

2.下载安装解压解压完成后是一个 dart-sass 文件



### 安装

1.解压后放到地盘

D:\dart-sass

2.设置环境变量

计算机 > 右键 > 属性 > 高级系统设置  >  环境变量 > Path点开

把 D:\dart-sass 安装路径放在后面保存

3.测试

windows+r输入cmd

在后台输入sass --version

显示版本号及安装成功



---

## VScode安装方法

### 扩展商店里下载

1.Live Sass Compiler

2.点击管理（设置的小符号）

3.点击扩展设置

4.点击 在settings.json中编辑

```
{
    "liveSassCompile.settings.formats": [
        {
            /*
                :nested - 嵌套格式
                ：expanded - 展开格式
                ：compact - 紧凑格式
                ：compressed - 压缩格式
            */
            "format": "expanded", //可指定的出口css样式（expanded，compact，compressed，nested）
            "extensionName": ".css",
            "savePath": "~/../css" //为null 表示当前目录
        }
    ],
    // 排除目录
    "liveSassCompile.settings.excludeList": [
        
        "**/node_modules/**",
        ".vscode/**"
    ],
    // 是否生成对应的map
    "liveSassCompile.settings.generateMap": true,
    // 是否添加兼容前缀 例如：-webkit- -moz- ...等
    "liveSassCompile.settings.autoprefix": [
        "> 1%",
        "last 2 versions"
    ],
    "explorer.confirmDelete": false
}
```

5.复制上端代码到第四步打开的 settings.json 文件中

## 选择器嵌套



## 父选择器  &

在嵌套 CSS 规则时，有时也需要直接使用嵌套外层的父选择器，例如，当给某个元素设定 hover 样式时，或者当 body元素有某个 classname 时，可以用 & 代表嵌套规则外层的父选择器。

例如有这么一段样式：

```css
.container{width: 1200px;margin: 0 auto}
.container a{color: #333;}
.container a:hover{text-decoration: underline;color: #f00;}
.container .top{border: 1px #f2f2f2 solid;}
.container .top-left{float: left; width: 200px;}
```

## 属性选择器

有些CSS属性遵循相同的命名空间（namespace），比如font-family，font-size，font-weight 都以 font 作为属性的命名空间。为了便于管理这样的属性，同时也为了避免了重复输入，Sass允许将属性嵌套在命名空间中

CSS写法：

```css
.container a {
  color: #333;
  font-size: 14px;
  font-family: sans-serif;
  font-weight: bold;
}
```

Sass写法：

```css
.container {
    a {
        color: #333;
        font: {
            size: 14px;
            family: sans-serif;
            weight:bold;
         }
    }
}
```

注意font：后面要加一个空格

## 注释讲解

Sass的注释有单行和多行注释跟CSS注释一样

### 单行注释

Sass编译后不编译单行注释

```scss
// 单行注释
```

### 多行注释

Sass编译后会编译多行注释、不带！压缩不会编译、带！的压缩后也会有

```scss
/*
	多行注释
*/

/*!
	Author: #{$author}.
*/
```

## 变量

### 1.定义

变量以`$`符号开头，赋值方法与 CSS 属性的写法一样

~~~scss
$width: 1600px;
$pen-size: 3em;
~~~

### 2.使用

~~~scss
#app {
    height: $width;
    font-size: $pen-size;
}
~~~

### 默认值!default

```scss
$color:#666 !default;
```

## 变量值类型

SassScript 支持 7 种主要的数据类型：

- 数字，`1, 2, 13, 10px`
- 字符串，有引号字符串与无引号字符串，`"foo", 'bar', baz`
- 颜色，`blue, #04a3f9, rgba(255,0,0,0.5)`
- 布尔型，`true, false`
- 空值，`null`
- 数组 (list)，用空格或逗号作分隔符，`1.5em 1em 0 2em, Helvetica, Arial, sans-serif`
- maps, 相当于 JavaScript 的 object，`(key1: value1, key2: value2)`

判断数据类型的方式：`type-of($value)`

### 5.数组 (Lists)

通过空格或者逗号分隔的一系列的值

~~~scss
$list0: 1px 2px 5px 6px;
~~~

------

## 导入@import

Sass 扩展了 @import 的功能，允许其导入 Scss 或 Sass 文件。被导入的文件将合并编译到同一个 CSS 文件中，另外，被导入的文件中所包含的变量或混合指令 (mixin) 都可以再导入的文件中使用。

**例如**

public.scss

```scss
$font-base-color:#333;
```

在index.scss里面使用

```scss
@import "public";
$color:#666;
.container {
	border-color: $color;
	color:$font-base-color;
}
```

---

## 混合指令 @mixin

用于定义可重复使用的样式、注意：这不是函数！没有返回值！！

- ### 1.定义混合指令

  混合指令的用法是在 `@mixin` 后添加名称与样式，以及需要的参数（可选）。

  ~~~scss
  // 格式：
  @mixin name {
      // 样式....
  }
  ~~~

  ~~~scss
  // example：
  @mixin large-text {
    font: {
      family: Arial;
      size: 20px;
      weight: bold;
    }
    color: #ff0000;
  }
  ~~~

  ### 2.引用混合样式

  使用 `@include` 指令引用混合样式，格式是在其后添加混合名称，以及需要的参数（可选）。

  ~~~scss
  // 格式：
  @include name;
  
  // 注：无参数或参数都有默认值时，带不带括号都可以
  ~~~

  ~~~scss
  // example：
  p {
      @include large-text;
  }
  
  // compile:
  p {
    font-family: Arial;
    font-size: 20px;
    font-weight: bold;
    color: #ff0000;
  }
  ~~~

  ### 3.参数

  #### a. 位置传参

  ~~~scss
  @mixin mp($width) {
      margin: $width;
  }
  
  body {
      @include mp(300px);
  }
  ~~~

  #### b.参数默认值

  ~~~scss
  @mixin mp($width: 500px) {
      margin: $width;
  }
  
  body {
      @include mp(300px);
  }
  ~~~


---

## @extend（继承）指令

### 使用

```scss
.alert{
    padding:15px;
    margin-bottom: 20px;
    border:qpx solid transparent;
    border-radius: 4px;
    font-size:12px;
}

.alert-danger {
    @extend .alert;
    color: #afa;
    background-color:#aaf ;
    border-color: #faa;
}
```

## 运算

### 1.数字运算符

SassScript 支持数字的加减乘除、取整等运算 (`+, -, *, /, %`)，如果必要会在不同单位间转换值

如果要保留运算符号，则应该使用插值语法

- `+`

- `-`

- `*`

  ~~~scss
  $num1: 1 * 2;    // 2
  $mul2: 1 * 2px;  // 2px
  $num3: 1px * 2;  // 2px
  $num4: 2px * 2px;// 编译不通过
  
  $num5: 1 * 2abc; // 2abc
  ~~~

- `/`

  ~~~scss
  // 总结：
  a.不会四舍五入，精确到小数点后5位
  ~~~

- `%`

  ~~~scss
  // 总结：
  a.值与"%"之间必须要有空格，否则会被看做字符串
  ~~~

## 控制指令

### 1.`if()`

*三元运算符*

~~~scss
p {
    color: if(1 + 1 = 2, green, yellow);
}

// compile:
p{
    color: green;
}
~~~

### 2.`@if`

*条件语句*

`@if` 声明后面可以跟多个 `@else if` 声明，或者一个 `@else` 声明。

- `单@if`

  ~~~scss
  p {
      @if 1 + 1 == 2 {
          color: red;
      }
  }
  
  // compile:
  p {
    color: red;
  }
  ~~~

- `@if - @else`

  ~~~scss
  p {
      @if 1 + 1 != 2 {
          color: red;
      } @else {
          color: blue;
      }
  }
  
  // compile:
  p {
    color: blue;
  }
  ~~~

- `@if - @else if - @else`

  ~~~scss
  $age: 19;
  
  p {
      @if $age == 18 {
          color: red;
      } @else if $age == 19 {
          color: blue;
      } @else {
          color: green;
      }
  }
  
  // compile:
  p {
    color: blue;
  }
  ~~~



### 3.`@for`

*循环语句

~~~scss
@for $i from 1 through 3 {
  .item-#{$i} { 
      width: 2em * $i; 
    }
}

// compile:
.item-1 {
  width: 2em; 
}
.item-2 {
  width: 4em; 
}
.item-3 {
  width: 6em; 
}
~~~

### 4.`@while`

*循环语句*



~~~scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { 
      width: 2em * $i; 
    }
  $i: $i - 2;
}

// compile:
.item-6 {
  width: 12em; }
.item-4 {
  width: 8em; }
.item-2 {
  width: 4em; }
~~~

### 5.`@each`

*循环语句*

表达式：`$var in $vars`

`$var` 可以是任何变量名

`$vars` 只能是`Lists`或者`Maps`

- 一维列表

  ~~~scss
  @each $item in puma, sea-slug, egret, salamander {
    .#{$item}-icon {
      background-image: url('/images/#{$animal}.png');
    }
  }
  
  // compile:
  .puma-icon {
    background-image: url('/images/puma.png'); }
  .sea-slug-icon {
    background-image: url('/images/sea-slug.png'); }
  .egret-icon {
    background-image: url('/images/egret.png'); }
  .salamander-icon {
    background-image: url('/images/salamander.png'); }
  ~~~

- 二维列表

  ~~~scss
  @each $animal, $color, $cursor in (puma, black, default),
                                    (sea-slug, blue, pointer),
                                    (egret, white, move) {
    .#{$animal}-icon {
      background-image: url('/images/#{$animal}.png');
      border: 2px solid $color;
      cursor: $cursor;
    }
  }
  ~~~



## 插值语句 #{ }

引入之前的案例发出一个问题

例如

```scss
p{
    font: 16px/30px Arial,Helvetia,sans-serif;
}
```

如果需要使用变量，同时又要确保 / 不做除法运算而是完整的编译到 CSS 文件中，只需要用 #{} 插值语句将变量包裹。

使用插值语法：

```scss
$font-size: 16px;
$height: 30px;
p{
	font: #{$font-size}/#{$height};
}
```

## 自定义函数

> Sass 支持自定义函数，并能在任何属性值或 Sass script 中使用
>
> Params: 与Mixin一致
>
> 支持返回值

**基本格式：**

~~~scss
@function fn-name($params...) {
    @return $params;
}
~~~

~~~scss
// example:
@function fn-name($params...) {
    @return nth($params, 1);
}
p {
    height: fn-name(1px);
}

// compiled:
p {
  height: 1px;
}
~~~