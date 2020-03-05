<template>
  <q-page padding class="q-pa-lg">
    <q-dialog v-model="DaddFiles" seamless>
      <q-item-section style="max-width:300px;max-height: 50vh" class="scroll">
        <q-uploader
          style="max-width: 300px"
          :url="this.$axios.defaults.baseURL + '/zero/uploadMyTmpFiles'"
          method="POST"
          multiple
          auto-expand
          :filter="checkFileSize"
          :label="this.$t('article.attachment')"
          :headers="[
            {
              name: 'enctype',
              value: 'multipart/form-data'
            },
            { name: 'Authorization', value: 'Bearer ' + this.$auth.token() }
          ]"
          @uploaded="upfilished"
        >
          <template v-slot:list="scope">
            <div class="text-right">
              <q-btn
                flat
                round
                color="primary"
                size="sm"
                icon="close"
                title="关闭此窗口"
                v-close-popup
              />
            </div>
            <q-list separator>
              <q-item v-for="file in scope.files" :key="file.name">
                <q-item-section>
                  <q-item-label class="full-width ellipsis">
                    {{ file.name }}
                  </q-item-label>

                  <q-item-label caption>
                    Status: {{ file.__status }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                  </q-item-label>
                </q-item-section>

                <q-item-section v-if="file.__img" thumbnail class="gt-xs">
                  <img :src="file.__img.src" />
                </q-item-section>

                <q-item-section top side>
                  <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                    @click="scope.removeFile(file)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </q-uploader>
      </q-item-section>
    </q-dialog>
    <q-dialog v-model="DaddArticle">
      <q-card style="width: 650px; max-width: 80vw;">
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
              {{ $t('p1s1contrm.addfiles') }}</span
            >
          </q-toolbar-title>
          <q-btn
            flat
            color="secondary"
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="aDDNewArticle()"
          />
        </q-toolbar>
        <q-separator />
        <q-card-section style="max-height: 80vh" class="scroll">
          <div class="row">
            <div class="col-12 col-md-4" style="margin-right: 16px;">
              <q-input
                v-model.trim="data.pname"
                type="text"
                style="max-width: 500px"
                autofocus
                :label="this.$t('p1s1contrm.pname')"
              />
            </div>
            <div class="col-12 col-md-3" style="margin-right: 16px;">
              <q-input
                v-model.trim="data.cno"
                type="text"
                style="max-width: 500px"
                autofocus
                :label="this.$t('p1s1contrm.cno')"
              />
            </div>
            <div class="col-12 col-md-3">
              <q-input
                v-model.trim="data.fno"
                type="text"
                style="max-width: 500px"
                autofocus
                :label="this.$t('p1s1contrm.fno')"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-5" style="margin-right: 16px;">
              <q-input
                v-model.trim="data.ofunit"
                type="text"
                style="max-width: 500px"
                autofocus
                :label="this.$t('p1s1contrm.ofunit')"
              />
            </div>
            <div class="col-12 col-md-5">
              <q-input
                v-model.trim="data.impunit"
                type="text"
                style="max-width: 500px"
                autofocus
                :label="this.$t('p1s1contrm.impunit')"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-3" style="margin-right: 16px;">
              <q-select
                v-model.trim="data.ptype"
                style="max-width: 150px;min-width: 150px;"
                :options="ptypeoptions.values"
                :label="this.$t('p1s1contrm.ptype')"
                emit-value
                map-options
              />
            </div>
            <div class="col-12 col-md-3" style="margin-right: 16px;">
              <q-input
                v-model.trim="data.pown"
                type="text"
                style="max-width: 500px"
                autofocus
                :label="this.$t('p1s1contrm.pown')"
              />
            </div>
            <div class="col-12 col-md-3">
              <q-input
                v-model.trim="data.presp"
                type="text"
                style="max-width: 500px"
                autofocus
                :label="this.$t('p1s1contrm.presp')"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-3" style="margin-right: 30px;">
              <q-select
                v-model.trim="data.ctype"
                style="max-width: 150px;min-width: 150px;"
                :options="ctypeoptions.values"
                :label="this.$t('p1s1contrm.ctype')"
                emit-value
                map-options
              />
            </div>
            <div class="col-12 col-md-3" style="margin-right: 10px;">
              <q-input
                v-model.trim="data.cbdate"
                style="max-width: 150px"
                :label="this.$t('p1s1contrm.cbdate')"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model.trim="data.cbdate"
                        color="orange"
                        mask="YYYY-MM-DD"
                        text-color="black"
                        first-day-of-week="1"
                        @input="() => $refs.qDateProxy.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-3">
              <q-input
                v-model.trim="data.cedate"
                style="max-width: 150px"
                :label="this.$t('p1s1contrm.cbdate')"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model.trim="data.cedate"
                        color="orange"
                        mask="YYYY-MM-DD"
                        text-color="black"
                        first-day-of-week="1"
                        @input="() => $refs.qDateProxy.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row">
            <div
              class="col-12 col-md-12"
              style="margin-right: 30px;margin-top: 10px;"
            >
              <q-editor
                v-model="data.memo"
                :definitions="{
                  upload: {
                    label: '附件',
                    icon: 'cloud_upload',
                    tip: '上传附件',
                    handler: uploadFile
                  }
                }"
                :label="this.$t('p1s1contrm.memo')"
                :toolbar="[
                  ['left', 'center', 'right', 'justify'],
                  ['bold', 'italic', 'strike', 'underline'],
                  ['print', 'fullscreen'],
                  ['upload', 'viewsource']
                ]"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator />
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-teal-6">
      {{ $t('p1s1contrm.header') }}
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
        style="width: 100%; height: 480px;"
        class="ag-theme-balham Article-agGrid"
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
import agAttachmentCellRander from '../../frameworkComponents/agAttachmentCellRander'
import agDateCellRender from '../../frameworkComponents/agDateCellRender'

