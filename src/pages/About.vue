<template>
  <q-page>
    <q-img
      src="../statics/webimages/aboutus1.jpg"
      :height="$q.screen.gt.xs ? '' : '130px'"
    ></q-img>
    <div :class="$q.screen.gt.xs ? 'q-pa-lg' : 'q-px-xs q-py-md'">
      <q-card bordered class="case-list" :flat="$q.screen.gt.xs ? true : false">
        <q-img
          src="../statics/webimages/about-card1.jpg"
          style="max-height:150px;"
        >
          <div class="text-h6 absolute-bottom text-center">
            客服中心
          </div>
        </q-img>
        <q-card-section class="q-ma-ma">
          <div class="q-my-md text-subtitle1">电话：028-8XXX XXXX</div>
          <div class="q-my-md text-subtitle1">传真：028-8XXX XXXX</div>
          <div class="q-my-md text-subtitle1">邮编：610051</div>
          <div class="q-my-md text-subtitle1">
            地址：四川省成都市高新区
          </div>
        </q-card-section>
      </q-card>

      <!--      <q-card class="case-list">-->
      <!--        <q-img-->
      <!--          src="../statics/webimages/about-card2.jpg"-->
      <!--          style="max-height:150px;"-->
      <!--        >-->
      <!--          <div class="text-h6 absolute-bottom text-center">-->
      <!--            运维中心-->
      <!--          </div>-->
      <!--        </q-img>-->
      <!--        <q-card-section class="q-ma-ma">-->
      <!--          <div class="q-my-md text-h7">电话：028-8XXX XXXX</div>-->
      <!--          <div class="q-my-md text-h7">传真：028-8XXX XXXX</div>-->
      <!--          <div class="q-my-md text-h7">邮编：610051</div>-->
      <!--          <div class="q-my-md text-h7">-->
      <!--            地址：四川省成都市高新区-->
      <!--          </div>-->
      <!--        </q-card-section>-->
      <!--      </q-card>-->

      <!--      <q-card class="case-list">-->
      <!--        <q-img-->
      <!--          src="../statics/webimages/about-card3.jpg"-->
      <!--          style="max-height:150px;"-->
      <!--        >-->
      <!--          <div class="text-h6 absolute-bottom text-center">-->
      <!--            行政事务中心-->
      <!--          </div>-->
      <!--        </q-img>-->
      <!--        <q-card-section class="q-ma-ma">-->
      <!--          <div class="q-my-md text-h7">电话：028-8XXX XXXX</div>-->
      <!--          <div class="q-my-md text-h7">传真：028-8XXX XXXX</div>-->
      <!--          <div class="q-my-md text-h7">邮编：610051</div>-->
      <!--          <div class="q-my-md text-h7">-->
      <!--            地址：四川省成都市高新区-->
      <!--          </div>-->
      <!--        </q-card-section>-->
      <!--      </q-card>-->
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
  max-width: 450px;
}
</style>
