<template>
  <q-page padding class="q-pa-ma">
    <q-dialog v-model="editItem">
      <q-card class="modify-question">
        <q-toolbar>
          <q-icon color="primary" size="30px" name="account_box" />
          <q-toolbar-title>
            <span class="text-weight-bold"> 修改问卷 </span>
          </q-toolbar-title>
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
            color="negative"
            :title="this.$t('buttons.close')"
          />
        </q-toolbar>
        <q-separator color="accent" />
        <div class="q-ml-ma">
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
            <q-input
              v-model="vote.village"
              type="text"
              label="行政村（社区）"
            />
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
            <q-input
              v-model="vote.investigator1"
              type="text"
              label="调查员1姓名"
            />
            <q-input
              v-model="vote.investigatortel1"
              type="text"
              label="调查员1联系方式"
              mask="### - #### ####"
            />
            <q-input
              v-model="vote.investigator2"
              type="text"
              label="调查员2姓名"
            />
            <q-input
              v-model="vote.investigatortel2"
              type="text"
              label="调查员2联系方式"
              mask="### - #### ####"
            />
          </div>
          <div class="q-mx-ma">
            <dl class="q-mx-lg">
              <dt class="text-h6 row no-wrap items-center">
                <div class="doc-card-title">A. 受访者信息</div>
              </dt>
              <dd class="text-body q-mx-sm">
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
              <dd class="text-body q-mx-sm">
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
              <dt
                class="text-h6 row no-wrap items-center"
                style="margin-top: 5px;"
              >
                <div class="doc-card-title">B. 户主基本情况</div>
              </dt>
              <dd class="text-body q-mx-sm">
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
              <dd class="text-body q-mx-sm">
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
              <dt
                class="text-h6 row no-wrap items-center"
                style="margin-top: 5px;"
              >
                <div class="doc-card-title">C. 农户家庭基本情况</div>
              </dt>
              <dd class="text-body q-mx-sm">
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
                    val =>
                      (val >= 2014 && val <= 2019) || '该项取值范围为2014-2019 '
                  ]"
                />
              </dd>
              <dd class="text-body q-mx-sm">
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
        </div>

        <q-separator color="accent" />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            flat
            color="secondary"
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="saveItems()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-secondary">
      【离线】本地问卷
    </div>
    <q-separator color="accent" />
    <input id="rowtmpdata" v-model="rowtmpdata" type="hidden" value="" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        color="addbtn"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.modifyd')"
        @click="modifyItems()"
      />
      <q-btn
        color="deldbtn"
        text-color="white"
        class="q-ma-xs"
        icon="delete_sweep"
        :label="this.$t('buttons.delete')"
        @click="delItems()"
      />
      <q-btn
        color="expbtn"
        text-color="white"
        class="q-ma-xs"
        icon="autorenew"
        :label="this.$t('buttons.refresh')"
        @click="freshJsondata()"
      />
      <q-separator
        v-if="!$q.screen.gt.xs"
        class="col-10 q-ma-xs"
        color="info"
      />
      <q-btn
        v-if="$auth.check()"
        color="savebtn"
        text-color="white"
        class="q-ma-xs"
        icon="backup"
        :label="this.$t('buttons.upload')"
        @click="uploadJsondata()"
      />
      <q-space />
      <q-input
        v-model="quickFilter"
        dense
        style="max-width: 150px;padding-right: 10px;"
        class="q-ml-md"
        :label="this.$t('modules.searchall')"
        @input="onQuickFilterChanged()"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-separator
        v-if="!$q.screen.gt.xs"
        class="col-10 q-ma-xs"
        color="info"
      />
    </div>
    <div class="col-md-6 shadow-1">
      <ag-grid-vue
        style="min-width:100%; height: 500px;"
        class="ag-theme-balham User-agGrid"
        row-selection="single"
        row-multi-select-with-click="true"
        :grid-options="gridOptions"
        :column-defs="columnDefs"
        :row-data="rowData"
        :default-col-def="defaultColDef"
        :pagination="true"
        :pagination-page-size="50"
        :get-row-style="getRowStyle"
        :locale-text="this.$t('aggrid')"
        @cellValueChanged="oncellValueChanged"
        @grid-ready="onGridReady"
      >
      </ag-grid-vue>
    </div>
  </q-page>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'P2s1OffQnl',
  components: {
    AgGridVue
  },
  data() {
    return {
      result: null,
      vote: {},
      addressoptions: this.$t('p2s1.addressArray'),
      cityArray: [],
      countyArray: [],
      townArray: [],
      loading: false,
      editItem: false,
      quickFilter: null,
      gridOptions: null,
      Roledata: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      rowtmpdata: '',
      getRowStyle: null,
      changerowcolor: null,
      defaultColDef: null
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
      if (oldval !== val && this.editItem) {
        this.vote.city = ''
      }
    },
    'vote.city'(val, oldval) {
      for (var j in this.cityArray) {
        if (this.cityArray[j].value === this.vote.city) {
          this.countyArray = this.cityArray[j].county
          break
        }
      }
      if (oldval !== val && this.editItem) {
        this.vote.county = ''
      }
    },
    'vote.county'(val, oldval) {
      for (var k in this.countyArray) {
        if (this.countyArray[k].value === this.vote.county) {
          this.townArray = this.countyArray[k].town
          break
        }
      }
      if (oldval !== val && this.editItem) {
        this.vote.town = ''
      }
    }
  },
  created() {},
  beforeMount() {
    this.initGrid()
    this.getJsondate()
  },
  beforeDestroy() {},
  mounted() {
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
    // 延迟0.5秒执行
    setTimeout(() => {
      this.freshJsondata()
    }, 500)
  },
  methods: {
    initGrid() {
      this.gridOptions = {
        allowShowChangeAfterFilter: true
      }
      this.columnDefs = [
        {
          editable: false,
          headerName: '经度',
          field: 'longitude',
          width: 80,
          minWidth: 80,
          maxWidth: 120,
          sortable: true,
          headerCheckboxSelection: false,
          checkboxSelection: true
        },
        {
          editable: false,
          headerName: '纬度',
          field: 'latitude',
          width: 80,
          minWidth: 80,
          maxWidth: 120,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '省',
          field: 'province',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '市',
          field: 'city',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '区（县）',
          field: 'county',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '镇（乡）',
          field: 'town',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '行政村（社区）',
          field: 'village',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '村属性',
          field: 'villagetype',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '姓名',
          field: 'investigator1',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '联系方式',
          field: 'investigatortel1',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '户主性别',
          field: 'b2',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '户主身份证号',
          field: 'b5',
          width: 150,
          minWidth: 150,
          maxWidth: 180,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '人口数',
          field: 'c1',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '脱贫时间',
          field: 'c19',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        }
      ]
      this.defaultColDef = {
        editable: false,
        resizable: true
      }
      this.getRowStyle = this.onchangerowcolor
    },
    onGridReady(params) {
      params.api.sizeColumnsToFit()
    },
    onQuickFilterChanged() {
      this.gridApi.setQuickFilter(this.quickFilter)
    },
    delItems() {
      var selectedData = this.gridApi.getSelectedRows()
      alert('删除：' + JSON.stringify(selectedData))
      if (selectedData.length > 0) {
        this.$q
          .dialog({
            title: this.$t('buttons.comfirmtitle'),
            message: this.$t('buttons.comfirmdialog'),
            html: true,
            cancel: true,
            persistent: true
          })
          .onOk(() => {
            selectedData.forEach(val => {
              this.gridApi.updateRowData({ remove: [val] })
              this.rowData.splice(val.rowIndex, 1)
            })
            setTimeout(() => {
              this.writeToFile('/AIApp/Votedata.json', this.rowData)
            }, 500)
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          })
      }
    },
    onchangerowcolor() {
      return { backgroundColor: this.changerowcolor }
    },
    oncellValueChanged(params) {
      if (params.oldValue === null) params.oldValue = ''
      if (params.newValue !== params.oldValue) {
        this.changerowcolor = '#ffa195'
        this.gridApi.redrawRows({
          rowNodes: [this.gridApi.getDisplayedRowAtIndex(params.rowIndex)]
        })
      }
      this.changerowcolor = ''
    },
    modifyItems() {
      var selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length === 1) {
        this.editItem = true
        this.vote = selectedData[0]
      } else {
        this.$zglobal.showMessage(
          'red-7',
          'center',
          this.$t('operation.rowserror')
        )
      }
    },
    // 上传
    uploadJsondata() {
      const selectedData = this.gridApi.getSelectedRows()
      if (this.$auth.check()) {
        selectedData.forEach(val => {
          // console.log(val)
          this.$router.app.$http
            .post('/p2/s1/p2s1questionnaire1', val)
            .then(res => {
              // console.log(res)
              if (res.data.success) {
                this.$zglobal.showMessage(
                  'positive',
                  'center',
                  this.$t('p2s1.uploadsuccess')
                )
              } else {
                this.$zglobal.showMessage(
                  'red-7',
                  'center',
                  this.$t('p2s1.uploadfailed')
                )
              }
            })
        })
      }

      alert('上传：' + JSON.stringify(selectedData))
      this.rowData = []
    },
    // 保存本地
    saveItems() {
      // alert(JSON.stringify(this.vote) + '1+++')
      this.gridApi.updateRowData({
        update: [this.vote]
      })
      this.editItem = false
      this.$zglobal.showMessage(
        'positive',
        'center',
        this.$t('operation.addsuccess')
      )
      // alert(JSON.stringify(this.rowData) + '2+++')
      this.writeToFile('/AIApp/Votedata.json', this.rowData)
      // 延迟0.5秒执行
      setTimeout(() => {
        this.freshJsondata()
      }, 500)
    },
    /* 文件读写
     * 打开或创建文件夹,创建文件并写入内容
     * */
    writeToFile(fileName, data) {
      var str = JSON.stringify(data)
      var strlength = str.length - 2
      data = str.substr(1, strlength)
      alert(strlength + 'data:' + data)
      if (process.env.MODE === 'cordova') {
        window.resolveLocalFileSystemURL(
          cordova.file.externalRootDirectory,
          function(directoryEntry) {
            // 创建文件夹AIApp
            directoryEntry.getDirectory(
              'AIApp',
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
                alert('path:' + JSON.stringify(fileEntry))
                fileEntry.createWriter(function(fileWriter) {
                  fileWriter.onwriteend = function(e) {
                    alert('保存成功： "' + fileName)
                  }
                  fileWriter.onerror = function(e) {
                    alert('保存失败：' + e.toString())
                  }
                  // alert(data + '-' + fileWriter.length)
                  // fileWriter.seek(fileWriter.length)
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
    },
    freshJsondata() {
      this.getJsondate()
      this.$nextTick(() => {
        const tmpb = document.getElementById('rowtmpdata').value
        if (tmpb) {
          this.rowData = JSON.parse(tmpb)
        } else {
          this.rowData = ''
        }
        this.rowtmpdata = tmpb
      })
      // 延迟0.5秒执行
      // setTimeout(() => {}, 500)
    },
    // 读取文件，导入JSON数据
    getJsondate() {
      var fileName = '/AIApp/Votedata.json'
      if (process.env.MODE === 'cordova') {
        window.resolveLocalFileSystemURL(
          cordova.file.externalRootDirectory,
          function(directoryEntry) {
            // 创建文件夹AIApp
            directoryEntry.getDirectory(
              'AIApp',
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
                fileEntry.file(
                  function(file) {
                    var reader = new FileReader()
                    reader.onloadend = function() {
                      var tmpdata = '[' + reader.result.substr(1) + ']'
                      // alert('tmpdata:' + tmpdata)
                      // 显示文件路径
                      // alert(fileEntry.fullPath)
                      // 给控件赋值
                      document.getElementById('rowtmpdata').value = tmpdata
                    }
                    reader.readAsText(file)
                  },
                  function(err) {
                    alert('文件读取出错' + err.toString())
                  }
                )
              },
              function(err) {
                alert('文件出错' + err.toString())
              }
            )
          },
          function(err) {
            alert('创建文件出错' + err.toString())
          }
        )
      }
      /*
       * 打开指定目录文件夹,读取文件内容
       * */
    }
  }
}
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.User-agGrid .ag-header {
  background-color: var(--q-color-secondary);
  color: #ffffff;
}
.User-agGrid .ag-cell {
  padding-left: 1px;
}
.ag-theme-balham .ag-icon,
.ag-header-icon .ag-sort-ascending-icon {
  color: #ffffff;
}
.ag-theme-balham .ag-paging-page-summary-panel .ag-icon,
.ag-theme-balham .ag-paging-panel {
  color: #000000;
}
.ag-theme-balham .ag-icon-checkbox-unchecked {
  color: #cccccc;
}
.ag-theme-balham .ag-icon-checkbox-checked {
  color: var(--q-color-secondary);
}
.modify-question {
  width: 500px;
  height: 700px;
}
.doc-card-title {
  margin-left: -20px;
  padding: 2px 10px 2px 24px;
  background: var(--q-color-info);
  color: #000000;
  position: relative;
  border-radius: 3px 5px 5px 0;
}
</style>
