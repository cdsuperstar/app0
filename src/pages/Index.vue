<template>
  <q-page class="q-pa-lg row items-start q-gutter-md">
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
    this.HistogramchartSettings = {
      axisSite: { right: ['下单率'] },
      yAxisType: ['KMB', 'percent'],
      yAxisName: ['数值', '比率']
    }
    this.HistogramchartData = {
      columns: ['日期', '访问用户', '下单用户', '下单率'],
      rows: [
        { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
        { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
        { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
        { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
        { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
        { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
      ]
    }
    this.PiechartSettings = {
      title: { show: true, text: '主标题', x: 'center' },
      dimension: '问卷类型',
      metrics: '合计'
    }
    this.PiechartData = {
      columns: ['问卷类型', '合计'],
      rows: [
        { 问卷类型: '扫码离线问卷', 合计: 1393, 当天新增: 999 },
        { 问卷类型: '移动设备在线问卷', 合计: 3530, 当天新增: 88 },
        { 问卷类型: '移动设备离线问卷', 合计: 1723, 当天新增: 99 },
        { 问卷类型: '网页在线问卷', 合计: 2923, 当天新增: 999 }
      ]
    }
    this.MapchartSettings = {
      position: 'province/yunnan',
      mapURLProfix: 'statics/mapjson/',
      dimension: '位置',
      metrics: ['总计', '当天新增'],
      dataType: {
        总计: 'normal',
        当天新增: 'normal'
      }
    }
    this.MapchartData = {
      columns: ['位置', '总计', '当天新增'],
      rows: [
        { 位置: '云南省', 总计: 666, 当天新增: 999 },
        { 位置: '普洱市', 总计: 123, 当天新增: 92134 },
        { 位置: '临沧市', 总计: 2123, 当天新增: 29234 },
        {
          位置: '红河哈尼族彝族自治州',
          总计: 1243,
          当天新增: 94234
        },
        { 位置: '阆中县', 总计: 1243, 当天新增: 94234 },
        { 位置: '上海', 总计: 1243, 当天新增: 94234 },
        { 位置: '浙江', 总计: 5123, 当天新增: 29234 }
      ]
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
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
