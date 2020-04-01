<template>
  <q-page class="flex flex-center">
    <q-card
      square
      :flat="!$q.screen.gt.xs ? true : false"
      style="width: 400px; padding:50px"
    >
      <q-card-section>
        <div class="row text-h6 text-primary text-weight-bold no-wrap">
          {{ $t('auth.login.login') }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          id="email"
          v-model.trim="data.data.username"
          type="email"
          required
          autofocus
          :label="this.$t('auth.login.email')"
          :error="this.$v.data.data.username.$error"
          :error-message="this.$t('auth.errors.email')"
          @blur="$v.data.data.username.$touch"
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
        <q-checkbox
          id="rememberMe"
          v-model="data.rememberMe"
          :label="this.$t('auth.login.remember_me')"
        />
      </q-card-section>
      <q-card-actions align="center">
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn
          type="submit"
          color="secondary"
          icon-right="input"
          :loading="submitting"
          @click="login"
        >
          {{ $t('auth.login.login') }}&nbsp;&nbsp;
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
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
  </q-page>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      submitting: false,
      isPwd: true,
      data: {
        data: {
          username: '',
          password: ''
        },
        rememberMe: false
      },
      loading: false
    }
  },
  created() {
    // 加入初始记住的用户信息
    if (this.$q.localStorage.getItem('rememberMe')) {
      this.data.data.username = this.$q.localStorage.getItem('username')
      this.data.data.password = this.$q.localStorage.getItem('password')
      this.data.rememberMe = this.$q.localStorage.getItem('rememberMe')
    }
  },
  methods: {
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
