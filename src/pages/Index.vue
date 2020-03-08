<template>
  <q-page class="q-pa-lg row items-start q-gutter-md">
    <q-card flat bordered class="chart-list">
      <q-card-section>
        <ve-map :data="MapchartData" :settings="MapchartSettings"></ve-map>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="chart-list">
      <q-card-section>
        <ve-pie :data="PiechartData" :settings="PiechartSettings"></ve-pie>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="chart-list">
      <q-card-section>
        <ve-line :data="LinechartData" :settings="LinechartSettings"></ve-line>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="chart-list">
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
import VeHistogram from 'v-charts/lib/histogram.common.js'
import VePie from 'v-charts/lib/pie.common.js'
import VeMap from 'v-charts/lib/map.common.js'
import VeLine from 'v-charts/lib/line.common.js'

export default {
  name: 'PageIndex',
  components: { VeHistogram, VePie, VeMap, VeLine },
  data() {
    return {
      HistogramchartSettings: null,
      HistogramchartData: null,
      PiechartSettings: null,
      PiechartData: null,
      MapchartSettings: null,
      MapchartData: null,
      LinechartSettings: null,
      LinechartData: null
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
      dimension: '日期',
      metrics: '访问用户'
    }
    this.PiechartData = {
      columns: ['日期', '访问用户'],
      rows: [
        { 日期: '1/1', 访问用户: 1393 },
        { 日期: '1/2', 访问用户: 3530 },
        { 日期: '1/3', 访问用户: 2923 },
        { 日期: '1/4', 访问用户: 1723 },
        { 日期: '1/5', 访问用户: 3792 },
        { 日期: '1/6', 访问用户: 4593 }
      ]
    }
    this.MapchartSettings = {
      position: 'province/sichuan',
      mapURLProfix: '/statics/mapjson/',
      dimension: '位置',
      metrics: ['人口', '面积'],
      dataType: {
        面积: 'KMB'
      }
    }
    this.MapchartData = {
      columns: ['位置', '税收', '人口', '面积'],
      rows: [
        { 位置: '成都市', 税收: 123, 人口: 123, 面积: 92134 },
        { 位置: '南充市', 税收: 1223, 人口: 2123, 面积: 29234 },
        { 位置: '广元市', 税收: 2123, 人口: 1243, 面积: 94234 },
        { 位置: '重庆', 税收: 2123, 人口: 1243, 面积: 94234 },
        { 位置: '上海', 税收: 2123, 人口: 1243, 面积: 94234 },
        { 位置: '浙江', 税收: 4123, 人口: 5123, 面积: 29234 }
      ]
    }
    this.LinechartSettings = {
      axisSite: { right: ['下单率'] },
      yAxisType: ['KMB', 'percent'],
      yAxisName: ['数值', '比率']
    }
    this.LinechartData = {
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
  },
  methods: {}
}
</script>
<style scoped>
.chart-list {
  margin: 20px auto;
  width: 100%;
  max-width: 450px;
}
</style>
