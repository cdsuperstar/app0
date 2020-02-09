<template>
  <q-page class="flex flex-center">
    <q-btn @click="test()">值。。。</q-btn>
    <q-btn @click="del()">测试删除</q-btn>
    <q-btn @click="addItems()">测试增加</q-btn>
    <q-btn @click="testadd()">增加选定</q-btn>

    <q-btn @click="testtree()">测试树</q-btn>

    <q-card>
      <ag-grid-vue
        style="width: 1000px; height: 500px;"
        class="ag-theme-balham"
        rowSelection="multiple"
        rowMultiSelectWithClick="true"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :defaultColDef="defaultColDef"
        @grid-ready="onGridReady"
        @cellValueChanged="onTest"
        @rowSelected="onRowSelected"
        @selectionChanged="onSelectionChanged"
      >
      </ag-grid-vue>
    </q-card>
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
        checkboxSelection: true,
        editable: false,
        headerName: 'ID',
        field: 'id',
        sortable: true
      },
      {
        headerName: '单位名',
        field: 'name',
        sortable: true,
        filter: true
      },
      {
        headerName: '单位简介',
        field: 'title',
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
    testadd() {
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
    testtree() {
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
