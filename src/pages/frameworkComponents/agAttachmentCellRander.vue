<template>
  <div
    class="ag-cell ag-cell-not-inline-editing ag-cell-with-height ag-cell-value cursor-pointer"
  >
    <q-icon
      dense
      name="folder_shared"
      class="text-grey-8"
      size="18px"
      style="padding-bottom: 7px"
    />
    <q-popup-proxy dense>
      <q-list dense class="bg-white">
        <q-item
          v-for="f in JSON.parse(params.data.files)"
          style="border-bottom: 1px dashed #ebebeb;"
          :key="f.id"
        >
          <q-item-section avatar top style="padding-right: 1px;">
            <q-avatar
              icon="insert_drive_file"
              color="blue-8"
              text-color="white"
              size="30px"
              style="margin-top: 3px;"
            />
          </q-item-section>
          <q-item-section
            style="cursor: pointer"
            @click="downfile(params.data.id, f)"
          >
            <q-item-label lines="1">{{ f }}</q-item-label>
            <q-item-label caption>{{ params.data.issue }}</q-item-label>
          </q-item-section>
          <q-item-section side style="cursor: pointer">
            <q-icon
              name="cancel"
              color="grey-5"
              title="del"
              @click="deletefile(params.data.id, f)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-popup-proxy>
    File
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'agAttachmentCellRander',
  data() {},
  created() {
    // end
  },
  mounted() {},
  methods: {
    downfile(id, name) {
      this.params.colDef.cellRendererParams.down(id, name)
    },
    deletefile(id, name) {
      this.params.colDef.cellRendererParams.del(id, name)
    }
  }
})
</script>
