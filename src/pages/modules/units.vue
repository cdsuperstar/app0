<template>
  <q-page padding class="q-pa-lg">
    <q-dialog v-model="DModelTree">
      <q-card class="q-dialog-plugin">
        <q-toolbar>
          <q-icon color="primary" size="30px" name="account_tree" />
          <q-toolbar-title>
            <span class="text-weight-bold">
              {{ $t('modules.editmodeltree') }}</span
            >
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
        <q-separator />
        <q-card-section style="min-height:10vh;max-height: 80vh" class="scroll">
          <nested-test v-if="true" v-model="Modeldata" class="col-8" />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            flat
            color="secondary"
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="EditModeltree()"
          />
        </q-card-actions>
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="80px" color="primary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-teal-6">
      测试页面
    </div>
    <q-separator color="lime-2" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        color="lime-7"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.add')"
        @click="addItems()"
      />
      <q-btn
        color="deep-orange-5"
        text-color="white"
        class="q-ma-xs"
        icon="delete_sweep"
        :label="this.$t('buttons.delete')"
        @click="delItems()"
      />
      <q-btn
        color="indigo-5"
        text-color="white"
        class="q-ma-xs"
        icon="save"
        :label="this.$t('buttons.save')"
        @click="saveItems()"
      />
      <q-btn
        color="purple-5"
        text-color="white"
        class="q-ma-xs"
        icon="account_tree"
        :label="this.$t('buttons.tree')"
        @click="Modeltree()"
      />
      <q-btn
        color="green-6"
        text-color="white"
        class="q-ma-xs"
        icon="cloud_download"
        :label="this.$t('buttons.export')"
        @click="ExportDataAsCVS()"
      />
      <q-space />
      <q-file
        v-model="importfile"
        color="indigo"
        style="max-width: 150px"
        accept=".xlsx, *.xls"
        dense
        clearable
        :label="this.$t('buttons.import')"
        @input="ImportCVStoData()"
      >
        <template v-slot:prepend>
          <q-icon name="attachment" />
        </template>
      </q-file>

      <q-input
        v-model="quickFilter"
        dense
        style="max-width: 120px"
        color="indigo"
        class="q-ml-md"
        :label="this.$t('modules.searchall')"
        @input="onQuickFilterChanged()"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="shadow-1">
      <ag-grid-vue
        style="width: 100%; height: 450px;"
        class="ag-theme-balham Models-agGrid"
        rowSelection="multiple"
        rowMultiSelectWithClick="true"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :defaultColDef="defaultColDef"
        :pagination="true"
        :paginationPageSize="50"
        :getRowStyle="getRowStyle"
        :localeText="this.$t('aggrid')"
        @cellValueChanged="oncellValueChanged"
        @grid-ready="onGridReady"
      >
      </ag-grid-vue>
    </div>
  </q-page>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import XLSX from 'xlsx'
import NestedTest from './nested-tree'

