<template>
  <q-page>
    <!--    <div class="background-img"></div>-->
    <q-img src="../statics/webimages/index1.jpg"></q-img>
    <div align="center" class="q-my-lg text-h6">
      <p>
        成都概率矩阵科技有限公司是一家以人工智能为基础的科技公司
      </p>
      <p>
        通过技术丰富用户的生活
      </p>
      <p>
        助力企业自动化升级
      </p>
      <p>
        主要致力于人工智能的道路检测计算机软件开发
      </p>
    </div>
    <div
      :class="
        $q.screen.gt.xs
          ? 'q-pa-xl row justify-center q-gutter-xl'
          : 'q-pa-xs row justify-center q-gutter-md'
      "
    >
      <q-card flat bordered style="width: 100%;max-width: 350px;">
        <img src="../statics/webimages/index-card1.jpg" />
        <q-card-section
          style="border-bottom: #6c757d 2px solid;max-width: 120px;"
        >
          <div class="text-h6">软件开发</div>
        </q-card-section>
        <q-card-section class="text-subtitle1">
          为企业提供技术性支撑，利用人工智能进行计算机软件开发，满足企业需求，提供数据服务。
        </q-card-section>
      </q-card>
      <q-card flat bordered style="width: 100%;max-width: 350px;">
        <img src="../statics/webimages/index-card2.jpg" />
        <q-card-section
          style="border-bottom: #6c757d 2px solid;max-width: 120px;"
        >
          <div class="text-h6">技术服务</div>
        </q-card-section>
        <q-card-section class="text-subtitle1">
          保持技术产品的安装、调试和运行，提供各项组织措施和技术服务，努力提升产品的技术经济效益。
        </q-card-section>
      </q-card>
      <q-card flat bordered style="width: 100%;max-width: 350px;">
        <img src="../statics/webimages/index-card3.jpg" />
        <q-card-section
          style="border-bottom: #6c757d 2px solid;max-width: 120px;"
        >
          <div class="text-h6">道路检测</div>
        </q-card-section>
        <q-card-section class="text-subtitle1">
          基于计算机技术开发的人工智能道路检测系统，为企业提供技术性支撑，实现工程检测的自动化、智能化。
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Index',
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style scoped>
.background-img {
  width: 100%;
  height: 350px;
  overflow: hidden;
  background: url(../statics/webimages/index1.jpg) no-repeat top;
  background-size: cover;
}
</style>
