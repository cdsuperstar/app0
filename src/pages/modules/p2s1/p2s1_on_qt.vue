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
      <q-select
        v-model="vote.province"
        dense
        standout="bg-secondary text-white"
        label="省"
        style="min-width: 10em;"
        emit-value
        :options="addressoptions"
      />
      <q-select
        v-model="vote.city"
        dense
        standout="bg-secondary text-white"
        label="市"
        style="min-width: 10em;"
        emit-value
        :options="cityArray"
      />
      <q-select
        v-model="vote.county"
        dense
        standout="bg-secondary text-white"
        label="区（县）"
        emit-value
        style="min-width: 10em;"
        :options="countyArray"
      />
      <q-select
        v-model="vote.town"
        dense
        clearable
        standout="bg-secondary text-white"
        label="镇（乡）"
        emit-value
        style="min-width: 10em;"
        :options="townArray"
      />
      <q-select
        v-model="vote.qtype"
        clearable
        dense
        standout="bg-secondary text-white"
        label="问卷类型"
        emit-value
        style="min-width: 10em"
        :options="[
          '建档立卡户问卷',
          '非建档立卡户问卷',
          '县领导问卷',
          '县人大问卷',
          '县级行业部门问卷'
        ]"
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
export default {
  name: 'P2s1OnQt',
  data() {
    return {
      vote: {
        province: '四川省',
        city: '成都市',
        county: '成华区'
      },
      rowData: null,
      result: [],
      earaArray: [],
      tmp: [
        {
          id: 9,
          investigator: 1,
          no: 'D20200713T214218',
          qtype: '建档立卡户问卷',
          province: '四川省',
          city: '成都市',
          county: '成华区',
          town: '八里庄',
          village: 'XX村44',
          group: 'XX组',
          longitude: null,
          latitude: null,
          q_files: '问卷附件',
          qsource: '扫码问卷',
          files: '""',
          isUpload: true,
          reviewer: 22222,
          re_comments: '问卷一切正常',
          re_conclusion: '审核通过',
          auditor: 333333,
          au_comments: '该户排查过程中……',
          au_conclusion: '正常',
          au_files: '排查附件',
          villagetype: '农区',
          investigator1: '调查员姓名1',
          investigatortel1: '138 - 8888 8888',
          investigator2: '调查员姓名2',
          investigatortel2: '139 - 9999 9999',
          a1name: '被访问姓名',
          a1relation: null,
          a1tel: '1300000000000000',
          a2: '小学及以下',
          b1: '户主1',
          b2: '女',
          b3: '土家族',
          b4: '小学及以下',
          b5: '222222 22222222 2222 2',
          c1: '7',
          c14: '2015',
          c17: '3600',
          c19: '2019',
          created_at: '2020-07-13 13:42:18',
          updated_at: '2020-07-13 13:42:18'
        }
      ],
      addressoptions: this.$t('p2s1.addressArray'),
      cityArray: [],
      countyArray: [],
      townArray: []
    }
  },
  computed: {},
  watch: {
    // 获得列表
    'vote.province'(val, oldval) {
      for (var i in this.addressoptions) {
        if (this.addressoptions[i].value === this.vote.province) {
          this.cityArray = this.addressoptions[i].city
          break
        }
      }
      if (oldval !== val) {
        this.vote.city = ''
      }
    },
    'vote.city'(val, oldval) {
      for (var j in this.cityArray) {
        if (this.cityArray[j].value === this.vote.city) {
          this.countyArray = this.cityArray[j].county
          break
        }
      }
      if (oldval !== val) {
        this.vote.county = ''
      }
    },
    'vote.county'(val, oldval) {
      for (var k in this.countyArray) {
        if (this.countyArray[k].value === this.vote.county) {
          this.townArray = this.countyArray[k].town
          break
        }
      }
      if (oldval !== val) {
        this.vote.town = ''
      }
    }
  },
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
  mounted() {
    if (this.vote.province) {
      for (var i in this.addressoptions) {
        if (this.addressoptions[i].value === this.vote.province) {
          this.cityArray = this.addressoptions[i].city
          break
        }
      }
    }
    if (this.vote.city) {
      for (var j in this.cityArray) {
        if (this.cityArray[j].value === this.vote.city) {
          this.countyArray = this.cityArray[j].county
          break
        }
      }
    }
    if (this.vote.county) {
      for (var k in this.countyArray) {
        if (this.countyArray[k].value === this.vote.county) {
          this.townArray = this.countyArray[k].town
          break
        }
      }
    }
  },
  methods: {
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
