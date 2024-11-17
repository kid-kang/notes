import {extend} from './utils.js'
import {InterceptorManager} from './InterceptorManager.js'
import {sendXhr} from './sendXhr.js'

class Axios {
  defaults = {}
  interceptors = {}
  constructor(initConfig) {
    // 实例化时接收一个配置信息，并保存到config属性中。
    this.config = initConfig
    // 创建 axios.interceptors.request/response 拦截器对象
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    }
  }

  // 该类有一个 request 方法，它可以用来发送请求
  request(config) {
    config = {...this.defaults, ...config}

    const chain = [
      {
        resolved: sendXhr, // 源码中多了一层适配器，用于进一步处理参数和区分环境之类的
        rejected: undefined,
      },
    ]

    // 收集拦截器
    this.interceptors.request.interceptors.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.interceptors.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      // Promise链式调用 - 从请求拦截回调到发起xhr再到响应拦截回调 - 最后拿到结果
      const {resolved, rejected} = chain.shift()
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(path, config) {
    return this.request(
      Object.assign(config || {}, {
        method: 'get',
        path,
      })
    )
  }
}

function createInstance(config) {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  // 继承 Axios 中的所有属性
  extend(instance, Axios.prototype, context)
  // instance 可以直接调用也能通过他身上的各种方法调用
  return instance
}

//默认值
const defaults = {method: 'get', timeout: 3000}

const axios = createInstance(defaults)

axios.create = config => createInstance({...defaults, ...config})

export default axios
