<template>
  <q-page class="q-pa-xs">
    <q-card flat>
      <q-card-section>
        <p
          class="text-bold"
          align="center"
          style="margin-bottom: 0.5em; color: var(--q-color-positive);"
        >
          <font size="4">2019 年贫困县退出专项评估检查</font><br />
          <font size="3" style="text-indent: 3em;"
            >（建档立卡脱贫户调查问卷）</font
          >
        </p>
        <p style="text-indent: 2em;">
          您好！我们是西藏自治区 2019 年贫困县退出专项评估检查的调查员。
          您家是我们选取的抽样农户，现需要访谈了解您家庭生产、生活及有关情况。希望您如实提供信息，我们将遵守规定对您所提供的信息严格保密。谢谢您的理解与配合！
          <a class="text-weight-bold text-overline text-deep-orange">{{
            username
          }}</a>
        </p>
      </q-card-section>
    </q-card>

    <div class="q-ma-sm row items-start q-gutter-md">
      <q-icon name="map" class="text-warning" size="sm" />
      <q-input
        v-model="vote.longitude"
        dense
        disable
        type="text"
        label="经度"
        style="max-width: 8em;"
      />
      <q-input
        v-model="vote.latitude"
        dense
        disable
        type="text"
        label="纬度"
        style="max-width: 8em;"
      />
    </div>
    <div
      :class="
        $q.screen.gt.xs
          ? 'q-ma-sm row items-start q-gutter-md'
          : 'q-ma-sm q-mr-sm q-gutter-md'
      "
    >
      <q-select
        v-model="vote.province"
        dense
        standout="bg-secondary text-white"
        label="省"
        style="min-width: 10em;"
        emit-value
        :options="addressoptions"
      />
      <q-select
        v-model="vote.city"
        dense
        standout="bg-secondary text-white"
        label="市"
        style="min-width: 10em;"
        emit-value
        :options="cityArray"
      />
      <q-select
        v-model="vote.county"
        dense
        standout="bg-secondary text-white"
        label="区（县）"
        emit-value
        style="min-width: 10em;"
        :options="countyArray"
      />
      <q-select
        v-model="vote.town"
        dense
        standout="bg-secondary text-white"
        label="镇（乡）"
        emit-value
        style="min-width: 10em;"
        :options="townArray"
      />
    </div>
    <div
      :class="
        $q.screen.gt.xs
          ? 'q-mx-sm row items-start q-gutter-md'
          : 'q-mx-sm q-mr-sm q-gutter-md'
      "
    >
      <q-input v-model="vote.village" type="text" label="行政村（社区）" />
      <q-input v-model="vote.group" type="text" label="自然村（组）" />
      <q-select
        v-model="vote.villagetype"
        label="行政村属性"
        style="min-width: 10em;"
        :options="['农区', '牧区', '半农半牧区']"
      />
    </div>
    <div
      :class="
        $q.screen.gt.xs
          ? 'q-mx-sm row items-start q-gutter-md'
          : 'q-mx-sm q-mr-sm q-gutter-md'
      "
    >
      <q-input v-model="vote.investigator1" type="text" label="调查员1姓名" />
      <q-input
        v-model="vote.investigatortel1"
        type="text"
        label="调查员1联系方式"
        mask="### - #### ####"
      />
      <q-input v-model="vote.investigator2" type="text" label="调查员2姓名" />
      <q-input
        v-model="vote.investigatortel2"
        type="text"
        label="调查员2联系方式"
        mask="### - #### ####"
      />
    </div>
    <div class="q-mx-ma">
      <dl>
        <dt class="text-h6 row no-wrap items-center">
          <div class="doc-card-title">A. 受访者信息</div>
        </dt>
        <dd
          :class="
            $q.screen.gt.xs ? 'text-body1 row q-mx-ma' : 'text-body1 q-mx-sm'
          "
        >
          <div style="padding-top: 10px;">A1. 被访者姓名？</div>
          <q-input v-model="vote.a1name" type="text" dense />
          <div style="padding-top: 10px;">与户主关系？</div>
          <q-select
            v-model="vote.a1renation"
            use-input
            use-chips
            dense
            new-value-mode="add-unique"
            behavior="menu"
            style="min-width: 12em;"
            :options="[
              '本人',
              '配偶',
              '子女',
              '父母',
              '兄弟',
              '姊妹',
              '爷孙',
              '其他'
            ]"
          ></q-select>
          <div style="padding-top: 10px;">联系方式：</div>
          <q-input v-model="vote.a1tel" type="text" dense />
        </dd>
        <dd
          :class="
            $q.screen.gt.xs ? 'text-body1 row q-mx-ma' : 'text-body1 q-mx-sm'
          "
        >
          <div style="padding-top: 10px;">A2. 被访者文化程度？</div>
          <q-select
            v-model="vote.a2"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="[
              '小学及以下',
              '初中',
              '高中',
              '职校、中专',
              '大专及以上'
            ]"
          ></q-select>
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-title">B. 户主基本情况</div>
        </dt>
        <dd
          :class="
            $q.screen.gt.xs ? 'text-body1 row q-mx-ma' : 'text-body1 q-mx-sm'
          "
        >
          <div style="padding-top: 10px;">B1. 户主姓名：</div>
          <q-input v-model="vote.b1" type="text" dense />
          <div style="padding-top: 10px;">B2. 户主性别：</div>
          <q-select
            v-model="vote.b2"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['男', '女']"
          ></q-select>
          <div style="padding-top: 10px;">B3. 户主民族：</div>
          <q-select
            v-model="vote.b3"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="['汉族', '藏族', '土家族']"
          ></q-select>
        </dd>
        <dd
          :class="
            $q.screen.gt.xs ? 'text-body1 row q-mx-ma' : 'text-body1 q-mx-sm'
          "
        >
          <div style="padding-top: 10px;">B4. 户主文化程度：</div>
          <q-select
            v-model="vote.b4"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '小学及以下',
              '初中',
              '高中',
              '职校、中专',
              '大专及以上'
            ]"
          ></q-select>
          <div style="padding-top: 10px;">B5. 户主身份证号：</div>
          <q-input
            v-model="vote.b5"
            type="text"
            dense
            style="min-width: 15em;"
            mask="X##### ######## ###X X"
          />
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-title">C. 农户家庭基本情况</div>
        </dt>
        <dd
          :class="
            $q.screen.gt.xs ? 'text-body1 row q-mx-ma' : 'text-body1 q-mx-sm'
          "
        >
          <div style="padding-top: 10px;">C1. 建档立卡人口数（人）：</div>
          <q-input
            v-model="vote.c1"
            type="text"
            dense
            style="min-width: 8em;"
            mask="##"
            :rules="[val => val <= 30 || '该项取值范围为0-30 ']"
          />
          <div style="padding-top: 10px;">
            C14.您家哪一年被确定为建档立卡户？
          </div>
          <q-input
            v-model="vote.c14"
            type="text"
            dense
            style="min-width: 8em;"
            mask="####"
            hint="年（4 位数年份）（取值范围为2014-2019）"
            :rules="[
              val => (val >= 2014 && val <= 2019) || '该项取值范围为2014-2019 '
            ]"
          />
        </dd>
        <dd
          :class="
            $q.screen.gt.xs ? 'text-body1 row q-mx-ma' : 'text-body1 q-mx-sm'
          "
        >
          <div style="padding-top: 10px;">
            C17.全家 2019 年领取的低保金是多少？ （元）
          </div>
          <q-input
            v-model="vote.c17"
            type="number"
            dense
            style="min-width: 8em;"
          />
          <div style="padding-top: 10px;">
            C19.是哪一年脱贫的？
          </div>
          <q-input
            v-model="vote.c19"
            type="text"
            dense
            style="min-width: 8em;"
            hint="年（4 位数年份） "
            mask="####"
          />
        </dd>
      </dl>
    </div>

    <div class="bg-grey-1" style="height: 50px;">
      <q-btn
        class="q-ml-lg q-mt-sm"
        type="submit"
        color="secondary"
        icon-right="save"
        :loading="saving"
        @click="savedata"
      >
        保存问卷&nbsp;&nbsp;
        <template v-slot:loading>
          <q-spinner-rings />
        </template>
      </q-btn>
    </div>

    <!--    <q-page-sticky position="bottom-right" :offset="[18, 18]">-->
    <!--      <q-btn fab icon="add" color="accent" />-->
    <!--    </q-page-sticky>-->
  </q-page>
