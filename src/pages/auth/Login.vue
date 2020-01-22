<template>
  <q-page class="flex flex-center">
    <q-card square style="width: 400px; padding:50px">
      <q-card-section>
        <div class="text-h6">
          {{ $auth.check() }}
          {{ $auth.user().email }}
          {{ $t('auth.login.login') }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          id="email"
          v-model.trim="data.data.username"
          type="email"
          :label="this.$t('auth.login.email')"
          :error="this.$v.data.data.username.$error"
          required
          autofocus
        />
        <q-input
          id="password"
          v-model="data.data.password"
          type="password"
          :label="this.$t('auth.login.password')"
          :error="$v.data.data.password.$error"
          required
          @keyup.enter="login"
        /><br />
        <q-checkbox
          id="rememberMe"
          v-model="data.rememberMe"
          :label="this.$t('auth.login.remember_me')"
        />
      </q-card-section>
      <q-card-actions>
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn color="primary" @click="login">
          {{ $t('auth.login.login') }}
        </q-btn>
      </q-card-actions>
      <q-card-actions>
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn color="primary" @click="login">
          {{ $t('auth.login.login') }}
        </q-btn>
      </q-card-actions>
      <router-link to="/password/forgot">
        <a>{{ this.$t('auth.login.password_forgot') }}</a>
      </router-link>
    </q-card>
  </q-page>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'
// import qs from 'qs'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
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
  methods: {
    login() {
      this.$v.data.$touch()
      if (!this.$v.data.$error) {
        this.loading = true
        this.$auth
          .login(this.data)
          .then(response => {
            console.log(this.$auth.token())
            console.log(response)
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
