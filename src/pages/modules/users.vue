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
    <q-dialog v-model="DaddPermission">
      <q-card class="q-dialog-plugin">
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
            <span class="text-weight-bold"> 设置权限 </span>
          </q-toolbar-title>
          <q-btn
            flat
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="EditUserPermission()"
          />
        </q-toolbar>
        <q-separator />
        <q-card-section style="max-height: 70vh" class="scroll">
          <q-list v-for="modeule in PermissData" :key="modeule.id" dense>
            <q-item-label
              header
              style="text-align:left;border-bottom: 3px solid #027be3;padding: 12px;"
              ><q-icon
                name="perm_data_setting"
                size="25px"
                color="orange-5"
              />&nbsp;&nbsp;{{ modeule.title }}</q-item-label
            >
            <q-item
              v-for="per in modeule.permissions"
              :key="per.id"
              style="text-align:left;border-bottom: 1px dashed #d6d6d6;padding: 6px;"
            >
              <q-item-section>{{ per.title }}</q-item-section>
              <q-item-section side>
                <q-toggle
                  v-if="JSON.parse(per.syscfg).type === 'Boolean'"
                  v-model="per.usrcfg"
                  true-value="1"
                  false-value="0"
                  color="orange"
                />
                <q-input
                  v-if="JSON.parse(per.syscfg).type !== 'Boolean'"
                  v-model="per.usrcfg"
                  type="text"
                  color="orange"
                  style="max-height: 40px;"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator />
      </q-card>
    </q-dialog>
    <q-dialog v-model="DunitTree">
      <q-card class="q-dialog-plugin">
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
              {{ $t('units.showunittree') }}</span
            >
          </q-toolbar-title>
          <q-btn
            flat
            color="secondary"
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="Editusertounit()"
          />
        </q-toolbar>
        <q-separator />
        <q-card-section style="min-height:10vh;max-height: 80vh" class="scroll">
          <q-tree
            ref="myunittree"
            node-key="id"
            label-key="title"
            selected-color="primary"
            :nodes="Unitdata"
            :selected.sync="unitticked"
            default-expand-all
          />
        </q-card-section>
        <q-separator />
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="80px" color="primary" />
        </q-inner-loading>
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
        color="purple-6"
        text-color="white"
        class="q-ma-xs"
        icon="apartment"
        :label="this.$t('buttons.setuit')"
        @click="Showunittree()"
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
          <q-item v-for="re in Roledata" :key="re.title" v-ripple>
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
import { email, required, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Users',
  components: {
    AgGridVue
  },
  data() {
    return {
      PermissData: null,
      DaddUser: false,
      DaddPermission: false,
      DunitTree: false,
      Unitdata: [],
      unitticked: null,
      loading: false,
      quickFilter: null,
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
    this.initPermissions()
  },
  methods: {
    ...mapActions('zero', ['reqThePermission']),
    initPermissions() {
      const preq = [
        {
          module: 'users',
          name: 'users.iManageUnit',
          syscfg: {
            required: false,
            type: 'number',
            default: null
          },
          title: '管理单位根节点'
        }
      ]

      this.reqThePermission(preq)
        .then(res => {
          this.mPermissions = res
        })
        .catch(e => {
          console.log(e)
        })
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
      this.DaddPermission = true
      // 获得已有权限
      var selectedData = this.gridApi.getSelectedRows()
      var selectarr = selectedData.map(({ name, id }) => id)
      this.$router.app.$http
        .post('/users/getUsersPermisstionCfgs/', {
          users: selectarr
        })
        .then(res => {
          if (res.data.success) {
            this.PermissData = res.data.data
            if (res.data.success) {
              this.$zglobal.showMessage(
                'positive',
                'center',
                this.$t('operation.getdatasuccess')
              )
            }
          }
        })
    },
    EditUserPermission() {
      // console.log(this.PermissData)
      // 获得已有权限
      var selectedData = this.gridApi.getSelectedRows()
      var selectarr = selectedData.map(({ name, id }) => id)
      const per = Object.keys(this.PermissData)
        .map(k =>
          this.PermissData[k].permissions.map(({ usrcfg, id }) => ({
            id,
            usrcfg
          }))
        )
        .flat()
      this.$router.app.$http
        .post('/users/setUsersPermissionCfgs', {
          users: selectarr,
          permissions: per
        })
        .then(res => {
          if (res.data.success) {
            this.$zglobal.showMessage('positive', 'center', this.$t('success'))
          } else {
            this.$zglobal.showMessage('red-5', 'center', this.$t('failed'))
          }
        })
    },
    Showunittree() {
      this.DunitTree = true
      this.loading = true
      var selectedData = this.gridApi.getSelectedRows()
      // 先得到登录用户的管理单位节点
      var node = null
      if (this.mPermissions['users.iManageUnit']) {
        node = this.mPermissions['users.iManageUnit']
      } else {
        if (this.ZPermissions.units.length > 1)
          node = this.mPermissions['users.iManageUnit']
      }
      this.$router.app.$http
        .get('/z_unit/getTheUnitTree/' + node)
        .then(res => {
          if (res.data.success) {
            this.loading = false
            this.Unitdata = res.data.data

            // 得到选定用户的机构值
            if (selectedData[0].id) {
              this.$router.app.$http
                .get('/users/getUserUnit/' + selectedData[0].id)
                .then(resmy => {
                  if (resmy.data.success) {
                    this.unitticked = resmy.data.data.map(({ id }) => id)
                  }
                })
            }
            this.$zglobal.showMessage(
              'positive',
              'center',
              this.$t('operation.getdatasuccess')
            )
          } else {
            this.loading = false
          }
        })
        .catch(error => {
          this.loading = false
          if (error.status) {
            this.$zglobal.showMessage(
              'red-5',
              'center',
              this.$t('auth.register.invalid_data')
            )
          }
        })
    },
    Editusertounit() {
      var selectedData = this.gridApi.getSelectedRows()
      var selectarr = selectedData.map(({ name, id }) => id)
      console.log(this.unitticked, '----------')
      this.$router.app.$http
        .post('/users/setUserUnit/', {
          users: selectarr,
          units: [this.unitticked]
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
            this.loading = false
            this.$zglobal.showMessage(
              'red-5',
              'center',
              this.$t('auth.register.invalid_data')
            )
          }
        })
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
