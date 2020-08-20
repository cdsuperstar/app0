<template>
  <q-page>
    <q-img src="../statics/webimages/service1.jpg"></q-img>
    <div align="center" class="q-my-lg row justify-center text-h6">
      <!--      <div class="text-h4">类别</div>-->
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
      <q-list class="col-11">
        <q-item style="border-bottom:2px solid #DADADA;margin-bottom: 10px;">
          <q-item-section>
            <q-item-label class="q-mb-lg text-h5">
              道路检测
            </q-item-label>
            <q-item-label class="text-h7">
              基于计算机技术开发的人工智能道路检测系统，为企业提供技术性支撑，实现工程检测的自动化、智能化。
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label
              :class="
                $q.screen.gt.xs
                  ? 'row items-start q-gutter-md'
                  : 'row items-start q-gutter-xs'
              "
            >
              <img
                src="../statics/webimages/index-card3.jpg"
                :class="$q.screen.gt.xs ? 'col-5' : 'col-12'"
              />
              <img
                src="../statics/webimages/index-card3.jpg"
                :class="$q.screen.gt.xs ? 'col-5' : 'col-12'"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="border-bottom:2px solid #DADADA;margin-bottom: 10px;">
          <q-item-section>
            <q-item-label class="q-mb-lg text-h5">
              航空电磁系统研发
            </q-item-label>
            <q-item-label class="text-h7">
              基于航空瞬变电磁仪在复杂地表地形实施地面勘探、探测，获得地下介质的电性结构分布，从而在矿产资源勘探、地下水资源调查、工程勘查等许多领域得到广泛应用。
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label
              :class="
                $q.screen.gt.xs
                  ? 'row items-start q-gutter-md'
                  : 'row items-start q-gutter-xs'
              "
            >
              <img
                src="../statics/webimages/index-card2.jpg"
                :class="$q.screen.gt.xs ? 'col-5' : 'col-12'"
              />
              <img
                src="../statics/webimages/index-card2.jpg"
                :class="$q.screen.gt.xs ? 'col-5' : 'col-12'"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="border-bottom:2px solid #DADADA;margin-bottom: 10px;">
          <q-item-section>
            <q-item-label class="q-mb-lg text-h5">
              管理信息系统研发
            </q-item-label>
            <q-item-label class="text-h7">
              拥有专业的软件开发团队，基于专业的研发水平，可根据客户的需求，量身定制一系列符合客户实际应用的软件，帮助解决企业管理难题。
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label
              :class="
                $q.screen.gt.xs
                  ? 'row items-start q-gutter-md'
                  : 'row items-start q-gutter-xs'
              "
            >
              <img
                src="../statics/webimages/index-card4.jpg"
                :class="$q.screen.gt.xs ? 'col-5' : 'col-12'"
              />
              <img
                src="../statics/webimages/index-card4.jpg"
                :class="$q.screen.gt.xs ? 'col-5' : 'col-12'"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Service'
}
</script>

<style scoped></style>
