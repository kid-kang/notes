

# React基础

## React介绍

**React是什么**

​     一个专注于构建用户界面的 JavaScript 库

​	React中文文档 （https://zh-hans.reactjs.org/）

​	React新文档	（https://beta.reactjs.org/）（开发中....）

**vite安装命令**

```js
// npm
npm init vite@latest
// yarn
yarn create vite

// react + TS
npx create-react-app my-app --template typescript

# react + Redux
npx create-react-app my-app --template redux

# Redux + TypeScript
npx create-react-app my-app --template redux-typescript
```

**React有什么特点**

1. 声明式UI（JSX）

   ![](assets/jsx02.png)

2. 组件化

3. 一次学习，矿平台编写

   react既可以开发web应用也可以使用同样的语法开发原生应用（react-native），比如安卓和ios应用，甚至可以使用react开发VR应用，想象力空间十足，react更像是一个 `元框架`  为各种领域赋能

   
   

## 环境初始化

### 1. 使用脚手架创建项目 

```bash
npx create-react-app react-basic
```

说明：

1. npx create-react-app 是固定命令，`create-react-app`是React脚手架的名称
2. react-basic表示项目名称，可以自定义，保持语义化
3. npx 命令会帮助我们临时安装create-react-app包，然后初始化项目完成之后会自自动删掉，所以不需要全局安装create-react-app

- 启动项目

  ```bash
  yarn start
  or
  npm start
  ```

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// 引入根组件App
import App from './App'
// 通过调用ReactDOM的render方法渲染App根组件到id为root的dom节点上
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```

## JSX基础

### 1. JSX介绍

JSX是 JavaScript XML（HTML）的缩写，表示能在 JS 代码中书写 HTML 结构，JSX 并不是标准的 JS 语法，是 JS 的语法扩展，浏览器默认是不识别的，脚手架中内置的 [@babel/plugin-transform-react-jsx](@babel/plugin-transform-react-jsx) 包，用来解析该语法

### 2. JSX中使用js表达式

**语法**

`{ JS 表达式 }`

```jsx
const name = '柴柴'

<h1>你好，我叫{name}</h1>   //    <h1>你好,我叫柴柴</h1>
```

**特别注意**

​	if 语句/ switch-case 语句/ 变量声明语句，这些叫做语句，不是表达式，不能出现在 `{}` 中！！

### 3. JSX列表渲染

实现：使用数组的`map` 方法

```jsx
// 来个列表
const songs = [
  { id: 1, name: '痴心绝对' },
  { id: 2, name: '像我这样的人' },
  { id: 3, name: '南山南' }
]

function App() {
  return (
    <div className="App">
      <ul>
        {
          songs.map(item => <li>{item.name}</li>)
        }
      </ul>
    </div>
  )
}

export default App
```

注意点：需要为遍历项添加 `key` 属性

### 4. JSX样式处理

- 行内样式 - style

  ```jsx
  const styleObj = {
      color:red
  }
  
  function App() {
    return (
      <div className="App">
        <div style={ styleObj }>this is a div</div>
      </div>
    )
  }
  
  export default App
  ```

  

- 类名 - className - 动态类名控制

  ```jsx
  import './app.css'
  const showTitle = true
  function App() {
    return (
      <div className="App">
        <div className={ showTitle ? 'title' : ''}>this is a div</div>
      </div>
    )
  }
  export default App
  ```

### 6. JSX注意事项

1. JSX必须有一个根节点，如果没有根节点，可以使用`<></>`（幽灵节点）替代
2. 所有标签必须形成闭合，成对闭合或者自闭合都可以
3. JSX中的语法更加贴近JS语法，属性名采用驼峰命名法  `class -> className`  `for -> htmlFor`
4. JSX支持多行（换行），如果需要换行，需使用`()` 包裹，防止bug出现

## 函数组件

**组件定义与渲染**

```jsx
// 定义函数组件
function HelloFn () {
  return <div>这是我的第一个函数组件!</div>
}
```

**约定说明**

1. 组件的名称**必须首字母大写**，react内部会根据这个来判断是组件还是普通的HTML标签
2. 函数组件**必须有返回值**，表示该组件的 UI 结构；如果不需要渲染任何内容，则返回 null

3. 组件就像 HTML 标签一样可以被渲染到页面中。组件表示的是一段结构内容，对于函数组件来说，渲染的内容是函数的**返回值**就是对应的内容
4. 使用函数名称作为组件标签名称，可以成对出现也可以自闭合


## 事件绑定

### 1. 如何绑定事件

react事件采用驼峰命名法，比如：onMouseEnter、onFocus

```jsx
// 函数组件
function HelloFn () {
  // 定义事件回调函数
  const clickHandler = () => {
    console.log('事件被触发了')
  }
  return (
    // 绑定事件
    <button onClick={clickHandler}>click me!</button>
  )
}
```

### 2. 获取事件对象

```jsx
// 函数组件
function HelloFn () {
  // 定义事件回调函数
  const clickHandler = (e) => {
    e.preventDefault()
    console.log('事件被触发了', e)
  }
  
  return (
    // 绑定事件
    <a href="http://www.baidu.com/" onClick={clickHandler}>百度</a>
  )
}
```


## 组件状态

```jsx
import { useState } from "react"

