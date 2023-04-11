## 创建项目（vite脚手架）

Vue3（vite脚手架）：`npm init vue@latest -y`

Vue2：`vue create filename`

CDN：`<script src="https://unpkg.com/vue@next"></script>`

## main.js中配置axios等

安装 axios ：`npm install vue-axios --save`

```js
//先安装axios包
import axios from "axios"
//配置axios和路径、开发环境或生产环境都能用
const baseURL = process.env.NODE_ENV === 'development'?"http://localhost:8080":"";
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;  //加这条权限  不然不会携带cookie数据随着请求走
app.config.globalProperties.$axios = axios;  //设置全局的axios,为所有的组件实例添加$axios属性

//使用方法
let {data} = await this.$axios({ //注意异步
    method: "POST",
    url: "/reg",
    data: {}, //post
    params:{} //这是get请求
});
```

## CDN引入-组件化写法

```js
let app = Vue.createApp( { data(){ return{} } } );
//创建子组件   
app.component("wanzi",{ //vue实例对象的配置对象有什么，这里就可以写什么
    data(){ return {age:16} },
    methods:{ },
    //模板属性，定义当前子组件要渲染的HTML内容
    template:`
<span>这是子组件内的标签{{age}}</span>
<button @click="fn()">子组件内的按钮</button>
<br/>
`
});

app.mount("#app");
```

## template模板

`v-show` 不支持 ` <template>` ，一般都是用 `v-if`

## 动态类、动态样式的写法

```vue
<!--固定拥有"aaa"，名字"bbb" "ccc"则由数据的真假来决定-->
<div
     class="aaa"
     :class="{bbb : isB,ccc : isC}"  //冒号里面可以是一个对象名
     style="width:100px"
     :style="{height : h}"   
></div>
```

## 事件修饰词 

- `.stop` ：阻止事件冒泡
- `.prevent`： 阻止默认事件
- `.capture` ：使用事件捕获模式
- `.self `：需要自己触发事件，通过事件流则会跳过该事件
- `.once` ：只触发一次
- `.passive`： 告诉浏览器没有阻止默认事件、无需检查。一般应用在移动端

##  鼠标键盘修饰符

```js
//在监听鼠标键盘事件时，如果想要监听具体的某个键，可以使用按键修饰符
<input @keyup.enter="submit">	//键盘
//.enter.tab.delete (捕获“删除”和“退格”键)
//.esc.space.tab.delete.up.down.left.right
//字符则直接是相应的字母
```

```js
@click.right    //鼠标按键  .left  .right   .middle
```

## 表单的v-model属性和.lazy.number.trim

```vue
<!--文本框-->
<input v-model="message">
<p>Message is: {{ message }}</p>
<!--复选框 checkedNames 要定义成数组  凡是多选绑定的变量都要定义成数组-->
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>

<!--.lazy 是在失去焦点或者按回车时才会更新-->
<input v-model.lazy="msgid">
<!--.trim自动过滤用户输入的首尾空白字符-->
<!--.number用户输入的转成数字-->
```

## 自定义指令

```js
// 注册一个全局自定义指令 `v-focus`
app.directive('focus', {     //全局directive、局部指令directives
  // 当被绑定的元素挂载时触发……
  mounted(el) {
    // 聚焦元素
    el.focus()
  }
})

使用：<input v-focus />
```

## $nextTick

1. 语法：`this.$nextTick(() => {})`
2. 这样：下一轮`dom`更新结束后执行回调

## 动画transition标签

- `<transition name="wzk" appear>`该组件包裹的元素可实现动画效，该组件内置以下俩类名
- 样式直接写`.wzk-enter-active/.wzk-leave-active{animation:name 1s linear reverse}`
- `appear`属性代表第一次就（刚进页面）就要开始现运行动画
- `<transition-group><transition-group/>`标签可以包裹多组动画

## watch

```js
//需要监听单个数据变化 根据变化发起异步操作时  支持异步监听
watch:{
	age(newVal,oldVal){//函数名必须和属性名一样 第一个是变化后的数据 第二个是变化前
        ...复杂逻辑
    }
}
//或者是
watch: {
  obj: {
    handler(newVal, oldVal) {
      console.log('obj changed');
    },
    immediate: true,
    deep: true	//开启深度监听。 默认为false则只会监听第一层本身
  }
}
```

## 全局组件挂载

```js
//main.js中  在app实例下挂载一个component("使用名"，组件名) 
//使用名和组件名应该一样 同组件的导入
import { createApp } from 'vue'
import App from './App.vue'
import HeaderNav from '@/components/HeaderNav'

const app = createApp(App)
app.component('HeaderNav', HeaderNav)
app.mount('#app')
```

## 组件间数据通信

#### 父传子props

```js
//接收props
props:["name"],
props: {
    name: {
        type: Number,
        required:ture,
        default: 'wzk'
    },
},
```

#### 子传父this.$emit

```js
//其实就是通知父组件修改自己的数据
this.$emit("自定义的名称","参数1"，"参数2")
```

#### 直接传

```js
// vue3方法能数据联动
// 祖
import { provid, ref } from "vue";
setup(){
    let age = ref(18)
    provide("age", age)
    return{ age }
}
// 孙
import { inject } from "vue";
setup(){
    let age = inject("age")
    return { age }
} 
```

## slot插槽

默认插槽、具名插槽、作用域插槽

作用域插槽可以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过来的数据决定如何渲染该插槽。

