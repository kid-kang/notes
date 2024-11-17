import axios from './axios.js'

const request = axios.create({baseUrl: 'http://www.baidu.com'})

request.interceptors.request.use(
  config => {
    config.token = '123'
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

request.interceptors.request.use(
  config => {
    config.cookie = 'xxxxxx'
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  response => {
    console.log(response)
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

request.get('/path', {name: 'wzk', age: 18}).catch(err => {
  console.log(err)
})
request({method: 'POST', name: 'wzk', age: 18}).catch(err => {
  console.log(err)
})
