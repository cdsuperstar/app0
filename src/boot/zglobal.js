// import Vue from 'vue'

const zglobal = {
  props: {
    self: null
  },
  colors: {
    blue: [
      { name: 'primary', value: '#027BE3' },
      { name: 'secondary', value: '#26A69A' },
      { name: 'accent', value: '#9C27B0' },
      { name: 'positive', value: '#21BA45' },
      { name: 'negative', value: '#C10015' },
      { name: 'info', value: '#31CCEC' },
      { name: 'warning', value: '#F2C037' },
      { name: 'addbtn', value: '#c0ca33' },
      { name: 'deldbtn', value: '#ff7043' },
      { name: 'savebtn', value: '#5c6bc0' },
      { name: 'treebtn', value: '#ab47bc' },
      { name: 'expbtn', value: '#4caf50' }
    ],
    Bright: [
      { name: 'primary', value: '#666699' },
      { name: 'secondary', value: '#CC3399' },
      { name: 'accent', value: '#9C27B0' },
      { name: 'positive', value: '#21BA45' },
      { name: 'negative', value: '#C10015' },
      { name: 'info', value: '#31CCEC' },
      { name: 'warning', value: '#F2C037' },
      { name: 'addbtn', value: '#FF9900' },
      { name: 'deldbtn', value: '#FF6600' },
      { name: 'savebtn', value: '#99CC66' },
      { name: 'treebtn', value: '#CC3399' },
      { name: 'red', value: '#CC3399' },
      { name: 'expbtn', value: '#99CC33' }
    ],
    noble: [
      { name: 'primary', value: '#006600' },
      { name: 'secondary', value: '#996633' },
      { name: 'accent', value: '#99CC99' },
      { name: 'positive', value: '#21BA45' },
      { name: 'negative', value: '#C10015' },
      { name: 'info', value: '#31CCEC' },
      { name: 'warning', value: '#F2C037' },
      { name: 'addbtn', value: '#99CC99' },
      { name: 'deldbtn', value: '#CC6600' },
      { name: 'savebtn', value: '#669999' },
      { name: 'treebtn', value: '#CC9966' },
      { name: 'expbtn', value: '#669933' }
    ]
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
  },
  changethemecolor(val) {
    console.log(val, '-----')
    if (val === 'blue') {
    }
  }
}

export default async ({ Vue }) => {
  Vue.prototype.$zglobal = zglobal
}
