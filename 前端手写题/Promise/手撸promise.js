class Promise {
  constructor(executor) {
    this.PromiseState = 'pending'
    this.PromiseResult = null
    // 调多个then（这里说的不是链式调用）所有then中回调都能执行（Promise状态改变的话），所以是用数组存起来
    this.callbacks = []

    const self = this

    function resolve(data) {
      // 状态只能修改一次
      if (self.PromiseState !== 'pending') return

      self.PromiseState = 'fulfilled'
      self.PromiseResult = data

      // 进入到这里的都是异步改变状态的Promise，在当前宏任务中要体现then回调的异步性
      setTimeout(() => {
        // 改变状态之后再执行then中的回调
        self.callbacks.forEach(item => {
          item.onResolved(data)
        })
      })
    }

    function reject(data) {
      if (self.PromiseState !== 'pending') return
      self.PromiseState = 'rejected'
      self.PromiseResult = data
      setTimeout(() => {
        self.callbacks.forEach(item => {
          item.onRejected(data)
        })
      })
    }

    // try-catch 捕获 throw 错误
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  // 原型上的方法 ----  then
  then(onResolved, onRejected) {
    // 设定默认回调实现then的值传递和catch的错误穿透
    if (typeof onResolved !== 'function') {
      onResolved = value => value // 这value是上游的PromiseResult
    }
    if (typeof onRejected !== 'function') {
      onRejected = reason => {
        throw reason
      }
    }

    // then也返回Promise
    return new Promise((resolve, reject) => {
      //封装函数
      const callback = (type) => {
        try {
          let result = type(this.PromiseResult)
          // 如果then回调return的也是Promise
          if (result instanceof Promise) {
            // 点睛之笔*
            result.then(v => {
              resolve(v)
            }, r => {
              reject(r)
            })
          } else {
            // 其他情况均为成功
            resolve(result)
          }
        } catch (e) {
          reject(e)
        }
      }

      // 同步改变Promise状态为fulfilled时
      if (this.PromiseState === 'fulfilled') {
        // 体现异步（微任务）
        setTimeout(() => {
          callback(onResolved)
        })
      }
      if (this.PromiseState === 'rejected') {
        setTimeout(() => {
          callback(onRejected)
        })
      }

      // 进入队列的都是异步改变状态的Promise
      if (this.PromiseState === 'pending') {
        //保存回调函数
        this.callbacks.push({
          onResolved: () => callback(onResolved),
          onRejected: () => callback(onRejected)
        })
      }
    })
  }

  // 有了默认回调铺垫 - 直接接收错误
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
  }

  // static定义的是类上的方法
  static resolve(value) {
    // 返回的状态不一定是成功的状态
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(v => {
          resolve(v)
        }, r => {
          reject(r)
        })
      } else {
        resolve(value)
      }
    })
  }

  // 返回的一定是失败的状态
  static reject(reason) {
    return new Promise((_, reject) => {
      reject(reason)
    })
  }

  static all(arr) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(arr)) reject("传入的必须是数组")
      let res = [], count = 0
      arr.forEach((item, index) => {
        Promise.resolve(item).then(val => {
          res[index] = val
          count++
          if (count === arr.lenght) {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    })
  }

  static race(arr) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(arr)) reject("传入的必须是数组")
      arr.forEach((item) => {
        // 返回最快的结果
        Promise.resolve(item).then(v => {
          resolve(v)
        }, r => {
          reject(r)
        })
      })
    })
  }

  static any(arr) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(arr)) reject("传入的必须是数组")
      const errors = []
      let rejectedCount = 0
      arr.forEach((item, index) => {
        MyPromise.resolve(item).then(
          value => resolve(value),
          reason => {
            errors[index] = reason
            rejectedCount++
            if (rejectedCount === arr.length) {
              reject(new AggregateError(errors, 'All promises were rejected'))
            }
          }
        )
      })
    })
  }
}




