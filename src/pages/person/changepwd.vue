<template>
  <q-page class="flex flex-center">
    <!-- content -->
    <q-card square style="width: 400px; padding:50px">
      <q-card-section>
        <div class="row text-h6 no-wrap text-bold" style="color: #9c27b0">
          {{ $t('auth.password.change.header') }}
          <q-space />
          <q-icon
            color="teal"
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            :title="this.$t('auth.password.change.showpwd')"
            @click="isPwd = !isPwd"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model.trim="data.data.currentpwd"
          color="purple"
          :label="this.$t('auth.password.change.currentpwd')"
          :type="isPwd ? 'password' : 'text'"
          :error="$v.data.data.currentpwd.$error"
          :error-message="this.$t('auth.errors.password_length')"
          @blur="$v.data.data.currentpwd.$touch"
        />
        <q-input
          v-model.trim="data.data.password"
          color="purple"
          :type="isPwd ? 'password' : 'text'"
          :label="this.$t('auth.password.change.newpwd')"
          :error="$v.data.data.password.$error"
          :error-message="this.$t('auth.errors.password_length')"
          @blur="$v.data.data.password.$touch"
        />

        <q-input
          v-model.trim="data.data.password_confirmation"
          color="purple"
          :type="isPwd ? 'password' : 'text'"
          :label="this.$t('auth.register.repeat_password')"
          :error="$v.data.data.password_confirmation.$error"
          :error-message="this.$t('auth.errors.password_match')"
          @blur="$v.data.data.password_confirmation.$touch"
        />
      </q-card-section>
      <q-card-actions align="center">
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn color="secondary" icon="save" @click="changepwd()">
          &nbsp; {{ $t('auth.logout.confirm') }}
        </q-btn>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <q-btn color="warning" icon-right="cancel" to="user">
          {{ $t('auth.register.cencel') }} &nbsp;
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
  name: 'Changepwd',
  components: {},
  data() {
    return {
      isPwd: true,
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
