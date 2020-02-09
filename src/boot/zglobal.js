import Vue from 'vue'

const zglobal = {
  showMessage(val) {
    console.log('message:', val)
  }
}
Vue.prototype.$zglobal = zglobal

export { zglobal }
