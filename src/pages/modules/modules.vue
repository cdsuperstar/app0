<template>
  <q-page class="flex flex-center">
    this is modules.
    <q-btn color="primary" @click="$auth.logout()">
      no logout
    </q-btn>
    <q-btn color="primary" @click="getZModules()">
      测试state
    </q-btn>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'modules',
  computed: {
    ...mapState('zero', ['products'])
  },
  methods: {
    ...mapActions('zero', ['getZModules']),
    test() {
      console.log('Its a test')
    }
  },
  components: {}
}
</script>
