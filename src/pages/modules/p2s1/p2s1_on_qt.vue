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
        style="min-width: 10em"
        emit-value
        :options="addressoptions"
      />
      <q-select
        v-model="vote.city"
        dense
        standout="bg-secondary text-white"
        label="市"
        style="min-width: 10em"
        emit-value
        :options="cityArray"
      />
      <q-select
        v-model="vote.country"
        dense
        standout="bg-secondary text-white"
        label="区（县）"
        emit-value
        style="min-width: 10em"
        :options="countryArray"
      />
      <q-select
        v-model="vote.town"
        dense
        standout="bg-secondary text-white"
        label="乡（镇）"
        emit-value
        style="min-width: 10em"
        :options="townArray"
      />
      <q-select
        v-model="vote.town"
        dense
        standout="bg-secondary text-white"
        label="问卷类型"
        emit-value
        style="min-width: 10em"
        :options="townArray"
      />
      <q-btn
        color="warning"
        text-color="white"
        class="q-mt-ma"
        icon="search"
        :label="this.$t('buttons.screening')"
        @click="modifyItems()"
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
          <th class="text-center">审核</th>
          <th class="text-center">正常</th>
          <th class="text-center">疑似</th>
          <th class="text-center">排查</th>
          <th class="text-center">小计</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center">1</td>
          <td class="text-left">Frozen Yogurt</td>
          <td class="text-left">Frozen Yogurt</td>
          <td class="text-center">159</td>
          <td class="text-center">159</td>
          <td class="text-center">5</td>
          <td class="text-center">6</td>
          <td class="text-center">24</td>
          <td class="text-center">24</td>
          <td class="text-center">4</td>
        </tr>
        <tr class="bg-grey-1">
          <td class="text-center">2</td>
          <td class="text-left">Frozen Yogurt</td>
          <td class="text-left">Ice cream sandwich</td>
          <td class="text-center">237</td>
          <td class="text-center">159</td>
          <td class="text-center">6</td>
          <td class="text-center">9</td>
          <td class="text-center">37</td>
          <td class="text-center">24</td>
          <td class="text-center">4.3</td>
        </tr>
        <tr>
          <td class="text-center">3</td>
          <td class="text-left">Frozen Yogurt</td>
          <td class="text-left">Eclair</td>
          <td class="text-center">262</td>
          <td class="text-center">159</td>
          <td class="text-center">6</td>
          <td class="text-center">16</td>
          <td class="text-center">23</td>
          <td class="text-center">24</td>
          <td class="text-center">6</td>
        </tr>
        <tr class="bg-grey-1">
          <td class="text-center">4</td>
          <td class="text-left">Cupcake</td>
          <td class="text-left">Frozen Yogurt</td>
          <td class="text-center">159</td>
          <td class="text-center">305</td>
          <td class="text-center">6</td>
          <td class="text-center">3.7</td>
          <td class="text-center">67</td>
          <td class="text-center">24</td>
          <td class="text-center">4.3</td>
        </tr>
        <tr>
          <td class="text-center">5</td>
          <td class="text-left">Gingerbread</td>
          <td class="text-left">Frozen Yogurt</td>
          <td class="text-center">356</td>
          <td class="text-center">159</td>
          <td class="text-center">6</td>
          <td class="text-center">16</td>
          <td class="text-center">49</td>
          <td class="text-center">24</td>
          <td class="text-center">3.9</td>
        </tr>
        <tr class="bg-grey-1">
          <td class="text-center text-weight-bold" colspan="5">合计</td>
          <td class="text-center">3.7</td>
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
      vote: {},
      addressoptions: [
        {
          label: '四川省',
          value: '四川省',
          city: [
            {
              label: '成都市',
              value: '成都市',
              country: [
                {
                  label: '成华区',
                  value: '成华区',
                  town: [
                    {
                      label: '二仙桥',
                      value: '二仙桥'
                    },
                    { label: '八里庄', value: '八里庄' }
                  ]
                },
                {
                  label: '青羊区',
                  value: '青羊区',
                  town: [
                    {
                      label: '西南交通大学',
                      value: '西南交通大学'
                    },
                    { label: '西南石油大学', value: '西南石油大学' }
                  ]
                }
              ]
            },
            {
              label: '广元市',
              value: '广元市',
              country: [
                {
                  label: '苍溪县',
                  value: '苍溪县',
                  town: [
                    {
                      label: '云峰镇',
                      value: '云峰镇'
                    },
                    { label: '八里庄', value: '八里庄' }
                  ]
                },
                {
                  label: '昭化区',
                  value: '昭化区',
                  town: [
                    {
                      label: '西南交通大学',
                      value: '西南交通大学'
                    },
                    { label: '西南石油大学', value: '西南石油大学' }
                  ]
                }
              ]
            },
            {
              label: '南充市',
              value: '南充市'
            }
          ]
        },
        {
          label: '海南省',
          value: '海南省',
          city: [
            {
              label: '三亚市',
              value: '三亚市'
            },
            {
              label: '海口市',
              value: '海口市'
            }
          ]
        },
        {
          label: '重庆市',
          value: '重庆市',
          city: [
            {
              label: '嘉陵区',
              value: '嘉陵区'
            },
            {
              label: '北碚区',
              value: '北碚区'
            },
            {
              label: '黔江县',
              value: '黔江县'
            }
          ]
        }
      ]
    }
  },

  computed: {
    // 获得列表
    cityArray: function() {
      let tmpRe1 = []
      for (var i in this.addressoptions) {
        if (this.addressoptions[i].value === this.vote.province) {
          tmpRe1 = this.addressoptions[i].city
          break
        }
      }
      return tmpRe1
    },
    countryArray: function() {
      let tmpRe2 = []
      for (var i in this.cityArray) {
        if (this.cityArray[i].value === this.vote.city) {
          tmpRe2 = this.cityArray[i].country
          break
        }
      }
      return tmpRe2
    },
    townArray: function() {
      let tmpRe3 = []
      for (var i in this.countryArray) {
        if (this.countryArray[i].value === this.vote.country) {
          tmpRe3 = this.countryArray[i].town
          break
        }
      }
      return tmpRe3
    }
  },
  watch: {
    'vote.province'(val) {
      if (this.vote.city) this.vote.city = null
      if (this.vote.country) this.vote.country = null
      if (this.vote.town) this.vote.town = null
    },
    'vote.city'(val) {
      if (this.vote.country) this.vote.country = null
      if (this.vote.town) this.vote.town = null
    },
    'vote.country'(val) {
      if (this.vote.town) this.vote.town = null
    },
    'vote.sex'(val) {
      if (val === 'female') {
        this.show2 = false
      } else {
        this.show2 = true
      }
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
