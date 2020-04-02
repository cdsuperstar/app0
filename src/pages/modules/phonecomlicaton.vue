<template>
  <q-page padding class="q-pa-ma">
    <div class="text-h6 q-ma-md text-primary">
      纬度:{{ latitude }} 经度:{{ longitude }}
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Phonecomlicaton',
  data() {
    return {
      // 纬度
      latitude: null,
      // 经度
      longitude: null
    }
  },
  created() {
    this.getPosition()
  },
  beforeMount() {},
  mounted() {},
  methods: {
    // 1 查询当前位置信息
    getPosition() {
      navigator.geolocation.getCurrentPosition(
        this.getPositionSuccess,
        this.getPositionError,
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 }
      )
    },
    // 1-1 查询当前位置信息成功
    getPositionSuccess(position) {
      this.latitude = String(position.coords.latitude)
      this.longitude = String(position.coords.longitude)
      if (this.$auth.check()) {
        let tmpUsercfg = JSON.parse(this.$auth.user().usercfg)
        if (tmpUsercfg === null) tmpUsercfg = {}
        tmpUsercfg.postion = {
          latitude: this.latitude,
          longitude: this.longitude
        }
        if (tmpUsercfg.postion !== null) {
          this.$router.app.$http
            .post('/zero/setMyUsercfg/', {
              usercfg: JSON.stringify(tmpUsercfg)
            })
            .then(res => {
              if (res.data.success) {
                this.$auth.user().usercfg = res.data.data.usercfg
              }
            })
        }
      }
    },
    // 1-2 查询当前位置信息失败
    getPositionError(error) {
      if (error) {
        this.$zglobal.showMessage('red-7', 'center', this.$t('failed'))
      }
    }
  }
}
</script>

<style scoped></style>
