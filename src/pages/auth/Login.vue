<template>
  <q-page class="flex flex-center">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="secondary"
      navigation-icon="radio_button_unchecked"
      navigation
      padding
      infinite
      height="550px"
    >
      <q-carousel-slide name="login" class="column no-wrap flex-center">
        <q-card
          square
          :flat="!$q.screen.gt.xs ? true : false"
          :style="
            !$q.screen.gt.xs
              ? 'width: 360px; padding: 0px 30px 0px 30px;'
              : 'width: 360px; padding: 30px;'
          "
        >
          <q-card-section>
            <div class="row text-h6 text-primary text-weight-bold no-wrap">
              <q-icon
                name="stop"
                :class="$auth.check() ? 'text-secondary' : 'text-warning'"
                style="font-size: 32px;"
              />
              {{ $t('auth.login.login') }}
            </div>
          </q-card-section>

          <q-card-section>
            <q-input
              id="email"
              v-model.trim="data.data.username"
              type="email"
              required
              :label="this.$t('auth.login.email')"
              :error="this.$v.data.data.username.$error"
              :error-message="this.$t('auth.errors.email')"
              @blur="usernameblur"
            />
            <q-input
              id="password"
              v-model="data.data.password"
              required
              :type="isPwd ? 'password' : 'text'"
              :label="this.$t('auth.login.password')"
              :error="$v.data.data.password.$error"
              :error-message="this.$t('auth.errors.password')"
              @blur="$v.data.data.password.$touch"
            >
              <template v-slot:append>
                <q-icon
                  color="accent"
                  class="cursor-pointer"
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="q-ml-ma row">
              <q-checkbox
                id="rememberMe"
                v-model="data.rememberMe"
                :label="this.$t('auth.login.remember_me')"
              />
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              type="submit"
              color="primary"
              icon-right="input"
              @click="login"
            >
              &nbsp;&nbsp;{{ $t('auth.login.login') }} &nbsp;&nbsp;
              <!--        <q-btn-->
              <!--          type="submit"-->
              <!--          color="secondary"-->
              <!--          icon-right="input"-->
              <!--          :loading="submitting"-->
              <!--          @click="login"-->
              <!--        >-->
              <!--          {{ $t('auth.login.login') }}&nbsp;&nbsp;-->
              <!--          <template v-slot:loading>-->
              <!--            <q-spinner-facebook />-->
              <!--          </template>-->
            </q-btn>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <q-btn color="warning" icon-right="how_to_reg" to="register">
              &nbsp;&nbsp;{{ $t('auth.register.register') }} &nbsp;&nbsp;
            </q-btn>
          </q-card-actions>
          <q-inner-loading :showing="loading">
            <q-spinner-gears size="50px" color="secondary" />
          </q-inner-loading>
          <div align="right">
            <br />
            <router-link to="/forgot">
              <a>{{ this.$t('auth.login.password_forgot') }}</a>
            </router-link>
          </div>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="offline" class="column no-wrap flex-center">
        <q-card
          square
          :flat="!$q.screen.gt.xs ? true : false"
          :style="
            !$q.screen.gt.xs
              ? 'width: 360px;height:500px; padding: 0px 30px 0px 30px;'
              : 'width: 360px;height:500px; padding: 30px;'
          "
        >
          <q-toolbar style="border-bottom: 1px dashed #ebebeb;">
            <q-toolbar-title>
              <span class="text-subtitle1 text-weight-bold"> 离线应用</span>
            </q-toolbar-title>
          </q-toolbar>
          <q-card-section
            class="row items-start"
            style="
              min-height: 60px;
              max-height: 335px;
              padding: 3px;
              overflow-y: auto;
            "
          >
            <q-card
              flat
              class="col-4"
              style="cursor: pointer;margin-left: 5px;"
              @click="linktoURL('#/p2s1questionnaire')"
            >
              <q-card-section horizontal align="center">
                <q-list padding>
                  <q-item-section
                    class="rounded-borders bg-secondary"
                    style="width: 4rem; height: 4rem;"
                  >
                    <q-icon
                      name="queue"
                      color="white"
                      style="font-size: 3rem; padding: 5px;margin-left: 5px;"
                    ></q-icon>
                  </q-item-section>
                  <q-item-section style="margin-left: 1px; font-size: 1em;">
                    发起问卷
                  </q-item-section>
                </q-list>
              </q-card-section>
            </q-card>
            <q-card
              flat
              class="col-4"
              style="cursor: pointer;"
              @click="linktoURL('#/p2s1localquestionnaire')"
            >
              <q-card-section horizontal align="center">
                <q-list padding>
                  <q-item-section
                    class="rounded-borders bg-primary"
                    style="width: 4rem; height: 4rem;"
                  >
                    <q-icon
                      name="format_list_bulleted"
                      color="white"
                      style="font-size: 3rem; padding: 5px;margin-left: 5px;"
                    ></q-icon>
                  </q-item-section>
                  <q-item-section style="margin-left: 1px; font-size: 1em;">
                    本地问卷
                  </q-item-section>
                </q-list>
              </q-card-section>
            </q-card>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      slide: 'login',
      tmpr: null,
      DeviceReady: false,
      submitting: false,
      isPwd: true,
      data: {
        data: {
          username: '',
          password: ''
        },
        rememberMe: false,
        offlinelogin: false
      },
      loading: false
    }
  },
  created() {
    this.tmpr = JSON.stringify(this.$q.localStorage.getItem('ZPermissions'))
    // 加入初始记住的用户信息
    if (this.$q.localStorage.getItem('rememberMe')) {
      this.data.data.username = this.$q.localStorage.getItem('username')
      this.data.data.password = this.$q.localStorage.getItem('password')
      this.data.rememberMe = this.$q.localStorage.getItem('rememberMe')
    }
  },
  methods: {
    usernameblur() {
      this.$q.localStorage.set('username', this.data.data.username)
      this.$q.localStorage.set('rememberMe', true)
    },
    login() {
      this.submitting = true
      this.$v.data.$touch()
      if (!this.$v.data.$error) {
        this.loading = true
        this.$auth
          .login(this.data)
          .then(response => {
            if (this.data.rememberMe) {
              this.$q.localStorage.set('username', this.data.data.username)
              this.$q.localStorage.set('password', this.data.data.password)
            }
            this.$q.localStorage.set('rememberMe', this.data.rememberMe)
          })
          .catch(error => {
            if (error.response) {
              if (error.response.status === 401) {
                this.$q.dialog({
                  message: this.$t('auth.login.verification_required')
                })
              } else if (error.response.status === 403) {
                this.$q.dialog({
                  message: this.$t('auth.login.invalid_credentials')
                })
              } else if (error.response.status === 400) {
                this.$q.dialog({
                  message: this.$t('auth.login.invalid_credentials')
                })
              } else {
                console.error(error)
              }
            }
          })
          .finally(() => {
            this.submitting = false
            this.loading = false
          })
      }
    },
    linktoURL(url) {
      location.href = url
    }
  },
  validations: {
    data: {
      data: {
        username: {
          required,
          email
        },
        password: {
          required
        }
      }
    }
  }
}
</script>
