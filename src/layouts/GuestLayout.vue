<template>
  <q-layout view="hHh lpR lff">
    <q-header reveal class="bg-blue-7">
      <q-toolbar style="height: 60px;">
        <!--        <q-btn flat round dense icon="menu" @click="left = !left" />-->
        <q-toolbar-title class="row col-6">
          <q-img
            src="../statics/app-logo.jpg"
            spinner-color="white"
            style="height: 38px; max-width: 38px"
            class="cursor-pointer"
            @click="left = !left"
          />&nbsp;
          <img
            v-if="$q.screen.gt.xs"
            src="../statics/webimages/cpname.png"
            style="height:30px;max-width: 550px;margin-top: 5px;"
          />
          <!--          <div v-if="$q.screen.gt.xs" style="margin-top: 5px;">-->
          <!--            &nbsp;&nbsp;<font face="黑体">{{ $t('webtxt.companyname') }}</font>-->
          <!--          </div>-->
        </q-toolbar-title>
        <q-space />
        <q-btn
          v-if="$q.screen.gt.xs"
          v-ripple
          stretch
          flat
          to="/"
          :label="$t('webtxt.profile')"
        />
        <q-btn
          v-if="$q.screen.gt.xs"
          v-ripple
          stretch
          flat
          to="/product"
          :label="$t('webtxt.product')"
        />
        <q-btn
          v-if="$q.screen.gt.xs"
          v-ripple
          stretch
          flat
          to="/service"
          :label="$t('webtxt.service')"
        />
        <q-btn
          v-if="$q.screen.gt.xs"
          v-ripple
          stretch
          flat
          to="/case"
          :label="$t('webtxt.case')"
        />
        <q-btn
          v-if="$q.screen.gt.xs"
          v-ripple
          stretch
          flat
          to="/about"
          :label="$t('webtxt.about')"
        />

        <q-space />
        <div style="cursor: pointer;" @click="setlanguage('zh-hans')">简</div>
        <div class="text-grey-1">&nbsp;/&nbsp;</div>
        <div style="cursor: pointer;" @click="setlanguage('en-us')">EN</div>
        &nbsp;&nbsp;&nbsp;&nbsp;
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="left"
      v-touch-swipe.mouse.left="handleleftSwipe"
      overlay
      show-if-above
      side="left"
      behavior="desktop"
      :width="leftdrawer"
    >
      <!-- drawer content -->
      <div class="row absolute-top bg-brown-2" style="height: 60px;">
        <q-input
          v-model="searchcontenet"
          dark
          borderless
          input-class="text-left"
          class="q-ml-xs"
          :label="$t('webtxt.search')"
        >
          <template v-slot:append>
            <q-icon name="search" class="cursor-pointer" @click="searchtxt" />
          </template>
        </q-input>
      </div>
      <div class="scroll" style="margin-top: 60px;">
        <q-list link class="rounded-borders">
          <q-item v-ripple clickable to="/">
            <q-item-section avatar class="text-weight-bold">
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>{{ $t('webtxt.profile') }}</q-item-section>
          </q-item>
          <q-separator />
          <q-item v-ripple clickable to="/product">
            <q-item-section avatar class="text-weight-bold">
              <q-icon name="dns" />
            </q-item-section>
            <q-item-section>{{ $t('webtxt.product') }}</q-item-section>
          </q-item>
          <q-separator />
          <q-item v-ripple clickable to="/service">
            <q-item-section avatar class="text-weight-bold">
              <q-icon name="card_travel" />
            </q-item-section>
            <q-item-section>{{ $t('webtxt.service') }}</q-item-section>
          </q-item>
          <q-separator />
          <q-item v-ripple clickable to="/case">
            <q-item-section avatar class="text-weight-bold">
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>{{ $t('webtxt.case') }}</q-item-section>
          </q-item>
          <q-separator />
          <q-item v-ripple clickable to="/about">
            <q-item-section avatar class="text-weight-bold">
              <q-icon name="share" />
            </q-item-section>
            <q-item-section>{{ $t('webtxt.about') }}</q-item-section>
          </q-item>
          <q-separator />
          <q-item v-ripple clickable @click="handleleftSwipe">
            <q-item-section avatar class="text-weight-bold">
              <q-icon name="call_missed" />
            </q-item-section>
            <q-item-section>关闭菜单</q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="background-img text-white">
      <q-list class="col-6">
        <q-item>
          <q-item-section>
            <div class="row" style="margin-left:5%; ">
              <font size="4">关注我们</font>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="#">
                <div class="icon-avi">
                  <img src="../statics/share/qq.png" height="24" />
                </div>
              </a>
              &nbsp;&nbsp;
              <a href="#">
                <div class="icon-avi">
                  <img src="../statics/share/icon_wechat.png" height="24" />
                </div>
              </a>
              &nbsp;&nbsp;
              <a href="#">
                <div class="icon-avi">
                  <img src="../statics/share/sinaweibo.png" height="24" />
                </div>
              </a>
            </div>
          </q-item-section>
        </q-item>
        <q-item
          style="border-top: 1px solid rgba(229,229,229,0.75);width:90%;margin-left:5%; "
        >
          <q-item-section class="text-center">
            Copyright © 2020 - 2050 All Rights Reserved.
            成都概率矩阵科技有限公司 版权所有
          </q-item-section>
        </q-item>
      </q-list>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      searchcontenet: '',
      left: false,
      leftdrawer: 210,
      lang: this.$i18n.locale
    }
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang
      // set quasar's language too!!
      import(`quasar/lang/${lang}`).then(language => {
        this.$q.lang.set(language.default)
      })
    }
  },
  mounted() {
    console.log(this.left, '+++++++++++++++++++')
  },
  methods: {
    setlanguage(lang) {
      this.lang = lang
    },
    // 左滑关闭菜单列表
    handleleftSwipe() {
      this.left = false
    },
    searchtxt() {
      console.log(this.searchcontenet, '++++++')
    }
  }
}
</script>
<style scoped>
.icon-avi {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(1);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
.icon-avi:hover {
  -webkit-filter: grayscale(0%);
}
.background-img {
  background: url(../statics/webimages/footer.jpg) no-repeat;
  background-size: cover;
}
</style>
