<template>
  <q-page class="flex flex-center">
    {{ $t('success') }}
    {{ $auth.user().email }}
    <q-btn color="primary" @click="$auth.logout()">
      {{ $t('auth.logout.logout') }}
    </q-btn>
    <q-btn color="primary" @click="test()">
      测试state
    </q-btn>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'

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
      var preq = {
        role: 'w',
        module: 'users',
        name: 'add',
        syscfg: {
          mynode: { required: false, type: Number, default: null }
        },
        title: '调整用户树'
      }

      this.reqThePermission(preq)
        .then(res => {
          console.log('Begin:', res)
          if (res.cfg) {
            console.log('Cfg set:', res.cfg)
          }
          if (res.module) {
            console.log('Module set:', res.module)
          }
          if (!res.module && !res.cfg) {
            console.log('Failed')
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    test1() {
      console.log(this.ZPermissions)
    }
  }
}
</script>
