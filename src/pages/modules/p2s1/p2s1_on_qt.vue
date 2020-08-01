<template>
  <q-page padding class="q-ma-ma">
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t('p2s1.qtname') }}
    </div>
    <q-separator color="accent" />
    <q-markup-table flat bordered separator="cell">
      <thead class="qt-table">
        <tr>
          <th class="text-center">序</th>
          <th class="text-center">市</th>
          <th class="text-center">区（县）</th>
          <th class="text-center">乡（镇）</th>
          <th class="text-center">村</th>
          <th class="text-center">问卷来源</th>
          <th class="text-center">小计</th>
        </tr>
      </thead>
      <tbody>
        <!--        <tr v-for="item in earaArray" :key="item.id">-->
        <!--          <td class="text-center">1</td>-->
        <!--          <td class="text-left">{{ item.county }}</td>-->
        <!--          <td class="text-left">{{ item.town }}</td>-->
        <!--          <td class="text-left">{{ item.village }}</td>-->
        <!--          <td class="text-center">{{ item.qtype }}</td>-->
        <!--          <td class="text-center">0</td>-->
        <!--          <td class="text-center">{{ item.nore }}</td>-->
        <!--          <td class="text-center">24</td>-->
        <!--          <td class="text-center">24</td>-->
        <!--          <td class="text-center">4</td>-->
        <!--        </tr>-->
        <tr class="bg-grey-1">
          <td class="text-center text-weight-bold" colspan="5">合计</td>
          <td class="text-center">33</td>
          <td class="text-center">6</td>
          <td class="text-center">67</td>
          <td class="text-center">24</td>
          <td class="text-center">4.3</td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
export default {
  name: 'P2s1OnQt',
  data() {
    return {
      rowData: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$router.app.$http
      .get('/p2/s1/p2s1questionnaire1/')
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.data)
          this.rowData = res.data.data
        } else {
        }
      })
      .catch(e => {})
    // 得到Array的值
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped>
.qt-table {
  background-color: var(--q-color-secondary);
  color: #ffffff;
}
.qt1-table {
  background-color: var(--q-color-info);
  color: #000000;
}
</style>
