<template>
  <div class="q-pa-md" align="center">
    <nested-test v-if="true" v-model="Modeldata" class="col-8" />
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
      Modeldata: null
    }
  },
  created() {
    this.getmyMenu()
  },
  methods: {
    getmyMenu() {
      this.$router.app.$http
        .get('/z_module/getMyMenu')
        .then(res => {
          if (res.data.success) {
            this.Modeldata = res.data.data
          } else {
            // console.log(res.data.errors)
          }
        })
        .catch(e => {
          // console.log(e)
        })
    }
  }
}
</script>

<style scoped></style>
