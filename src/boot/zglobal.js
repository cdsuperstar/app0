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
  },
  flatten(arr) {
    return arr
      ? arr.reduce(
          (result, item) => [...result, item, ...this.flatten(item.children)],
          []
        )
      : []
  }
}

export default async ({ Vue }) => {
  Vue.prototype.$zglobal = zglobal
}