function App() {
  let [comment, setComment] = useState("")	// 初始化状态
  
  setComment(e.target.value)	// 修改状态 响应式更新UI
}
```

## 表单处理

使用React处理表单元素，一般有俩种方式：

1. 受控组件 （推荐使用）

2. 非受控组件 （了解）

### 1. 受控表单组件

```jsx
// 声明事件回调函数
changeHandler = (e) => {
    setComment(e.target.value)
}
```

### 2. 非受控表单组件

> 非受控组件就是通过手动操作dom的方式获取文本框的值，文本框的状态不受react组件的state中的状态控制，直接通过原生dom获取输入框的值

**实现步骤**

1. 导入`createRef` 函数
2. 调用createRef函数，创建一个ref对象，存储到名为`msgRef`的实例属性中
3. 为input添加ref属性，值为`msgRef`
4. 在按钮的事件处理程序中，通过`msgRef.current`即可拿到input对应的dom元素，而其中`msgRef.current.value`拿到的就是文本框的值

```jsx
import React, { createRef } from 'react'

// 使用createRef产生一个存放dom的对象容器
msgRef = createRef()

changeHandler = () => {
    console.log(this.msgRef.current.value)
}
```

# React组件通信

## 父传子实现

**实现步骤**

1. 父组件提供要传递的数据  -  `state`

2. 给子组件标签`添加属性`值为 state中的数据  

3. 子组件中通过 `props` 接收父组件中传过来的数据

   2. 函数式组件直接通过参数获取props对象


**代码实现**

```jsx
import React from 'react'

// 函数式子组件
function FSon(props) {
  return (
    <div>
      子组件1
      {props.msg}
    </div>
  )
}


// 父组件
<FSon msg={this.state.message} />

```

## props说明

**1.  props是只读对象（readonly）**

**2. props可以传递任意数据**

数字、字符串、布尔值、数组、对象、`函数、JSX`

```jsx
<FSon 
  age={20} 
  isMan={true} 
  cb={() => { console.log(1) }} 
  child={<span>this is child</span>}
/>
```

## 子传父实现

**口诀：** 父组件给子组件传递回调函数，子组件调用

**代码实现**

```jsx
// 子组件
function Son(props) {
    
  function handleClick() {
    props.changeMsg('this is newMessage') // 调用父组件传递过来的回调函数 并注入参数
  }
    
  return (
    <div>
      <button onClick={handleClick}>change</button>
    </div>
  )
}

// 父组件
import { useState } from "react"

function App() {
  let [message, setMessage] = useState("this is message")	// 初始化状态
    // 提供回调函数
  changeMessage = (newMsg) => {
    setMessage(newMsg)
  }
  
  return (
      <div>
          <div>父组件</div>
          <Son changeMsg={changeMessage}/>
      </div>
  )
}
```

## 跨组件通信Context

> 如果我们想从App组件向任意一个下层组件传递数据，该怎么办呢？目前我们能采取的方式就是一层一层的props往下传，显然很繁琐
>
> 那么，Context 提供了一个**无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法**

```jsx
// 祖先
import { createContext } from 'react';
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  // ...
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

```jsx
//后代
import { createContext } from 'react';
const ThemeContext = createContext();

function Grandson() {
  // useContext(SomeContext) 来获取它上面最近的 context provider 的 value。
  const theme = useContext(ThemeContext);
  return <button className={theme} />;
}
```





# React组件进阶

## children属性

**children属性是什么**

表示该组件的子节点，只要组件内部有子节点，props中就有该属性

**children可以是什么**

1. 普通文本
2. 普通标签元素
3. 函数
4. JSX

## props校验

**实现步骤**

1. 安装属性校验包：`yarn add prop-types`
2. 导入`prop-types` 包
3. 使用 `组件名.propTypes = {}` 给组件添加校验规则

**核心代码**

```jsx
import PropTypes from 'prop-types'

const List = props => {
  const arr = props.colors
  const lis = arr.map((item, index) => <li key={index}>{item.name}</li>)
  return <ul>{lis}</ul>
}

List.propTypes = {
  colors: PropTypes.array
}
```

**四种常见结构**

