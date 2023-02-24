## 什么是 Cookie？

Cookie 是一些数据, 存储于你电脑上的文本文件中。

当 web 服务器向浏览器发送 web 页面时，在连接关闭后，服务端不会记录用户的信息。

Cookie 的作用就是用于解决 "如何记录客户端的用户信息":

- 当用户访问 web 页面时，他的名字可以记录在 cookie 中。
- 在用户下一次访问该页面时，可以在 cookie 中读取用户访问记录。

Cookie 以名/值对形式存储，如下所示:

```js
username=John Doe
```

当浏览器从服务器上请求 web 页面时， 属于该页面的 cookie 会被添加到该请求中。服务端通过这种方式来获取用户的信息。

> 通俗的说，cookie是前端能用于存储信息的一个技术，这个技术主要的使用目的是为了在跟后端进行数据交互时，让后端识别前端的身份

cookie是保存在`document.cookie`中，以文本形式保存，每条信息可以设置过期时间。

## 使用 JavaScript 创建Cookie

JavaScript 可以使用 **document.cookie** 属性来创建 、读取、及删除 cookie。

JavaScript 中，创建 cookie 如下所示：

```js
document.cookie="username=John Doe";
```

您还可以为 cookie 添加一个过期时间（以 UTC 或 GMT 时间）。默认情况下，cookie 在浏览器关闭时删除：

```js
document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT";
```

您可以使用 path 参数告诉浏览器 cookie 的路径。默认情况下，cookie 属于当前页面。

```js
document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
```

## 第三方插件：js-cookie

JS操作cookie稍微有点麻烦

所以推荐使用js-cookie这个第三方库

### 安装

```html
<script src="https://cdn.bootcdn.net/ajax/libs/js-cookie/latest/js.cookie.min.js"></script>
```

### 写

使用`Cookies.set(key, value, option)`

```js
# 创建一个简单cookie，默认过期时间为会话结束
Cookies.set('name', 'fengyu')

# 创建一个值为json的cookie，默认过期时间为会话结束
Cookies.set('name', {age: 18})

# 创建一个有效期一小时的cookie
Cookies.set('name', 'fengyu', { expires: new Date(Date.now() + 60*60*1000) })

# 创建一个有效期7天的cookie
Cookies.set('name', 'fengyu', { expires: 7 })

# 创建一个有效期7天的cookie, 但是只能在/post路径下可见
Cookies.set('name', 'fengyu', { expires: 7, path: '/post' })
```

- option
  - expires[number|Date]：有效期。为number时，单位天，同时还可以传入Date对象
  - path[string]：表示此cookie对哪个地址可见
  - domain[string]：表示此cookie对哪个域名可见，设置后cookie会对所有子域名可见。默认为对创建此cookie的域名和子域名可见。
  - secure[boolean]：表示cookie传输是否仅支持https。默认为不要求协议必须为https。

### 读

使用`Cookies.get([key])`

```js
# 读标识为name的cookie的值，如果name不存在则是undefined
Cookies.get('name')

# 读所有cookie
Cookies.get()
```

### 删

使用`Cookies.remove([key])`

```js
# 删除标识为name的cookie，如果name设置时指定了path则需要写对应的path
Cookies.remove('name')
```

### 命名空间

如果觉得每次使用Cookies调用太过麻烦，可以重命名

```js
# 给Cookies重新设置一个名称为c，以后用c调用Cookies的API
let c = Cookies.noConflict()

c.set('name', 'fengyu')
```

