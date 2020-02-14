<template>
  <q-page padding class="q-pa-lg">
    <div class="text-h5 q-ma-md text-teal-6">
      用户管理
    </div>
    <q-separator color="lime-2" />
    <div class="q-ma-md">
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
        @click="del()"
      />

      <q-btn
        color="indigo-5"
        text-color="white"
        class="q-ma-xs"
        icon="save"
        :label="this.$t('buttons.save')"
        @click="testadd()"
      />
      <q-btn
        color="purple-5"
        text-color="white"
        class="q-ma-xs"
        icon="remove_red_eye"
        :label="this.$t('buttons.show')"
        @click="test()"
      />
      <q-btn
        color="blue-grey-5"
        text-color="white"
        class="q-ma-xs"
        icon="update"
        :label="this.$t('buttons.update')"
        @click="test()"
      />
      <q-btn
        color="green-6"
        text-color="white"
        class="q-ma-xs"
        icon="cloud_download"
        :label="this.$t('buttons.export')"
        @click="test()"
      />
    </div>
    <div class="shadow-1">
      <ag-grid-vue
        class="User-agGrid ag-theme-balham"
        style="width: 100%; height: 300px;"
        rowSelection="multiple"
        rowMultiSelectWithClick="true"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :defaultColDef="defaultColDef"
        :localeText="this.$t('aggrid')"
        @grid-ready="onGridReady"
        @cellValueChanged="onTest"
        @rowSelected="onRowSelected"
        @selectionChanged="onSelectionChanged"
      >
      </ag-grid-vue>
    </div>
  </q-page>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'users',
  computed: {},
  components: {
    AgGridVue
  },
  data() {
    return {
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      defaultColDef: null
    }
  },
  beforeMount() {
    this.gridOptions = {
      pagination: 'true',
      paginationPageSize: 10
    }
    this.columnDefs = [
      {
        checkboxSelection: true,
        editable: false,
        headerName: 'ID',
        field: 'id',
        width: 30,
        sortable: true
      },
      {
        headerName: '用户名',
        field: 'name',
        resizable: false,
        width: 80,
        sortable: true,
        filter: true
      },
      {
        headerName: '邮箱',
        field: 'email',
        pinned: 'left',
        resizable: false,
        width: 80,
        sortable: true,
        filter: true
      },
      {
        headerName: '密码',
        field: 'password',
        sortable: true,
        width: 100,
        suppressSizeToFit: true,
        filter: true
      },
      {
        headerName: '系统配置',
        field: 'syscfg',
        sortable: true,
        filter: true
      },
      {
        headerName: '用户配置',
        field: 'usercfg',
        sortable: true,
        filter: true
      },
      {
        headerName: '创建时间',
        field: 'created_at',
        width: 90,
        editable: false,
        sortable: true,
        filter: true
      },
      {
        headerName: '更新时间',
        field: 'updated_at',
        width: 90,
        editable: false,
        sortable: true,
        filter: true
      }
    ]
    this.defaultColDef = {
      editable: true,
      resizable: true
    }
  },
  mounted() {
    // console.log(this.ZModules)
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
    this.$router.app.$http
      .get('/users/')
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.data)
          this.rowData = res.data.data
        } else {
        }
      })
      .catch(e => {})
  },
  methods: {
    // ...mapActions('zero', ['getZModules']),
    onGridReady(params) {
      params.api.sizeColumnsToFit()
    },
    test() {
      console.log(this.rowData)
    },
    del() {
      var selectedData = this.gridApi.getSelectedRows()

      selectedData.forEach(val => {
        this.$router.app.$http
          .delete('/users/' + val.id)
          .then(res => {
            if (res.data.success) {
              this.gridApi.updateRowData({ remove: selectedData })
              console.log(res.data.data)
            } else {
            }
          })
          .catch(e => {})
      })
    },
    onRowSelected(event) {
      console.log()
      // window.alert(
      //   'row ' + event.node.data.athlete + ' selected = ' + event.node.selected
      // )
    },
    onSelectionChanged(event) {
      // var rowCount = event.api.getSelectedNodes().length
      // this.selections = event.api.getSelectedRows()
      // window.alert('selection changed, ' + rowCount + ' rows selected')
    },
    addItems() {
      var newItems = [{}]
      var res = this.gridApi.updateRowData({ add: newItems })
      console.log(res)
    },
    testadd() {
      var selectedData = this.gridApi.getSelectedRows()

      selectedData.forEach(val => {
        this.$router.app.$http
          .post('/users/', val)
          .then(res => {
            if (res.data.success) {
              this.gridApi.updateRowData({ remove: selectedData })
              this.gridApi.updateRowData({ add: [res.data.data] })
            } else {
            }
          })
          .catch(e => {})
      })
    },
    onTest(params) {
      if (params.data.id === undefined || params.oldValue === params.newValue) {
        console.log('Edit null or value not changed.')
        return false
      }
      this.$router.app.$http
        .put('/users/' + params.data.id, params.data)
        .then(res => {
          if (res.data.success) {
            // console.log(res.data.data)
          } else {
          }
        })
        .catch(e => {})
    }
  }
}
</script>

<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.User-agGrid .ag-header {
  background-color: #339999;
  color: #ffffff;
}

.User-agGrid .ag-cell {
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
