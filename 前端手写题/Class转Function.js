class Example {
  constructor(name) {
    this.name = name
  }
  func() {
    console.log(this.name)
  }
}

// 转
;`use strict`
function Example(name) {
  // 不可通过 new 调用
  if (!new.target) {
    throw new TypeError(`Class constructor Example cannot be invoked without 'new'`)
  }
  this.name = name
}

Object.defineProperty(Example.prototype, 'func', {
  value: function () {
    // 不可通过 new 调用
    if (!new.target) {
      throw new TypeError(`example.function is not a constructor`)
    }
    console.log(this.name)
  },
  enumerable: false, // 不可枚举
})
