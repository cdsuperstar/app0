<template>
  <q-page padding class="q-ma-ma">
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t('p2s1.qtname') }}
    </div>
    <q-separator color="accent" />
    <div
      :class="
        $q.screen.gt.xs
          ? 'q-my-sm row items-start q-gutter-md'
          : 'q-my-sm q-gutter-md'
      "
    >
      <v-distpicker
        :province="vote.province"
        :city="vote.city"
        :area="vote.county"
        :placeholders="placeholders"
        province-disabled
        @selected="AreaonSelected"
      ></v-distpicker>
      <q-select
        v-model="vote.qtype"
        clearable
        dense
        standout="bg-secondary text-white"
        label="问卷类型"
        emit-value
        style="min-width: 10em"
        :options="['相对贫困调查问卷', '其他问卷']"
      />
      <q-btn
        color="warning"
        text-color="white"
        class="q-mt-ma"
        icon="search"
        :label="this.$t('buttons.screening')"
        @click="searchItems()"
      />
    </div>
    <q-markup-table flat bordered separator="cell">
      <thead class="qt-table">
        <tr>
          <th class="text-center">序</th>
          <th class="text-center">区（县）</th>
          <th class="text-center">乡（镇）</th>
          <th class="text-center">村</th>
          <th class="text-center">问卷类型</th>
          <th class="text-center">未审核</th>
          <th class="text-center">审核通过</th>
          <th class="text-center">疑似</th>
          <th class="text-center">排查</th>
          <th class="text-center">小计</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in earaArray" :key="item.id">
          <td class="text-center">1</td>
          <td class="text-left">{{ item.county }}</td>
          <td class="text-left">{{ item.town }}</td>
          <td class="text-left">{{ item.village }}</td>
          <td class="text-center">{{ item.qtype }}</td>
          <td class="text-center">0</td>
          <td class="text-center">{{ item.nore }}</td>
          <td class="text-center">24</td>
          <td class="text-center">24</td>
          <td class="text-center">4</td>
        </tr>
        <tr class="bg-grey-1">
          <td class="text-center text-weight-bold" colspan="5">合计</td>
          <td class="text-center">{{ result.length }}</td>
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
import VDistpicker from 'v-distpicker'

export default {
  name: 'P2s1OnQt',
  components: { VDistpicker },
  data() {
    return {
      vote: { province: '云南省', qtype: '相对贫困调查问卷' },
      rowData: null,
      result: [],
      earaArray: [],
      placeholders: {
        province: '------- 省 --------',
        city: '------- 市 -------',
        area: '------- 区 -------'
      }
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
    console.log(
      JSON.stringify(this.countyArray),
      '-----------',
      this.vote.county
    )
  },
  mounted() {},
  methods: {
    AreaonSelected(data) {
      // console.log(data, '===========')
      this.vote.province = data.province.value
      this.vote.city = data.city.value
      this.vote.county = data.area.value
      // console.log(JSON.stringify(this.vote), '===========')
    },
    searchItems() {
      this.result = this.filterData(this.rowData, this.vote)
      const tmpa = this.Jsonduplicate(
        this.JsonSort(this.result, 'town'),
        'town',
        'village'
      )
      this.earaArray = JSON.parse(
        JSON.stringify(tmpa, [
          'province',
          'city',
          'county',
          'town',
          'village',
          'villagetype',
          'qtype'
        ])
      )
      const tmparray = JSON.parse(JSON.stringify(this.earaArray))
      const tmpnore = 'nore'
      for (var i = 0; i < this.earaArray.length; i++) {
        tmparray[i].re_conclusion = '审核通过'
        // const filtered = this.result.filter(item =>
        //   tmparray[i].every(f => f.includes(item))
        // )

        const tmpb = this.filterData(this.result, tmparray[i])
        console.log(tmpb, '+++++++', tmpb.length)
        this.earaArray[i][tmpnore] = tmpb.length
      }

      console.log(tmpa.length, '-----------', JSON.stringify(this.earaArray))
    },
    Jsonduplicate(data, key1, key2) {
      // data是json对象，key1,key2是根据什么字段去重
      var dest = []
      for (var i = 0; i < data.length; i++) {
        var ai = data[i]
        if (i === 0) {
          dest.push(ai)
        } else {
          var filterData = dest.filter(function(e) {
            return e[key1] === ai[key1] && e[key2] === ai[key2]
          })
          if (filterData.length === 0) {
            dest.push(ai)
          }
        }
      }
      return dest
    },
    JsonSort(json, key) {
      for (var j = 1; j < json.length; j++) {
        var temp = json[j],
          val = temp[key],
          i = j - 1
        while (i >= 0 && json[i][key] > val) {
          json[i + 1] = json[i]
          i = i - 1
        }
        json[i + 1] = temp
      }
      return json
    },
    filterData(data, filter) {
      return data.filter(item => {
        var isIn = true
        for (var key in filter) {
          if (filter[key] === null) continue
          if (filter[key].indexOf(item[key]) < 0) {
            isIn = false
            break
          }
        }
        return isIn
      })
    }
  }
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
