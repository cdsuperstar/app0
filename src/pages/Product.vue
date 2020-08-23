<template>
  <q-page>
    <q-img
      src="../statics/webimages/service1.jpg"
      :height="$q.screen.gt.xs ? '' : '130px'"
    ></q-img>
    <div align="center" class="q-my-lg row justify-center text-h6">
      <!--      <div class="text-h4">类别</div>-->
      &nbsp;&nbsp; 道路检测 | 航空电磁系统研发 | 管理信息系统研发 | 人工智能 |
      移动技术
    </div>
    <div
      :class="
        $q.screen.gt.xs
          ? 'q-pa-xl row justify-center'
          : 'q-pa-xs row justify-center'
      "
    >
      <q-list class="col-12">
        <q-item style="border-bottom:2px solid #DADADA;margin-bottom: 10px;">
          <q-item-section>
            <q-item-label
              :class="$q.screen.gt.xs ? 'q-mb-lg text-h5' : 'q-mb-lg text-h6'"
            >
              公路结构分析及隐伏病害智能检测软件平台
            </q-item-label>
            <q-item-label class="text-subtitle1" style="text-indent: 2em;">
              截至2019年底，中国公路总里程已达501.25万公里、高速公路里程14.96万公里，居世界第一（根据中国交通部2019年交通运输行业发展统计公报）。目前，车载雷达已经成为公路检测的主流工具之一，但是人工解译数据费时费力且精度不高，
              本公司所研发的公路结构分析及隐伏病害智能检测系统不仅具有较高的解译效率而且解译精度较高，大大降低检测成本，具有广阔的市场前景。
            </q-item-label>
          </q-item-section>
          <q-item-section style="margin-bottom: 10px;">
            <q-item-label
              :class="
                $q.screen.gt.xs
                  ? 'row items-start q-gutter-md'
                  : 'row items-start q-gutter-xs'
              "
            >
              <img
                src="../statics/webimages/index-card5.jpg"
                :class="$q.screen.gt.xs ? 'col-5' : 'col-12'"
              />
              <img
                src="../statics/webimages/index-card7.jpg"
                :class="$q.screen.gt.xs ? 'col-5' : 'col-12'"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="border-bottom:2px solid #DADADA;margin-bottom: 10px;">
          <q-item-section>
            <q-item-label
              :class="$q.screen.gt.xs ? 'q-mb-lg text-h5' : 'q-mb-lg text-h6'"
            >
              航空电磁数据处理与解释软件系统
            </q-item-label>
            <q-item-label class="text-subtitle1" style="text-indent: 2em;">
              我国山区较多，地形复杂，地面探测工作往往很难实施。航空电磁法具有机动、灵活的特点，适合于复杂地形条件下的地下探测，从而在矿产资源勘探、地下水资源调查以及工程勘察等领域具有广阔的应用前景。和航空电磁仪器相配合，本公司所研发的航空电磁数据处理与解释软件系统能对电磁数据进行处理和反演解释，并获取地下介质的电性分布特征，为地下探测提供基础资料和依据。
            </q-item-label>
          </q-item-section>
          <q-item-section style="margin-bottom: 10px;">
            <q-item-label
              :class="
                $q.screen.gt.xs
                  ? 'row items-start q-gutter-md'
                  : 'row items-start q-gutter-xs'
              "
            >
              <img
                src="../statics/webimages/index-card9.jpg"
                :class="$q.screen.gt.xs ? 'col-5' : 'col-12'"
              />
              <img
                src="../statics/webimages/index-card10.jpg"
                :class="$q.screen.gt.xs ? 'col-5' : 'col-12'"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="border-bottom:2px solid #DADADA;margin-bottom: 10px;">
          <q-item-section>
            <q-item-label
              :class="$q.screen.gt.xs ? 'q-mb-lg text-h5' : 'q-mb-lg text-h6'"
            >
              管理信息系统研发
            </q-item-label>
            <q-item-label class="text-subtitle1" style="text-indent: 2em;">
              针对企业的具体情况，可将管理者的最新的管理思路和管理模型融入到软件中，从而大大提高了软件的科学价值，带给企业巨大的经济效益。本公司拥有专业的软件开发团队，定制软件开发是由专业的服务团队提供服务，满足企业不同时期的发展、升级迭代等要求，助力企业变革和发展。
            </q-item-label>
          </q-item-section>
          <q-item-section style="margin-bottom: 10px;">
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
                src="../statics/webimages/index-card6.jpg"
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
  name: 'Product'
}
</script>

<style scoped></style>
