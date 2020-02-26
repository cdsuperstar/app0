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
        <!-- 语言选择--->
        <q-btn-dropdown
          v-if="$q.screen.gt.xs"
          stretch
          flat
          :label="this.$t('langs.header')"
        >
          <q-list>
            <q-item-label
              header
              style="text-align:left;border-bottom: 1px dashed #d6d6d6;"
              >{{ $t('langs.title') }}</q-item-label
            >
            <q-item
              v-for="n in langs"
              :key="n.value"
              v-close-popup
              clickable
              @click="setlanguage(n)"
            >
              <q-item-section avatar top>
                <q-avatar
                  color="primary"
                  text-color="white"
                  size="30px"
                  icon="directions"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ n.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
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

    <q-drawer v-model="left" side="left" bordered :width="leftdrawer">
      <!-- drawer content -->
      <q-list bordered link class="rounded-borders">
        <div v-for="menus in menutree" :key="menus.id">
          <treemenu
            v-for="item in menus.children"
            :key="item.id"
            :children="item"
            :depth="1"
          ></treemenu>
        </div>
      </q-list>
      <nested-test v-if="false" v-model="menutree" class="col-8" />
    </q-drawer>

    <q-drawer v-model="right" bordered side="right" :width="rightdrawer">
      <!-- drawer content -->
      <!-- 语言选择--->
      <div class="q-mt-sm">
        <q-list>
          <q-expansion-item
            v-if="!$q.screen.gt.xs"
            expand-separator
            icon="language"
            class="text-primary text-weight-bold"
            :label="this.$t('langs.title')"
          >
            <q-item
              v-for="n in langs"
              :key="n.value"
              v-close-popup
              v-ripple
              clickable
              style="border-bottom: 1px dashed #b5b5b5;"
              @click="setlanguage(n)"
            >
              <q-item-section avatar top>
                <q-avatar
                  color="primary"
                  text-color="white"
                  size="30px"
                  icon="directions"
                />
              </q-item-section>
              <q-item-section
                class="column text-black text-weight-medium text-left"
              >
                <q-item-label>{{ n.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <!--      <transition>-->
      <!--        <keep-alive>-->
      <router-view></router-view>
      <!--        </keep-alive>-->
      <!--      </transition>-->
    </q-page-container>

    <q-footer reveal bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
        <q-btn-dropdown
          stretch
          flat
          dense
          icon="person_outline"
          :title="this.$t('auth.personprfile')"
        >
          <q-list separator style="overflow:hidden;">
            <div v-for="item in menuB" :key="item.id">
              <q-item
                v-if="item.ismenu.indexOf('B') !== -1"
                v-ripple
                clickable
                tag="a"
                :to="item.url"
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
                  icon="exit_to_app"
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
      leftdrawer: 210,
      rightdrawer: 230,
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
        // return JSON.parse(JSON.stringify(this.ZModules))
        return this.ZModules
      },
      set(value) {
        this.setZModules(value)
      }
    },
    menuB: {
      get() {
        return this.$zglobal.flatten(this.ZModules)
      },
      set(value) {}
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
  mounted() {
    this.getZModules()
      .then(res => {
        if (res.data.success) {
          this.routearr = this.$zglobal.flatten(res.data.data)
          if (Array.isArray(this.routearr)) {
            const { routes } = this.$router.options
            const routeData = routes.find(r => r.path === '/user')
            this.routearr.forEach(function(val) {
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

    this.getMyPermissions({
      role: 'w'
    })
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
  },

  methods: {
    ...mapActions('zero', ['getZModules', 'setZModules', 'getMyPermissions']),
    setlanguage(lang) {
      // console.log(lang)
      this.lang = lang
    }
  }
}
</script>