1. 常见类型：array、bool、func、number、object、string
2. React元素类型：element
3. 必填项：isRequired
4. 特定的结构对象：shape({})

**核心代码**

```js
// 常见类型
optionalFunc: PropTypes.func,
// 必填 只需要在类型后面串联一个isRequired
requiredFunc: PropTypes.func.isRequired,
// 特定结构的对象
optionalObjectWithShape: PropTypes.shape({
	color: PropTypes.string,
	fontSize: PropTypes.number
})
```

官网文档更多阅读：https://reactjs.org/docs/typechecking-with-proptypes.html



**默认值**

直接使用函数参数默认值

```jsx
function List({pageSize = 10}) {
  return (
    <div>
      此处展示props的默认值：{ pageSize }
    </div>
  )
}

// 不传入pageSize属性
<List />
```

## useEffect

```jsx
// 第一个参数返回的必须是函数，要么就不写返回
// 第二个参数不传代表状态全部依赖
useEffect(
  () => {
    // 组件挂载后执行
    return () => {
      // 卸载时执行
    };
  },
  [] // 依赖更新后执行上面的函数，不填表示不依赖
);
```

## 自定义hook

**需求描述**：自定义一个hook函数，实现获取滚动距离Y

> `const [y] = useWindowScroll()`

```js
import { useState } from "react"

export function useWindowScroll () {
  const [y, setY] = useState(0)
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollTop
    setY(h)
  })
  return [y]
}
```

**需求描述：** 自定义hook函数，可以自动同步到本地LocalStorage 

> `const [message, setMessage] = useLocalStorage('name', 'wzk')`
>
> 1. message可以通过自定义传入默认初始值
> 2. 每次修改message数据的时候 都会自动往本地同步一份

```js
import { useEffect, useState } from 'react'

export function useLocalStorage (key, defaultValue) {
  const [message, setMessage] = useState(defaultValue)
  // 每次只要message变化 就会自动同步到本地
  useEffect(() => {
    window.localStorage.setItem(key, message)
  }, [message])
  return [message, setMessage]
} 
```



# Hooks进阶

## useState - 回调函数参数

**语法**

```jsx
const [name, setName] = useState(()=>{    // 编写计算逻辑    return '计算之后的初始值'})
```

**语法选择**

1. 如果就是初始化一个普通的数据 直接使用 `useState(普通数据)` 即可
2. 如果要初始化的数据无法直接得到需要通过计算才能获取到，使用`useState(()=>{})` 

```jsx
import { useState } from 'react'

function Counter(props) {
  const [count, setCount] = useState(() => {
    return props.count
  })
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

function App() {
  return (
    <>
      <Counter count={10} />
      <Counter count={20} />
    </>
  )
}

export default App
```



## useReducer - 集中管理state的修改方法

```js
import { useReducer } from 'react';

function reducer(state, action) {
  // ...
    return ...
}

// dispatch函数触发reducer函数
function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
```



## useEffect - async/await问题

**语法要求**

不可以直接在useEffect的回调函数外层直接包裹 await ，因为**异步会导致清理函数无法立即返回**

```js
useEffect(async ()=>{    
    const res = await axios.get('http://geek.itheima.net/v1_0/channels')   
    console.log(res)
},[])
```

**正确写法**

在内部单独定义一个函数，然后把这个函数包装成同步

```jsx
useEffect(()=>{   
    async function fetchData() {      
    	const res = await axios.get('http://geek.itheima.net/v1_0/channels')                              
    }()
},[])
```

## useRef - 获取真实dom

```jsx
// 和vue3一样
import { useRef } from 'react'

function App() {  
  const h1Ref = useRef(null)  
  console.log(h1Ref.current)
    
  return (    
    <div>      
      <h1 ref={ h1Ref }>this is h1</h1>    
    </div>  
  )
}
export default App
```

**获取组件实例**

> 函数组件由于没有实例，不能使用ref获取，如果想获取组件实例，必须是类组件

`Foo.js`

```jsx
class Foo extends React.Component {  
    sayHi = () => {    
        console.log('say hi')  
    }  
    render(){    
        return <div>Foo</div>  
    }
}
    
export default Foo
```

`App.js`

```jsx
import { useEffect, useRef } from 'react'
import Foo from './Foo'
function App() {  
    const h1Foo = useRef(null)  
    useEffect(() => {    
        console.log(h1Foo)  
    }, [])  
    return (    
        <div> <Foo ref={ h1Foo } /></div>  
    )
}
export default App
```



# Redux Toolkit（RTK）

[RTK中文官网](https://cn.redux.js.org/introduction/getting-started/)

```js
# NPM
npm install react-redux @reduxjs/toolkit -S

# Yarn
yarn add react-redux @reduxjs/toolkit
```

