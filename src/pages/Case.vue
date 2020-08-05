<template>
  <q-page>
    <q-img src="../statics/webimages/case1.jpg"></q-img>
    <div
      :class="
        $q.screen.gt.xs
          ? 'q-pa-xl row justify-center q-gutter-lg'
          : 'q-pa-xs row justify-center q-gutter-md'
      "
    >
      <q-card class="case-list">
        <q-img src="../statics/webimages/index-card2.jpg">
          <div class="text-subtitle2 absolute-bottom text-center">
            XXX管理信息系统
          </div>
        </q-img>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </q-card-section>
      </q-card>
      <q-card class="case-list">
        <q-img src="../statics/webimages/index-card2.jpg">
          <div class="text-subtitle2 absolute-bottom text-center">
            XXX管理信息系统
          </div>
        </q-img>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </q-card-section>
      </q-card>
      <q-card class="case-list">
        <q-img src="../statics/webimages/index-card2.jpg">
          <div class="text-subtitle2 absolute-bottom text-center">
            XXX管理信息系统
          </div>
        </q-img>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </q-card-section>
      </q-card>
      <q-card class="case-list">
        <q-img src="../statics/webimages/index-card2.jpg">
          <div class="text-subtitle2 absolute-bottom text-center">
            XXX管理信息系统
          </div>
        </q-img>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </q-card-section>
      </q-card>
      <q-card class="case-list">
        <q-img src="../statics/webimages/index-card2.jpg">
          <div class="text-subtitle2 absolute-bottom text-center">
            XXX管理信息系统
          </div>
        </q-img>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Case'
}
</script>

<style scoped>
.case-list {
  width: 100%;
  max-width: 300px;
}
</style>