</template>

<script>
export default {
  name: 'P2s1questionnaire',
  components: {},
  data() {
    return {
      saving: false,
      result: null,
      username: null,
      vote: {
        province: '四川省',
        city: '成都市',
        county: '成华区',
        town: '青龙场',
        village: '11',
        group: '11',
        villagetype: '半农半牧区',
        investigator1: '11',
        investigatortel1: '11',
        investigator2: '11',
        investigatortel2: '11',
        a1name: '11',
        a1renation: '本人',
        a1tel: '1111',
        a2: '小学及以下',
        b1: '111',
        b2: '男',
        b3: '土家族',
        b4: '小学及以下',
        b5: '11111',
        c1: '11',
        c14: '2015',
        c17: '3600',
        c19: '2019',
        no: '2020070922390001',
        investigator: '在线调查员',
        qtype: '建档立卡户问卷',
        q_files: '问卷附件',
        qsource: '扫码问卷',
        isUpload: '是',
        reviewer: '某某某',
        re_comments: '问卷一切正常',
        re_conclusion: '审核通过',
        auditor: '排查人',
        au_comments: '该户排查过程中……',
        au_conclusion: '正常',
        au_files: '排查附件'
      },
      show2: true,
      addressoptions: this.$t('p2s1.addressArray'),
      cityArray: [],
      countyArray: [],
      townArray: [],
      step: 2,
      done1: false,
      done2: false,
      done3: false,
      done4: false
    }
  },

  computed: {},
  watch: {
    // 获得列表
    'vote.province'(val, oldval) {
      for (var i in this.addressoptions) {
        if (this.addressoptions[i].value === this.vote.province) {
          this.cityArray = this.addressoptions[i].city
          break
        }
      }
      if (oldval !== val) {
        this.vote.city = ''
      }
    },
    'vote.city'(val, oldval) {
      for (var i in this.cityArray) {
        if (this.cityArray[i].value === this.vote.city) {
          this.countyArray = this.cityArray[i].county
          break
        }
      }
      if (oldval !== val) {
        this.vote.county = ''
      }
    },
    'vote.county'(val, oldval) {
      for (var i in this.countyArray) {
        if (this.countyArray[i].value === this.vote.county) {
          this.townArray = this.countyArray[i].town
          break
        }
      }
      if (oldval !== val) {
        this.vote.town = ''
      }
    }
  },
  created() {},
  mounted() {
    this.getPosition()
    this.username = this.$q.localStorage.getItem('username')
  },

  methods: {
    checkFileSize(files) {
      return files.filter(file => file.size < 20480000)
    },
    upfilished(info) {
      console.log(info)
      // this.data.files.push(info.files[0].name)
      // this.DaddFiles = false
    },
    // 1 查询当前位置信息
    getPosition() {
      navigator.geolocation.getCurrentPosition(
        this.getPositionSuccess,
        this.getPositionError,
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 }
      )
    },
    // 1-1 查询当前位置信息成功
    getPositionSuccess(position) {
      this.vote.latitude = String(position.coords.latitude.toFixed(2))
      this.vote.longitude = String(position.coords.longitude.toFixed(2))
    },
    // 1-2 查询当前位置信息失败
    getPositionError(error) {
      if (error) {
        this.$zglobal.showMessage(
          'red-7',
          'center',
          this.$t('getlocationfailed')
        )
      }
    },
    savedata() {
      this.saving = true
      const tmpa = this.$auth.user()
      this.vote.investigator = tmpa.id
      // 生成问卷编号
      var date = new Date()
      var seperator1 = 'D'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      var hour = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      var currentdate =
        seperator1 +
        date.getFullYear() +
        month +
        strDate +
        'T' +
        hour +
        minutes +
        seconds +
        this.vote.b5
      this.vote.no = currentdate
      // 问卷编号结束
      this.vote.qtype = '建档立卡户问卷'
      this.vote.q_files = '问卷附件'
      this.vote.qsource = '扫码问卷'
      this.vote.isUpload = true
      this.vote.reviewer = '22222'
      this.vote.re_comments = '问卷一切正常'
      this.vote.re_conclusion = '审核通过'
      this.vote.auditor = '333333'
      this.vote.au_comments = '该户排查过程中……'
      this.vote.au_conclusion = '正常'
      this.vote.au_files = '排查附件'
      if (process.env.MODE === 'cordova') {
        this.writeToFile('/AIApp/Votedata.json', this.vote)
      } else {
        this.$router.app.$http
          .post('/p2/s1/p2s1questionnaire1', this.vote)
          .then(res => {
            // console.log(res)
            if (res.data.success) {
              this.$zglobal.showMessage(
                'positive',
                'center',
                this.$t('p2s1.savesuccess')
              )
            } else {
              this.$zglobal.showMessage(
                'red-7',
                'center',
                this.$t('p2s1.savefail')
              )
            }
          })
      }
      setTimeout(() => {
        this.saving = false
        console.log('数据：' + JSON.stringify(this.vote))
      }, 2000)
    },
    /* 文件读写
     * 打开或创建文件夹,创建文件并写入内容
     * */
    writeToFile(fileName, data) {
      data = JSON.stringify(data)
      if (process.env.MODE === 'cordova') {
        window.resolveLocalFileSystemURL(
          cordova.file.externalRootDirectory,
          function(directoryEntry) {
            // 创建文件夹AIApp
            directoryEntry.getDirectory(
              'AIApp/Images',
              { create: true },
              function(dirEntry) {
                // alert('您创建了：' + dirEntry.name + ' 文件夹。')
              },
              function(err) {
                alert('创建文件夹出错' + err.toString())
              }
            )
            // 查找这个文件，如果没有则创建
            directoryEntry.getFile(
              fileName,
              { create: true, exclusive: false },
              function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                  fileWriter.onwriteend = function(e) {
                    alert('保存成功： "' + fileName)
                  }
                  fileWriter.onerror = function(e) {
                    alert('保存失败：' + e.toString())
                  }
                  // alert(data + '-' + fileWriter.length)
                  fileWriter.seek(fileWriter.length)
                  var blob = new Blob([',' + data], { type: 'text/plain' })
                  fileWriter.write(blob)
                  fileWriter.close()
                })
              },
              function(err) {
                alert('写入文件出错' + err.toString())
              }
            )
          },
          function(err) {
            alert('创建文件出错' + err.toString())
          }
        )
      }
    }
    /*
     * 依次打开指定目录文件夹,读取文件内容
     * */
  }
}
</script>
<style scoped>
.q-stepper--vertical .q-stepper__step-inner {
  padding: 0 2px 25px 37px;
}
.doc-card-title {
  margin-left: -20px;
  padding: 2px 10px 2px 24px;
  background: var(--q-color-info);
  color: #000000;
  position: relative;
  border-radius: 3px 5px 5px 0;
}
.q-stepper__step {
  padding: 1px 1px;
}
</style>
