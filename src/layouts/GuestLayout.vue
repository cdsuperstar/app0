<template>
  <q-layout view="lHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="row">
          <q-avatar>
            <img src="../statics/app-logo.jpg" />
          </q-avatar>
          <div style="margin-top: 5px;">
            &nbsp;&nbsp;{{ $t('system.name') }}
          </div>
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="home"
          class="text-white"
          to="/login"
          :title="this.$t('buttons.home')"
        />
        <q-btn-dropdown
          stretch
          flat
          dense
          :label="
            lang.label === undefined ? this.$t('langs.header') : lang.label
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
              :key="n.value"
              v-close-popup
              clickable
              style="text-align:left;border-bottom: 1px dashed #d6d6d6;padding: 6px;"
              :class="lang.value === n.value ? 'text-primary' : 'text-grey-7'"
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
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!--    <q-footer bordered class="bg-white text-black">-->
    <!--      <q-toolbar>-->
    <!--        <q-toolbar-title>-->
    <!--          <q-avatar>-->
    <!--            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />-->
    <!--          </q-avatar>-->
    <!--          Title-->
    <!--        </q-toolbar-title>-->
    <!--      </q-toolbar>-->
    <!--    </q-footer>-->
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      langs: [
        {
          label: 'CN',
          value: 'zh-hans'
        },
        {
          label: 'EN',
          value: 'en-us'
        }
      ],
      lang: this.$i18n.locale
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
    this.lang = this.langs.filter(lan => lan.value === this.lang)[0]
  },
  methods: {
    setlanguage(lang) {
      this.lang = lang
    }
  }
}
</script>
