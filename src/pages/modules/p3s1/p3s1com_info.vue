<template>
  <q-page padding class="q-pa-ma">
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t('p3s1.com_info') }}
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        color="savebtn"
        text-color="white"
        class="q-ma-xs"
        icon="save"
        :label="this.$t('buttons.save')"
        @click="saveItems()"
      />
      <q-space />
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
    <div class="shadow-1">
      <ag-grid-vue
        style="width: 100%; height: 500px;"
        class="ag-theme-balham p3s1cominfo-agGrid"
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
import agDateCellRender from '../../frameworkComponents/agDateCellRender'

export default {
  name: 'P3s1com_info',
  components: {
    AgGridVue
  },
  data() {
    return {
      loading: false,
      quickFilter: null,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: [],
      getRowStyle: null,
      changerowcolor: null,
      defaultColDef: null
    }
  },
  computed: {},
  created() {
    this.$router.app.$http
      .get('/profile/getMyProfile/')
      .then(res => {
        if (res.data.success) {
          this.rowData.push(res.data.data)
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
  beforeMount() {
    this.initGrid()
  },
  mounted() {
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
  },
  methods: {
    initGrid() {
      this.gridOptions = {
        rowHeight: 32,
        headerHeight: 32,
        allowShowChangeAfterFilter: true
      }
      this.frameworkComponents = {
        agDateCellRender: agDateCellRender
      }
      this.columnDefs = [
        {
          headerName: 'ID',
          field: 'id',
          width: 70,
          minWidth: 70,
          maxWidth: 70,
          sortable: true,
          editable: false,
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true
        },
        {
          headerName: '公司名称',
          field: 'no',
          width: 130,
          minWidth: 130,
          maxWidth: 180,
          editable: true,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('auth.users.profile.phone1'),
          field: 'phone',
          width: 120,
          minWidth: 120,
          maxWidth: 180,
          editable: true,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('auth.users.profile.phone2'),
          field: 'tel',
          width: 150,
          minWidth: 150,
          maxWidth: 200,
          editable: true,
          sortable: true,
          filter: true,
          cellEditor: 'agLargeTextCellEditor',
          cellEditorParams: {
            maxLength: '3000', // override the editor defaults
            cols: '30',
            rows: '2'
          }
        },
        {
          headerName: this.$t('auth.users.profile.address'),
          field: 'address',
          width: 150,
          minWidth: 150,
          maxWidth: 200,
          editable: true,
          sortable: true,
          filter: true,
          cellEditor: 'agLargeTextCellEditor',
          cellEditorParams: {
            maxLength: '3000', // override the editor defaults
            cols: '30',
            rows: '2'
          }
        },
        {
          headerName: this.$t('auth.users.profile.remark'),
          field: 'memo',
          width: 150,
          minWidth: 150,
          maxWidth: 200,
          editable: true,
          sortable: true,
          filter: true,
          cellEditor: 'agLargeTextCellEditor',
          cellEditorParams: {
            maxLength: '30000', // override the editor defaults
            cols: '50',
            rows: '5'
          }
        },
        {
          headerName: this.$t('dataAGgrid.created_at'),
          field: 'created_at',
          width: 110,
          minWidth: 110,
          maxWidth: 150,
          editable: false,
          sortable: true,
          filter: true
        }
      ]
      this.defaultColDef = {
        editable: true,
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
.p3s1cominfo-agGrid .ag-header {
  background-color: var(--q-color-secondary);
  color: #ffffff;
  font-size: 13px;
}
.p3s1cominfo-agGrid .ag-cell {
  padding-left: 1px;
  font-size: 13px;
}
.ag-theme-balham .ag-ltr .ag-cell {
  padding-left: 1px;
  border-right: 1px solid rgba(233, 233, 233, 0.96);
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
