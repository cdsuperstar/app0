<template>
  <q-page class="q-pa-xs">
    <q-card flat>
      <q-card-section>
        <p
          class="text-bold"
          align="center"
          style="margin-bottom: 0.5em; color: var(--q-color-positive);"
        >
          <font size="4">2020年云南省相对贫困问题调查问卷</font><br />
        </p>
        <p>亲爱的朋友:</p>
        <p style="text-indent: 2em;">
          您好！受云南省扶贫办委托，我们组织开展对云南省相对贫困问题进行调查，非常感谢您的配合。本调查仅仅作为政策咨询建议之用，您所填报的信息我们绝对保密，请根据您及您的家庭真实情况选择和填报，再次感谢您的大力支持和配合！
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
    <div class="q-mx-ma">
      <dl>
        <dt class="text-h6 row no-wrap items-center">
          <div class="doc-card-title">
            A. 家庭基本情况（人口、劳动力情况等）
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A1. 您所在的行政区域是？</div>
          <v-distpicker
            :province="vote.province"
            :city="vote.city"
            :area="vote.county"
            :placeholders="placeholders"
            province-disabled
            @selected="AreaonSelected"
          ></v-distpicker>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">乡镇：</div>
          <q-input v-model="vote.town" type="text" dense />
          <div style="padding-top: 10px;">村：</div>
          <q-input v-model="vote.village" type="text" dense />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A2. 您的家庭情况是？</div>
          <q-select
            v-model="vote.a2"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="[
              '建档立卡稳定脱贫户',
              '建档立卡监测脱贫户',
              '非建档立卡边缘户',
              '非建档立卡户'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A3. 户主姓名：</div>
          <q-input v-model="vote.a3" type="text" dense />
          <div style="padding-top: 10px;">
            A4. 户主出生年月（示例：197002）：
          </div>
          <q-input v-model="vote.a4" type="text" dense mask="######" />
          <div style="padding-top: 10px;">A5. 户主民族是：</div>
          <q-select
            v-model="vote.a5"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '彝族',
              '汉族',
              '回族',
              '壮族',
              '瑶族',
              '佤族',
              '水族',
              '傣族',
              '藏族',
              '满族',
              '怒族',
              '白族',
              '苗族',
              '蒙古族',
              '纳西族',
              '普米族',
              '傈僳族',
              '拉祜族',
              '景颇族',
              '基诺族',
              '哈尼族',
              '独龙族',
              '德昂族',
              '布依族',
              '布朗族',
              '阿昌族'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A6. 被访者姓名：</div>
          <q-input v-model="vote.a6" type="text" dense />
          <div style="padding-top: 10px;">A7. 您与户主的关系是？</div>
          <q-select
            v-model="vote.a7"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '户主本人',
              '户主配偶',
              '户主父母',
              '职校、中专',
              '户主子女'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A8. 您家庭联系电话：</div>
          <q-input v-model="vote.a8" type="text" dense />
          <div style="padding-top: 10px;">A9. 您所在家庭的户籍人口（人）：</div>
          <q-input v-model="vote.a9" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A10.
            您所在家庭的常住人口（在家居住半年以上/或个人收入直接与家庭挂钩）（人）：
          </div>
          <q-input v-model="vote.a10" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A10-1 您家16周岁以下人口（人）：
          </div>
          <q-input v-model="vote.a101" type="text" dense mask="##" />
          <div style="padding-top: 10px;">
            A10-2
            您家现有劳动力人口数（人）【16-64岁具有劳动能力人口，不包括在校学生、现役军人】：
          </div>
          <q-input v-model="vote.a102" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A10-3 您家无劳动能力人数（人）【16到60周岁，因病因残丧失劳动力】：
          </div>
          <q-input v-model="vote.a103" type="text" dense mask="##" />
          <div style="padding-top: 10px;">
            A10-4 您家60周岁及以上人口数（人）：
          </div>
          <q-input v-model="vote.a104" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A10-5
            未来3年，您家庭劳动力人口数（人）【16-64岁具有劳动能力人口，不包括在校学生，现役军人】：
          </div>
          <q-input v-model="vote.a105" type="text" dense mask="##" />
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-title">
            B. 家庭所在地区自然条件、生产生活条件等
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B1. 您的家庭所在地区（县）是否是少数民族地区？
          </div>
          <q-select
            v-model="vote.b1"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['是', '不是']"
          ></q-select>
          <div style="padding-top: 10px;">
            B2. 您的家庭所在地区自然条件情况？
          </div>
          <q-select
            v-model="vote.b2"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '高山峡谷区',
              '丘陵多山区',
              '高原高寒区',
              '石山荒漠区',
              '干旱少雨区',
              '平原平坝区'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">B3. 您家庭居住地出行条件情况？</div>
          <q-select
            v-model="vote.b3"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '出行便利，道路畅通，主要依靠机动车出行',
              '出行较为便利，道路基本畅通，多种出行方式',
              '出行不便，无通车道路，主要依靠步行'
            ]"
          ></q-select>
          <div style="padding-top: 10px;">
            B4. 您家庭所在地区基本生产生活条件在哪方面还需要改善提升？
          </div>
          <q-select
            v-model="vote.b4"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="['生产道路', '农田水利设施', '电力通信', '不需要']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">B5. 您所在地区自然生态情况？</div>
          <q-select
            v-model="vote.b5"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['很好', '较好', '一般', '较差', '很差']"
          ></q-select>
          <div style="padding-top: 10px;">
            B6.您家庭所在地区土地资源条件情况？
          </div>
          <q-select
            v-model="vote.b6"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '土地资源较为丰富，能够满足生产发展需要',
              '土地资源一般，基本能满足生产发展需要',
              '土地资源很少，生产发展困难'
            ]"
          ></q-select>
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-title">
            C. 家庭收入支出情况（收入水平、主要来源、稳定性、低保等）
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C1.近三年来（2018-2020年），您家庭年均可支配总收入（元）：
          </div>
          <q-input
            v-model="vote.c1"
            type="text"
            dense
            style="min-width: 8em;"
            mask="######"
            :rules="[val => val <= 1000000 || '该项取值范围为0-1000000 ']"
          />
          <div style="padding-top: 10px;">
            C2. 家中是否有人领低保？
          </div>
          <q-select
            v-model="vote.c2"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.c2 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            C2-1 近一年来，家中有几个人领了低保？
          </div>
          <q-input
            v-model="vote.c201"
            type="number"
            dense
            style="min-width: 8em;"
          />
          <div style="padding-top: 10px;">
            C2-2 全家每月可领低保金合计多少钱？（元）
          </div>
          <q-input
            v-model="vote.c202"
            type="number"
            dense
            style="min-width: 8em;"
          />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C3. 家中60岁以上老人有多少人？
          </div>
          <q-input v-model="vote.c3" type="text" dense mask="##" />
          <div
            v-if="vote.c3 !== '0'"
            :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
          >
            <div style="padding-top: 10px;">
              C4. 每月领养老金多少钱？（元）
            </div>
            <q-input v-model="vote.c4" type="text" dense mask="####" />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C5. 近年来，您的家庭收入主要来源是？
          </div>
          <q-select
            v-model="vote.c5"
            dense
            style="min-width: 18em;"
            behavior="menu"
            :options="[
              '外出务工收入，在本乡镇外务工的工资收入',
              '本地务工收入，在本乡镇内务工以及政府提供的各种公益性岗位的工资收入',
              '种养殖收入：各类农林牧渔业收入',
              '经营性收入：家庭各种经营性收入，比如做生意、跑运输、开饭馆、小超市等',
              '财产性收入：房屋等出租，土地流转，入股分红等收入',
              '转移性收入：各类政府补贴收入，各类政府补贴，低保，养老金等收入'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C6. 近年来，您认为您家收入增加最多的是？（多选）
          </div>
          <q-select
            v-model="vote.c6"
            dense
            multiple
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '外出务工收入',
              '本地务工收入',
              '种养殖收入',
              '经营性收入',
              '财产性收入',
              '各类政府补贴收入',
              '均没有变化'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C7. 近年来，您认为您家收入减少最多的是？（多选）
          </div>
          <q-select
            v-model="vote.c7"
            dense
            multiple
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '外出务工收入',
              '本地务工收入',
              '种养殖收入',
              '经营性收入',
              '财产性收入',
              '各类政府补贴收入',
              '没有减少'
            ]"
          ></q-select>
        </dd>
        <dd
          v-if="
            typeof vote.c7 == 'object' ? !vote.c7.includes('没有减少') : 'false'
          "
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            C8. 收入减少的主要原因是？（多选）
          </div>
          <q-select
            v-model="vote.c8"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '因疫情减少',
              '因伤病残孕',
              '因小孩上学',
              '因自然灾害',
              '因婚丧嫁娶'
            ]"
          ></q-select>
          <div style="padding-top: 10px;">
            C9. 近年来，您家各类政府转移性收入主要有？（多选）
          </div>
          <q-select
            v-model="vote.c9"
            dense
            multiple
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '低保收入',
              '养老金收入',
              '残疾人补贴收入',
              '政府各类长期性补贴（林补、草补、粮食补贴等）收入'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C10. 近年来，您的家庭收入是否稳定？（单选）
          </div>
          <q-select
            v-model="vote.c10"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['稳定', '基本稳定', '不稳定']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"></dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"></dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"></dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"></dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"></dd>
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
import VDistpicker from 'v-distpicker'

