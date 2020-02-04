<template>
  <q-layout view="hhh LpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
        <q-select
          v-model="lang"
          borderless
          dense
          options-dense
          map-options
          :options="langs"
        />
        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay bordered>
      <!-- drawer content -->
      <q-list bordered link class="rounded-borders">
        <treemenu
          v-for="item in menutree"
          v-bind:key="item.id"
          :children="item"
          :depth="0"
        ></treemenu>
      </q-list>
      <nested-test class="col-8" v-model="menutree" />
    </q-drawer>

    <q-drawer v-model="right" side="right" overlay elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import treemenu from '../pages/modules/treemenu'
import NestedTest from '../pages/modules/nested-tree'

export default {
  components: { treemenu, NestedTest },
  data() {
    return {
      menutree: null,
      left: false,
      right: false,
      langs: [
        {
          label: '中文',
          value: 'zh-hans'
        },
        {
          label: 'English',
          value: 'en-us'
        }
      ],
      lang: this.$i18n.locale
    }
  },
  created() {
    this.getZModules()
      .then(res => {
        if (res.data.success) {
          if (Array.isArray(res.data.data)) {
            let { routes } = this.$router.options
            let routeData = routes.find(r => r.path === '/user')
            res.data.data.forEach(function(val) {
              routeData.children.push({
                path: val.url,
                name: val.name,
                component: () => import('pages/modules/' + val.name + '.vue')
              })
            })
            this.$router.addRoutes([routeData])
          }
        } else {
        }
      })
      .catch(e => {})
    this.$router.app.$http
      .get('/z_module/getMyMenu')
      .then(res => {
        if (res.data.success) {
          this.menutree = res.data.data
        } else {
        }
      })
      .catch(e => {})
  },
  computed: {
    ...mapState('zero', ['ZModules'])
  },
  methods: {
    ...mapActions('zero', ['getZModules'])
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang.value
      // set quasar's language too!!
      import(`quasar/lang/${lang.value}`).then(language => {
        this.$q.lang.set(language.default)
      })
    }
  }
}
</script>
