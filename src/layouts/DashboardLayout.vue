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
        <!-- 角色选择--->
        <q-btn-dropdown
          stretch
          flat
          :label="
            this.currectRole === null
              ? this.$t('roles.rolelist')
              : this.ZPermissions.currectrole.title
          "
          :title="this.$t('roles.rolelistheader')"
        >
          <q-list>
            <q-item
              v-for="ro in MyRoleList"
              v-close-popup
              clickable
              :key="ro.id"
              @click="setRole(ro)"
            >
              <q-item-section>
                <q-item-label>{{ ro.title }}</q-item-label>
              </q-item-section>
              <q-item-section
                avatar
                v-if="ro.name == ZPermissions.currectrole.name"
              >
                <q-icon name="person" size="25px" color="primary" />
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
              <q-item-section avatar>
                <q-icon color="primary" size="30px" name="directions" />
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
              <q-item-section avatar>
                <q-icon color="primary" size="30px" name="directions" />
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
      MyRoleList: null,
      currectRole: null,
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
    this.getMyPermissions({
      role: ''
    })
      .then(res => {
        this.MyRoleList = res.roles
        this.currectRole = res.currectrole
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
      // console.log(lang)
      this.lang = lang
    },
    setRole(val) {
      this.getMyPermissions({ role: val.name })
    }
  }
}
</script>
