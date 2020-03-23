<template>
  <q-page padding class="q-pa-lg">
    <q-dialog v-model="DUnitTree">
      <q-card class="q-dialog-plugin">
        <q-toolbar>
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
            color="negative"
            :title="this.$t('buttons.close')"
          />
          <q-toolbar-title>
            <span class="text-subtitle1 text-weight-bold">
              {{ $t('units.editunittree') }}</span
            >
          </q-toolbar-title>
          <q-btn
            flat
            color="secondary"
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="EditUnittree()"
          />
        </q-toolbar>
        <q-separator />
        <q-card-section style="min-height:10vh;max-height: 80vh" class="scroll">
          <nested-test v-if="true" v-model="Unitdata" class="col-8" />
        </q-card-section>
        <q-separator />
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="80px" color="primary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-teal-6">
      {{ $t('units.header') }}
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
        color="blue-grey-5"
        text-color="white"
        class="q-ma-xs"
        icon="apartment"
        :label="this.$t('buttons.tree')"
        @click="Unittree()"
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
        style="width: 100%; height: 500px;"
        class="ag-theme-balham Units-agGrid"
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
import XLSX from 'xlsx'
import NestedTest from './nested-tree'

export default {
  name: 'Units',
  components: {
    AgGridVue,
    NestedTest
  },
  data() {
    return {
      loading: true,
      DUnitTree: null,
      Unitdata: null,
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
  beforeMount() {
    this.gridOptions = {
      allowShowChangeAfterFilter: true
    }
    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        width: 55,
        sortable: true,
        editable: false,
        minWidth: 55,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        headerName: '机构名',
        field: 'title',
        width: 130,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 130
      },
      {
        headerName: '简介',
        field: 'brief',
        colId: 'date',
        width: 200,
        editable: true,
        sortable: true,
        minWidth: 200,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorParams: {
          maxLength: '30000', // override the editor defaults
          cols: '60',
          rows: '6'
        }
      },
      {
        headerName: this.$t('dataAGgrid.created_at'),
        field: 'created_at',
        width: 130,
        editable: false,
        sortable: true,
        filter: true,
        minWidth: 130
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
      .get('/z_unit/')
      .then(res => {
        if (res.data.success) {
          this.rowData = res.data.data
        } else {
        }
      })
      .catch(e => {})
  },
  mounted() {
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
  },
  methods: {
    onGridReady(params) {
      params.api.sizeColumnsToFit()
    },
    onQuickFilterChanged() {
      this.gridApi.setQuickFilter(this.quickFilter)
    },
    // 导入开始
    ImportCVStoData() {
      const file = this.importfile
      if (file) {
        const reader = new FileReader()
        reader.onload = e => {
          /*  Parse data */
          const bstr = e.target.result
          const wb = XLSX.read(bstr, { type: 'binary' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
          let j = 0
          data.map(item => {
            const ret = {}
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
                .delete('/z_unit/' + val.id)
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
        fileName: 'units.xls',
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
      this.gridApi.updateRowData({ add: newItems })
    },
    saveItems() {
      const selectedData = this.gridApi.getSelectedRows()
      selectedData.forEach(val => {
        if (val.id === undefined) {
          this.$router.app.$http
            .post('/z_unit/', val)
            .then(res => {
              if (res.data.success) {
                this.gridApi.updateRowData({
                  update: [Object.assign(val, res.data.data)]
                })
                this.$zglobal.showMessage(
                  'positive',
                  'center',
                  this.$t('operation.addsuccess')
                )
              } else {
                this.$zglobal.showMessage(
                  'red-7',
                  'center',
                  this.$t('operation.addfailed')
                )
              }
            })
            .catch(e => {})
        } else {
          this.$router.app.$http
            .put('/z_unit/' + val.id, val)
            .then(res => {
              if (res.data.success) {
                this.gridApi.updateRowData({
                  update: [Object.assign(val, res.data.data)]
                })
                this.$zglobal.showMessage(
                  'positive',
                  'center',
                  this.$t('operation.updatesuccess')
                )
                // console.log(res.data.data)
              } else {
                this.$zglobal.showMessage(
                  'red-7',
                  'center',
                  this.$t('operation.updatefailed')
                )
              }
            })
            .catch(e => {})
        }
      })
    },
    Unittree() {
      this.loading = true
      this.DUnitTree = true
      this.$router.app.$http
        .get('/z_unit/getUnitTree')
        .then(res => {
          if (res.data.success) {
            // console.log(res.data.data)
            this.Unitdata = res.data.data
            console.log(this.Unitdata)
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
          this.DUnitTree = false
        })
    },
    EditUnittree() {
      this.loading = true
      this.$router.app.$http
        .post('/z_unit/setUnitTree/' + this.Unitdata[0].id, this.Unitdata)
        .then(res => {
          if (res.data.success) {
            this.loading = false
            this.DUnitTree = false
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
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.Units-agGrid .ag-header {
  background-color: #996699;
  color: #ffffff;
}
.Units-agGrid .ag-cell {
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
  color: #996699;
}
</style>
