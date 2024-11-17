export function sendXhr(confing) {
  return new Promise((resolve, reject) => {
    console.log("处理confing参数:", confing)

    // if (confing.cancelToken) {
    //   cancelToken.promise
    //     .then((reason) => {
    //       request.abort()
    //       reject(reason)
    //     })
    //     .catch(() => { })
    // }

    // 模拟XHR请求
    setTimeout(() => {
      console.log("发送请求...")
      if (Math.random() > 0.5) {
        resolve({ status: 200 })
      } else {
        reject({ status: 502 })
      }
    }, 3000)
  })
}