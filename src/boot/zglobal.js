// import Vue from 'vue'

const zglobal = {
  props: {
    self: null
  },
  showMessage(color, position, msgval) {
    this.self.$q.notify({
      message: msgval,
      color: color,
      textColor: 'white',
      position: position,
      timeout: 2500,
      actions: [{ icon: 'close', color: 'white' }]
    })
  }
}

export default async ({ Vue }) => {
  Vue.prototype.$zglobal = zglobal
}
