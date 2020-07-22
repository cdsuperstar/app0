<template>
  <q-page padding class="q-pa-ma">
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
          @uploading="upfileing"
          @uploaded="upfilished"
        >
          <template v-slot:list="scope">
            <div class="text-right">
              <q-btn
                v-close-popup
                flat
                round
                color="primary"
                size="sm"
                icon="close"
                title="关闭此窗口"
                :disable="fileupdone"
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
    <q-dialog v-model="DaddProjdata">
      <q-card style="width: 1000px; max-width: 80vw;">
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
            <span class="text-subtitle1 text-weight-bold"> 添加项目数据</span>
          </q-toolbar-title>
          <q-btn
            flat
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="aDDNewProjdata()"
          />
        </q-toolbar>
        <q-separator />
        <q-card-section style="max-height: 80vh" class="scroll">
          <q-input
            v-model.trim="data.title"
            type="text"
            style="max-width: 500px"
            autofocus
            label="数据名称"
            :error="$v.data.title.$error"
            error-message="请输入数据名称！"
            @blur="$v.data.title.$touch"
          />
          <div class="col-3 row q-gutter-lg items-start">
            <q-select
              v-model.trim="data.user_id"
              style="min-width: 200px;max-width: 200px"
              :options="useroptions"
              label="所属项目"
              emit-value
              map-options
            />
            <q-select
              v-model.trim="data.user_id"
              style="min-width: 200px;max-width: 200px"
              :options="useroptions"
              label="检测设备"
              emit-value
              map-options
            />

            <q-input
              v-model.trim="data.title"
              type="text"
              style="min-width: 150px;max-width: 200px"
              autofocus
              label="里程(Km)"
              :error="$v.data.title.$error"
              error-message="请输入里程！"
              @blur="$v.data.title.$touch"
            />
          </div>
          <div class="col-md-8 q-mt-md">
            <q-editor
              v-model="data.content"
              :definitions="{
                upload: {
                  label: '附件',
                  icon: 'cloud_upload',
                  tip: '上传附件',
                  handler: uploadFile
                }
              }"
              :label="this.$t('article.content')"
              :toolbar="[
                ['left', 'center', 'right', 'justify'],
                ['bold', 'italic', 'strike', 'underline'],
                ['print', 'fullscreen'],
                ['upload', 'viewsource']
              ]"
            />
          </div>
        </q-card-section>
        <q-separator />
      </q-card>
    </q-dialog>
    <q-dialog v-model="opDetectionwindow">
      <q-card class="q-dialog-plugin bg-secondary ">
        <q-toolbar>
          <q-icon color="white" size="26px" name="image_search" />
          <q-toolbar-title>
            <span class="text-white text-weight-bold">
              检测数据（模型选择）</span
            >
          </q-toolbar-title>
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
            color="negative"
            :title="this.$t('buttons.close')"
          />
        </q-toolbar>
        <q-separator color="secondary" />

        <q-card-section class="q-pt-none">
          <q-select
            v-model.trim="data.user_id"
            class="text-white"
            color="white"
            label-color="white"
            style="min-width: 200px;max-width: 200px"
            :options="useroptions"
            label="选择模型"
            emit-value
            map-options
          />
        </q-card-section>
        <q-separator color="info" />
        <q-card-actions align="right" class="text-primary bg-white ">
          <q-btn flat class="text-weight-bold" label="开始检测" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t('p3s1.proj_data') }}
      <q-banner
        v-if="currentrowdataid"
        dense
        rounded
        class="text-h6 bg-textinfo"
      >
        <q-icon name="warning" color="negative" siae="10px" />
        ID【<font class="text-warning">{{ currentrowdataid }}</font>
        】 待保存文件：
        <font class="text-warning">{{ files }}</font>
      </q-banner>
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px">
      <q-btn
        color="addbtn"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.add')"
        @click="addItems()"
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
      <q-btn
        color="treebtn"
        text-color="white"
        class="q-ma-xs"
        icon="image_search"
        label="检测"
        @click="Detectiondata()"
      />
      <q-btn
        color="expbtn"
        text-color="white"
        class="q-ma-xs"
        icon="cloud_download"
        :label="this.$t('buttons.export')"
        @click="ExportDataAsCVS()"
      />
      <q-space v-if="$q.screen.gt.xs" />
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
        class="ag-theme-balham p3s1proj-dataGrid"
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
import agAttachmentCellRander from '../../frameworkComponents/agAttachmentCellRander'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'P3s1proj_data',
  components: {
    AgGridVue
  },
  data() {
    return {
      DaddFiles: false,
      files: [],
      currentrowdataid: null,
      fileupdone: false,
      DaddProjdata: false,
      opDetectionwindow: false,
      quickFilter: null,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      getRowStyle: null,
      changerowcolor: null,
      defaultColDef: null,
      data: {
        title: '',
        user_id: '',
        created_date: '',
        files: [],
        content: ''
      }
    }
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
          headerName: '数据名称',
          field: 'title',
          width: 260,
          minWidth: 260,
          maxWidth: 360,
          editable: true,
          sortable: true,
          filter: true
        },
        {
          headerName: '检测设备',
          field: 'title',
          width: 120,
          minWidth: 120,
          maxWidth: 200,
          editable: true,
          sortable: true,
          filter: true
        },
        {
          headerName: '里程(Km)',
          field: 'title',
          width: 100,
          minWidth: 100,
          maxWidth: 200,
          editable: true,
          sortable: true,
          filter: true
        },
        {
          headerName: '附件',
          field: 'pro_files',
          width: 90,
          minWidth: 90,
          editable: true,
          filter: true,
          cellRendererFramework: agAttachmentCellRander,
          cellRendererParams: {
            down: this.downloadfile,
            del: this.deletefile,
            add: this.addfile
          }
        },
        {
          headerName: '项目类型',
          field: 'title',
          width: 95,
          minWidth: 95,
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
          headerName: '项目名称',
          field: 'title',
          width: 260,
          minWidth: 260,
          maxWidth: 360,
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
        fileName: 'p3s1projdata.xls',
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
      this.DaddProjdata = true
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
          if (this.files.length) {
            val.pro_files = this.files
          }
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
    aDDNewProjdata() {
      // 文件上传
      // console.log(this.data)
      // var formData = new FormData()
      // for (const key in this.data) {
      //   formData.append(key, this.data[key])
      // }
      // formData.append('files[]', this.$refs.fileuper.files)
      // // 文件结束

      this.$router.app.$http.post('/article/', this.data).then(res => {
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
    Detectiondata() {
      this.opDetectionwindow = true
    },
    // 文件上传
    checkFileSize(files) {
      return files.filter(file => file.size < 20480000)
    },
    uploadFile() {
      this.DaddFiles = true
      this.files = []
    },
    upfileing() {
      this.fileupdone = true
    },
    upfilished(info) {
      this.files.push(info.files[0].name)
      this.fileupdone = false
    },
    downloadfile(rowid, filename, fn) {
      this.$router.app.$http
        .post('/p2/s1/p2s1questionnaire1/downAttachFile/' + rowid, {
          filename: filename,
          collection: fn
        })
        .then(res => {
          console.log(res, '----------')
          if (res.data.success) {
            window.open(res.data.data, '_blank')
          }
        })
        .catch(e => {})
      // end
    },
    deletefile(rowid, rowdata, filename) {
      console.log(rowid, filename, 'del')
      this.$router.app.$http
        .post('/p2/s1/p2s1questionnaire1/deleteAttachFile/' + rowid, {
          filename: filename,
          collection: 'q_files'
        })
        .then(res => {
          if (res.data.success) {
            console.log(res)
            this.gridApi.updateRowData({
              update: [Object.assign(rowdata, res.data.data)]
            })
            this.$zglobal.showMessage(
              'positive',
              'center',
              this.$t('operation.delsuccess')
            )
          }
        })
        .catch(e => {})
    },
    addfile(rowdata) {
      this.currentrowdataid = rowdata.data.id
      this.uploadFile()
    }
  },
  validations: {
    data: {
      title: {
        required
      },
      createddate: {
        required
      }
    }
  }
}
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.p3s1proj-dataGrid .ag-header {
  background-color: var(--q-color-secondary);
  color: #ffffff;
  font-size: 13px;
}
.p3s1proj-dataGrid .ag-cell {
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
