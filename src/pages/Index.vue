<template>
  <q-page class="q-pa-lg row items-start q-gutter-md">
    <!--    <q-btn @click="test">aaaaa</q-btn>-->
    <q-card flat bordered :class="$q.screen.gt.xs ? 'col-4' : 'col-12'">
      <q-card-section>
        <ve-map :data="MapchartData" :settings="MapchartSettings"></ve-map>
      </q-card-section>
    </q-card>
    <q-card flat bordered :class="$q.screen.gt.xs ? 'col-4' : 'col-12'">
      <q-card-section>
        <ve-pie :data="PiechartData" :settings="PiechartSettings"></ve-pie>
      </q-card-section>
    </q-card>
    <q-card
      flat
      bordered
      :class="$q.screen.gt.xs ? 'col-3' : 'col-12'"
      style="height: 432px;"
    >
      <q-toolbar style="border-bottom: 1px dashed #ebebeb;">
        <q-toolbar-title>
          <span class="text-subtitle1 text-weight-bold"> 离线应用</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section
        class="row items-start"
        style="min-height: 60px;max-height:335px;padding: 8px;overflow-y:auto"
      >
        <q-card
          flat
          class="col-3"
          style="cursor: pointer;"
          @click="linktoURL('#/user/p2s1/p2s1_off_qn')"
        >
          <q-card-section horizontal align="center">
            <q-list padding>
              <q-item-section
                class="rounded-borders bg-primary"
                style="width: 3rem;height: 3rem;"
              >
                <q-icon
                  name="queue"
                  color="white"
                  style="font-size: 2rem;padding: 5px;"
                ></q-icon>
              </q-item-section>
              <q-item-section style="margin-left: 1px;font-size: xx-small">
                发起问卷
              </q-item-section>
            </q-list>
          </q-card-section>
        </q-card>
        <q-card
          flat
          class="col-3"
          style="cursor: pointer;"
          @click="linktoURL('#/user/p2s1/p2s1_off_qnl')"
        >
          <q-card-section horizontal align="center">
            <q-list padding>
              <q-item-section
                class="rounded-borders bg-primary"
                style="width: 3rem;height: 3rem;"
              >
                <q-icon
                  name="format_list_bulleted"
                  color="white"
                  style="font-size: 2rem;padding: 5px;"
                ></q-icon>
              </q-item-section>
              <q-item-section style="margin-left: 1px;font-size: xx-small">
                本地问卷
              </q-item-section>
            </q-list>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="col-12">
      <q-card-section>
        <ve-histogram
          :data="HistogramchartData"
          :settings="HistogramchartSettings"
        ></ve-histogram>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
