class LazyMan {
  constructor(name) {
    this.name = name
    this.tasks = []

    // 添加一个异步任务、等下面所有任务task都注册完之后，再触发next执行
    setTimeout(() => {
      this.next()
    })
  }

  next() {
    const task = this.tasks.shift() // 取出任务列表的第一个任务
    if (task) task()
  }

  eat(food) {
    const task = () => {
      console.log(`${this.name} eat ${food}`)
      // 继续执行下一个任务
      this.next()
    }
    //将任务推入任务队列
    this.tasks.push(task)

    return this // 链式调用
  }

  sleep(seconds) {
    const task = () => {
      setTimeout(() => {
        this.next() // xx秒后执行下一个任务
      }, seconds * 1000)
    }
    //将任务推入任务队列
    this.tasks.push(task)

    return this // 支持链式调用
  }
}

// 功能测试
const me = new LazyMan('小白')
me.eat('苹果').sleep(3).eat('葡萄').eat('香蕉')
