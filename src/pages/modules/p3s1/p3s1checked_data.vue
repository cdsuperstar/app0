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
          <q-btn
            flat
            round
            dense
            icon="cached"
            :title="this.$t('buttons.refresh')"
            @click="refreshdata"
          />
          <q-toolbar-title>
            <div v-if="$q.screen.gt.xs" class="text-weight-bold">
              编辑已检数据
            </div>
          </q-toolbar-title>

          <q-select
            v-model.trim="signtype"
            :options="typeoptions"
            label="设置标记类型"
            dark
            label-color="white"
            options-selected-class="text-orange"
            popup-content-class="bg-positive"
            map-options
            stretch
            :style="
              $q.screen.gt.xs
                ? 'min-width:15em;max-width: 15em;'
                : 'min-width:8em;max-width: 8em;'
            "
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

          <q-btn
            flat
            stretch
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
            :uniqueKey="uuid"
            :ratio="16 / 9"
            :imgUrl="currentImage"
            @vmarker:onImageLoad="onImageLoad"
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
        row-selection="single"
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
      dataset: {},
      signtype: null,
      showtype: [1, 2, 3, 4, 5],
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
      ],
      currentrendData: [],
      rendData: [
        {
          tag: 1,
          tagName: '裂缝',
          position: { x: '49.424%', y: '20.657%', x1: '58.99%', y1: '30.105%' },
          uuid: 'E82D0D6822CCC9AF'
        },
        {
          tag: 1,
          tagName: '裂缝',
          position: {
            x: '65.988%',
            y: '20.815%',
            x1: '76.085%',
            y1: '31.995%'
          },
          uuid: 'ACAB50D7A056004B'
        },
        {
          tag: 3,
          tagName: 'Twitter',
          position: {
            x: '33.304%',
            y: '47.741%',
            x1: '48.539%',
            y1: '59.551%'
          },
          uuid: 'F4040EC41F15822A'
        },
        {
          tag: 3,
          tagName: 'Twitter',
          position: {
            x: '55.004%',
            y: '57.819%',
            x1: '66.253%',
            y1: '65.062%'
          },
          uuid: 'F10B9993FC7E6AE7'
        },
        {
          tag: 2,
          tagName: '空洞',
          position: {
            x: '14.438%',
            y: '27.586%',
            x1: '23.207%',
            y1: '37.349%'
          },
          uuid: '69507DF085E19689'
        },
        {
          tag: 2,
          tagName: '空洞',
          position: {
            x: '29.495%',
            y: '22.075%',
            x1: '38.087%',
            y1: '31.523%'
          },
          uuid: '589FE98CF55D095D'
        },
        {
          tag: 2,
          tagName: '空洞',
          position: {
            x: '17.626%',
            y: '53.095%',
            x1: '26.838%',
            y1: '64.432%'
          },
          uuid: '6AB638E8198FE9B9'
        },
        {
          tag: 2,
          tagName: '空洞',
          position: {
            x: '66.608%',
            y: '40.026%',
            x1: '74.403%',
            y1: '46.010000000000005%'
          },
          uuid: '8E0B6D91F9717C3F'
        },
        {
          tag: 5,
          tagName: '其他隐患',
          position: {
            x: '48.007%',
            y: '38.293%',
            x1: '60.762%',
            y1: '47.111%'
          },
          uuid: '648DA71E9D7B1927'
        },
        {
          tag: 5,
          tagName: '其他隐患',
          position: {
            x: '73.074%',
            y: '56.402%',
            x1: '82.286%',
            y1: '66.795%'
          },
          uuid: 'AA919670E78A214F'
        },
        {
          tag: 5,
          tagName: '其他隐患',
          position: {
            x: '26.129%',
            y: '35.302%',
            x1: '34.632000000000005%',
            y1: '42.388%'
          },
          uuid: 'B7AB08A5436699BD'
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
    // 当图片加载完成后，vmarker会发送一个onImageLoad 的事件
    onImageLoad(data) {
      console.log(JSON.stringify(data), 'pic.....')
      // 加载渲染数据
      this.$refs['aiPanel-editor'].getMarker().clearData()
      if (this.currentrendData.length > 0) {
        this.$refs['aiPanel-editor']
          .getMarker()
          .renderData(this.currentrendData)
      } else {
        this.$refs['aiPanel-editor'].getMarker().renderData(this.rendData)
      }
    },
    // 标记
    onAnnoAdded(data) {
      // console.log(data, '====onAnnoAdded', JSON.stringify(this.signtype))
      if (this.signtype !== null) {
        this.$refs['aiPanel-editor'].getMarker().setTag({
          tagName: this.signtype.label,
          tag: this.signtype.value
        })
        // console.log(data, '====onAnnoAdded', JSON.stringify(this.showtype))
        // 当你想限制标记个数时
      } else {
        this.$zglobal.showMessage(
          'red-7',
          'center',
          '无效标记：先选择标注类型！'
        )
      }
      // if (this.signtype !== null) {
      //   this.$refs['aiPanel-editor'].getMarker().setTag({
      //     tagName: this.signtype.label,
      //     tag: this.signtype.value
      //   })
      //   console.log(data, '====onAnnoAdded', this.showtype)
      //   // 当你想限制标记个数时
      // } else {
      //   this.$zglobal.showMessage('red-7', 'center', '先选择标注类型')
      //   this.$refs['aiPanel-editor'].getMarker().clearData()
      // }
    },
    onAnnoSelected(data) {
      console.log(data, '+++onAnnoSelected')
    },
    onUpdated(data) {
      // console.log(JSON.stringify(data), '+++onUpdated')
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
          width: 50,
          minWidth: 50,
          maxWidth: 50,
          sortable: true,
          editable: false,
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
      this.signtype = null
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
      console.log(JSON.stringify(this.signtype), '----------signtype')
      if (this.showtype) {
        if (this.showtype.includes(this.signtype.value)) {
          console.log('ok..')
        } else {
          this.$zglobal.showMessage(
            'red-7',
            'center',
            '请注意：选定类型当前被隐藏，不支持编辑！'
          )
        }
      } else {
        this.$zglobal.showMessage('red-7', 'center', '请注意：请选定标记种类！')
      }
    },
    showsigntype() {
      this.signtype = null
      if (this.showtype.length > 0) {
        const typarr = this.showtype
        this.currentrendData = this.rendData.filter(function(item) {
          if (item.tag) {
            return typarr.includes(item.tag) === true // 过滤符合要求的item数组
          }
        })
      }
      this.onImageLoad()
    },
    refreshdata() {
      console.log('刷新数据中………………')
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
