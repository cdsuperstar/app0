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
            <q-item-label lines="1"
              >GB/T31077-水库地震监测技术要求</q-item-label
            >
            <q-item-label caption>February 22nd, 2019</q-item-label>
          </q-item-section>
        </q-item>
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
            <q-item-label lines="1"
              >DL/T5010-水电水利工程 物探规程</q-item-label
            >
            <q-item-label caption>February 22nd, 2019</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-popup-proxy>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({})
</script>
