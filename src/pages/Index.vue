<template>
  <q-page>
    <!--    <div class="background-img"></div>-->
    <div align="center">
      <q-carousel
        animated
        v-model="slidesign"
        swipeable
        infinite
        :autoplay="10000"
        :height="$q.screen.gt.xs ? '' : '130px'"
        :navigation="$q.screen.gt.xs ? true : false"
      >
        <q-carousel-slide :name="1" img-src="../statics/webimages/index1.jpg" />
        <q-carousel-slide :name="2" img-src="../statics/webimages/index2.jpg" />
        <q-carousel-slide :name="3" img-src="../statics/webimages/index3.jpg" />
        <q-carousel-slide :name="4" img-src="../statics/webimages/index4.jpg" />
      </q-carousel>
    </div>

    <!--    <q-img src="../statics/webimages/index1.jpg"></q-img>-->
    <div v-if="$q.screen.gt.xs" align="center" class="q-my-lg text-h6">
      <p>
        成都概率矩阵科技有限公司是一家专注于人工智能领域的科技公司
      </p>
      <p>
        主要致力于人工智能技术的道路检测、航空电磁系统及计算机软件研发，通过技术推动经济发展，助力企业自动化升级。
      </p>
    </div>
    <div v-if="!$q.screen.gt.xs" align="left" class="q-my-lg text-h6">
      <p style="text-indent: 2em;">
        成都概率矩阵科技有限公司是一家专注于人工智能领域的科技公司，主要致力于人工智能技术的道路检测、航空电磁系统及计算机软件研发，通过技术推动经济发展，助力企业自动化升级。
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
          基于人工智能技术的公路结构分析及隐伏病害智能检测软件平台，大大提高了解译效率而且解译精度，降低了检测成本，具有非常广阔的市场前景。
        </q-card-section>
      </q-card>
      <q-card flat bordered style="width: 100%;max-width: 350px;">
        <img src="../statics/webimages/index-card8.jpg" />
        <q-card-section
          style="border-bottom: #6c757d 2px solid;max-width: 200px;"
        >
          <div class="text-h6">航空电磁系统研发</div>
        </q-card-section>
        <q-card-section class="text-subtitle1">
          基于航空瞬变电磁仪在复杂地表地形实施地面勘探、探测，获得地下介质的电性结构分布，为地下探测提供基础资料和依据，从而在矿产资源勘探、地下水资源调查、工程勘查等许多领域得到广泛应用。
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
          针对企业的具体情况，个性化定制软件研发，可将管理者的最新的管理思路和管理模型融入到软件中，从而大大提高了软件的科学价值，带给企业巨大的经济效益。
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
      slidesign: 1
    }
  },
  created() {},
  methods: {}
}
</script>
<style scoped>
.background-img {
  width: 100%;
  height: 450px;
  overflow: hidden;
  background: url(../statics/webimages/index1.jpg) no-repeat top;
  background-size: cover;
}
</style>
