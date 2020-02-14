import Vue from 'vue'

const zglobal = {
  showMessage(color, position, mesval) {
    // this.$q.notify({
    //   message: this.$t(mesval),
    //   color: color,
    //   textColor: 'white',
    //   position: position,
    //   timeout: 2500,
    //   actions: [{ icon: 'close', color: 'white' }]
    // })
  }
}
Vue.prototype.$zglobal = zglobal

export { zglobal }
