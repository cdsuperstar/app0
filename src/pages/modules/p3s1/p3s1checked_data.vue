<template>
  <q-page padding class="q-pa-ma">
    <q-dialog v-model="editwindow" full-width full-height>
      <q-card>
        <q-toolbar class="bg-primary text-white">
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
            :title="this.$t('buttons.close')"
          />
          <q-toolbar-title>
            <div class="text-weight-bold">
              编辑已检数据
            </div>
          </q-toolbar-title>
          <div class="col-3">
            <q-select
              v-model.trim="signtype"
              :options="typeoptions"
              label="设置标记类型"
              color="#e6eef5"
              label-color="white"
              standout="bg-primary text-white"
              map-options
              stretch
              style="min-width:15em;max-width: 15em;"
              @input="setactivetype"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label"></q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle
                      v-model="showtype"
                      color="green"
                      checked-icon="check"
                      unchecked-icon="clear"
                      :val="scope.opt.value"
                      @input="showsigntype"
                    />
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:append>
                <q-icon name="visibility" />
              </template>
            </q-select>
          </div>
          <q-btn
            flat
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="aDDNewProjdata()"
          />
        </q-toolbar>

        <q-card-section class="q-pt-none">
          <ui-marker
            ref="aiPanel-editor"
            class="ai-observer"
            width="100%"
            v-bind:uniqueKey="uuid"
            :ratio="16 / 9"
            v-bind:imgUrl="currentImage"
            @vmarker:onAnnoAdded="onAnnoAdded"
            @vmarker:onAnnoSelected="onAnnoSelected"
            @vmarker:onUpdated="onUpdated"
          >
          </ui-marker>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t('p3s1.checked_data') }}
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        color="addbtn"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.edit')"
        @click="editItems()"
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
      <q-separator
        v-if="!$q.screen.gt.xs"
        class="col-10 q-ma-xs"
        color="info"
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
        class="ag-theme-balham p3s1checked-dataGrid"
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
import { AIMarker } from 'vue-picture-bd-marker'

export default {
  name: 'P3s1checked_data',
  components: {
    AgGridVue,
    'ui-marker': AIMarker
  },
  data() {
    return {
      currecttype: [],
      editwindow: false,
      quickFilter: null,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      getRowStyle: null,
      changerowcolor: null,
      defaultColDef: null,
      uuid: '0da9130',
      currentImage: '../statics/09.jpg',
      renderData: null,
      dataset: {},
      signtype: null,
      showtype: [],
      typeoptions: [
        {
          label: '裂缝',
          value: 1
        },
        {
          label: '空洞',
          value: 2
        },
        {
          label: 'Twitter',
          value: 3
        },
        {
          label: 'Apple',
          value: 4
        },
        {
          label: '其他隐患',
          value: 5
        }
      ]
    }
  },
  created() {
    // this.$router.app.$http
    //   .get('/z_unit/')
    //   .then(res => {
    //     if (res.data.success) {
    //       this.rowData = res.data.data
    //     } else {
    //     }
    //   })
    //   .catch(e => {})
    // 行数据
    this.rowData = [
      { cl1: 'itxst.com', cl2: 20101, cl3: 23123 },
      { cl1: 'A', cl2: 20101, cl3: 23123 },
      { cl1: 'A', cl2: 20101, cl3: 23123 },
      { cl1: 'B', cl2: 20101, cl3: 23123 },
      { cl1: 'B', cl2: 20101, cl3: 23123 }
    ]

    // 多模拟几行数据出来
    for (var i = 1; i < 5; i++) {
      this.rowData.push({ cl1: 'YKK11', cl2: 332 * i, cl3: 562 * i })
    }
  },
  beforeMount() {
    this.initGrid()
  },
  mounted() {
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
  },
  methods: {
    // 标记
    onAnnoAdded(data) {
      if (this.signtype !== null) {
        this.$refs['aiPanel-editor'].getMarker().setTag({
          tagName: this.signtype.label,
          tag: this.signtype.value
        })
        console.log(data, '====onAnnoAdded', this.showtype)
        // 当你想限制标记个数时
      } else {
        this.$zglobal.showMessage('red-7', 'center', '先选择标注类型')
        this.$refs['aiPanel-editor'].getMarker().clearData()
      }
    },
    onAnnoSelected(data) {
      console.log(data, '+++onAnnoSelected')
    },
    onUpdated(data) {
      console.log(data, '+++onUpdated')
    },
    // end
    initGrid() {
      this.gridOptions = {
        rowHeight: 32,
        headerHeight: 32,
        allowShowChangeAfterFilter: true
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
          headerName: '项目名称',
          field: 'cl1',
          width: 260,
          minWidth: 260,
          maxWidth: 360,
          editable: true,
          sortable: true,
          filter: true
        },
        {
          headerName: '项目数据',
          field: 'cl1',
          width: 260,
          minWidth: 260,
          maxWidth: 360,
          editable: true,
          sortable: true,
          filter: true
        },
        {
          headerName: '模型',
          field: 'cl2',
          width: 90,
          minWidth: 90,
          maxWidth: 110,
          editable: true,
          sortable: true,
          filter: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: Object.keys(this.$t('p3s1.projtypeoptions'))
          },
          valueFormatter: this.gettypeSelector
        },
        {
          headerName: '检测结果',
          field: 'cl3',
          width: 100,
          minWidth: 100,
          maxWidth: 200,
          editable: true,
          sortable: true,
          filter: true
        },
        {
          headerName: '备注',
          field: 'brief',
          colId: 'date',
          width: 150,
          minWidth: 150,
          maxWidth: 260,
          editable: true,
          sortable: true,
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
          minWidth: 130,
          maxWidth: 180,
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
    gettypeSelector(params) {
      const mapMenu = this.$t('p3s1.projtypeoptions')
      return mapMenu[params.value]
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
        fileName: 'p3s1com_proj.xls',
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
    editItems() {
      this.editwindow = true
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
    // 处理设置活动类型
    setactivetype() {
      console.log(this.signtype, '----------signtype')
      if (this.showtype.includes(this.signtype.value)) {
        console.log('ok..')
      } else {
        this.$zglobal.showMessage(
          'red-7',
          'center',
          '请注意：选定类型当前被隐藏，不支持编辑！'
        )
      }
    },
    showsigntype() {
      console.log(this.showtype, '----------showtype')
    }
  }
}
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.p3s1checked-dataGrid .ag-header {
  background-color: var(--q-color-secondary);
  color: #ffffff;
  font-size: 13px;
}
.p3s1checked-dataGrid .ag-cell {
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
