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
    File
    <q-popup-proxy dense>
      <q-list dense class="bg-white">
        <q-item clickable v-ripple style="border-bottom: 1px dashed #ebebeb;">
          <q-item-section avatar top>
            <q-avatar
              icon="insert_drive_file"
              color="primary"
              text-color="white"
              size="30px"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">{{ params.data.id }}</q-item-label>
            <q-item-label caption>{{ params.data.created_at }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-popup-proxy>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'agAttachmentCellRander',
  data() {
    return {
      AttachmentData: null
    }
  },
  created() {
    this.$router.app.$http
      .put('/p1/s1/p1s1techfile/' + this.params.data.id)
      .then(res => {
        // console.log(res)
        if (res.data.success) {
          this.AttachmentData = res.data.data.files
        } else {
        }
      })
      .catch(e => {})
    // end
  },
  mounted() {},
  methods: {}
})
</script>
