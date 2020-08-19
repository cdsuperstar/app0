<template>
  <q-page>
    <q-img src="../statics/webimages/product1.jpg"></q-img>
    <div align="center" class="q-my-lg row justify-center text-h6">
      <div class="text-h4">类别</div>
      &nbsp;&nbsp; 道路检测 | 航空电磁系统研发 | 管理信息系统研发 | 人工智能 | |
      移动技术
    </div>
    <div
      :class="
        $q.screen.gt.xs
          ? 'q-pa-xl row justify-center'
          : 'q-pa-xs row justify-center'
      "
    >
      <q-separator :class="$q.screen.gt.xs ? 'q-ma-xl' : ''" />
      <q-list class="col-10">
        <q-item>
          <q-item-section>
            <q-item-label class="q-mb-lg text-h5">
              计算机软硬件研发
            </q-item-label>
            <q-item-label class="text-h7">
              构建开发软件产品，根据不同需求进行定制研发计算机软件。
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="row items-start q-gutter-md">
              <img src="../statics/webimages/index-card2.jpg" class="col-3" />
              <img src="../statics/webimages/index-card2.jpg" class="col-3" />
              <img src="../statics/webimages/index-card2.jpg" class="col-3" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator :class="$q.screen.gt.xs ? 'q-ma-xl' : ''" />
      <q-list class="col-10">
        <q-item>
          <q-item-section>
            <q-item-label class="q-mb-lg text-h5">
              人工智能
            </q-item-label>
            <q-item-label class="text-h7">
              构建开发软件产品，根据不同需求进行定制研发计算机软件。
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="row items-start q-gutter-md">
              <img src="../statics/webimages/index-card2.jpg" class="col-3" />
              <img src="../statics/webimages/index-card2.jpg" class="col-3" />
              <img src="../statics/webimages/index-card2.jpg" class="col-3" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator :class="$q.screen.gt.xs ? 'q-ma-xl' : ''" />
      <q-list class="col-10">
        <q-item>
          <q-item-section>
            <q-item-label class="q-mb-lg text-h5">
              道路检测
            </q-item-label>
            <q-item-label class="text-h7">
              构建开发软件产品，根据不同需求进行定制研发计算机软件。
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="row items-start q-gutter-md">
              <img src="../statics/webimages/index-card2.jpg" class="col-3" />
              <img src="../statics/webimages/index-card2.jpg" class="col-3" />
              <img src="../statics/webimages/index-card2.jpg" class="col-3" />
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
  name: 'Product'
}
</script>

<style scoped></style>
