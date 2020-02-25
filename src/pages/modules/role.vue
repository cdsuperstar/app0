<template>
  <q-page padding class="q-pa-lg">
    <div class="text-h5 q-ma-md text-teal-6">
      {{ $t('roles.header') }}
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
        color="green-5"
        text-color="white"
        class="q-ma-xs"
        icon="account_tree"
        :label="this.$t('buttons.setrole')"
        @click="ShowUnittree()"
      />
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
    <div class="row q-ma-md">
      <div class="col-ma-md-5">
        <ag-grid-vue
          style="width: 100%; height: 500px;"
          class="ag-theme-balham Role-agGrid"
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
      <div class="col-md-5" style="margin-left: 15px;">
        <q-card flat>
          <q-toolbar style="min-height:20px;">
            <q-toolbar-title dense>
              <span class="text-subtitle1 text-weight-bold">
                {{ $t('roles.editroleltree') }}</span
              >
            </q-toolbar-title>
            <q-btn
              flat
              color="orange-10"
              icon="save_alt"
              :label="this.$t('buttons.confirm')"
              @click="EditUnittree()"
            />
          </q-toolbar>
          <q-separator />
          <q-card-section
            style="min-height:10vh;max-height: 80vh"
            class="scroll"
          >
            <q-tree
              node-key="id"
              ref="myroletree"
              label-key="title"
              tick-strategy="strict"
              control-color="deep-orange-6"
              :nodes="Roledata"
              :ticked.sync="roleticked"
            />
          </q-card-section>
          <q-inner-loading :showing="loading">
            <q-spinner-gears size="80px" color="primary" />
          </q-inner-loading>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import { mapState } from 'vuex'

export default {
  name: 'Roles',
  components: {
    AgGridVue
  },
  data() {
    return {
      loading: false,
      Roledata: [],
      roleticked: null,
      quickFilter: null,
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
  computed: {
    ...mapState('zero', ['ZModules'])
  },
  beforeMount() {
    this.gridOptions = {
      allowShowChangeAfterFilter: true
    }
    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        width: 50,
        sortable: true,
        editable: false,
        minWidth: 50,
        checkboxSelection: true
      },
      {
        headerName: '标识',
        field: 'name',
        width: 100,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 100
      },
      {
        headerName: '名称',
        field: 'title',
        width: 120,
        editable: true,
        sortable: true,
        filter: true,
        minWidth: 120
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
      .get('/z_role/')
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
                .delete('/z_role/' + val.id)
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
            .post('/z_role', val)
            .then(res => {
              // console.log(res.data.data)
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
            .put('/z_role' + val.id, val)
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
    ShowUnittree() {
      this.loading = true
      var selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length === 1 && selectedData[0].id !== undefined) {
        this.loading = true
        this.Roledata = this.ZModules
        this.$nextTick(() => {
          this.$refs.myroletree.setExpanded(1, true)
        })
        this.$router.app.$http
          .get('/zero/getRoleModules/' + selectedData[0].id)
          .then(resmy => {
            if (resmy.data.success) {
              this.roleticked = resmy.data.data
              this.loading = false
              this.$zglobal.showMessage(
                'positive',
                'center',
                this.$t('roles.getrowssuccess')
              )
            } else {
            }
          })
      } else {
        this.$zglobal.showMessage('red-5', 'center', this.$t('roles.rowserror'))
      }
      this.loading = false
    },
    EditUnittree() {
      this.loading = true
      var selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length === 1 && selectedData[0].id !== undefined) {
        this.$router.app.$http
          .post('/zero/setRoleModules/' + selectedData[0].id, {
            modules: this.roleticked
          })
          .then(res => {
            if (res.data.success) {
              this.$zglobal.showMessage(
                'positive',
                'center',
                this.$t('success') + ':' + res.data.data
              )
            }
          })
          .catch(error => {
            if (error.status) {
              this.$zglobal.showMessage(
                'red-5',
                'center',
                this.$t('auth.register.invalid_data')
              )
            }
          })
        this.loading = false
      } else {
        this.$zglobal.showMessage('red-5', 'center', this.$t('roles.rowserror'))
      }
    }
  }
}
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.Role-agGrid .ag-header {
  background-color: #339999;
  color: #ffffff;
}
.Role-agGrid .ag-cell {
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