export default {
  name: 'P2s1questionnaire',
  components: { VDistpicker },
  data() {
    return {
      saving: false,
      username: null,
      netstate: null,
      placeholders: {
        province: '------- 省 --------',
        city: '------- 市 -------',
        area: '------- 区 -------'
      },
      vote: {
        province: '云南省',

        au_conclusion: '正常'
      }
    }
  },

  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getPosition()
    this.checkConnection()
    this.username = this.$q.localStorage.getItem('username')
  },

  methods: {
    AreaonSelected(data) {
      // console.log(data, '===========')
      this.vote.province = data.province.value
      this.vote.city = data.city.value
      this.vote.county = data.area.value
      // console.log(JSON.stringify(this.vote), '===========')
    },
    checkFileSize(files) {
      return files.filter(file => file.size < 20480000)
    },
    upfilished(info) {
      // console.log(info)
      // this.data.files.push(info.files[0].name)
      // this.DaddFiles = false
    },
    // 查询当前网络连接
    checkConnection() {
      var networkState = navigator.connection.type
      const states = {
        unknown: '未知网络连接',
        ethernet: '以太网连接',
        wifi: 'WIFI 网络连接',
        '2g': '2G 网络连接',
        '3g': '3G 网络连接',
        '4g': '4G 网络连接',
        cell: '蜂窝数据连接',
        none: '无网络连接'
      }
      this.netstate = states[networkState]
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
      console.log(typeof this.vote.c7, '====')
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
        seconds
      this.vote.no = currentdate
      // 问卷编号结束
      this.vote.qtype = '相对贫困调查问卷'
      this.vote.qsource = '扫码问卷'
      this.vote.isUpload = true
      this.vote.reviewer = '22222'
      this.vote.re_comments = '问卷一切正常'
      this.vote.re_conclusion = '审核通过'
      this.vote.auditor = '333333'
      this.vote.au_comments = '该户排查过程中……'
      this.vote.au_conclusion = ''
      if (process.env.MODE === 'cordova' && this.netstate === '无网络连接') {
        alert('当前【无网络连接】，将采用离线方式保存问卷！')
        this.writeToFile('/AIApp/Votedata.json', this.vote)
      } else {
        this.$router.app.$http
          .post('/p2/s1/p2s1questionnaire1', this.vote)
          .then(res => {
            // console.log(res, '+++++++')
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
                this.$t('p2s1.savefailed')
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
.divwarp {
  height: 40px;
}
</style>
