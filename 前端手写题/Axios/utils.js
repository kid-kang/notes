export const extend = (to, from, ctx) => {
  // 继承方法
  Object.getOwnPropertyNames(from).forEach((key) => {
    to[key] = from[key].bind(ctx)
  })
  // 继承 ctx 自身属性（不继承原型链上属性，因此需要 hasOwnProperty 进行判断）
  for (let val in ctx) {
    if (ctx.hasOwnProperty(val)) {
      to[val] = ctx[val]
    }
  }
  return to
}