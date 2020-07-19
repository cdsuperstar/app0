<template>
  <q-page class="q-pa-md">
    <div>
      <q-select
        v-model.trim="signtype"
        :options="typeoptions"
        label="选择标记类型"
        map-options
        style="max-width: 15em;"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section>
              <q-item-label v-html="scope.opt.label"></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="showtype" :val="scope.opt.value" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <ui-marker
      ref="aiPanel-editor"
      class="ai-observer"
      width="100%"
      v-bind:uniqueKey="uuid"
      :ratio="16 / 9"
      v-bind:imgUrl="currentImage"
      @vmarker:onAnnoAdded="onAnnoAdded"
      @vmarker:onAnnoSelected="onAnnoSelected"
      @vmarker:onUpdated="onUpdated"
    >
    </ui-marker>
  </q-page>
</template>

<script>
import { AIMarker } from 'vue-picture-bd-marker'
export default {
  name: 'P1s1outsc',
  components: { 'ui-marker': AIMarker },
  data() {
    return {
      uuid: '0da9130',
      currentImage: '../statics/09.jpg',
      renderData: null,
      dataset: {},
      signtype: null,
      showtype: [],
      typeoptions: [
        {
          label: '裂缝',
          value: 1
        },
        {
          label: '空洞',
          value: 2
        },
        {
          label: 'Twitter',
          value: 3
        },
        {
          label: 'Apple',
          value: 4
        },
        {
          label: '其他隐患',
          value: 5
        }
      ]
    }
  },
  mounted() {
    // this.$refs['aiPanel-editor'].getMarker().renderData([
    //   {
    //     tag: 'id04',
    //     tagName: '蜜蜂',
    //     position: {
    //       x: '21.026%',
    //       x1: '53.790000000000006%',
    //       y: '22.678%',
    //       y1: '40.496%'
    //     },
    //     uuid: '0da9130'
    //   }
    // ])
  },
  methods: {
    onAnnoAdded(data) {
      if (this.signtype !== null) {
        this.$refs['aiPanel-editor'].getMarker().setTag({
          tagName: this.signtype.label,
          tag: this.signtype.value
        })
        console.log(data, '====onAnnoAdded', this.showtype)
        // 当你想限制标记个数时
      } else {
        this.$zglobal.showMessage('red-7', 'center', '先选择标注类型')
        this.$refs['aiPanel-editor'].getMarker().clearData()
      }
    },
    onAnnoSelected(data) {
      console.log(data, '+++onAnnoSelected')
    },
    onUpdated(data) {
      console.log(data, '+++onUpdated')
    }
  }
}
</script>

<style scoped>
.ai-observer {
}
</style>
