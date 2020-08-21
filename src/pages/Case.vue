<template>
  <q-page>
    <q-img
      src="../statics/webimages/case1.jpg"
      :height="$q.screen.gt.xs ? '' : '130px'"
    ></q-img>
    <div class="q-px-xs q-py-xl row justify-center q-gutter-lg">
      <q-card class="case-list">
        <q-img src="../statics/webimages/case-card5.jpg">
          <div class="text-subtitle1 absolute-bottom text-center">
            航空瞬变电磁数据处理与解释软件系统
          </div>
        </q-img>
        <q-card-section class="text-subtitle1">
          本软件和航空瞬变电磁仪配套，可以在地表地形复杂难以实施地面勘探工作的区域进行探测工作，获得地下介质的电性结构分布，因而在矿产资源勘探、地下水资源调查、工程勘查等许多领域得到广泛应用。
        </q-card-section>
      </q-card>
      <q-card class="case-list">
        <q-img src="../statics/webimages/case-card2.jpg">
          <div class="text-subtitle1 absolute-bottom text-center">
            飞机装配系统
          </div>
        </q-img>
        <q-card-section class="text-subtitle1">
          飞机装配是飞机制造的重要环节，某飞机装配公司采用定制化研发信息系统，实现了零件与零件、零件与组件、组件与部件之间的协调、反溯等一系列管理。
        </q-card-section>
      </q-card>
      <q-card class="case-list">
        <q-img src="../statics/webimages/case-card3.jpg">
          <div class="text-subtitle1 absolute-bottom text-center">
            教学管理系统
          </div>
        </q-img>
        <q-card-section class="text-subtitle1">
          某高校为适应现在教学管理的需要，定制研发一套为学校的教学管理工作人员、教师、学生提供综合信息服务的管理信息系统，实现了从招生到毕业的全流程管理。
        </q-card-section>
      </q-card>
      <q-card class="case-list">
        <q-img src="../statics/webimages/case-card1.jpg">
          <div class="text-subtitle1 absolute-bottom text-center">
            图书管理系统
          </div>
        </q-img>
        <q-card-section class="text-subtitle1">
          某大型图书馆信息化建设需要，定制研发一套图书管理系统，实现了图书分类、编目、读者服务、借阅登记、统计查询等功能。.
        </q-card-section>
      </q-card>
      <q-card class="case-list">
        <q-img src="../statics/webimages/case-card4.jpg">
          <div class="text-subtitle1 absolute-bottom text-center">
            采购管理系统
          </div>
        </q-img>
        <q-card-section class="text-subtitle1">
          某企业为实现对物资采购精细化管理，定制研发一套为中小企业服务的物资采购系统，实现了物资从采购、领用、报废的全过程管理。
        </q-card-section>
      </q-card>
      <q-card class="case-list">
        <q-img src="../statics/webimages/case-card6.jpg">
          <div class="text-subtitle1 absolute-bottom text-center">
            办公自动化系统
          </div>
        </q-img>
        <q-card-section class="text-subtitle1">
          某企业为适应现代办公需要，定制研发一套办公自动化系统，实现了对信息资源的高效利用，最大限度地提高工作效率和质量，进而达到辅助决策的目的。.
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
  max-width: 450px;
}
</style>
