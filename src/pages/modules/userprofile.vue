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
          v-model.trim="data.no"
          color="orange"
          :label="this.$t('auth.users.profile.no')"
          :error="$v.data.no.$error"
          :error-message="this.$t('auth.users.profile.noerror')"
          @blur="$v.data.no.$touch"
        />
        <q-input
          v-model.trim="data.nickname"
          color="orange"
          :label="this.$t('auth.users.profile.nickname')"
        />
        <q-select
          v-model.trim="data.sex"
          color="orange"
          :options="data.sexoptions"
          :label="this.$t('auth.users.profile.sex')"
          emit-value
          map-options
        />
        <q-input
          v-model.trim="data.position"
          color="orange"
          :label="this.$t('auth.users.profile.position')"
        />
        <q-input
          v-model.trim="data.title"
          color="orange"
          :label="this.$t('auth.users.profile.title')"
        />
        <q-input
          v-model.trim="data.jobs"
          color="orange"
          :label="this.$t('auth.users.profile.jobs')"
        />
        <q-input
          v-model.trim="data.unitid"
          color="orange"
          :label="this.$t('auth.users.profile.department')"
        />
        <q-input
          v-model.trim="data.phone"
          color="orange"
          mask="### - #### ####"
          hint="Mask:### - ### - #### ####"
          :label="this.$t('auth.users.profile.phone1')"
        />
        <q-input
          v-model.trim="data.tel"
          type="text"
          color="orange"
          :label="this.$t('auth.users.profile.phone2')"
        />
        <q-input
          v-model.trim="data.birth"
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
                  v-model.trim="data.birth"
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
          v-model.trim="data.address"
          color="orange"
          :label="this.$t('auth.users.profile.address')"
        />
        <q-input
          v-model.trim="data.memo"
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
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
        no: null,
        nickname: null,
        sex: null,
        position: null,
        title: null,
        jobs: null,
        unitid: null,
        phone: null,
        tel: null,
        birth: null,
        address: null,
        memo: null,
        sexoptions: [
          { label: this.$t('auth.users.profile.male'), value: 'm' },
          { label: this.$t('auth.users.profile.female'), value: 'f' }
        ]
      },
      loading: false
    }
  },
  loading: false,
  created() {
    this.$router.app.$http
      .get('/profile/getMyProfile/')
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.data)
          res.data.data.sexoptions = this.data.sexoptions //将性别赋过去
          this.data = res.data.data
        } else {
          this.$zglobal.showMessage(
            'red-5',
            'center',
            this.$t('auth.register.invalid_data')
          )
        }
      })
      .catch(e => {})
  },
  methods: {
    changeprofile() {
      this.data.id = this.$auth.user().id
      this.$v.data.$touch()
      if (!this.$v.data.$error) {
        this.loading = true
        this.$router.app.$http
          .post('/profile/', this.data)
          .then(res => {
            this.loading = false
            this.$zglobal.showMessage(
              'positive',
              'center',
              this.$t('auth.users.profile.success')
            )
          })
          .catch(error => {
            this.loading = false
            if (error.response) {
              this.$zglobal.showMessage(
                'red-5',
                'center',
                this.$t('auth.register.invalid_data')
              )
            } else {
              this.loading = false
              this.$zglobal.showMessage(
                'red-5',
                'center',
                this.$t('auth.register.invalid_data')
              )
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
      no: {
        required
      }
    }
  }
}
</script>

<style scoped></style>
