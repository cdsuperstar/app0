<template>
  <q-page padding class="q-pa-ma">
    <div class="text-h5 q-ma-md text-secondary">
      【离线】本地问卷
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        color="addbtn"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.modify')"
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
        color="savebtn"
        text-color="white"
        class="q-ma-xs"
        icon="save"
        :label="this.$t('buttons.save')"
        @click="saveItems()"
      />
      <q-btn
        color="expbtn"
        text-color="white"
        class="q-ma-xs"
        icon="autorenew"
        label="获取数据"
        @click="getJsondata()"
      />
      <q-separator
        v-if="!$q.screen.gt.xs"
        class="col-10 q-ma-xs"
        color="info"
      />
      <q-space />
      <q-separator
        v-if="!$q.screen.gt.xs"
        class="col-10 q-ma-xs"
        color="info"
      />
      <q-input
        v-model="quickFilter"
        dense
        style="max-width: 120px"
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
        row-selection="multiple"
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
      loading: false,
      quickFilter: null,
      gridOptions: null,
      Roledata: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: [],
      getRowStyle: null,
      changerowcolor: null,
      defaultColDef: null,
      data: {
        data: {
          name: '22',
          email: '2@2.com',
          password: '22222222'
        }
      }
    }
  },
  computed: {},
  created() {},
  beforeMount() {
    this.initGrid()
  },
  beforeDestroy() {},
  mounted() {
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
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
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          headerCheckboxSelection: true,
          checkboxSelection: true
        },
        {
          editable: false,
          headerName: '纬度',
          field: 'latitude',
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
          headerName: '被访者姓名',
          field: 'a1name',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '联系方式',
          field: 'a1tel',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          editable: false,
          headerName: '户主姓名',
          field: 'b1',
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
    saveItems() {
      alert('保存：' + JSON.stringify(this.rowData))
    },
    modifyItems() {
      var selectedData = this.gridApi.getSelectedRows()
      alert('编辑：' + JSON.stringify(selectedData))
    },
    getJsondata() {
      // 读取文件，导入JSON数据
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
                    var tmpdata = '[' + this.result.substr(1) + ']'
                    alert('tmpdata:' + tmpdata)
                    this.rowData = JSON.parse(tmpdata)
                    this.gridApi.setRowData(JSON.parse(tmpdata))
                    alert('加载成功！')
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
