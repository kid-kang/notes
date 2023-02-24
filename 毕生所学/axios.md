[axios官网](https://www.kancloud.cn/yunye/axios/234845)

[axios掘金好文](https://juejin.cn/post/6968630178163458084#heading-28)

## axios请求配置

```js
//  query参数：?a=1&b=2
//	params参数：/id
//高配版
axios({
    url: "http://localhost:8000/getPerson",
    method: "GET",
    params: {a:1,b:2}, //配置query参数
    data: {age:18},	//配置请求体参数（josn格式）
    data: "e=5&f=6",  //配置请求体参数（urlencoded格式）
    widthCredentials: true, //携带cookie
    timeout: 2000,  //超时时间
    headers: {token:"adbiasbsdj"}, //配置请求头
})

//低配版
axios.get("http://localhost:8000/getPerson",{params: {a:1,b:2}})
axios.post("http://localhost:8000/getPerson",{age:18})
```

## axios.defaults配置默认属性

```js
//默认配置要写在请求上面
axios.defaults.timeout = 2000
axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.headers = {token:"token..."}
```

## axios.create

```js
//axios.create写在默认配置的上面
//axios.create主要解决向不同服务器发送请求
//这个新创建的axios只是没有取消请求和批量请求的方法、其他都一样
const axios2 = axios.create({
    baseURL: process.env.NODE_ENV === 'development'?"http://localhost:6000":"",
    timeout:3000
})
```

## 取消请求

```js
const CancelToken = axios.CancelToken	 //CancelToken（构造函数）用来唯一标记请求
const isCancel = axios.isCancel		//isCancel(err)能判断错误对象是否是取消请求引起的 返回布尔值
let cancel //申明一个全局变量
axios({
    url: "...",
    //在配置中设置cancelToken字段，并且在CancelToken中传入一个回调，回调中给全局变量cancel赋值
    cancelToken: new CancelToken((c) => {	//c是一个函数，这个函数可以取消对应的请求
        cancel = c
    })
})

//在业务逻辑中就可以使用cancel("我取消请求这个了")函数来取消请求了 
```

## 拦截器

```js
//请求拦截器
axios.interceptors.request.use((config) => {
    config.headers.token = "token..."
    //话还可以写一些请求中的 loading...
    return config
})


//响应拦截器
axios.interceptors.response.use(	//传入2个回调
    res => {
        return res.data	//直接返回所需的数据
    }
    err => {
        console.log("请求失败", err)
        return new Promise(()=>{}) //失败就阻断promise链 这样请求时就不用写失败的回调了
    }
)
```

## 批量发送请求

```js
//基于Promise.all方法
axios.all([
    axios.get(),
    axios.get(),
    axios.get(),
])
```

## 面catch配置

```js
import axios from 'axios'
 
const $axios = axios.create({
  baseURL: "http://10.91.87.138:3008",
  timeout: 3000
})
 
// 请求拦截
$axios.interceptors.request.use(
  config => {
    const token = LocalStorage.getItem('Token')
    if (token) config.headers.token = token
    return config
  },
  err => Promise.reject(err)
)
 
//响应拦截器
$axios.interceptors.response.use(
  res => {
    qp.feedback.showToast(res.data.message)
    return res.data
  },
  err => {
    if (err.status === 401) {
      LocalStorage.removeItem('bmsToken')
      qp.feedback.showToast('无效token')
      return Promise.resolve(err.response.data)
    } else {
      qp.feedback.showToast(err.message)
      return Promise.resolve(err.response)
    }
  }
)
 
export default $axios

```

