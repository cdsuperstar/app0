<template>
  <div
    class="ag-cell ag-cell-not-inline-editing ag-cell-with-height ag-cell-value"
  >
    <q-icon dense name="event" class="cursor-pointer">
      <q-popup-proxy dense transition-show="scale" transition-hide="scale">
        <q-date
          dense
          mask="YYYY-MM-DD"
          :value="params.value"
          @input="
            val => {
              params.setValue(val)
              return false
            }
          "
        />
      </q-popup-proxy>
    </q-icon>
    {{ params.value }}
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({})
</script>
