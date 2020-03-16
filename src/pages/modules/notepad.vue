<template>
  <q-page class="q-pa-lg">
    <q-card flat>
      <q-toolbar>
        <q-toolbar-title>
          <span class="text-subtitle1 text-weight-bold">
            {{ $t('comapplication.header') }}</span
          >
        </q-toolbar-title>
        <q-btn
          outline
          color="secondary"
          icon="save"
          :label="this.$t('buttons.confirm')"
          @click="setquickapplication()"
        />
      </q-toolbar>
      <q-card-section
        class="row items-start q-gutter-lg"
        style="min-height: 60px;padding: 8px;"
      >
        <q-card
          v-for="m in selectdata"
          :key="m.id"
          flat
          style="cursor: pointer"
          @click="removeCommonapplication(m)"
        >
          <q-card-section horizontal align="center">
            <q-list padding>
              <q-item-section
                class="rounded-borders bg-primary"
                style="width: 3rem;height: 3rem;"
              >
                <q-icon
                  :name="m.icon"
                  color="white"
                  style="font-size: 2rem;padding: 5px;"
                ></q-icon>
                <q-badge color="warning" floating>
                  <q-icon name="remove" size="15px" color="white" />
                </q-badge>
              </q-item-section>
              <q-item-section style="margin-left: 1px;">
                {{ m.title }}
              </q-item-section>
            </q-list>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-separator />
      <q-card-section v-for="t in Modeldata" :key="t.id * 100">
        <div style="padding: 8px;">
          <div class="text-weight-bold">{{ t.title }}</div>
        </div>
        <div
          class="row items-start q-gutter-lg"
          style="min-height: 60px;padding: 8px;"
        >
          <q-card
            v-for="n in t.children"
            :key="n.id"
            flat
            style="cursor: pointer"
            @click="addCommonapplication(n)"
          >
            <q-card-section horizontal align="center">
              <q-list padding>
                <q-item-section
                  class="rounded-borders bg-secondary"
                  style="width: 3rem;height: 3rem;"
                >
                  <q-icon
                    :name="n.icon"
                    color="white"
                    style="font-size: 2rem;padding: 5px;"
                  ></q-icon>
                  <q-badge color="warning" floating>
                    <q-icon
                      v-if="!n.sign"
                      name="add"
                      size="15px"
                      color="white"
                    />
                    <q-icon
                      v-if="n.sign"
                      name="done"
                      size="15px"
                      color="white"
                    />
                  </q-badge>
                </q-item-section>
                <q-item-section style="margin-left: 1px;">
                  {{ n.title }}
                </q-item-section>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
export default {
  title: 'comapplication',
  components: {},
  data() {
    return {
      Modeldata: null,
      selectdata: [],
      usercfg: { quickapplication: [1] }
    }
  },
  computed: {
    ...mapState('zero', ['ZPermissions']),
    menutree: {
      get() {
        return this.ZPermissions.moduletree
      }
    }
  },
  created() {
    // 得到初始数据
    if (this.$auth.user().usercfg) {
      this.usercfg = JSON.parse(this.$auth.user().usercfg)
    }

    // 返回菜单
    const tmpd = JSON.parse(
      JSON.stringify(this.ZPermissions.moduletree[0].children)
    )
    const resdata = []
    Object.values(tmpd).forEach(val => {
      if (val.children.length && val.ismenu === 'A') {
        val.children = this.$zglobal.flatten(val.children)
        Object.values(val.children).forEach(va => {
          if (this.usercfg.quickapplication.indexOf(va.id) !== -1) {
            va.sign = true
          } else {
            va.sign = false
          }
        })
        resdata.push(val)
      }
    })

    // 赋值
    this.Modeldata = resdata
    const tmps = []
    Object.values(resdata).forEach(value => {
      value.children.filter(function(el) {
        if (el.sign) tmps.push(el)
      })
    })
    this.selectdata = tmps
  },
  mounted() {},
  methods: {
    setquickapplication() {
      var parr = this.selectdata.map(({ id }) => id)
      parr.reverse()
      this.usercfg.quickapplication = parr
      this.$auth.user().usercfg.quickapplication = parr
      console.log(this.usercfg, '+++')
      this.$router.app.$http
        .post('/zero/setMyUsercfg/', {
          usercfg: JSON.stringify(this.usercfg)
        })
        .then(res => {})
      console.log('save...', this.usercfg)
    },
    addCommonapplication(n) {
      if (n && this.selectdata.indexOf(n) === -1) {
        n.sign = true
        this.selectdata.push(n)
      }
    },
    removeCommonapplication(n) {
      n.sign = false
      this.selectdata.splice(this.selectdata.indexOf(n), 1)
    }
  }
}
</script>
<style scoped>
.modules-list {
  margin: 20px auto;
  width: 100%;
  max-width: 350px;
}
</style>
