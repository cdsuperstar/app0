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
        <q-space />
        <q-btn
          flat
          round
          dense
          icon="home"
          to="/user/dashboard"
          :title="this.$t('buttons.home')"
        />
        <q-btn-dropdown v-if="$q.screen.gt.xs" stretch flat label="功能">
          <q-list>
            <q-item-label header>Folders</q-item-label>
            <q-item
              v-for="n in 3"
              :key="`x.${n}`"
              v-close-popup
              clickable
              tabindex="0"
            >
              <q-item-section avatar>
                <q-avatar icon="folder" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Photos</q-item-label>
                <q-item-label caption>February 22, 2016</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item-label header>Files</q-item-label>
            <q-item
              v-for="n in 3"
              :key="`y.${n}`"
              v-close-popup
              clickable
              tabindex="0"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="assignment"
                  color="primary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Vacation</q-item-label>
                <q-item-label caption>February 22, 2016</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-select
          v-model="lang"
          stretch
          flat
          dark
          popup-content-style="background-color:#bdbdbd"
          borderless
          options-dense
          map-options
          :options="langs"
        />
        <q-btn
          v-if="$q.screen.gt.xs"
          dense
          flat
          round
          icon="apps"
          @click="right = !right"
        />
        <q-btn
          v-if="$q.screen.lt.sm"
          flat
          round
          dense
          icon="more_vert"
          @click="right = !right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay bordered>
      <!-- drawer content -->
      <q-list bordered link class="rounded-borders">
        <treemenu
          v-for="item in menutree"
          :key="item.id"
          :children="item"
          :depth="1"
        ></treemenu>
      </q-list>
      <nested-test v-model="menutree" v-if="true" class="col-8" />
    </q-drawer>

    <q-drawer v-model="right" side="right" overlay elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
        <q-btn-dropdown
          stretch
          flat
          dense
          icon="person_outline"
          title="用户中心"
        >
          <q-list separator style="overflow:hidden;">
            <div v-for="item in routearr" :key="item.id">
              <q-item
                v-ripple
                clickable
                tag="a"
                :to="item.url"
                v-if="item.ismenu.indexOf('B') !== -1"
              >
                <q-item-section avatar>
                  <q-avatar
                    color="indigo"
                    text-color="white"
                    :icon="item.icon"
                    size="30px"
                  ></q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ item.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <q-item v-ripple clickable tag="a" @click="$auth.logout()">
              <q-item-section avatar>
                <q-avatar
                  color="indigo"
                  text-color="white"
                  icon="assignment_ind"
                  size="30px"
                ></q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('auth.logout.logout') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
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
      routearr: [],
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
  computed: {
    ...mapState('zero', ['ZModules']),
    menutree: {
      get() {
        return JSON.parse(JSON.stringify(this.ZModules))
      },
      set(value) {
        this.setZModules(value)
      }
    }
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang.value
      // set quasar's language too!!
      import(`quasar/lang/${lang.value}`).then(language => {
        this.$q.lang.set(language.default)
      })
    }
  },
  created() {
    this.getZModules()
      .then(res => {
        if (res.data.success) {
          this.routearr = this.$zglobal.flatten(res.data.data)
          if (Array.isArray(this.routearr)) {
            let { routes } = this.$router.options
            let routeData = routes.find(r => r.path === '/user')
            this.forEach(function(val) {
              // push url to router by Luke
              if (val.url !== '' && val.url !== null) {
                routeData.children.push({
                  path: val.url,
                  name: val.name,
                  component: () => import('pages/modules/' + val.url + '.vue')
                })
              }
            })
            this.$router.addRoutes([routeData])
          }
        } else {
        }
      })
      .catch(e => {})
  },

  methods: {
    ...mapActions('zero', ['getZModules', 'setZModules']),
    test() {
      console.log('test:', this.ZModules)
    }
  }
}
</script>
