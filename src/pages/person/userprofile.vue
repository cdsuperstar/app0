<template>
  <q-page class="flex flex-center">
    <!-- content -->
    <q-card square style="width: 400px; padding:50px">
      <q-card-section>
        <div class="row text-h6 no-wrap text-bold" style="color: #b05b27">
          {{ $t('auth.users.profile.header') }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model.trim="data.data.nickname"
          color="orange"
          :label="this.$t('auth.users.profile.nickname')"
          :error="$v.data.data.nickname.$error"
          :error-message="this.$t('auth.users.profile.nicknameerror')"
          @blur="$v.data.data.nickname.$touch"
        />
        <!--        <q-input-->
        <!--                v-model.trim="data.data.sex"-->
        <!--          color="orange"-->
        <!--          :label="this.$t('auth.users.profile.sex')"-->
        <!--        />-->
        <q-select
          v-model.trim="data.data.sex"
          color="orange"
          :options="data.sexoptions"
          :label="this.$t('auth.users.profile.sex')"
        />
        <q-input
          v-model.trim="data.data.position"
          color="orange"
          :label="this.$t('auth.users.profile.position')"
        />
        <q-input
          v-model.trim="data.data.title"
          color="orange"
          :label="this.$t('auth.users.profile.title')"
        />
        <q-input
          v-model.trim="data.data.jobs"
          color="orange"
          :label="this.$t('auth.users.profile.jobs')"
        />
        <q-input
          v-model.trim="data.data.unitid"
          color="orange"
          :label="this.$t('auth.users.profile.department')"
        />
        <q-input
          v-model.trim="data.data.phone"
          color="orange"
          mask="### - #### ####"
          hint="Mask:### - ### - #### ####"
          :label="this.$t('auth.users.profile.phone1')"
        />
        <q-input
          v-model.trim="data.data.tel"
          type="number"
          color="orange"
          :label="this.$t('auth.users.profile.phone2')"
        />
        <!--        <q-input-->
        <!--          v-model.trim="data.data.birthday"-->
        <!--          type="date"-->
        <!--          color="orange"-->
        <!--          mask="####-##-##"-->
        <!--          :label="this.$t('auth.users.profile.birthday')"-->
        <!--        />-->

        <q-input
          v-model.trim="data.data.birth"
          color="orange"
          mask="date"
          :rules="['date']"
          :label="this.$t('auth.users.profile.birthday')"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model.trim="data.data.birth"
                  color="orange"
                  text-color="black"
                  first-day-of-week="1"
                  @input="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          v-model.trim="data.data.address"
          color="orange"
          :label="this.$t('auth.users.profile.address')"
        />
        <q-input
          v-model.trim="data.data.memo"
          type="textarea"
          color="orange"
          :label="this.$t('auth.users.profile.remark')"
        />
      </q-card-section>
      <q-card-actions align="center">
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn color="secondary" icon="save" @click="changeprofile()">
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
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'userprofile.vue',
  data() {
    return {
      data: {
        data: {
          nickname: ''
        },
        sexoptions: [
          {
            label: '男',
            value: '男'
          },
          {
            label: '女',
            value: '女'
          }
        ]
      },
      loading: false
    }
  },

  loading: false,
  methods: {
    changeprofile() {
      this.$v.data.$touch()
      if (!this.$v.data.$error) {
        this.loading = true
        this.$profile(this.data)
          .then(response => {
            this.$q.notify({
              message: this.$t('auth.register.account_created'),
              color: 'purple-4',
              textColor: 'white',
              position: 'center',
              timeout: 2500,
              actions: [{ icon: 'close', color: 'white' }]
            })
          })
          .catch(error => {
            if (error.response) {
              if (error.response.status === 422) {
                for (var key in error.response.data.error) {
                  switch (error.response.data.error[key][0]) {
                    case 'The email has already been taken.':
                      this.$q.notify({
                        message: this.$t('auth.register.already_registered'),
                        color: 'red-5',
                        textColor: 'white',
                        position: 'center',
                        timeout: 2500,
                        actions: [{ icon: 'close', color: 'white' }]
                      })
                      break
                    default:
                  }
                }
              } else {
                this.$q.notify({
                  message: this.$t('auth.register.invalid_data'),
                  color: 'red-5',
                  textColor: 'white',
                  position: 'center',
                  timeout: 2500,
                  actions: [{ icon: 'close', color: 'white' }]
                })
              }
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
      console.log(this.$t)
    }
  },
  validations: {
    data: {
      data: {
        nickname: {
          required
        }
      }
    }
  }
}
</script>

<style scoped></style>
