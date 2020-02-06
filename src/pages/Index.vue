<template>
  <q-page class="flex flex-center">
    {{ $t('success') }}
    {{ $auth.user().email }}
    <q-btn color="primary" @click="$auth.logout()">
      {{ $t('auth.logout.logout') }}
    </q-btn>
    <q-btn color="primary" @click="getZModules()">
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
    ...mapState('zero', ['products'])
  },
  methods: {
    ...mapActions('zero', ['getZModules']),
    test() {
      console.log('Its a test')
    }
  }
}
</script>
