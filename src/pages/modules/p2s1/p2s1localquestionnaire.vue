<template>
  <q-page padding class="q-pa-ma">
    <q-dialog v-model="editItem">
      <q-card class="q-dialog-plugin">
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
        <div class="q-mb-lg row">
          <q-icon name="where_to_vote" class="text-warning" size="sm" />
          <q-input
            v-model="vote.longitude"
            dense
            disable
            type="text"
            style="max-width: 8em;"
          >
            <template v-slot:before>
              <font size="3">经度</font>
            </template>
          </q-input>
          <q-input
            v-model="vote.latitude"
            dense
            disable
            type="text"
            style="max-width: 7em;"
          >
            <template v-slot:before>
              <font size="3">纬度</font>
            </template>
          </q-input>
        </div>
        <div
          :class="
            $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
          "
        >
          <q-select
            v-model="vote.province"
            dense
            standout="bg-secondary text-white"
            label="省"
            style="min-width: 10em"
            emit-value
            :options="addressoptions"
          />
          <q-select
            v-model="vote.city"
            dense
            standout="bg-secondary text-white"
            label="市"
            style="min-width: 10em"
            emit-value
            :options="cityArray"
          />
          <q-select
            v-model="vote.country"
            dense
            standout="bg-secondary text-white"
            label="区（县）"
            emit-value
            style="min-width: 10em"
            :options="countryArray"
          />
          <q-select
            v-model="vote.town"
            dense
            standout="bg-secondary text-white"
            label="镇（乡）"
            emit-value
            style="min-width: 10em"
            :options="townArray"
          />
        </div>
        <div
          :class="
            $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
          "
        >
          <q-input v-model="vote.village" type="text" label="行政村（社区）" />
          <q-input v-model="vote.group" type="text" label="自然村（组）" />
          <q-select
            v-model="vote.villagetype"
            label="行政村属性"
            style="min-width: 10em"
            :options="['农区', '牧区', '半农半牧区']"
          />
        </div>
        <div
          :class="
            $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
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
        </div>
        <div
          :class="
            $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
          "
        >
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
  name: 'P2s1localquestionnaire',
  components: {
    AgGridVue
  },
  data() {
    return {
      result: null,
      vote: {},
      addressoptions: [
        {
          label: '四川省',
          value: '四川省',
          city: [
            {
              label: '成都市',
              value: '成都市',
              country: [
                {
                  label: '成华区',
                  value: '成华区',
                  town: [
                    {
                      label: '二仙桥',
                      value: '二仙桥'
                    },
                    { label: '八里庄', value: '八里庄' }
                  ]
                },
                {
                  label: '青羊区',
                  value: '青羊区',
                  town: [
                    {
                      label: '西南交通大学',
                      value: '西南交通大学'
                    },
                    { label: '西南石油大学', value: '西南石油大学' }
                  ]
                }
              ]
            },
            {
              label: '广元市',
              value: '广元市'
            },
            {
              label: '南充市',
              value: '南充市'
            }
          ]
        },
        {
          label: '海南省',
          value: '海南省',
          city: [
            {
              label: '三亚市',
              value: '三亚市'
            },
            {
              label: '海口市',
              value: '海口市'
            }
          ]
        },
        {
          label: '重庆市',
          value: '重庆市',
          city: [
            {
              label: '嘉陵区',
              value: '嘉陵区'
            },
            {
              label: '北碚区',
              value: '北碚区'
            },
            {
              label: '黔江县',
              value: '黔江县'
            }
          ]
        }
      ],
      loading: false,
      editItem: false,
      quickFilter: null,
      gridOptions: null,
      Roledata: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      rowtmpdata: null,
      getRowStyle: null,
      changerowcolor: null,
      defaultColDef: null
    }
  },
  computed: {
    // 获得列表
    cityArray: function() {
      let tmpRe1 = []
      for (var i in this.addressoptions) {
        if (this.addressoptions[i].value === this.vote.province) {
          tmpRe1 = this.addressoptions[i].city
          break
        }
      }
      return tmpRe1
    },
    countryArray: function() {
      let tmpRe2 = []
      for (var i in this.cityArray) {
        if (this.cityArray[i].value === this.vote.city) {
          tmpRe2 = this.cityArray[i].country
          break
        }
      }
      return tmpRe2
    },
    townArray: function() {
      let tmpRe3 = []
      for (var i in this.countryArray) {
        if (this.countryArray[i].value === this.vote.country) {
          tmpRe3 = this.countryArray[i].town
          break
        }
      }
      return tmpRe3
    }
  },
  watch: {
    'vote.province'(val) {
      if (this.vote.city) this.vote.city = null
      if (this.vote.country) this.vote.country = null
      if (this.vote.town) this.vote.town = null
    },
    'vote.city'(val) {
      if (this.vote.country) this.vote.country = null
      if (this.vote.town) this.vote.town = null
    },
    'vote.country'(val) {
      if (this.vote.town) this.vote.town = null
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
          field: 'country',
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
      var selectedData = this.gridApi.getSelectedRows()
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
    },
    freshJsondata() {
      this.getJsondate()
      // 延迟0.5秒执行
      setTimeout(() => {
        const tmpb = document.getElementById('rowtmpdata').value
        this.rowData = JSON.parse(tmpb)
        this.rowtmpdata = tmpb
      }, 500)
    },
    // 读取文件，导入JSON数据
    getJsondate() {
      var fileName = '/AIApp/Votedata.json'
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
</style>