export default {
  name: 'p1s1contrm',
  components: {
    AgGridVue
  },
  data() {
    return {
      DaddArticle: false,
      DaddFiles: false,
      quickFilter: null,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      getRowStyle: null,
      changerowcolor: null,
      defaultColDef: null,
      ctypeoptions: this.$t('p1s1contrm.ctypeoptions'),
      ptypeoptions: this.$t('p1s1contrm.ptypeoptions'),
      data: {
        pname: '',
        cno: '',
        fno: '',
        ofunit: '',
        impunit: '',
        pown: '',
        presp: '',
        ptype: '',
        ctype: '',
        cbdate: '',
        cedate: '',
        memo: this.$t('p1s1contrm.memo'),
        files: []
      }
    }
  },
  computed: {},
  beforeMount() {
    this.gridOptions = {
      allowShowChangeAfterFilter: true
    }
    this.frameworkComponents = {
      agAttachmentCellRander: agAttachmentCellRander,
      agDateCellRender: agDateCellRender
    }
    this.columnDefs = [
      {
        editable: false,
        headerName: 'ID',
        field: 'id',
        width: 55,
        minWidth: 55,
        sortable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        headerName: this.$t('p1s1contrm.pname'),
        field: 'pname',
        width: 200,
        minWidth: 200,
        sortable: true,
        filter: true
      },
      {
        headerName: this.$t('p1s1contrm.cno'),
        field: 'cno',
        width: 120,
        minWidth: 120,
        sortable: true,
        filter: true
      },
      {
        headerName: this.$t('p1s1contrm.fno'),
        field: 'fno',
        width: 120,
        minWidth: 120,
        sortable: true,
        filter: true
      },
      {
        headerName: this.$t('p1s1contrm.ofunit'),
        field: 'ofunit',
        width: 120,
        minWidth: 120,
        sortable: true,
        filter: true
      },
      {
        headerName: this.$t('p1s1contrm.impunit'),
        field: 'impunit',
        width: 120,
        minWidth: 120,
        sortable: true,
        filter: true
      },
      {
        headerName: this.$t('p1s1contrm.pown'),
        field: 'pown',
        width: 120,
        minWidth: 120,
        sortable: true,
        filter: true
      },
      {
        headerName: this.$t('p1s1contrm.presp'),
        field: 'presp',
        width: 120,
        minWidth: 120,
        sortable: true,
        filter: true
      },
      {
        headerName: this.$t('p1s1contrm.ptype'),
        field: 'ptype',
        width: 120,
        minWidth: 120,
        sortable: true,
        filter: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: this.ptypeoptions
      },
      {
        headerName: this.$t('p1s1contrm.ctype'),
        field: 'ctype',
        width: 120,
        minWidth: 120,
        sortable: true,
        filter: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: this.ctypeoptions
      },
      {
        headerName: this.$t('p1s1contrm.cbdate'),
        field: 'cbdate',
        width: 120,
        minWidth: 120,
        sortable: true,
        cellRendererFramework: agDateCellRender,
        valueFormatter: dateFormatter,
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
        headerName: this.$t('p1s1contrm.cedate'),
        field: 'cedate',
        width: 120,
        minWidth: 120,
        sortable: true,
        cellRendererFramework: agDateCellRender,
        valueFormatter: dateFormatter,
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
        headerName: this.$t('p1s1contrm.memo'),
        field: 'memo',
        width: 100,
        editable: true,
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
      .get('/p1/s1/p1s1contrm/')
      .then(res => {
        console.log(res)
        if (res.data.success) {
          this.rowData = res.data.data
        } else {
        }
      })
      .catch(e => {})
    // end
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
    checkFileSize(files) {
      return files.filter(file => file.size < 20480000)
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
                .delete('/p1/s1/p1s1contrm/' + val.id)
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
        fileName: 'p1s1contrm.xls',
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
    // Dialog start
    addItems() {
      this.DaddArticle = true
    },
    aDDNewArticle() {
      this.$router.app.$http.post('/p1/s1/p1s1contrm', this.data).then(res => {
        console.log(res)
        if (res.data.success) {
          this.gridApi.updateRowData({
            add: [res.data.data]
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
            this.$t('auth.errors.adderror')
          )
        }
      })
      this.DaddArticle = false
    },
    // Dialog end
    saveItems() {
      const selectedData = this.gridApi.getSelectedRows()
      selectedData.forEach(val => {
        // console.log(val)
        if (val.id === undefined) {
          this.$router.app.$http
            .post('/p1/s1/p1s1contrm/', val)
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
            .put('/p1/s1/p1s1contrm/' + val.id, val)
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
    // 文件上传
    uploadFile() {
      this.DaddFiles = true
      this.data.files = []
    },
    upfilished(info) {
      this.data.files.push(info.files[0].name)
      // this.DaddFiles = false
    }
  }
}

function dateFormatter(params) {
  if (params.value) return params.value.toString().substring(0, 10)
}
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.Article-agGrid .ag-header {
  background-color: #006699;
  color: #ffffff;
}
.Article-agGrid .ag-cell {
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
  color: #006699;
}
</style>
