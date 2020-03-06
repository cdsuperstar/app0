<template>
  <q-layout view="hhh LpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="row">
          <q-avatar>
            <img src="/statics/app-logo.jpg" />
          </q-avatar>
          <div v-if="$q.screen.gt.xs" style="margin-top: 5px;">
            &nbsp;&nbsp;物探院综合管理系统
          </div>
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
        <!-- 角色选择--->
        <q-btn-dropdown
          stretch
          flat
          :label="
            this.currectRole === undefined
              ? this.$t('roles.rolelist')
              : this.currectRole.title
          "
          :title="this.$t('roles.rolelistheader')"
        >
          <q-list dense>
            <q-item
              v-for="ro in MyRoleList"
              style="text-align:left;border-bottom: 1px dashed #d6d6d6;padding: 6px;"
              :class="
                ro.name == ZPermissions.currectrole.name
                  ? 'text-primary'
                  : 'text-grey-7'
              "
              v-close-popup
              clickable
              :key="ro.id"
              @click="setRole(ro)"
            >
              <q-item-section avatar style="min-width:30px;">
                <q-icon name="person" size="25px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ ro.title }} </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <!-- 语言选择--->
        <q-btn-dropdown
          v-if="$q.screen.gt.xs"
          stretch
          flat
          :label="
            this.lang.label === undefined
              ? this.$t('langs.header')
              : this.lang.label
          "
        >
          <q-list dense>
            <q-item-label
              header
              style="text-align:left;border-bottom: 1px dashed #d6d6d6;padding: 8px;"
              >{{ $t('langs.title') }}
            </q-item-label>
            <q-item
              v-for="n in langs"
              style="text-align:left;border-bottom: 1px dashed #d6d6d6;padding: 6px;"
              :class="lang.value === n.value ? 'text-primary' : 'text-grey-7'"
              v-close-popup
              clickable
              :key="n.value"
              @click="setlanguage(n)"
            >
              <q-item-section avatar style="min-width:30px;">
                <q-icon size="25px" name="directions" />
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
              v-close-popup
              v-ripple
              clickable
              style="border-bottom: 1px dashed #b5b5b5;"
              :key="n.value"
              :class="lang.value === n.value ? 'text-primary' : 'text-grey-7'"
              @click="setlanguage(n)"
            >
              <q-item-section avatar>
                <q-icon size="30px" name="directions" />
              </q-item-section>
              <q-item-section class="column text-weight-medium text-left">
                <q-item-label>{{ n.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </div>
      <!-- 颜色选择--->
      <div class="q-mt-sm">
        <q-list>
          <q-expansion-item
            expand-separator
            icon="language"
            class="text-primary text-weight-bold"
            label="主题颜色列表"
          >
            <q-item>
              <q-item-section
                ><q-toggle v-model="usercfg.dark" label="护眼模式"></q-toggle
              ></q-item-section>
            </q-item>
            <q-item
              v-for="n in themeoptions"
              v-close-popup
              v-ripple
              clickable
              style="border-bottom: 1px dashed #b5b5b5;"
              :key="n.value"
              :class="
                usercfg.theme === n.value ? 'text-primary' : 'text-grey-7'
              "
              @click="setthemecolor(n.value)"
            >
              <q-item-section avatar>
                <q-icon size="30px" name="directions" />
              </q-item-section>
              <q-item-section class="column text-weight-medium text-left">
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
import { colors } from 'quasar'

export default {
  components: { treemenu, NestedTest },
  data() {
    return {
      routearr: [],
      MyRoleList: null,
      usercfg: { theme: 'blue', dark: false },
      themeoptions: this.$t('menu.themeoptions'),
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
    ...mapState('zero', ['ZPermissions']),
    menutree: {
      get() {
        return this.ZPermissions.moduletree
      },
      set(value) {}
    },
    menuB: {
      get() {
        return this.ZPermissions.modules
      },
      set(value) {}
    },
    currectRole: {
      get() {
        return this.ZPermissions.currectrole
      }
    }
  },
  watch: {
    'usercfg.dark'(val) {
      this.applydarkmode()
    },
    lang(lang) {
      this.$i18n.locale = lang.value
      // set quasar's language too!!
      import(`quasar/lang/${lang.value}`).then(language => {
        this.$q.lang.set(language.default)
      })
    }
  },
  mounted() {
    this.lang = this.langs.filter(lan => lan.value === this.lang)[0]
    if (this.$auth.user().usercfg) {
      this.usercfg = JSON.parse(this.$auth.user().usercfg)
    }
    this.applytheme(this.usercfg.theme)
    this.applydarkmode()
    this.getMyPermissions({
      role: ''
    })
      .then(res => {
        this.MyRoleList = res.roles
        this.routearr = res.modules
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
      })
      .catch(e => {
        console.log(e)
      })
  },

  methods: {
    ...mapActions('zero', ['getMyPermissions']),
    setlanguage(lang) {
      this.lang = lang
    },
    setthemecolor(color) {
      this.usercfg.theme = color
      this.applytheme(color)
      this.$router.app.$http
        .post('/zero/setMyUsercfg/', {
          usercfg: JSON.stringify(this.usercfg)
        })
        .then(res => {})
    },
    applytheme(color) {
      this.$zglobal.colors[color].forEach(item => {
        colors.setBrand(item.name, item.value)
      })
    },
    applydarkmode() {
      this.$q.dark.set(this.usercfg.dark)
      this.$q.dark.toggle()
    },
    setRole(val) {
      if (val.name !== this.currectRole.name) {
        this.getMyPermissions({ role: val.name })
        if (this.$router.currentRoute.name !== 'dashboard') {
          this.$router.push('dashboard')
        }
      }
    }
  }
}
</script>
<style>
.q-item__section--avatar {
  min-width: 42px;
}
</style>
