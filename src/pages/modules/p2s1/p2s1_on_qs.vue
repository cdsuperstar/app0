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
    <q-dialog v-model="editItem">
      <q-card class="q-dialog-plugin">
        <q-toolbar>
          <q-icon color="primary" size="30px" name="account_box" />
          <q-toolbar-title>
            <span class="text-weight-bold"> 修改问卷 </span>
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
        <q-separator color="accent" />
        <div class="q-mb-lg row">
          <q-icon name="where_to_vote" class="text-warning" size="sm" />
          <q-input
            v-model="vote.longitude"
            dense
            disable
            type="text"
            style="max-width: 8em;"
          >
            <template v-slot:before>
              <font size="3">经度</font>
            </template>
          </q-input>
          <q-input
            v-model="vote.latitude"
            dense
            disable
            type="text"
            style="max-width: 7em;"
          >
            <template v-slot:before>
              <font size="3">纬度</font>
            </template>
          </q-input>
        </div>
        <div
          :class="
            $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
          "
        >
          <q-select
            v-model="vote.province"
            dense
            standout="bg-secondary text-white"
            label="省"
            style="min-width: 10em"
            emit-value
            :options="addressoptions"
          />
          <q-select
            v-model="vote.city"
            dense
            standout="bg-secondary text-white"
            label="市"
            style="min-width: 10em"
            emit-value
            :options="cityArray"
          />
          <q-select
            v-model="vote.county"
            dense
            standout="bg-secondary text-white"
            label="区（县）"
            emit-value
            style="min-width: 10em"
            :options="countyArray"
          />
          <q-select
            v-model="vote.town"
            dense
            standout="bg-secondary text-white"
            label="镇（乡）"
            emit-value
            style="min-width: 10em"
            :options="townArray"
          />
        </div>
        <div
          :class="
            $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
          "
        >
          <q-input v-model="vote.village" type="text" label="行政村（社区）" />
          <q-input v-model="vote.group" type="text" label="自然村（组）" />
          <q-select
            v-model="vote.villagetype"
            label="行政村属性"
            style="min-width: 10em"
            :options="['农区', '牧区', '半农半牧区']"
          />
        </div>
        <div
          :class="
            $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
          "
        >
          <q-input
            v-model="vote.investigator1"
            type="text"
            label="调查员1姓名"
          />
          <q-input
            v-model="vote.investigatortel1"
            type="text"
            label="调查员1联系方式"
            mask="### - #### ####"
          />
        </div>
        <div
          :class="
            $q.screen.gt.xs ? 'row items-start q-gutter-md' : 'q-gutter-md'
          "
        >
          <q-input
            v-model="vote.investigator2"
            type="text"
            label="调查员2姓名"
          />
          <q-input
            v-model="vote.investigatortel2"
            type="text"
            label="调查员2联系方式"
            mask="### - #### ####"
          />
        </div>
        <q-separator color="accent" />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            flat
            color="secondary"
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="saveItems()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t('p2s1.qsname') }}
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
    <div class="row q-ma-md" style="margin: 16px 1px;">
      <q-btn
        color="addbtn"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.modifyd')"
        @click="modifyItems()"
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
        icon="cloud_upload"
        :label="this.$t('p2s1.upattachment')"
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
        icon="lock"
        :label="this.$t('p2s1.review')"
        @click="freshJsondata()"
      />
      <q-btn
        color="expbtn"
        text-color="white"
        class="q-ma-xs"
        icon="save_alt"
        :label="this.$t('buttons.export')"
        @click="ExportDataAsCVS()"
      />
      <q-space v-if="$q.screen.gt.xs" />
      <q-input
        v-model="quickFilter"
        dense
        style="max-width: 100px"
        class="q-ml-xs"
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
        class="ag-theme-balham p2sonqs-agGrid"
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

