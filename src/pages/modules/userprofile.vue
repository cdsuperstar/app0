<template>
  <q-page class="flex flex-center">
    <q-dialog v-model="DaddFiles" seamless>
      <q-item-section style="max-width:300px;max-height: 50vh" class="scroll">
        <q-uploader
          style="max-width: 300px"
          :url="this.$axios.defaults.baseURL + '/zero/uploadMyTmpFiles'"
          method="POST"
          auto-expand
          :filter="checkFileSize"
          :label="this.$t('article.attachment')"
          :headers="[
            {
              name: 'enctype',
              value: 'multipart/form-data'
            },
            { name: 'Authorization', value: 'Bearer ' + this.$auth.token() }
          ]"
          @uploaded="upfilished"
        >
          <template v-slot:list="scope">
            <div class="text-right">
              <q-btn
                flat
                round
                color="primary"
                size="sm"
                icon="close"
                title="关闭此窗口"
                v-close-popup
              />
            </div>
            <q-list separator>
              <q-item v-for="file in scope.files" :key="file.name">
                <q-item-section>
                  <q-item-label class="full-width ellipsis">
                    {{ file.name }}
                  </q-item-label>

                  <q-item-label caption>
                    Status: {{ file.__status }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                  </q-item-label>
                </q-item-section>

                <q-item-section v-if="file.__img" thumbnail class="gt-xs">
                  <img :src="file.__img.src" />
                </q-item-section>

                <q-item-section top side>
                  <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                    @click="scope.removeFile(file)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </q-uploader>
      </q-item-section>
    </q-dialog>
    <!-- content -->
    <q-card square style="width: 400px; padding:50px">
      <q-card-section>
        <div class="row text-h6 no-wrap text-bold" style="color: #b05b27">
          {{ $t('auth.users.profile.header') }}
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-center">
          <q-avatar size="100px">
            <img :src="data.avatar" />
          </q-avatar>
        </div>
        <div class="text-center">
          <q-btn
            flat
            color="secondary"
            icon="image"
            :label="this.$t('auth.users.profile.signpic')"
            @click="uploadFile()"
          />
        </div>
        <q-input
          v-model.trim="data.no"
          color="orange"
          :label="this.$t('auth.users.profile.no')"
          :error="$v.data.no.$error"
          :error-message="this.$t('auth.users.profile.noerror')"
          @blur="$v.data.no.$touch"
        />
        <q-input
          v-model.trim="data.name"
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
                  mask="YYYY-MM-DD"
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
  name: 'UserprofileVue',
  data() {
    return {
      DaddFiles: false,
      data: {
        avatar: null,
        no: null,
        name: null,
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
    this.data.id = this.$auth.user().id
    this.getmyprofile()
  },
  methods: {
    getmyprofile() {
      this.$router.app.$http
        .get('/profile/getMyProfile/')
        .then(res => {
          if (res.data.success) {
            // 将性别赋过去
            res.data.data.sexoptions = this.data.sexoptions
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
    changeprofile() {
      this.data.id = this.$auth.user().id
      if (!this.data.birth) this.data.birth = '1996-06-06'
      // 用户头像
      // console.log(this.data)
      // var formData = new FormData()
      // for (const key in this.data) {
      //   formData.append(key, this.data[key])
      // }
      // formData.append('avatar', this.$refs.fileuper.files[0])
      // 用户头像结束
      this.$v.data.$touch()
      if (!this.$v.data.$error) {
        this.loading = true
        // console.log('formData:', formData)
        this.$router.app.$http
          .post('/profile/updateMyProfile/', this.data)
          .then(res => {
            console.log(res)
            if (res.data.success === true) {
              this.loading = false
              this.$zglobal.showMessage(
                'positive',
                'center',
                this.$t('auth.users.profile.success')
              )
              this.getmyprofile()
            } else {
              this.loading = false
              this.$zglobal.showMessage(
                'red-5',
                'center',
                this.$t('auth.register.invalid_data') + ':' + res.data.code
              )
            }
          })
        this.loading = false
      }
    },
    // 文件上传
    checkFileSize(files) {
      return files.filter(file => file.size < 20480000)
    },
    uploadFile() {
      this.DaddFiles = true
      this.data.files = []
    },
    upfilished(info) {
      console.log(info)
      this.data.files.push(info.files[0].name)
      this.DaddFiles = false
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
