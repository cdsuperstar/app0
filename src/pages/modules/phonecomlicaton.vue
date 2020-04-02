<template>
  <q-page padding class="q-pa-ma">
    <q-card class="col-12" flat bordered>
      <q-card-actions style="padding: 1px;">
        地理信息 && 网络类型
      </q-card-actions>
      <q-card-section class="text-subitle2 text-left" style="padding: 1px;">
        纬度：【{{ latitude }}】 经度：【{{ longitude }}】<br />
      </q-card-section>
      <q-card-section class="text-subitle2 text-left" style="padding: 1px;">
        网络类型：【{{ netstate }}】
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Phonecomlicaton',
  data() {
    return {
      positioneexpanded: true,
      netstate: null,
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
  mounted() {
    this.checkConnection()
  },
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
    },
    // 查询当前网络连接
    checkConnection() {
      var networkState = navigator.connection.type
      const states = {
        unknown: '未知网络连接',
        ethernet: '以太网连接',
        wifi: 'WIFI 网络连接',
        '2g': '2G 网络连接',
        '3g': '3G 网络连接',
        '4g': '4G 网络连接',
        cell: '蜂窝数据连接',
        none: '无网络连接'
      }
      this.netstate = states[networkState]
    }
  }
}
</script>

<style scoped></style>
