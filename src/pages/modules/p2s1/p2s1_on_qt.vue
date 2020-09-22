<template>
  <q-page padding class="q-ma-ma">
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t('p2s1.qtname') }}
    </div>
    <q-separator color="accent" />
    <div class="shadow-1">
      <ag-grid-vue
        style="width: 100%; height: 500px;"
        class="ag-theme-balham P2s1onqt-agGrid"
        row-selection="multiple"
        row-multi-select-with-click="true"
        :grid-options="gridOptions"
        :column-defs="columnDefs"
        :row-data="rowData"
        :default-col-def="defaultColDef"
        :pagination="true"
        :pagination-page-size="50"
        :locale-text="this.$t('aggrid')"
        @grid-ready="onGridReady"
      >
      </ag-grid-vue>
    </div>
  </q-page>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'P2s1OnQt',
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
      BottomRows: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$router.app.$http
      .post('/p2/s1/p2s1questionnaire1/onqt', {
        cntField: ['province', 'city', 'county', 'town', 'village', 'qsource'],
        qDate: '',
        qCnt: 'qsource'
      })
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.data)
          var allcountdata = res.data.data
          // 当前日期
          var date = new Date()
          var month = date.getMonth() + 1
          var strDate = date.getDate()
          var currentdate = date.getFullYear() + '-' + month + '-' + strDate
          // 日期获取结束
          // 获取当日新增数据
          this.$router.app.$http
            .post('/p2/s1/p2s1questionnaire1/onqt/', {
              cntField: [
                'province',
                'city',
                'county',
                'town',
                'village',
                'qsource'
              ],
              qDate: currentdate,
              qCnt: 'qsource'
            })
            .then(res => {
              // console.log(res)
              if (res.data.success) {
                // console.log('aaa', res.data.data, '--------')
                var currentdata = res.data.data
                for (const allitem of allcountdata) {
                  for (const currentitem of currentdata) {
                    if (
                      allitem.province === currentitem.province &&
                      allitem.city === currentitem.city &&
                      allitem.county === currentitem.county &&
                      allitem.town === currentitem.town &&
                      allitem.village === currentitem.village &&
                      allitem.qsource === currentitem.qsource
                    ) {
                      allitem.todaycnt = currentitem.total
                      break
                    } else {
                      allitem.todaycnt = 0
                    }
                  }
                }
                this.rowData = allcountdata
                // out
                console.log(this.rowData, '-=-=-=rowData')
                // 去重统计
                var countyArr = this.FilterByName(this.rowData, 'county')
                // 去重统计
                var townArr = this.FilterByName(this.rowData, 'town')
                // 去重统计
                var villageArr = this.FilterByName(this.rowData, 'village')
                // 去重统计
                var qsourceArr = this.FilterByName(this.rowData, 'qsource')
                // 相加cnt
                var pvCount = 0
                for (var i = 0; i < this.rowData.length; i++) {
                  pvCount = pvCount + this.rowData[i].total
                }
                // 相加todaycnt
                var pJCount = 0
                for (var j = 0; j < this.rowData.length; j++) {
                  pJCount = pJCount + this.rowData[j].todaycnt
                }
                this.BottomRows = [
                  {
                    city: '统计',
                    county: '共' + countyArr.length + '个县',
                    town: '共' + townArr.length + '个乡（镇）',
                    village: '共' + villageArr.length + '个村',
                    qsource: '共' + qsourceArr.length + '种类型',
                    total: '合计：' + pvCount,
                    todaycnt: '新增：' + pJCount
                  }
                ]
                this.count()
              } else {
              }
            })
            .catch(e => {})
        }
      })
      .catch(e => {})
    // end
  },
  beforeMount() {
    this.initGrid()
  },
  mounted() {},
  methods: {
    initGrid() {
      this.gridOptions = {
        rowHeight: 32,
        headerHeight: 32,
        allowShowChangeAfterFilter: true,
        getRowStyle: function(params) {
          // ********************置顶行样式设置*********************/
          if (params.node.rowPinned) {
            return { 'font-weight': 'bold', color: 'red' }
          }
        }
      }
      this.columnDefs = [
        {
          editable: false,
          headerName: '序',
          cellRenderer: function(params) {
            // console.log(params, '++++++++++++++++++')
            if (params.node.id === 'b-0') {
              return ''
            } else {
              return parseInt(params.node.id) + 1
            }
          },
          cellStyle: {
            // 设置本栏的CSS样式
            'text-align': 'center',
            'text-indent': '1px'
          },
          width: 50,
          minWidth: 50,
          maxWidth: 50,
          sortable: true
        },
        {
          headerName: '市',
          field: 'city',
          width: 120,
          minWidth: 120,
          maxWidth: 180,
          sortable: true,
          filter: true
        },
        {
          headerName: '区（县）',
          field: 'county',
          width: 130,
          minWidth: 130,
          maxWidth: 220,
          sortable: true,
          filter: true
        },
        {
          headerName: '乡（镇）',
          field: 'town',
          width: 130,
          minWidth: 130,
          maxWidth: 220,
          sortable: true,
          filter: true
        },
        {
          headerName: '村',
          field: 'village',
          width: 130,
          minWidth: 130,
          maxWidth: 220,
          sortable: true,
          filter: true
        },
        {
          headerName: '问卷来源',
          field: 'qsource',
          width: 130,
          minWidth: 130,
          maxWidth: 220,
          sortable: true,
          filter: true
        },
        {
          headerName: '小计',
          field: 'total',
          width: 100,
          minWidth: 100,
          maxWidth: 220,
          sortable: true,
          filter: true
        },
        {
          headerName: '当日新增',
          field: 'todaycnt',
          width: 100,
          minWidth: 100,
          maxWidth: 220,
          sortable: true,
          filter: true
        }
      ]
      this.defaultColDef = {
        editable: false,
        resizable: true,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        sortable: true
      }
    },
    onGridReady(params) {
      params.api.sizeColumnsToFit()
    },
    count() {
      this.gridOptions.api.setPinnedBottomRowData(this.BottomRows)
    },
    FilterByName(data, Name) {
      // data是json对象，Name是根据什么字段去重
      var dest = []
      for (var i = 0; i < data.length; i++) {
        var ai = data[i]
        if (i === 0) {
          dest.push(ai)
        } else {
          var filterData = dest.filter(function(e) {
            return e[Name] === ai[Name]
          })
          if (filterData.length === 0) {
            dest.push(ai)
          }
        }
      }
      return dest
    }
  }
}
</script>

<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.P2s1onqt-agGrid .ag-header {
  background-color: var(--q-color-secondary);
  color: #ffffff;
  font-size: 13px;
}
.P2s1onqt-agGrid .ag-cell {
  padding-left: 1px;
  font-size: 14px;
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
