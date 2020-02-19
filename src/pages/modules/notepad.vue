<template>
  <div class="q-pa-md" align="center">
    <nested-test v-if="true" v-model="menutree" class="col-8" />
  </div>
</template>

<style></style>

<script>
import NestedTest from './nested-tree'
export default {
  components: { NestedTest },
  name: 'NotePad',
  data() {
    return {
      menutree: null
    }
  },
  created() {
    this.getmyMenu()
  },
  methods: {
    getmyMenu() {
      this.$router.app.$http
        .get('/z_module/')
        .then(res => {
          if (res.data.success) {
            console.log(res)
            this.menutree = res.data.data
          } else {
            this.$zglobal.showMessage(
              'red-5',
              'center',
              this.$t('auth.register.invalid_data')
            )
          }
        })
        .catch(e => {})
    }
  }
}
</script>

<style scoped></style>
