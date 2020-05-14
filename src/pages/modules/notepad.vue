<template>
  <q-page class="q-pa-ma">
    <q-card flat>
      <q-card-section>
        <p
          class="row text-h6 text-bold"
          style="margin-bottom:.5em;color: var(--q-color-positive)"
        >
          大学生消费情况调查问卷
        </p>
        <p style="text-indent:2em;">
          你好！非常感谢你在百忙之中填写这份问卷，我们调查的目的是想了解目前大学生在金钱观、消费观、消费与闲暇方式等方面的现状。大学生是一个庞大的消费群体，对消费市场有着不容小视的影响。大学生的消费理念势必会影响消费市场的发展趋向，
          本问卷各项答案无所谓好坏对错且问卷所得结果不做个别呈现，对外绝对保密，所以请你依据自己的看法，放心填写。谢谢你的合作！
        </p>
      </q-card-section>
    </q-card>
    <q-stepper
      v-model="step"
      header-nav
      flat
      :vertical="$q.screen.gt.xs ? false : true"
      ref="stepper"
      color="primary"
      done-color="deep-orange"
      active-color="purple"
      inactive-color="secondary"
      animated
    >
      <q-step
        :name="1"
        title="基础信息"
        caption="个人信息"
        icon="person"
        :done="done1"
      >
        <div class="no-wrap">
          1、你的性别：
          <q-radio v-model="vote.sex" val="male" label="男" color="cyan" />
          <q-radio v-model="vote.sex" val="female" label="女" color="red" />
        </div>
        <div v-if="show2">
          2、你的年级：
          <q-option-group
            v-model="vote.grade"
            label="Notifications"
            type="radio"
            :options="gradeoptions"
          />
        </div>
        <div class="q-ma">
          3、 您是否经常与同学聚餐：（<q-icon
            name="star"
            color="deep-orange-7"
            size="20px"
          />）

          <q-option-group
            v-model="vote.q3"
            label="Notifications"
            type="radio"
            :options="options3"
          />
        </div>
        <div class="q-ma">
          4、每个月的生活费有剩余时，你会把它用于*：
          <q-option-group
            v-model="vote.q4"
            label="Notifications"
            type="checkbox"
            :options="options4"
          />
          <p style="text-indent:1em;" class="q-pl-lg">
            <input v-model="vote.q4o" type="text" size="20" />
          </p>
        </div>
        <div class="q-ma" style="max-width: 300px">
          5、你的建议：
          <q-input v-model="vote.q5" outlined type="textarea" />
        </div>
      </q-step>

      <q-step
        :name="2"
        title="选择框联动"
        icon="create_new_folder"
        :done="done2"
      >
        选择：{{ vote.province }}-{{ vote.city }}-{{ vote.town }}
        <div class="q-gutter-md row">
          <q-select
            v-model="vote.province"
            dense
            standout="bg-secondary text-white"
            label="省份"
            style="min-width: 10em"
            emit-value
            :options="provinceoptions"
          />
          <q-select
            v-model="vote.city"
            dense
            standout="bg-secondary text-white"
            label="城市"
            style="min-width: 10em"
            emit-value
            :options="cityArray"
          />
          <q-select
            v-model="vote.town"
            dense
            standout="bg-secondary text-white"
            label="区、县"
            emit-value
            style="min-width: 10em"
            :options="townArray"
          />
        </div>
      </q-step>

      <q-step :name="3" title="Create an ad" icon="add_comment" :done="done3">
        Try out different ad text to see what brings in the most customers, and
        learn how to enhance your ads using features like ad extensions. If you
        run into any problems with your ads, find out how to tell if they're
        running and how to resolve approval issues.
        <div>
          <q-btn
            type="submit"
            color="secondary"
            icon-right="save"
            :loading="saving"
            @click="savedata"
          >
            保存问卷&nbsp;&nbsp;
            <template v-slot:loading>
              <q-spinner-rings />
            </template>
          </q-btn>
        </div>
      </q-step>
    </q-stepper>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  title: 'Vo',
  components: {},
  data() {
    return {
      saving: false,
      vote: { q4: ['旅游', '上网'] },
      show2: true,
      provinceoptions: [
        {
          label: '四川省',
          value: '四川省',
          city: [
            {
              label: '成都市',
              value: '成都市',
              town: [
                {
                  label: '成华区',
                  value: '成华区'
                },
                {
                  label: '青羊区',
                  value: '青羊区'
                }
              ]
            },
            {
              label: '广元市',
              value: '广元市'
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
      ],
      gradeoptions: [
        { label: '大一', value: '大一', color: 'primary' },
        { label: '大二', value: '大二', color: 'primary' },
        { label: '大三', value: '大三', color: 'primary' },
        { label: '大四', value: '大四', color: 'primary' }
      ],
      options3: [
        { label: '从来不', value: '从来不', color: 'primary' },
        {
          label: '一两个星期左右一次',
          value: '一两个星期左右一次',
          color: 'primary'
        },
        {
          label: '一两个月左右一次',
          value: '一两个月左右一次',
          color: 'primary'
        }
      ],
      options4: [
        { label: '吃喝', value: '吃喝' },
        { label: '旅游', value: '旅游' },
        { label: '添置衣物', value: '添置衣物' },
        { label: '上网', value: '上网' },
        { label: '考证', value: '考证' },
        { label: '买书', value: '买书' },
        { label: '存起来', value: '存起来' },
        { label: '其它 ', value: '其它 ' }
      ],
      step: 1,
      done1: false,
      done2: false,
      done3: false
    }
  },
  computed: {
    // 获得列表
    cityArray: function() {
      for (var i in this.provinceoptions) {
        if (this.provinceoptions[i].value === this.vote.province) {
          return this.provinceoptions[i].city
        }
      }
    },
    townArray: function() {
      for (var i in this.cityArray) {
        if (this.cityArray[i].value === this.vote.city) {
          return this.cityArray[i].town
        }
      }
    }
  },
  created() {},
  watch: {
    'vote.province'(val) {
      if (this.vote.city) this.vote.city = null
      if (this.vote.town) this.vote.town = null
    },
    'vote.city'(val) {
      if (this.vote.town) this.vote.town = null
    },
    'vote.sex'(val) {
      if (val === 'female') {
        this.show2 = false
      } else {
        this.show2 = true
      }
    }
  },
  mounted() {},
  methods: {
    savedata() {
      this.saving = true
      console.log(this.vote, '提交成功')
      setTimeout(() => {
        // we're done, we reset loading state
        this.saving = false
        console.log('-=----=---=---=---=---=--' + JSON.stringify(this.vote))
      }, 3000)
    }
  }
}
</script>
<style scoped></style>
