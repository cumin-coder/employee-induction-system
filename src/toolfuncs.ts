
// 获取身份证后6位
export{
  getIdCard_Last_SIX
}

function getIdCard_Last_SIX(idCard: String) {
  return idCard.substring(idCard.length - 6)
}

