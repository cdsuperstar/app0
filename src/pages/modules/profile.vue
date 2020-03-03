<template>
  <q-page padding class="q-pa-lg">
    <div class="text-h5 q-ma-md text-teal-6">
      {{ $t('auth.users.profile.pheader') }}
    </div>
    <q-separator color="lime-2" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        color="indigo-5"
        text-color="white"
        class="q-ma-xs"
        icon="save"
        :label="this.$t('buttons.save')"
        @click="saveItems()"
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
        class="ag-theme-balham Profile-agGrid"
        row-selection="multiple"
        row-multi-select-with-click="true"
        :grid-options="gridOptions"
        :column-defs="columnDefs"
        :row-data="rowData"
        :default-col-def="defaultColDef"
        :pagination="true"
        :pagination-page-size="50"
        :get-row-style="getRowStyle"
        :framework-components="frameworkComponents"
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
import agDateCellRender from '../frameworkComponents/agDateCellRender'

export default {
  name: 'Roles',
  components: {
    AgGridVue
  },
  data() {
    return {
      quickFilter: null,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      getRowStyle: null,
      changerowcolor: null,
      defaultColDef: null,
      unitMap: {}
    }
  },
  computed: {},
  beforeMount() {
    this.gridOptions = {
      allowShowChangeAfterFilter: true
    }
    this.frameworkComponents = {
      agDateCellRender: agDateCellRender
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
        headerName: this.$t('auth.users.profile.avatar'),
        field: 'avatar',
        width: 130,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 130
      },
      {
        headerName: this.$t('auth.users.profile.no'),
        field: 'no',
        width: 130,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 130
      },
      {
        headerName: this.$t('auth.users.profile.nickname'),
        field: 'name',
        width: 100,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 100
      },
      {
        headerName: this.$t('auth.users.profile.sex'),
        field: 'sex',
        width: 80,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 80,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: Object.keys(this.$t('auth.users.profile.sexoptions'))
        },
        valueFormatter: this.getSelector
      },
      {
        headerName: this.$t('auth.users.profile.birthday'),
        field: 'birth',
        width: 100,
        editable: true,
        sortable: true,
        minWidth: 100,
        cellRendererFramework: agDateCellRender,
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
        headerName: this.$t('auth.users.profile.position'),
        field: 'position',
        width: 100,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 100
      },
      {
        headerName: this.$t('auth.users.profile.title'),
        field: 'title',
        width: 100,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 100
      },
      {
        headerName: this.$t('auth.users.profile.jobs'),
        field: 'jobs',
        width: 100,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 100
      },
      {
        headerName: this.$t('auth.users.profile.department'),
        field: 'unitid',
        width: 150,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 150,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: {}
        },
        valueFormatter: this.getUnitmap,
        cellRenderer: this.getUnitmap
      },
      {
        headerName: this.$t('auth.users.profile.phone1'),
        field: 'phone',
        width: 115,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 115
      },
      {
        headerName: this.$t('auth.users.profile.phone2'),
        field: 'tel',
        width: 150,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 150
      },
      {
        headerName: this.$t('auth.users.profile.address'),
        field: 'address',
        width: 150,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 150
      },
      {
        headerName: this.$t('auth.users.profile.remark'),
        field: 'memo',
        width: 150,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 150
      },
      {
        headerName: '创建时间',
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
      .get('/profile/')
      .then(res => {
        if (res.data.success) {
          this.rowData = res.data.data
        } else {
        }
      })
      .catch(e => {})

    // 得到机构数据
    this.$router.app.$http.get('/z_unit/').then(res => {
      if (res.data.success) {
        this.columnDefs[9].cellEditorParams.values = res.data.data.map(
          ({ title, id }) => id.toString()
        )
        this.unitMap = res.data.data.reduce((acc, v) => {
          acc[v.id] = v.title
          return acc
        }, {})
        // console.log(this.columnDefs[3].refData, '------------')
        // this.UserNames = JSON.stringify(tmpa).replace(/"/g, "'")
      }
    })
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
    getSelector(params) {
      const mapMenu = this.$t('auth.users.profile.sexoptions')
      return mapMenu[params.value]
    },
    getUnitmap(params) {
      return this.unitMap[params.value]
    },
    ExportDataAsCVS() {
      var params = {
        fileName: 'roles.xls',
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
    saveItems() {
      const selectedData = this.gridApi.getSelectedRows()
      selectedData.forEach(val => {
        if (val.id === undefined) {
          this.$router.app.$http
            .post('/profile/', val)
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
            .put('/profile/' + val.id, val)
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
    }
  }
}
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.Profile-agGrid .ag-header {
  background-color: #339999;
  color: #ffffff;
}
.Profile-agGrid .ag-cell {
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
  color: #339999;
}
</style>
