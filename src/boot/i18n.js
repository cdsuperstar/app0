import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import JsonEditor from 'vue-json-edit'
import Print from 'vue-print-nb'

Vue.use(Print)
Vue.use(VueI18n)
Vue.use(JsonEditor)

const i18n = new VueI18n({
  locale: 'zh-hans',
  fallbackLocale: 'zh-hans',
  messages
})

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }
