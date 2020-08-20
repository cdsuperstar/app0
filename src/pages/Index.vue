<template>
  <q-page>
    <!--    <div class="background-img"></div>-->
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="10000"
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <q-carousel-slide :name="1" img-src="../statics/webimages/index1.jpg" />
      <q-carousel-slide :name="2" img-src="../statics/webimages/index2.jpg" />
      <q-carousel-slide :name="3" img-src="../statics/webimages/index3.jpg" />
      <q-carousel-slide :name="4" img-src="../statics/webimages/index4.jpg" />
    </q-carousel>
    <!--    <q-img src="../statics/webimages/index1.jpg"></q-img>-->
    <div align="center" class="q-my-lg text-h6">
      <p>
        成都概率矩阵科技有限公司是一家专注于人工智能领域的科技公司
      </p>
      <p>
        主要致力于人工智能技术的道路检测、航空电磁系统及计算机软件研发，通过技术推动经济发展，助力企业自动化升级。
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
        <img src="../statics/webimages/index-card3.jpg" />
        <q-card-section
          style="border-bottom: #6c757d 2px solid;max-width: 200px;"
        >
          <div class="text-h6">道路检测</div>
        </q-card-section>
        <q-card-section class="text-subtitle1">
          基于计算机技术开发的人工智能道路检测系统，为企业提供技术性支撑，实现工程检测的自动化、智能化。
        </q-card-section>
      </q-card>
      <q-card flat bordered style="width: 100%;max-width: 350px;">
        <img src="../statics/webimages/index-card2.jpg" />
        <q-card-section
          style="border-bottom: #6c757d 2px solid;max-width: 200px;"
        >
          <div class="text-h6">航空电磁系统研发</div>
        </q-card-section>
        <q-card-section class="text-subtitle1">
          基于航空瞬变电磁仪在复杂地表地形实施地面勘探、探测，获得地下介质的电性结构分布，从而在矿产资源勘探、地下水资源调查、工程勘查等许多领域得到广泛应用。
        </q-card-section>
      </q-card>
      <q-card flat bordered style="width: 100%;max-width: 350px;">
        <img src="../statics/webimages/index-card4.jpg" />
        <q-card-section
          style="border-bottom: #6c757d 2px solid;max-width: 200px;"
        >
          <div class="text-h6">管理信息系统研发</div>
        </q-card-section>
        <q-card-section class="text-subtitle1">
          拥有专业的软件开发团队，基于专业的研发水平，可根据客户的需求，量身定制一系列符合客户实际应用的软件，帮助解决企业管理难题。
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
    return {
      slide: 1
    }
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
