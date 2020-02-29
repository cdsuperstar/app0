<template>
  <q-page padding class="q-pa-lg">
    <q-dialog v-model="DaddUser">
      <q-card class="q-dialog-plugin">
        <q-toolbar>
          <q-icon color="primary" size="30px" name="account_box" />
          <q-toolbar-title>
            <span class="text-weight-bold"> {{ $t('users.adduser') }}</span>
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
        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-input
            v-model.trim="data.data.name"
            color="brown"
            type="text"
            autofocus
            :label="this.$t('auth.register.name')"
            :error="$v.data.data.name.$error"
            :error-message="this.$t('auth.errors.namenull')"
            @blur="$v.data.data.name.$touch"
          />
          <q-input
            v-model.trim="data.data.email"
            color="brown"
            type="email"
            :label="this.$t('auth.register.email')"
            :error="$v.data.data.email.$error"
            :error-message="this.$t('auth.errors.email')"
            @blur="$v.data.data.email.$touch"
          />
          <q-input
            v-model.trim="data.data.password"
            color="brown"
            type="text"
            :label="this.$t('auth.register.password')"
            :error="$v.data.data.password.$error"
            :error-message="this.$t('auth.errors.password_length')"
            @blur="$v.data.data.password.$touch"
          />
        </q-card-section>

        <q-separator />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            flat
            color="secondary"
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="aDDNewUser()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="text-h5 q-ma-md text-teal-6">
      {{ $t('users.header') }}
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
        icon="person"
        :label="this.$t('buttons.setrole')"
        @click="ShowRoletree()"
      />
      <q-btn
        color="pink-5"
        text-color="white"
        class="q-ma-xs"
        icon="settings_applications"
        :label="this.$t('buttons.setpermission')"
        @click="SetUserPermisson()"
      />
      <q-space />
      <q-file
        v-model="importfile"
        color="indigo"
        style="max-width: 150px"
        accept=".xlsx, *.xls"
        dense
        clearable
        :label="this.$t('buttons.import')"
        @input="ImportCVStoData()"
      >
        <template v-slot:prepend>
          <q-icon name="attachment" />
        </template>
      </q-file>

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
    <div class="row q-ma-md" style="margin: 16px 1px">
      <div class="col-md-6 shadow-1">
        <ag-grid-vue
          style="min-width:100%; height: 500px;"
          class="ag-theme-balham User-agGrid"
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
      <div class="col-md-3 shadow-1" style="margin-left: 15px;">
        <q-item-label class="row" style="min-height:20px;">
          <div class="text-weight-bold" style="padding:15px 15px">
            {{ $t('users.rolelist') }}
          </div>
          <q-space />
          <q-btn
            flat
            color="orange-10"
            icon="save_alt"
            :label="this.$t('buttons.confirm')"
            @click="EditRolelist()"
          />
        </q-item-label>
        <q-separator />
        <q-list>
          <q-item v-for="re in Roledata" v-ripple :key="re.title">
            <q-item-section side top>
              <q-checkbox v-model="rolechecks" :val="re.id" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ re.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import XLSX from 'xlsx'