export default {
  name: 'units',
  components: {
    AgGridVue,
    NestedTest
  },
  data() {
    return {
      // start
      UserNames: null,
      // end
      loading: true,
      DModelTree: null,
      Modeldata: null,
      quickFilter: null,
      importfile: null,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      getRowStyle: null,
      changerowcolor: null,
      defaultColDef: null
    }
  },
  computed: {},
  beforeCreate() {
    // 得到select数据
    this.$router.app.$http.get('/users/').then(res => {
      if (res.data.success) {
        var tmpa = []
        for (var i = 0; i < res.data.data.length; i++) {
          tmpa[i] = res.data.data[i].name
        }
        this.UserNames = JSON.stringify(tmpa).replace(/"/g, "'")
        console.log(this.UserNames)
      }
    })
  },
  beforeMount() {
    this.gridOptions = {
      allowShowChangeAfterFilter: true,
      components: {
        agDateCommentInput: agDateCommentInput
      }
    }
    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        width: 55,
        sortable: true,
        minWidth: 55,
        valueFormatter: currencyFormatter,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        // 得到id值 并*100
        headerName: 'ID * 100 合计',
        colId: 'a&b',
        sortable: true,
        width: 100,
        minWidth: 100,
        filter: 'agNumberColumnFilter',
        valueFormatter:
          '"\xA5" + Math.floor(value).toFixed(2).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
        valueGetter: function(params) {
          return params.data.id * 100
        }
      },
      {
        // 得到colid a&b 的值，显示出来
        headerName: 'Chain',
        cellClass: 'number-cell',
        filter: 'agNumberColumnFilter',
        width: 100,
        minwidth: 100,
        valueGetter: function(params) {
          return params.getValue('a&b') * 2
        }
      },
      {
        headerName: '选择',
        field: 'xz',
        width: 100,
        sortable: true,
        filter: true,
        minWidth: 100,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: this.UserNames
        }
      },
      {
        headerName: '模块名',
        field: 'name',
        width: 100,
        sortable: true,
        filter: true,
        minWidth: 100
      },
      {
        headerName: '日期',
        field: 'birth',
        colId: 'date',
        width: 145,
        sortable: true,
        minWidth: 145,
        cellEditor: 'agDateCommentInput',
        filter: 'agDateColumnFilter',
        filterParams: {
          comparator: function(filterLocalDateAtMidnight, cellValue) {
            var dateAsString = cellValue
            if (dateAsString == null) return -1
            var dateParts = dateAsString.split('/')
            var cellDate = new Date(
              Number(dateParts[2]),
              Number(dateParts[1]) - 1,
              Number(dateParts[0])
            )

            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
              return 0
            }

            if (cellDate < filterLocalDateAtMidnight) {
              return -1
            }

            if (cellDate > filterLocalDateAtMidnight) {
              return 1
            }
          },
          browserDatePicker: true
        }
      },
      {
        headerName: '标题',
        field: 'title',
        width: 100,
        sortable: true,
        minWidth: 100
      },
      {
        headerName: 'ICON',
        field: 'icon',
        width: 80,
        sortable: true,
        filter: true,
        minWidth: 80
      },
      {
        headerName: '类型',
        field: 'ismenu',
        width: 40,
        sortable: true,
        filter: true,
        minWidth: 20
      },
      {
        headerName: '大输入框',
        field: 'url',
        width: 100,
        sortable: true,
        filter: true,
        minWidth: 100,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorParams: {
          maxLength: '300', // override the editor defaults
          cols: '50',
          rows: '6'
        }
      }
    ]
    this.defaultColDef = {
      editable: true,
      resizable: true
    }
    this.getRowStyle = this.onchangerowcolor
  },
  created() {
    this.$router.app.$http
      .get('/z_module/')
      .then(res => {
        if (res.data.success) {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].birth = '2018-10-06 22:03:18'
            res.data.data[i].xz = '2'
          }
          this.rowData = res.data.data
        } else {
        }
      })
      .catch(e => {})
  },
  mounted() {
    // console.log(this.ZModules)
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
  },
  methods: {
    // ...mapActions('zero', ['getZModules']),
    onGridReady(params) {
      params.api.sizeColumnsToFit()
    },
    onQuickFilterChanged() {
      this.gridApi.setQuickFilter(this.quickFilter)
    },
    // 导入开始
    ImportCVStoData() {
      let file = this.importfile
      if (file) {
        const reader = new FileReader()
        reader.onload = e => {
          /* Parse data */
          const bstr = e.target.result
          const wb = XLSX.read(bstr, { type: 'binary' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
          let j = 0
          data.map(item => {
            let ret = {}
            let i = 0
            console.log(this)
            this.columnDefs.forEach(function(val) {
              ret[val.field] = item[i++]
            })
            if (j > 0) this.rowData.push(ret)
            j++
          })
        }
        reader.readAsBinaryString(file)
      }
    },
    // 导入结束
    delItems() {
      var selectedData = this.gridApi.getSelectedRows()
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
              if (val.id === undefined) return false
              this.$router.app.$http
                .delete('/z_module/' + val.id)
                .then(res => {
                  if (res.data.success) {
                    // console.log(res.data.data)
                    this.$zglobal.showMessage(
                      'positive',
                      'center',
                      this.$t('operation.delsuccess')
                    )
                  } else {
                    this.$zglobal.showMessage(
                      'red-7',
                      'center',
                      this.$t('operation.delfailed')
                    )
                  }
                })
                .catch(e => {})
            })
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          })
      }
    },
    ExportDataAsCVS() {
      var params = {
        fileName: 'modules.xls',
        suppressQuotes: true,
        columnSeparator: ','
      }
      this.gridApi.exportDataAsCsv(params)
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
    addItems() {
      var newItems = [{}]
      var res = this.gridApi.updateRowData({ add: newItems })
      console.log(res)
    },
    saveItems() {
      let selectedData = this.gridApi.getSelectedRows()
      selectedData.forEach(val => {
        console.log(val)
      })
    },
    Modeltree() {
      this.loading = true
      this.DModelTree = true
      this.$router.app.$http
        .get('/z_module/getMyMenu')
        .then(res => {
          if (res.data.success) {
            // console.log(res.data.data)
            this.Modeldata = res.data.data
            this.loading = false
          } else {
          }
        })
        .catch(e => {
          this.$zglobal.showMessage(
            'red-5',
            'center',
            this.$t('auth.register.invalid_data')
          )
          this.loading = false
          this.DModelTree = false
        })
    },
    EditModeltree() {
      this.loading = true
      this.$router.app.$http
        .post('/z_module/setModuleTree/' + this.Modeldata[0].id, this.Modeldata)
        .then(res => {
          if (res.data.success) {
            this.loading = false
            this.DModelTree = false
            this.$zglobal.showMessage('positive', 'center', this.$t('success'))
          }
        })
        .catch(error => {
          this.loading = false
          if (error.status) {
            this.$zglobal.showMessage(
              'red-5',
              'center',
              this.$t('auth.register.invalid_data')
            )
          }
        })
    }
  }
}

