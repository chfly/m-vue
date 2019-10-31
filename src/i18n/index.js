import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'
import cn from './cn'

Vue.use(VueI18n)
// 准备翻译的语言环境信息
const messages = {
  en: {
    ...en,
    message: {
      hello: 'hello1 world'
    }
  },
  cn: {
    ...cn,
    message: {
      hello: 'hello1 word'
    }
  }
}

// 通过选项创建 VueI18n 实例
export default new VueI18n({
  locale: 'cn', // 设置地区
  fallbackLocale: 'cn',
  messages // 设置地区信息
})