import { email, required, minLength } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
  name: 'Users',
  components: {
    AgGridVue
  },
  data() {
    return {
      DaddUser: false,
      quickFilter: null,
      importfile: null,
      gridOptions: null,
      Roledata: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      getRowStyle: null,
      changerowcolor: null,
      rolechecks: [],
      defaultColDef: null,
      data: {
        data: {
          name: '22',
          email: '2@2.com',
          password: '22222222'
        }
      }
    }
  },
  computed: {
    ...mapState('zero', ['ZPermissions'])
  },
  beforeMount() {
    this.gridOptions = {
      allowShowChangeAfterFilter: true
    }
    this.columnDefs = [
      {
        editable: false,
        headerName: 'ID',
        field: 'id',
        width: 40,
        minWidth: 40,
        sortable: true,
        checkboxSelection: true
      },
      {
        headerName: '用户名',
        field: 'name',
        width: 80,
        minWidth: 80,
        sortable: true,
        filter: true
      },
      {
        headerName: '邮箱',
        field: 'email',
        width: 120,
        minWidth: 120,
        sortable: true,
        filter: true
      },
      {
        headerName: '密码',
        field: 'password',
        sortable: true,
        width: 110,
        minWidth: 110,
        valueFormatter: pwdMask,
        suppressSizeToFit: true,
        filter: true
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
    // 导入开始
    ImportCVStoData() {
      const file = this.importfile
      if (file) {
        const reader = new FileReader()
        reader.onload = e => {
          /* Parse data */
          const bstr = e.target.result
          const wb = XLSX.read(bstr, { type: 'binary' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
          let j = 0
          data.map(item => {
            const ret = {}
            let i = 0
            console.log(this)
            this.columnDefs.forEach(function(val) {
              ret[val.field] = item[i++]
            })
            if (j > 0) this.rowData.push(ret)
            j++
          })
        }
        reader.readAsBinaryString(file)
      }
    },
    // 导入结束
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
                .delete('/users/' + val.id)
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
    // Dialog start
    addItems() {
      this.DaddUser = true
    },
    aDDNewUser() {
      // console.log(this.data.data)
      this.$router.app.$http
        .post('/users/', this.data.data)
        .then(res => {
          // console.log(res)
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
            if (res.status === 200) {
              this.$zglobal.showMessage(
                'red-7',
                'center',
                this.$t('auth.errors.adderror')
              )
            } else {
              this.$zglobal.showMessage(
                'red-7',
                'center',
                this.$t('operation.addfailed')
              )
            }
          }
        })
        .catch(e => {})
      this.DaddUser = false
    },
    // Dialog end
    saveItems() {
      const selectedData = this.gridApi.getSelectedRows()
      selectedData.forEach(val => {
        // console.log(val)
        if (val.id === undefined) {
          this.$router.app.$http
            .post('/users/', val)
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
            .put('/users/' + val.id, val)
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
    ShowRoletree() {
      // this.rolechecks = [1, 2]
      var selectedData = this.gridApi.getSelectedRows()
      if (
        (selectedData.length === 1 && selectedData[0].id !== undefined) ||
        selectedData.length > 1
      ) {
        // 获取列表
        this.$router.app.$http
          .get('/z_role/getSelfOrLowRoles/' + this.ZPermissions.currectrole.id)
          .then(res => {
            if (res.data.success) {
              this.Roledata = res.data.data
            }
          })
        // end
        // 获得已有角色
        this.$router.app.$http
          .get('/users/getUserRoles/' + selectedData[0].id)
          .then(resmy => {
            if (resmy.data.success) {
              this.rolechecks = resmy.data.data.map(({ name, id }) => id)
              this.$zglobal.showMessage(
                'positive',
                'center',
                this.$t('roles.getrowssuccess')
              )
            }
          })
      } else {
        this.$zglobal.showMessage(
          'red-7',
          'center',
          this.$t('operation.rowserror')
        )
      }
    },
    EditRolelist() {
      var selectedData = this.gridApi.getSelectedRows()
      var selectarr = selectedData.map(({ name, id }) => id)
      // console.log(selectarr, '========', this.rolechecks)
      this.$router.app.$http
        .post('/users/setUsersRoles/', {
          users: selectarr,
          roles: this.rolechecks
        })
        .then(res => {
          if (res.data.success) {
            this.$zglobal.showMessage('positive', 'center', this.$t('success'))
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
    },
    SetUserPermisson() {
      console.log('权限设置！')
    }
  },
  validations: {
    data: {
      data: {
        name: {
          required
        },
        email: {
          required,
          email
        },
        password: {
          minLength: minLength(8),
          required
        }
      }
    }
  }
}
function pwdMask(params) {
  return '******** '
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
