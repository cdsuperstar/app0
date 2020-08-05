<template>
  <q-page>
    <q-img src="../statics/webimages/aboutus1.jpg"></q-img>
    <div
      :class="
        $q.screen.gt.xs
          ? 'q-pa-xl row justify-center q-gutter-lg'
          : 'q-pa-xs row justify-center q-gutter-md'
      "
    >
      <q-card class="case-list">
        <q-img
          src="../statics/webimages/index-card1.jpg"
          style="max-height:150px;"
        >
          <div class="text-h6 absolute-bottom text-center">
            客服中心
          </div>
        </q-img>
        <q-card-section class="q-ma-ma">
          <div class="q-my-md text-h7">电话：010-87826688</div>
          <div class="q-my-md text-h7">传真：010-68327649</div>
          <div class="q-my-md text-h7">邮编：100037</div>
          <div class="q-my-md text-h7">
            地址：北京百万庄南街12号中国新闻社3层
          </div>
        </q-card-section>
      </q-card>

      <q-card class="case-list">
        <q-img
          src="../statics/webimages/index-card1.jpg"
          style="max-height:150px;"
        >
          <div class="text-h6 absolute-bottom text-center">
            运维中心
          </div>
        </q-img>
        <q-card-section class="q-ma-ma">
          <div class="q-my-md text-h7">电话：010-87826688</div>
          <div class="q-my-md text-h7">传真：010-68327649</div>
          <div class="q-my-md text-h7">邮编：100037</div>
          <div class="q-my-md text-h7">
            地址：北京百万庄南街12号中国新闻社3层
          </div>
        </q-card-section>
      </q-card>

      <q-card class="case-list">
        <q-img
          src="../statics/webimages/index-card1.jpg"
          style="max-height:150px;"
        >
          <div class="text-h6 absolute-bottom text-center">
            行政事务中心
          </div>
        </q-img>
        <q-card-section class="q-ma-ma">
          <div class="q-my-md text-h7">电话：010-87826688</div>
          <div class="q-my-md text-h7">传真：010-68327649</div>
          <div class="q-my-md text-h7">邮编：100037</div>
          <div class="q-my-md text-h7">
            地址：北京百万庄南街12号中国新闻社3层
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.case-list {
  width: 100%;
  max-width: 300px;
}
</style>
