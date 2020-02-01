<template>
  <q-page class="flex flex-center">
    <q-btn v-on:click="test()">asdfasdfs</q-btn>
    <q-card>
      <ag-grid-vue
        style="width: 1000px; height: 500px;"
        class="ag-theme-balham"
        @grid-ready="onGridReady"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :defaultColDef="defaultColDef"
      >
      </ag-grid-vue>
    </q-card>
  </q-page>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'modules',
  computed: {},
  data() {
    return {
      columnDefs: null,
      rowData: null,
      defaultColDef: null
    }
  },
  beforeMount() {
    this.columnDefs = [
      {
        headerName: '模块名',
        field: 'name',
        sortable: true,
        filter: true
      },
      {
        headerName: '标题',
        field: 'title',
        sortable: true,
        filter: true
      },
      {
        headerName: 'ICON',
        field: 'icon',
        sortable: true,
        filter: true
      },
      {
        headerName: '是否菜单',
        field: 'ismenu',
        sortable: true,
        filter: true
      },
      {
        headerName: '路径名',
        field: 'url',
        sortable: true,
        filter: true
      }
    ]
    this.defaultColDef = {
      editable: true,
      resizable: true
    }
  },
  components: {
    AgGridVue
  },
  mounted() {
    // console.log(this.ZModules)
    this.$router.app.$http
      .get('/z_module/')
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.data)
          this.rowData = res.data.data
        } else {
        }
      })
      .catch(e => {})
  },
  methods: {
    // ...mapActions('zero', ['getZModules']),
    onGridReady(params) {
      params.api.sizeColumnsToFit()
    },
    test() {
      console.log(this.rowData)
    }
  }
}
</script>
