export class InterceptorManager {
  interceptors = [];

  // 使用拦截器 - 接收2个回调 压入到队列
  use(resolved, rejected) {
    this.interceptors.push({
      resolved,
      rejected,
    })
    return this.interceptors.length - 1
  }

  forEach(fn) {
    this.interceptors.forEach((interceptor) => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  // 注销拦截器
  eject(id) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