// import VeRadar from 'v-charts/lib/radar.common.js'
import VePie from 'v-charts/lib/pie.common.js'
import VeMap from 'v-charts/lib/map.common.js'
import VeHistogram from 'v-charts/lib/histogram.common.js'
// import VeLine from 'v-charts/lib/line.common.js'
// branch test
export default {
  name: 'PageIndex',
  components: { VeHistogram, VePie, VeMap },
  data() {
    return {
      HistogramchartSettings: null,
      HistogramchartData: null,
      PiechartSettings: null,
      PiechartData: null,
      MapchartSettings: null,
      MapchartData: null
    }
  },
  computed: {},
  created() {
    // 条状图
    this.$router.app.$http
      .post('/p2/s1/p2s1questionnaire1/onqt/', {
        cntField: ['province', 'city', 'county'],
        qDate: '',
        qCnt: 'county'
      })
      .then(res => {
        // console.log(res)
        if (res.data.success) {
          var Histogramallcountdata = res.data.data
          // 当前日期
          var date = new Date()
          var month = date.getMonth() + 1
          var strDate = date.getDate()
          var currentdate = date.getFullYear() + '-' + month + '-' + strDate
          // 日期获取结束
          // 获取当日新增数据
          this.$router.app.$http
            .post('/p2/s1/p2s1questionnaire1/onqt/', {
              cntField: ['province', 'city', 'county'],
              qDate: currentdate,
              qCnt: 'county'
            })
            .then(res => {
              // console.log(res)
              if (res.data.success) {
                // console.log('aaa', res.data.data, '--------')
                var currentdata = res.data.data
                for (const allitem of Histogramallcountdata) {
                  for (const currentitem of currentdata) {
                    if (
                      allitem.province === currentitem.province &&
                      allitem.city === currentitem.city &&
                      allitem.county === currentitem.county &&
                      allitem.town === currentitem.town &&
                      allitem.village === currentitem.village &&
                      allitem.qsource === currentitem.qsource
                    ) {
                      allitem.Newtoday = currentitem.cnt
                      break
                    } else {
                      allitem.Newtoday = 0
                    }
                  }
                }
                // out
                this.HistogramchartSettings = {
                  axisSite: { right: ['问卷数量'] },
                  yAxisType: ['KMB', 'normal'],
                  yAxisName: ['数量', '县'],
                  dataOrder: { label: 'Newtoday', order: 'asc' }
                }
                this.HistogramchartData = {
                  columns: ['county', 'total', 'Newtoday'],
                  rows: Histogramallcountdata
                  // rows: [
                  //   { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
                  //   { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
                  //   { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
                  // ]
                }
              } else {
              }
            })
            .catch(e => {})
        } else {
        }
      })
      .catch(e => {})

    // 饼图
    this.$router.app.$http
      .post('/p2/s1/p2s1questionnaire1/onqt/', {
        cntField: ['province', 'qsource'],
        qDate: '',
        qCnt: 'qsource'
      })
      .then(res => {
        // console.log(res)
        // 饼图
        this.PiechartSettings = {
          dimension: 'qsource',
          metrics: 'total'
        }
        // this.PiechartData = {
        //   columns: ['问卷类型', '合计'],
        //   rows: [
        //     { 问卷类型: '扫码离线问卷', 合计: 1393, 当天新增: 999 },
        //     { 问卷类型: '移动设备在线问卷', 合计: 3530, 当天新增: 88 },
        //     { 问卷类型: '移动设备离线问卷', 合计: 1723, 当天新增: 99 },
        //     { 问卷类型: '网页在线问卷', 合计: 2923, 当天新增: 999 }
        //   ]
        // }
        if (res.data.success) {
          this.PiechartData = {
            columns: ['qsource', 'total'],
            rows: res.data.data
          }
        } else {
        }
      })
      .catch(e => {})
    // 数据

    // 地图
    this.$router.app.$http
      .post('/p2/s1/p2s1questionnaire1/onqt/', {
        cntField: ['province', 'city'],
        qDate: '',
        qCnt: 'city'
      })
      .then(res => {
        // console.log(res)
        if (res.data.success) {
          // console.log('aaa', res.data.data, '--------')
          var Mapallcountdata = res.data.data
          // 当前日期
          var date = new Date()
          var month = date.getMonth() + 1
          var strDate = date.getDate()
          var currentdate = date.getFullYear() + '-' + month + '-' + strDate
          // 日期获取结束
          // 获取当日新增数据
          this.$router.app.$http
            .post('/p2/s1/p2s1questionnaire1/onqt/', {
              cntField: ['province', 'city'],
              qDate: currentdate,
              qCnt: 'city'
            })
            .then(res => {
              // console.log(res)
              if (res.data.success) {
                // console.log('aaa', res.data.data, '--------')
                var currentdata = res.data.data
                for (const allitem of Mapallcountdata) {
                  for (const currentitem of currentdata) {
                    if (
                      allitem.province === currentitem.province &&
                      allitem.city === currentitem.city &&
                      allitem.county === currentitem.county &&
                      allitem.town === currentitem.town &&
                      allitem.village === currentitem.village &&
                      allitem.qsource === currentitem.qsource
                    ) {
                      allitem.Newtoday = currentitem.total
                      break
                    } else {
                      allitem.Newtoday = 0
                    }
                  }
                }
                // end
                this.MapchartSettings = {
                  position: 'province/yunnan',
                  mapURLProfix: 'statics/mapjson/',
                  dimension: 'city',
                  metrics: ['total', 'Newtoday']
                }
                this.MapchartData = {
                  columns: ['city', 'total', 'Newtoday'],
                  rows: Mapallcountdata
                  // rows: [
                  //   { 位置: '云南省', 总计: 666, 当天新增: 999 },
                  //   { 位置: '普洱市', 总计: 123, 当天新增: 92134 },
                  // ]
                }
              } else {
              }
            })
            .catch(e => {})
        } else {
        }
      })
      .catch(e => {})
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    test() {
      this.$router.app.$http
        .post('/p2/s1/p2s1questionnaire1/onqt/', {
          cntField: ['province', 'city', 'county'],
          qDate: '',
          qCnt: 'county'
        })
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            // console.log('aaa', res.data.data, '--------')
            // this.rowData = res.data.data
          } else {
          }
        })
        .catch(e => {})
    },
    linktoURL(url) {
      location.href = url
    }
  }
}
</script>
<style scoped>
.chart-list {
  margin: 20px auto;
  width: 350px;
  height: 400px;
}
.chart-full-list {
  margin: 20px auto;
  width: 1390px;
  height: 400px;
}
</style>
