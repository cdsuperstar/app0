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
      rowData: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$router.app.$http
      .get('/p2/s1/p2s1questionnaire1/onqt')
      .then(res => {
        if (res.data.success) {
          console.log(res.data.data)
          this.rowData = res.data.data
        } else {
        }
      })
      .catch(e => {})
    // 得到Array的值
    console.log(this.rowData, '----------')
  },
  beforeMount() {
    this.initGrid()
  },
  mounted() {},
  methods: {
    initGrid() {
      this.gridOptions = {
        allowShowChangeAfterFilter: true
      }
      this.columnDefs = [
        {
          editable: false,
          headerName: '序',
          cellRenderer: function(params) {
            return parseInt(params.node.id) + 1
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
          field: 'cnt',
          width: 130,
          minWidth: 130,
          maxWidth: 220,
          sortable: true,
          filter: true
        }
      ]
      this.defaultColDef = {
        editable: false,
        resizable: true
      }
    },
    onGridReady(params) {
      params.api.sizeColumnsToFit()
    }
  }
}
</script>

<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.P2s1onqt-agGrid .ag-header {
  background-color: var(--q-color-secondary);
  color: #ffffff;
}
.P2s1onqt-agGrid .ag-cell {
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
