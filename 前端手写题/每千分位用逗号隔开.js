const format = n => {
  n = n.toString();     // 转成字符串
  let decPart = '';              //小数部分
  let intPart = '';              //整数部分

  if (n.includes('.')) {  //小数部分和整数部分分开
    decPart = "." + n.split('.')[1];
    intPart = n.split('.')[0];
  } else {
    intPart = n;
  }

  let len = intPart.length;  //整数部分的长度
  if (len <= 3) {
    return n;
  } else {
    let remain = len % 3;   //最前剩下部分数
    if (remain) {  //如果 整数长度不是3的倍数 则第一个逗号要处理  记住要全局匹配g
      return intPart.slice(0, remain) + ',' + intPart.slice(remain,).match(/\d{3}/g).join(',') + decPart;
    } else {
      return intPart.slice(remain,).match(/\d{3}/g).join(',') + decPart;
    }
  }
};

console.log(format(12111323.33));
