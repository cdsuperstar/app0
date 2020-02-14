<template>
  <q-page padding class="q-pa-lg">
    <div class="text-h5 q-ma-md text-teal-6">
      {{ $t('models.header') }}
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
        icon="remove_red_eye"
        :label="this.$t('buttons.show')"
        @click="test()"
      />
      <q-btn
        color="blue-grey-5"
        text-color="white"
        class="q-ma-xs"
        icon="update"
        :label="this.$t('buttons.tree')"
        @click="Modeltree()"
      />
    </div>
    <div class="shadow-1">
      <q-input
        color="purple-12"
        v-model="quickFilter"
        v-on:input="onQuickFilterChanged()"
        label="请输入全局查询值"
      >
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>
      <ag-grid-vue
        style="width: 100%; height: 500px;"
        class="ag-theme-balham Models-agGrid"
        rowSelection="multiple"
        rowMultiSelectWithClick="true"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :defaultColDef="defaultColDef"
        :pagination="true"
        :paginationPageSize="10"
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
  name: 'modules',
  computed: {},
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
      defaultColDef: null
    }
  },
  beforeMount() {
    this.gridOptions = {}
    this.columnDefs = [
      {
        editable: false,
        headerName: 'ID',
        field: 'id',
        width: 30,
        sortable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        headerName: '模块名',
        field: 'name',
        width: 100,
        sortable: true,
        filter: true
      },
      {
        headerName: '标题',
        field: 'title',
        width: 100,
        sortable: true,
        filter: true
      },
      {
        headerName: 'ICON',
        field: 'icon',
        width: 50,
        sortable: true,
        filter: true
      },
      {
        headerName: '类型',
        field: 'ismenu',
        width: 40,
        sortable: true,
        filter: true
      },
      {
        headerName: '路径名',
        field: 'url',
        width: 100,
        sortable: true,
        filter: true
      },
      {
        headerName: '创建时间',
        field: 'created_at',
        width: 80,
        editable: false,
        sortable: true,
        filter: true
      },
      {
        headerName: '更新时间',
        field: 'updated_at',
        width: 80,
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
  created() {
    this.$router.app.$http
      .get('/z_module/')
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.data)
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
    test() {
      console.log('Its test')
    },
    delItems() {
      var selectedData = this.gridApi.getSelectedRows()

      selectedData.forEach(val => {
        this.$router.app.$http
          .delete('/z_module/' + val.id)
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
    saveItems() {
      var selectedData = this.gridApi.getSelectedRows()

      selectedData.forEach(val => {
        this.$router.app.$http
          .post('/z_module/', val)
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
    Modeltree() {
      this.$router.app.$http
        .get('/z_module/getMyMenu')
        .then(res => {
          if (res.data.success) {
            console.log(res.data.data)
          } else {
          }
        })
        .catch(e => {})
    },
    onTest(params) {
      if (params.data.id === undefined || params.oldValue === params.newValue) {
        console.log('Edit null or value not changed.')
        return false
      }
      this.$router.app.$http
        .put('/z_module/' + params.data.id, params.data)
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
</style>