export default {
  name: 'P2s1OnQs',
  components: {
    AgGridVue
  },
  data() {
    return {
      editItem: false,
      vote: {},
      addressoptions: this.$t('p2s1.addressArray'),
      cityArray: [],
      countyArray: [],
      townArray: [],
      DaddFiles: false,
      files: [],
      fileupdone: false,
      currentrowdataid: false,
      loading: true,
      quickFilter: null,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      getRowStyle: null,
      changerowcolor: null,
      frameworkComponents: null,
      defaultColDef: null
    }
  },
  computed: {},
  watch: {
    // 获得列表
    'vote.province'(val, oldval) {
      for (var i in this.addressoptions) {
        if (this.addressoptions[i].value === this.vote.province) {
          this.cityArray = this.addressoptions[i].city
          break
        }
      }
      if (oldval !== val && this.editItem) {
        this.vote.city = ''
      }
    },
    'vote.city'(val, oldval) {
      for (var i in this.cityArray) {
        if (this.cityArray[i].value === this.vote.city) {
          this.countyArray = this.cityArray[i].county
          break
        }
      }
      if (oldval !== val && this.editItem) {
        this.vote.county = ''
      }
    },
    'vote.county'(val, oldval) {
      for (var i in this.countyArray) {
        if (this.countyArray[i].value === this.vote.county) {
          this.townArray = this.countyArray[i].town
          break
        }
      }
      if (oldval !== val && this.editItem) {
        this.vote.town = ''
      }
    }
  },
  created() {
    this.$router.app.$http
      .get('/p2/s1/p2s1questionnaire1/')
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.data)
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
    // console.log(this.ZModules)
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
  },
  methods: {
    initGrid() {
      this.gridOptions = {
        allowShowChangeAfterFilter: true
      }
      this.frameworkComponents = {
        agAttachmentCellRander: agAttachmentCellRander
      }
      this.columnDefs = [
        {
          editable: false,
          headerName: 'ID',
          field: 'id',
          width: 70,
          minWidth: 70,
          maxWidth: 70,
          sortable: true,
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true
        },
        {
          headerName: this.$t('p2s1.no'),
          field: 'no',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('p2s1.qpname'),
          field: 'qtype',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('p2s1.created_at'),
          field: 'created_at',
          width: 120,
          minWidth: 120,
          maxWidth: 180,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('p2s1.conclusion'),
          field: 'c19',
          width: 120,
          minWidth: 120,
          maxWidth: 180,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('p2s1.re_comments'),
          field: 're_comments',
          width: 100,
          minWidth: 100,
          maxWidth: 180,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('p2s1.re_conclusion'),
          field: 're_conclusion',
          width: 100,
          minWidth: 100,
          maxWidth: 180,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('p2s1.reviewer'),
          field: 'reviewer',
          width: 120,
          minWidth: 120,
          maxWidth: 260,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('p2s1.isattachment'),
          field: 'files',
          width: 80,
          minWidth: 80,
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
          headerName: this.$t('p2s1.au_comments'),
          field: 'au_comments',
          width: 120,
          minWidth: 120,
          maxWidth: 260,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('p2s1.au_conclusion'),
          field: 'au_conclusion',
          width: 100,
          minWidth: 100,
          maxWidth: 180,
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
                .delete('/p2/s1/p2s1questionnaire1/' + val.id)
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
        fileName: 'p2s1onqs.xls',
        suppressQuotes: true,
        columnSeparator: ','
      }
      this.gridApi.exportDataAsCsv(params)
    },
    onchangerowcolor() {
      return { backgroundColor: this.changerowcolor }
    },
    oncellValueChanged(params) {
      // console.log(params.oldValue,updateRowData params.newValue)
      if (params.oldValue === null) params.oldValue = ''
      if (params.newValue !== params.oldValue) {
        this.changerowcolor = '#ffa195'
        this.gridApi.redrawRows({
          rowNodes: [this.gridApi.getDisplayedRowAtIndex(params.rowIndex)]
        })
      }
      this.changerowcolor = ''
    },
    modifyItems() {
      var selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length === 1) {
        this.vote = selectedData[0]
        this.$nextTick(() => {
          this.editItem = true
        })
      } else {
        this.$zglobal.showMessage(
          'red-7',
          'center',
          this.$t('operation.rowserror')
        )
      }
    },
    saveItems() {
      const selectedData = this.gridApi.getSelectedRows()
      selectedData.forEach(val => {
        // console.log(val)
        if (val.id) {
          if (this.files.length) {
            val.files = this.files
          }
          this.$router.app.$http
            .put('/p2/s1/p2s1questionnaire1/' + val.id, val)
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
      this.currentrowdataid = false
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
    downloadfile(rowid, filename) {
      this.$router.app.$http
        .post('/p2/s1/p2s1questionnaire1/downAttachFile/' + rowid, {
          filename: filename
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
          filename: filename
        })
        .then(res => {
          if (res.data.success) {
            // console.log(res)
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
  }
}
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.p2sonqs-agGrid .ag-header {
  background-color: var(--q-color-secondary);
  color: #ffffff;
}
.p2sonqs-agGrid .ag-cell {
  padding-left: 1px;
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