function currencyFormatter(params) {
  return '\xA5' + formatNumber(params.value)
}
function formatNumber(number) {
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
// end
// agDateCommentInput strat
function agDateCommentInput() {}
agDateCommentInput.prototype.init = function(params) {
  var startValue = params.value

  this.gui = document.createElement('input')
  this.gui.type = 'date'
  // this.gui.value = startValue
  // 直接截取前面的日期
  var st = startValue.split(' ')
  this.gui.value = st[0]

  // console.log(this.gui.value, '======')
  this.gui.classList.add('agDateCommentInput-editor')
}
agDateCommentInput.prototype.getGui = function() {
  return this.gui
}
agDateCommentInput.prototype.getValue = function() {
  return this.gui.value
}
agDateCommentInput.prototype.afterGuiAttached = function() {
  this.gui.focus()
}
agDateCommentInput.prototype.myCustomFunction = function() {
  return {
    rowIndex: this.params.rowIndex,
    colId: this.params.column.getId()
  }
}
// agDateCommentInput end
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.Models-agGrid .ag-header {
  background-color: #666699;
  color: #ffffff;
}
.Models-agGrid .ag-cell {
  padding-left: 1px;
}
.ag-theme-balham .ag-icon,
.ag-header-icon .ag-sort-ascending-icon {
  color: #ffffff;
}
.ag-theme-balham .ag-icon-checkbox-unchecked {
  color: #cccccc;
}
.ag-theme-balham .ag-icon-checkbox-checked {
  color: #666699;
}
.agDateCommentInput-editor {
  width: 100%;
  height: 100%;
}
</style>
