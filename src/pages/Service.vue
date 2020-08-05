<template>
  <q-page>
    <q-img src="../statics/webimages/service1.jpg"></q-img>
    <div align="center" class="q-my-lg row justify-center text-h6">
      <div class="text-h4">类别</div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 计算机软硬件研发 | 人工智能 |
      道路检测 | 移动技术
    </div>
    <div
      :class="
        $q.screen.gt.xs
          ? 'q-pa-xl row justify-center'
          : 'q-pa-xs row justify-center q-gutter-md'
      "
    >
      <q-separator :class="$q.screen.gt.xs ? 'q-ma-xl' : ''" />
      <q-list class="col-10">
        <q-item>
          <q-item-section>
            <q-item-label class="q-mb-lg text-h4">
              计算机软硬件研发
            </q-item-label>
            <q-item-label class="text-h7">
              构建开发软件产品，根据不同需求进行定制研发计算机软件。
            </q-item-label>
          </q-item-section>
          <q-item-section class="row items-start">
            <q-item-label class="q-gutter-md">
              <img src="../statics/webimages/index-card2.jpg" width="150" />
              <img src="../statics/webimages/index-card2.jpg" width="150" />
              <img src="../statics/webimages/index-card2.jpg" width="150" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator :class="$q.screen.gt.xs ? 'q-ma-xl' : ''" />
      <q-list class="col-10">
        <q-item>
          <q-item-section>
            <q-item-label class="q-mb-lg text-h4">
              人工智能
            </q-item-label>
            <q-item-label class="text-h7">
              构建开发软件产品，根据不同需求进行定制研发计算机软件。
            </q-item-label>
          </q-item-section>
          <q-item-section class="row items-start">
            <q-item-label class="q-gutter-md">
              <img src="../statics/webimages/index-card2.jpg" width="150" />
              <img src="../statics/webimages/index-card2.jpg" width="150" />
              <img src="../statics/webimages/index-card2.jpg" width="150" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator :class="$q.screen.gt.xs ? 'q-ma-xl' : ''" />
      <q-list class="col-10">
        <q-item>
          <q-item-section>
            <q-item-label class="q-mb-lg text-h4">
              道路检测
            </q-item-label>
            <q-item-label class="text-h7">
              构建开发软件产品，根据不同需求进行定制研发计算机软件。
            </q-item-label>
          </q-item-section>
          <q-item-section class="row items-start">
            <q-item-label class="q-gutter-md">
              <img src="../statics/webimages/index-card2.jpg" width="150" />
              <img src="../statics/webimages/index-card2.jpg" width="150" />
              <img src="../statics/webimages/index-card2.jpg" width="150" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator :class="$q.screen.gt.xs ? 'q-ma-xl' : ''" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Service'
}
</script>

<style scoped></style>
