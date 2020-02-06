<template>
  <q-page class="flex flex-center">
    <!-- content -->
    <q-card square style="width: 400px; padding:50px">
      <q-card-section>
        <div class="row text-h6 no-wrap">
          {{ $t('auth.password.change.header') }}
          <q-space />
          <q-icon
            color="teal"
            name="remove_red_eye"
            class="cursor-pointer"
            :title="this.$t('auth.password.change.showpwd')"
            @click="changeType()"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model.trim="data.data.currentpwd"
          :label="this.$t('auth.password.change.currentpwd')"
          :type="data.data.pwdType"
          :error="$v.data.data.currentpwd.$error"
          :error-message="this.$t('auth.errors.password_length')"
          @blur="$v.data.data.currentpwd.$touch"
        />
        <q-input
          v-model.trim="data.data.password"
          :type="data.data.pwdType"
          :label="this.$t('auth.password.change.newpwd')"
          :error="$v.data.data.password.$error"
          :error-message="this.$t('auth.errors.password_length')"
          @blur="$v.data.data.password.$touch"
        />

        <q-input
          v-model.trim="data.data.password_confirmation"
          :type="data.data.pwdType"
          :label="this.$t('auth.register.repeat_password')"
          :error="$v.data.data.password_confirmation.$error"
          :error-message="this.$t('auth.errors.password_match')"
          @blur="$v.data.data.password_confirmation.$touch"
        />
      </q-card-section>
      <q-card-actions align="center">
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn color="primary" @click="changepwd()">
          {{ $t('auth.logout.confirm') }}
        </q-btn>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <q-btn color="primary" to="user">
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      data: {
        data: {
          currentpwd: '',
          password: '',
          pwdType: 'password',
          password_confirmation: ''
        }
      },
      loading: false
    }
  },
  methods: {
    changepwd() {
      this.data.data.username = this.data.data.email
      this.$v.data.$touch()
      if (!this.$v.data.$error) {
        this.loading = true
        this.$auth
          .changepwd(this.data)
          .then(response => {
            this.$q.notify({
              message: this.$t('auth.register.invalid_data'),
              color: 'purple-4',
              textColor: 'white',
              position: 'center',
              timeout: 2500,
              actions: [{ icon: 'close', color: 'white' }]
            })
          })
          .catch(error => {
            if (error.response) {
              this.$q.notify({
                message: this.$t('auth.register.invalid_data'),
                color: 'red-5',
                textColor: 'white',
                position: 'center',
                timeout: 2500,
                actions: [{ icon: 'close', color: 'white' }]
              })
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    changeType() {
      this.data.data.pwdType =
        this.data.data.pwdType === 'password' ? 'text' : 'password'
    }
  },
  validations: {
    data: {
      data: {
        currentpwd: {
          minLength: minLength(8),
          required
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

<style scoped></style>