```html
//子组件中（具名+默认）
<slot :={user,arr}></slot>              //:=写法等同于 :user="user" :arr="arr" 对象中的写出来
<slot name="other" :={user,arr}></slot>  //具名作用域插槽

//父组件中
<Child>
  <template #default="slotProps">  //自己定义默认插槽接收的数据的名字
    {{slotProps.user.age}}  and  {{slotProps.arr[2]}}
  </template>
	
  <template #other="wzk"> 
      {{wzk.user.age}}  and  {{wzk.arr[2]}}
  </template>
</Child>
```

## 路由router

### 路由的基本写法

```js
//单页面 - 基于a标签
//一旦路由的标签被点击该标签就自动会添加一个 a.router-link-active 的类名
<router-link to="/">Home</router-link>
<router-link to="/about">About</router-link>

//渲染进入的路由
<router-view :key="$route.fullPath"/> //强制复用
    
//router文件夹中的基本写法.................................................
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{title:"主页"}//可以在组件中用document.title=this.$route.meta设标题
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')//懒式引入视图组件
  }
]
export default router
```

### 	动态路由

```js
{
  path: '/about/:id',//绑定动态路由 id是自己取的名字 接受的值可以使用正则规定
  path: '/about/:name(.*)',//正则写法
  component: () => import( '../views/404.vue')
}
//注意route和router
this.$route.params//获取动态路由的值 
this.$router.push("/");//转跳已有页面 类似重定向
this.$router.go(-1);//重定向之前进、后退页面
```

### 	子路由

```js
//写法
{
  path: '/about',
  name: 'About',
  component: () => import( '@/views/About.vue'),
  //子路由
  children[
    {
       path: 'me', //不用写斜杠
       name: 'me',
       component: () => import( '@/views/me.vue')
     },
     {
        path: 'city',
        name: 'city',
        component: () => import( '@/views/city.vue')
      }
    ]
  }
```

## 导航守卫

```js
//全局导航守卫 写在最大的Router对象中  注意：beforeEach是一个函数的调用 传一个回调
router.beforeEach((to, from) => {//离开当前路由时触发
    if(to.path === "/about"){
        return false; //手动定义return false 直接拦截
    }
})
//后置
router.afterEach((to,from) => {})
//！！！！没有next

//组件导航守卫可以访问组件数据 写在配置选项里
beforeRouteEnter(to,from){...这里组件还未创建所以没有this}//进入路由时触发
beforeRouteLeave(to,from){...有this}//离开当前路由时触发

//独享导航守卫 写在路由配置里 
{
    path: '/',
    name: 'Home',
    component: Home,	
    beforeEnter(to, from, next) {  //注意：beforeEnter本身是一个函数
    		...
	}
  }
```

## keep-alive组件

- 缓存页面，保存组件的状态，用keep-alive包裹的组件在切换时不会进行销毁
- `keep-alive`有 两个独有的生命周期钩子函数`activated`、`deactivated`

```html
<keep-alive include='a,b'>
    <router-view/>
</keep-alive>
或
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>//路由中设置keepAlive:true
</keep-alive>
```

## 动态组件

`<component is ="要渲染的组件的名称"></component>`

## VueX

### 基本使用

```js
//$store.state.name可以直接获取
import { createStore } from 'vuex'
export default createStore({
  state: {
      age:18
      city:'beijin'
  },
  mutations: {
      changeAge(state){//第一个形参永远是指向state对象的 想加的形参写在后面 使用时也从第二个算起
          state.age++
      }
  },
  getters{
      fn(state){
     	  return state.age+100;
	  }
  },
  actions: {
      changeCity(context){  //参数是上下文对象
          setTimeout(()=>{
              context.commit("changeAge"); //只要改数据就要通过mutations里的方法
              context.dispatch("changeCity"); //调用actions里的方法
          },1000)
      }
  },
  modules: {//若数据较多 可以模块化
  }
})

// 使用
import {mapState, mapMutations, mapGetters} from "vuex" 
...mapMutations(["changeAge"])  ->  methods
...mapState(["age","sex"])  ->  computed
...mapGetters(["fn"])  ->  computed

```

### 模块化modules

```js
import { createStore } from 'vuex'
//定义模块1 分文件写模块可以导入 import module2 from "...路径"
const module1 = {
  state(){ //state写成方法 类似组件的data
      return{
          name:"hahaha"
          age:18
      }
  },
  mutations: {},
  getters: {},
  actions: {}
}
export default createStore({
    module1,
    module2
})
//组件使用时在接收的数组前加标识 mapState(module1, ["age","sex"])
```

## Mixin

抽离组件公共的逻辑，来分发 Vue 组件中的可复用功能。

```js
//定义一个 js 文件(mixin.js)
export default {
 data() {
  return {
   name: 'mixin'     //抽离共用数据
  }
 },
 created() {
  console.log('mixin...', this.name);
 }
}

//在组件中使用mixin
import '@/mixin'; // 引入mixin文件
export default {
 mixins: [mixin]
}
```

## Vue的proxy跨域代理

```js
//在vue.config.js做配置
devServer: {
   proxy: {
       '/api': {     //这里最好有一个 /
           target: 'http://45.105.124.130:8081',  // 后台接口域名
           ws: true,        //如果要代理 websockets，配置这个参数
           secure: false,  // 如果是https接口，需要配置这个参数
           changeOrigin: true,  //是否跨域
           pathRewrite:{
               '^/api':''
           }
       },
       '/api2': {     //这里最好有一个 /
           target: 'http://45.105.124.130:8080',  // 后台接口域名
           ws: true,        //如果要代理 websockets，配置这个参数
           secure: false,  // 如果是https接口，需要配置这个参数
           changeOrigin: true,  //是否跨域
           pathRewrite:{
               '^/api2':''
           }
       }
   }
 }
```
