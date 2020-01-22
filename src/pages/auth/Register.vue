<template>
  <q-page class="flex flex-center">
    <!-- content -->
    <q-card square style="width: 400px; padding:50px">
      <q-card-section>
        <div class="text-h6">
          {{ $auth.check() }}
          {{ $t('auth.register.register') }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model.trim="data.data.name"
          :label="this.$t('auth.register.name')"
          type="text"
          autofocus
        />
        <q-input
          v-model.trim="data.data.email"
          type="email"
          :label="this.$t('auth.register.email')"
          :error="$v.data.data.email.$error"
          :error-message="this.$t('auth.errors.email')"
          @blur="$v.data.data.email.$touch"
        />
        <q-input
          v-model.trim="data.data.password"
          type="text"
          :label="this.$t('auth.register.password')"
          :error="$v.data.data.password.$error"
          :error-message="this.$t('auth.errors.password_length')"
          @blur="$v.data.data.password.$touch"
        />

        <q-input
          v-model.trim="data.data.password_confirmation"
          type="text"
          :label="this.$t('auth.register.repeat_password')"
          :error="$v.data.data.password_confirmation.$error"
          :error-message="this.$t('auth.errors.password_match')"
          @blur="$v.data.data.password_confirmation.$touch"
        />
      </q-card-section>
      <q-card-actions align="center">
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn color="primary" @click="register">
          {{ $t('auth.register.register') }}
        </q-btn>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <q-btn color="primary" to="guest">
          {{ $t('auth.register.cencel') }}
        </q-btn>
      </q-card-actions>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script>
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      data: {
        data: {
          name: '11',
          email: '1@1.com',
          password: '12345678',
          password_confirmation: '12345678'
        },
        // autoLogin: true,
        rememberMe: false
      },
      loading: false
    }
  },
  methods: {
    register() {
      this.$v.data.$touch()
      if (!this.$v.data.$error) {
        this.loading = true
        console.log(this.data)
        this.$auth
          .register(this.data)
          .then(response => {
            this.$q.notify({
              message: this.$t('auth.register.account_created'),
              color: 'purple-4',
              textColor: 'white',
              position: 'center',
              timeout: 2500,
              actions: [{ icon: 'close', color: 'white' }]
            })
            console.log(response)
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response)
              if (error.response.status === 422) {
                this.$q.notify({
                  message: this.$t('auth.register.invalid_data'),
                  color: 'red-5',
                  textColor: 'white',
                  position: 'center',
                  timeout: 2500,
                  actions: [{ icon: 'close', color: 'white' }]
                })
              } else {
                // console.error(error)
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
        name: {
          required
        },
        email: {
          required,
          email
        },
        password: {
          minLength: minLength(8),
          required
        },
        password_confirmation: {
          sameAsPassword: sameAs('password'),
          required
        }
      }
    }
  }
}
</script>
