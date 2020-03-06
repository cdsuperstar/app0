<template>
  <q-page class="flex flex-center">
    {{ $auth.user().email }}
    <q-btn color="primary" @click="$auth.logout()">
      {{ $t('auth.logout.logout') }}
    </q-btn>
    <q-btn color="primary" @click="test1()">
      测试state
    </q-btn>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { colors } from 'quasar'
export default {
  name: 'PageIndex',
  components: {},
  computed: {
    ...mapState('zero', ['ZPermissions'])
  },
  created() {
    this.$zglobal.showMessage('positive', 'top', '这是个消息的测试  !!')
  },
  methods: {
    ...mapActions('zero', [
      'getZModules',
      'reqThePermission',
      'getMyPermissions'
    ]),
    test() {
      var preq = [
        {
          module: 'modules',
          name: 'modules.bSetTree',
          syscfg: {
            bSetTree: { required: false, type: 'Boolean', default: null }
          },
          title: '是否可调整树'
        },
        {
          module: 'modules',
          name: 'modules.bSetTree1',
          syscfg: {
            bSetTree: { required: false, type: 'Boolean', default: null }
          },
          title: '是否可调整树'
        },
        {
          module: 'modules',
          name: 'modules.bSetTree2',
          syscfg: {
            bSetTree: { required: false, type: 'Boolean', default: null }
          },
          title: '是否可调整树'
        }
      ]

      this.reqThePermission(preq)
        .then(res => {
          console.log('mPerms:', res)
        })
        .catch(e => {
          console.log(e)
        })
    },
    test1() {
      // console.log(this.ZPermissions)
      colors.setBrand('mycolor', '#00ff00')
      console.log(this.$auth.user().usercfg, '+++')
    }
  }
}
</script>
