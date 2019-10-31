const isMobile = () => {
  return !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)
}
const isIos = () => {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
const isIphone = () => {
  return navigator.userAgent.includes('iPhone')
}
const isIpad = () => {
  return navigator.userAgent.includes('iPad')
}
const isAndroid = () => {
  return navigator.userAgent.includes('Android') || navigator.userAgent.includes('Adr')
}
const isWeiXin = () => {
  return navigator.userAgent.includes('MicroMessenger')
}
const isQq = () => {
  return navigator.userAgent.match(/\sQQ/i)
}
export {
  isMobile, isIos, isIphone, isAndroid, isIpad, isWeiXin, isQq
}
