<template>
  <q-page class="q-pa-xs">
    <q-card flat>
      <q-card-section>
        <p
          class="text-bold"
          align="center"
          style="margin-bottom: 0.5em; color: var(--q-color-positive);"
        >
          <font :size="$q.screen.gt.xs ? 5 : 4"
            >2020年云南省相对贫困问题调查问卷</font
          ><br />
        </p>
        <font size="3">
          <p>亲爱的朋友:</p>
          <p style="text-indent: 2em;">
            您好！受云南省扶贫办委托，我们组织开展对云南省相对贫困问题进行调查，非常感谢您的配合。本调查仅仅作为政策咨询建议之用，您所填报的信息完全保密，请根据您及您的家庭真实情况选择和填报，再次感谢您的大力支持和配合！
          </p>
        </font>
      </q-card-section>
    </q-card>

    <div v-if="positionsign" class="q-ma-sm row items-start q-gutter-md">
      <q-icon name="map" class="text-warning" size="sm" />
      <q-input
        v-model="vote.longitude"
        dense
        disable
        type="text"
        label="经度"
        style="max-width: 8em;"
      />
      <q-input
        v-model="vote.latitude"
        dense
        disable
        type="text"
        label="纬度"
        style="max-width: 8em;"
      />
    </div>
    <div class="q-mx-ma">
      <dl>
        <dt class="text-h6 row no-wrap items-center">
          <div class="doc-card-title">
            A. 家庭基本情况（家庭基本情况、自然、生产生活条件、人口、
            劳动力、收入情况等）
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A1. 您所在的行政区域是？</div>
          <v-distpicker
            :province="vote.province"
            :city="vote.city"
            :area="vote.county"
            :placeholders="placeholders"
            province-disabled
            @selected="AreaonSelected"
          ></v-distpicker>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">乡镇：</div>
          <q-input v-model="vote.town" type="text" dense />
          <div style="padding-top: 10px;">村：</div>
          <q-input v-model="vote.village" type="text" dense />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A2. 您的家庭情况是？</div>
          <q-select
            v-model="vote.a2"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="[
              '建档立卡脱贫户',
              '建档立卡监测户',
              '非建档立卡边缘户',
              '非建档立卡户'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A3. 户主姓名：</div>
          <q-input v-model="vote.a3" type="text" dense />
          <div style="padding-top: 10px;">
            A4. 户主身份证号码：
          </div>
          <q-input
            v-model="vote.a4"
            type="text"
            dense
            style="min-width:200px;"
            mask="X##### ######## ###X X"
          />
          <div style="padding-top: 10px;">A5. 户主民族是：【可输入】</div>
          <q-select
            v-model="vote.a5"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 8em;"
            behavior="menu"
            :options="[
              '彝族',
              '汉族',
              '回族',
              '壮族',
              '瑶族',
              '佤族',
              '水族',
              '傣族',
              '藏族',
              '满族',
              '怒族',
              '白族',
              '苗族',
              '蒙古族',
              '纳西族',
              '普米族',
              '傈僳族',
              '拉祜族',
              '景颇族',
              '基诺族',
              '哈尼族',
              '独龙族',
              '德昂族',
              '布依族',
              '布朗族',
              '阿昌族'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A6. 家庭联系方式：</div>
          <q-input v-model="vote.a6" type="text" dense />
          <div style="padding-top: 10px;">A7. 您所在家庭的户籍人口（人）：</div>
          <q-input v-model="vote.a7" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A8.
            您所在家庭的常住人口（在家居住半年以上/或个人收入直接与家庭挂钩）（人）：
          </div>
          <q-input v-model="vote.a8" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A8-1 您家16周岁以下人口（人）：
          </div>
          <q-input v-model="vote.a801" type="text" dense mask="##" />
          <div style="padding-top: 10px;">
            A8-4 您家60 周岁及以上人数（人）：
          </div>
          <q-input v-model="vote.a804" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A8-2
            您家现有劳动力人口数（人）【16-64岁具有劳动能力人口，不包括在校学生、现役军人】：
          </div>
          <q-input v-model="vote.a802" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A8-3 您家无劳动能力人口数（人）【16-64周岁，因病因残丧失劳动力】：
          </div>
          <q-input v-model="vote.a803" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A8-5 您家未来 3
            年您家庭劳动力人口数（人）【16-64岁具有劳动能力人口，不包括在校学生，现役军人，服刑人员】：
          </div>
          <q-input v-model="vote.a805" type="text" dense mask="##" />
        </dd>

        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A9. 近三年来（2018-2020 年），您家庭年均总收入（元）：
          </div>
          <q-input v-model="vote.a9" type="text" dense mask="######" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A9-1 近三年来（2018-2020年），您家庭年均经营性净收入（元）：
          </div>
          <q-input v-model="vote.a901" type="text" dense mask="######" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A9-2 近三年来（2018-2020 年），您家庭年均工资性收入（元）：
          </div>
          <q-input v-model="vote.a902" type="text" dense mask="######" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A9-3 近三年来（2018-2020 年），您家庭年均财产性收入（元）：
          </div>
          <q-input v-model="vote.a903" type="text" dense mask="######" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A9-4 近三年来（2018-2020 年），您家庭年均转移性收入（元）：
          </div>
          <q-input v-model="vote.a904" type="text" dense mask="######" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            全家每月可领低保金（元）【若无，则填“0”】：
          </div>
          <q-input v-model="vote.a905" type="text" dense mask="#####" />
          <div style="padding-top: 10px;">
            每月领养老金（元）【若无，则填“0”】：
          </div>
          <q-input v-model="vote.a906" type="text" dense mask="####" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A10. 影响您家收入的主要原因是？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.a10"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '因病、因残',
              '因学',
              '因自然灾害',
              '因缺土地、水等资源',
              '因婚丧嫁娶',
              '因缺技术、资金等',
              '缺劳力',
              '无影响'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A11. 近3年来，您的家庭收入主要来源是？（单选）
          </div>
          <q-select
            v-model="vote.a11"
            dense
            behavior="menu"
            style="min-width: 22em;"
            :options="[
              '外出务工收入：在本乡镇外务工的工资收入',
              '本地务工收入：在本乡镇内务工以及政府提供的各种公益性岗位的工资收入',
              '种养殖收入：各类农林牧渔业收入',
              '经营性收入：家庭各种经营性收入，比如做生意、跑运输、开饭馆、小超市等',
              '财产性收入：房屋等出租，土地流转，入股分红等收入',
              '转移性收入：各类政府补贴，低保，养老金、残疾人补贴等收入'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A12. 近3年来,您的家庭最大支出是？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.a12"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            behavior="menu"
            style="min-width: 22em;"
            :options="[
              '孩子教育支出',
              '家庭基本生活支出，包括吃、穿、用等消费支出',
              '家庭成员医疗支出',
              '固定资产投入支出，包括改扩建住房，房屋装修，购买家具家电等',
              '生产经营性支出'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A13. 未来 3 年，您的家庭主要支出可能是？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.a13"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            behavior="menu"
            style="min-width: 22em;"
            :options="[
              '孩子教育支出',
              '生活提升改善性支出，如改扩建住房，购买家电，保险等',
              '医疗保健支出',
              '生产经营性支出'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A14. 您家存款有多少？（单选）
          </div>
          <q-select
            v-model="vote.a14"
            dense
            behavior="menu"
            style="min-width: 10em;"
            :options="['3万以下', '3万-5万', '5万-10万', '10万以上']"
          ></q-select>
          <div style="padding-top: 10px;">
            A15. 您的家庭所在地区（县）是否是少数民族地区？（单选）
          </div>
          <q-select
            v-model="vote.a15"
            dense
            behavior="menu"
            style="min-width: 5em;"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A16. 您的家庭所在地区地形条件情况？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.a16"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '高山峡谷区',
              '山谷河谷区',
              '高原区',
              '盆地区',
              '丘陵区',
              '平原区'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A17. 您最希望解决您家庭增收致富的途径和方式是？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.a17"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            behavior="menu"
            style="min-width: 22em;"
            :options="[
              '改善基础设施条件',
              '外出务工',
              '发展特色产业',
              '提供公益性岗位',
              '提供扶贫车间岗位',
              '获得政府长期转移性收入'
            ]"
          ></q-select>
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-title">
            B. 家庭产业发展情况（产业发展、产业指导、产业保障）
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B1. 您家是否发展产业？（单选）
          </div>
          <q-select
            v-model="vote.b1"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.b1 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B2. 发展产业一年 净收入（利润）（元）
          </div>
          <q-input v-model="vote.b2" type="text" dense mask="########" />
          <div style="padding-top: 10px;">
            B3. 家里主要发展了什么产业项目？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.b3"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '种植业（传统农作物）',
              '养殖业',
              '林果业',
              '农产品加工业',
              '特色手工业',
              '休闲农业与乡村旅游'
            ]"
          ></q-select>
        </dd>
        <dd
          v-if="vote.b1 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B4. 产业经营方式是什么？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.b4"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="['自己经营管理', '合作社托管托养', '龙头企业技术支持']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.b1 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div v-if="vote.b4 === '自己经营管理'" style="padding-top: 10px;">
            B5. 自己经营管理时采用的管理方式是什么？（单选）【可输入】
          </div>
          <q-select
            v-if="vote.b4 === '自己经营管理'"
            v-model="vote.b5"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '传统方式（人力、牛等）',
              '机械化管理（收割机，播种机等）',
              '信息智能化管理（新型农业）'
            ]"
          ></q-select>
          <div style="padding-top: 10px;">
            B6. 产业效益如何？（单选）
          </div>
          <q-select
            v-model="vote.b6"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['很好', '较好', '一般', '较差']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.b1 === '是' && (vote.b6 === '一般' || vote.b6 === '较差')"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B7. 效果一般或较差的主要原因是什么？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.b7"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '产业没选好',
              '缺乏技术',
              '经营管理不善',
              '产品市场价格波动大',
              '遭受各类自然灾害、牲畜疫病等影响'
            ]"
          ></q-select>
        </dd>
        <dd
          v-if="vote.b1 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B8. 您希望得到哪些产业支持措施？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.b8"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '具体产业类型或品种选择的指导',
              '产业管理指导',
              '产业技术指导',
              '提供产业产品销售渠道'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B9. 若没有发展产业，想发展什么产业？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.b9"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '种植业',
              '养殖业',
              '林果业',
              '农产品加工业',
              '特色手工业',
              '休闲农业与乡村旅游'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B10. 您是否知道村上有（企业）合作社？（单选）
          </div>
          <q-select
            v-model="vote.b10"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.b10 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B11. 您希望通过什么方式入股合作社？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.b11"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '贷款入股',
              '自有资金',
              '土地入股',
              '财政资金入股',
              '劳力入股'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B12. 您是否希望村上设置电子商务配送站点？（单选）
          </div>
          <q-select
            v-model="vote.b12"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B13. 您希望怎样销售产品？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.b13"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '市场销售',
              '统一加工后销售',
              '电商销售',
              '企业收购',
              '政府订单'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B14. 您家想参加哪种类型的产业保险？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.b14"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '农作物成本、收入类保险',
              '自然灾害类保险',
              '养殖疫病类保险',
              '价格波动类保险',
              '特色产品专属类保险',
              '不知道，不是很清楚'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B15. 是否想继续发展这些产业？（单选）
          </div>
          <q-select
            v-model="vote.b15"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.b15 === '否'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B16. 若不想继续发展此产业，原因是？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.b16"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="['产业效益不好', '缺乏销售渠道', '缺乏技术指导']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B17. 您有没有申请过以下扶贫贷款？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.b17"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="['扶贫小额贷款', '创业贴息贷款', '没贷过']"
          ></q-select>
        </dd>
        <dd
          v-if="
            typeof vote.b17 == 'object' ? !vote.b17.includes('没贷过') : 'false'
          "
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B18. 您申请扶贫小额贷款资金主要用于？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.b18"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '购买种子、化肥、农机具等生产资料',
              '扩大经营或经商',
              '子女上学、盖房、婚丧嫁娶、支付医疗费等生活性支出',
              '突发性事件或自然灾害',
              '外出务工'
            ]"
          ></q-select>
        </dd>
        <dd
          v-if="
            typeof vote.b17 == 'object' ? !vote.b17.includes('没贷过') : 'false'
          "
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B19. 扶贫小额贷款到期后能还得上吗？（单选）
          </div>
          <q-select
            v-model="vote.b19"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['能及时还上', '能还上，但是要延期还', '还不上']"
          ></q-select>
        </dd>
        <dd
          v-if="
            typeof vote.b17 == 'object' ? !vote.b17.includes('没贷过') : 'false'
          "
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B20. 还上贷款后还想不想贷？（单选）
          </div>
          <q-select
            v-model="vote.b20"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['想', '不想']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B21. 您没有申请扶贫小额贷款的原因？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.b21"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '贷款手续太复杂',
              '没有贷款的需要',
              '觉得还不上，所以没有贷',
              '扶贫贷款门槛高'
            ]"
          ></q-select>
        </dd>

        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-title">
            C. 就业务工情况（家庭务工情况、就业培训）
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C1.您所在的乡镇/村扶贫工厂或者扶贫车间有多少个（个）：【若无，则填“0”】
          </div>
          <q-input
            v-model="vote.c1"
            type="text"
            dense
            style="min-width: 8em;"
            mask="###"
          />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C2.您家庭成员在扶贫工厂或者扶贫车间务工有多少人（人）：【若无，则填“0”】
          </div>
          <q-input
            v-model="vote.c2"
            type="text"
            dense
            style="min-width: 8em;"
            mask="###"
          />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C3.您家庭成员有公益性岗位多少人（人）：【若无，则填“0”】
          </div>
          <q-input
            v-model="vote.c3"
            type="text"
            dense
            style="min-width: 8em;"
            mask="###"
          />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C4. 您希望政府通过哪种方式发布招工信息？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.c4"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '手机短信',
              '山谷河谷区',
              '村内设置招工信息栏',
              '乡/村招工信息群',
              '丘陵区',
              '平原区'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C5. 您认为您家务工的最大困难是？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.c5"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '没有劳动力',
              '无劳动技能，外出务工无合适岗位',
              '学历太低',
              '地域受限制',
              '不知道什么地方招工，找工作岗位困难',
              '有劳动力，但需要照顾老人、病人或小孩，无法外出务工'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C6. 您希望得到哪种就业帮扶措施？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.c6"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '政府核实、整合发布用工信息',
              '就业创业补助、车费补助或稳岗补助等',
              '提供就业咨询',
              '地域受限制',
              '创造公益性岗位扩大就业',
              '能为农民工提供权益保障（合同、保险、工资拖欠等）'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C7. 您家是否有人参加过就业培训？（单选）
          </div>
          <q-select
            v-model="vote.c7"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.c7 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            C8. 参加过什么就业培训？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.c8"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '厨师',
              '维修工（如汽车维修等）',
              '机械操作（如挖掘机、装载机、吊车等）',
              '电、焊工',
              '建筑工',
              '家政服务'
            ]"
          ></q-select>
        </dd>
        <dd
          v-if="vote.c7 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            C9. 接受培训是否对您家务工有所帮助？（单选）
          </div>
          <q-select
            v-model="vote.c9"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.c9 === '否' || vote.c7 === '否'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            C10. 您认为没有帮助的原因是什么？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.c10"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="['培训技能不适用', '所在地务工人员饱和', '培训技能不强']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.c9 === '否' || vote.c7 === '否'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            C11. 您想接受哪种技能就业培训？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.c11"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '厨师',
              '维修工（如汽车维修等）',
              '机械操作（如挖掘机、装载机、吊车等）',
              '电、焊工',
              '建筑工',
              '家政服务',
              '不想参加培训'
            ]"
          ></q-select>
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-title">
            D. 灾害及救助情况（灾害情况、救助措施）
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D1.
            您家庭所在地区灾害发生的频率如何？（单选）【很少：三年一次及以上；时有：两年一次或一年一次；频发：一年22次以上）】
          </div>
          <q-select
            v-model="vote.d1"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '自然灾害很少发生',
              '自然灾害时有发生',
              '自然灾害频发多发'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D2. 您所在地区（村/乡/镇）气象灾害主要有哪些？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.d2"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="['洪灾', '旱灾', '霜冻', '雪灾']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D3. 您所在地区（村/乡/镇）地质灾害主要有哪些？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.d3"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="['滑坡', '崩塌', '泥石流', '地震']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D4. 您所在地区（村/乡/镇）生物灾害主要有哪些？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.d4"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="['病虫害', '有害物种入侵']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D5. 针对以上自然灾害，您家希望得到什么救助措施？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.d5"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '资金补贴',
              '住房重建补助',
              '加固基础设施建设',
              '心理辅导',
              '灾害应急知识宣传',
              '提供食物、住所等应急救助物资',
              '提供临时就业岗位'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D6. 此次新冠肺炎对您家是否有影响？（单选）
          </div>
          <q-select
            v-model="vote.d6"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.d6 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            D7. 新冠肺炎对您家有什么影响？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.d7"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '务工人数减少',
              '务工时间缩短',
              '务工地点改变',
              '无法外出务工',
              '人身安全受到威胁'
            ]"
          ></q-select>
        </dd>
        <dd
          v-if="vote.d6 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            D8. 针对此次新冠肺炎，您家希望得到什么救助措施？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.d8"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '扶贫贷款延期',
              '发放防护用品',
              '提供临时就业岗位',
              '资金补贴'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D9.
            针对牲畜疫情（如非洲猪瘟、禽流感等），您家希望得到什么救助措施？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.d9"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="['发放种畜、种禽补助', '提供临时就业岗位', '资金补贴']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D10. 您所经受的各类灾害对家庭收入或人身安全的影响？（单选）
          </div>
          <q-select
            v-model="vote.d10"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '没有什么影响',
              '有一定影响，影响不大',
              '有较大影响',
              '影响很大'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D11. 灾害前您家希望得到哪些帮助措施？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.d11"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="['灾前预警', '灾害应急演练', '灾害知识普及与宣传']"
          ></q-select>
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-title">
            E. 公共服务情况（教育、医疗、公共设施）
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E1. 您希望您家用水在以下哪些方面进行改进？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.e1"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="['自来水入户', '水质提升', '水量增加', '不需要改进']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E2. 近 3 年来，您家年均教育支出有多少元？（元）
          </div>
          <q-input v-model="vote.e2" type="text" dense mask="######" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E3. 教育支出对家庭负担如何？（单选）
          </div>
          <q-select
            v-model="vote.e3"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['负担较轻', '负担一般', '负担较大', '负担不起']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E4. 您的家庭孩子完成义务教育后接受教育情况？（单选）
          </div>
          <q-select
            v-model="vote.e4"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '没有受教育孩子',
              '义务教育后不愿再接受教育',
              '义务教育后尽可能接受更高级教育',
              '义务教育后能不能接受更高级教育无所谓'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E5. 您认为乡村学校的教育质量如何？（单选）
          </div>
          <q-select
            v-model="vote.e5"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['质量很好', '质量较好', '质量一般', '质量较差']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E6. 家中是否有在校读书的留守儿童？（单选）
          </div>
          <q-select
            v-model="vote.e6"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.e6 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E7. 如果有，近3年孩子父母每年平均在家？（月）
          </div>
          <q-input v-model="vote.e7" type="text" dense mask="###" />
        </dd>
        <dd
          v-if="vote.e6 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E8. 在校读书的留守儿童，老师是否定期家访？（单选）
          </div>
          <q-select
            v-model="vote.e8"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E9. 家里是否有在读高校学生（专科、本科、研究生及以上）？（单选）
          </div>
          <q-select
            v-model="vote.e9"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.e9 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E10. 如果有，在读高校学生是否获得补贴政策？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.e10"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '路费补贴',
              '生活补贴',
              '助学贷款',
              '国家励志奖学金',
              '国家助学金',
              '不清楚'
            ]"
          ></q-select>
        </dd>
        <dd
          v-if="vote.e9 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E11. 政府对于高校学生是否有以下就业政策？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.e11"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="['生源回流计划', '回乡创业政策', '提供本地就业平台']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E12. 近 3 年来，您家年均医疗开销多少钱？（元）
          </div>
          <q-input v-model="vote.e12" type="text" dense mask="#####" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E13. 您的家庭成员长期慢性病成员多少人？（人）
          </div>
          <q-input v-model="vote.e13" type="text" dense mask="##" />
          <div style="padding-top: 10px;">
            E14. 您的家庭有一二级残疾成员多少人？（人）
          </div>
          <q-input v-model="vote.e14" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E15. 您的家庭有大病成员多少人？（人）
          </div>
          <q-input v-model="vote.e15" type="text" dense mask="##" />
        </dd>
        <dd
          v-if="vote.e15 != 0"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E16. 家里大病病人平常在哪里看病？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.e16"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="['县卫生室', '市卫生院', '省医院']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.e15 != 0"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E17. 您觉得县（乡、村）医院能满足您基本看病的需求吗？（单选）
          </div>
          <q-select
            v-model="vote.e17"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['完全满足', '基本满足', '不能满足', '不清楚']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E18. 您希望县、乡/镇医院在以下哪些方面做出改进？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.e18"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '医疗设备齐全',
              '配备专业医疗人员',
              '适当减轻医疗费用负担'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E19. 您是否愿意参加健康方面的知识讲座？（单选）
          </div>
          <q-select
            v-model="vote.e19"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['不愿意', '愿意', '无所谓']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E20. 您家是否有人想去医院进行健康体检？（单选）
          </div>
          <q-select
            v-model="vote.e20"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E21. 您家主要房屋结构是？（单选，结合调查员判断）【可输入】
          </div>
          <q-select
            v-model="vote.e21"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="['钢混', '砖混', '砖木', '土坯', '窑洞']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E22. 您家用火（取暖、做饭）的主要方式为？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.e22"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="['煤炭', '用电', '沼气', '柴火', '土炕', '牛粪', '煤气']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E23. 您家处理生活垃圾的主要方式是？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.e23"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="['村里集中清运处理', '随意处置']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E24. 您家怎样处理生产垃圾（如秸秆等）？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.e24"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="['就地填埋', '就地焚烧', '高温堆肥', '村里集中清运处理']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E25. 您家厕所粪污、生活污水处理方式？（单选）
          </div>
          <q-select
            v-model="vote.e25"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '资源化利用（修沼气池）',
              '正常处理，未污染环境',
              '随意处理'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E26. 您家是否做到人畜分离？（单选）
          </div>
          <q-select
            v-model="vote.e26"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E27. 您家入户道路情况？（单选，结合调查员判断）【可输入】
          </div>
          <q-select
            v-model="vote.e27"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="['硬化水泥路', '非硬化路']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E28. 您希望改善生活环境的哪些方面？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.e28"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '院落硬化',
              '院落绿化',
              '厕所改造',
              '入户道路改造',
              '厨房改造'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E29. 您认为去县/乡镇方便吗？（单选）
          </div>
          <q-select
            v-model="vote.e29"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['非常方便', '比较方便', '一般', '不方便']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E30. 村里有以下哪些公共设施？（多选）
          </div>
          <q-select
            v-model="vote.e30"
            dense
            multiple
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '文化活动室',
              '路灯',
              '垃圾池或者垃圾桶',
              '公共厕所',
              '公共警务室',
              '健身设施、器材'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E31. 乡/镇有没有集中供养中心（老人、失能人员）?（单选）
          </div>
          <q-select
            v-model="vote.e31"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['有', '没有']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.e31 === '有'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E32. 若有，家里有多少人在集中供养中心？（人）
          </div>
          <q-input v-model="vote.e32" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E33. 若没有，您希望乡/镇里设立集中供养中心吗？（单选）
          </div>
          <q-select
            v-model="vote.e33"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['很需要', '有一定需要', '不需要']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E34. 村里文化设施及活动都有哪些？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.e34"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 18em;"
            behavior="menu"
            :options="[
              '体育活动（广场舞、羽毛球、乒乓球、篮球等）',
              '文化活动（阅览室、读报看书、书法、下棋等）',
              '艺术活动（戏剧演出、微电影）',
              '分享类活动（分享生活经验、厨艺、健身方法、防诈骗技巧等）'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E35. 您希望村里增加哪些文化活动？（单选）【可输入】
          </div>
          <q-select
            v-model="vote.e35"
            dense
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '体育活动（广场舞、羽毛球、乒乓球、篮球等）',
              '文化活动（阅览室、读报看书、书法、下棋等）',
              '艺术活动（戏剧演出、微电影）',
              '分享类活动（分享生活经验、厨艺、健身方法、防诈骗技巧等）'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E36. 您认为村里哪些基础设施有待改善？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.e36"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '交通出行条件',
              '电力设施',
              '通讯设施',
              '饮水及农田水利设施',
              '儿童上学条件',
              '就医看病条件',
              '卫生环境',
              '文体设施'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E37. 您希望村里增加哪些公共设施？（多选）【可输入】
          </div>
          <q-select
            v-model="vote.e37"
            dense
            multiple
            use-input
            use-chips
            new-value-mode="add-unique"
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '健身设施、器材',
              '文化活动室',
              '路灯',
              '垃圾池或者垃圾桶',
              '公共警务室',
              '公共厕所',
              '卫生环境',
              '文体设施'
            ]"
          ></q-select>
        </dd>
      </dl>
    </div>

    <div class="bg-grey-1 text-center" style="height: 50px;">
      <q-btn
        class="q-ml-lg q-mt-sm"
        type="submit"
        color="secondary"
        icon-right="save"
        :loading="saving"
        @click="savedata"
      >
        保存问卷&nbsp;&nbsp;
        <template v-slot:loading>
          <q-spinner-rings />
        </template>
      </q-btn>
    </div>

    <!--    <q-page-sticky position="bottom-right" :offset="[18, 18]">-->
    <!--      <q-btn fab icon="add" color="accent" />-->
    <!--    </q-page-sticky>-->
  </q-page>
</template>

<script>
import VDistpicker from 'v-distpicker'

export default {
  name: 'P2s1questionnaire',
  components: { VDistpicker },
  // http://0apps.test:8080/#/p2s1questionnaire?qsource=code
  data() {
    return {
      saving: false,
      positionsign: false,
      username: null,
      netstate: null,
      qsource: null,
      placeholders: {
        province: '------- 省 --------',
        city: '------- 市 -------',
        area: '------- 区 -------'
      },
      vote: {
        province: '云南省',
        au_conclusion: '正常'
      }
    }
  },

  computed: {},
  watch: {},
  created() {},
  mounted() {
    if (process.env.MODE === 'cordova') {
      this.getPosition()
      this.positionsign = true
    }
    this.checkConnection()
    this.username = this.$q.localStorage.getItem('username')
    this.qsource = this.$route.query.qsource
    // console.log(this.qsource, '+++++++')
  },

  methods: {
    AreaonSelected(data) {
      // console.log(data, '===========')
      this.vote.province = data.province.value
      this.vote.city = data.city.value
      this.vote.county = data.area.value
      this.vote.areacode = data.area.code
      // console.log(JSON.stringify(this.vote), '===========')
    },
    checkFileSize(files) {
      return files.filter(file => file.size < 20480000)
    },
    upfilished(info) {
      // console.log(info)
      // this.data.files.push(info.files[0].name)
      // this.DaddFiles = false
    },
    // 查询当前网络连接
    checkConnection() {
      var networkState = navigator.connection.type
      const states = {
        unknown: '未知网络连接',
        ethernet: '以太网连接',
        wifi: 'WIFI 网络连接',
        '2g': '2G 网络连接',
        '3g': '3G 网络连接',
        '4g': '4G 网络连接',
        cell: '蜂窝数据连接',
        none: '无网络连接'
      }
      this.netstate = states[networkState]
    },
    // 1 查询当前位置信息
    getPosition() {
      navigator.geolocation.getCurrentPosition(
        this.getPositionSuccess,
        this.getPositionError,
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 }
      )
    },
    // 1-1 查询当前位置信息成功
    getPositionSuccess(position) {
      this.vote.latitude = String(position.coords.latitude.toFixed(2))
      this.vote.longitude = String(position.coords.longitude.toFixed(2))
    },
    // 1-2 查询当前位置信息失败
    getPositionError(error) {
      if (error) {
        this.$zglobal.showMessage(
          'red-7',
          'center',
          this.$t('getlocationfailed')
        )
      }
    },
    savedata() {
      this.saving = true
      const tmpa = this.$auth.user()
      this.vote.investigator = tmpa.id
      // 生成问卷编号
      var date = new Date()
      var seperator1 = 'D'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      var hour = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      var currentdate =
        this.vote.areacode +
        seperator1 +
        date.getFullYear() +
        month +
        strDate +
        'T' +
        hour +
        minutes +
        seconds
      this.vote.no = currentdate
      // 问卷编号结束
      // 预置数据
      this.vote.qtype = '相对贫困调查问卷'
      // 文件来源
      if (this.$auth.check()) {
        if (process.env.MODE === 'cordova') this.vote.qsource = '移动端在线问卷'
        else this.vote.qsource = '浏览器在线问卷'
      } else {
        if (process.env.MODE === 'cordova') {
          this.vote.qsource = '移动端离线问卷'
        } else {
          if (this.qsource === 'code') {
            this.vote.qsource = '扫码离线问卷'
          } else {
            this.vote.qsource = '浏览器离线问卷'
          }
        }
      }
      // 检测字段是否完整
      var requireditem = [
        'no',
        'province',
        'city',
        'county',
        'town',
        'village',
        'a2',
        'a3'
      ]
      var missitem = []
      var submitsign = true
      if (!this.vote.areacode) {
        this.$zglobal.showMessage('red-7', 'center', '行政区域未设置正确！')
        submitsign = false
      }
      for (var item in requireditem) {
        console.log(requireditem[item], '----------')
        if (!(requireditem[item] in this.vote)) {
          missitem.push(requireditem[item])
          submitsign = false
        }
      }
      if (submitsign) {
        // 是否在线
        if (this.$auth.check()) {
          console.log('ON-----')
          if (
            process.env.MODE === 'cordova' &&
            this.netstate === '无网络连接'
          ) {
            alert('当前【无网络连接】，将采用离线方式保存问卷！')
            this.writeToFile('/AIApp/Votedata.json', this.vote)
          } else {
            this.$router.app.$http
              .post('/p2/s1/p2s1questionnaire1', this.vote)
              .then(res => {
                // console.log(res, '+++++++')
                if (res.data.success) {
                  this.$zglobal.showMessage(
                    'positive',
                    'center',
                    this.$t('p2s1.savesuccess')
                  )
                } else {
                  this.$zglobal.showMessage(
                    'red-7',
                    'center',
                    this.$t('p2s1.savefailed')
                  )
                }
              })
          }
        } else {
          console.log('OFF-----')
          this.$router.app.$http
            .post('/p2/s1/p2s1questionnaire1/noa', this.vote)
            .then(res => {
              // console.log(res, '+++++++')
              if (res.data.success) {
                this.$zglobal.showMessage(
                  'positive',
                  'center',
                  this.$t('p2s1.savesuccess')
                )
              } else {
                this.$zglobal.showMessage(
                  'red-7',
                  'center',
                  this.$t('p2s1.savefailed')
                )
              }
            })
        }
        setTimeout(() => {
          this.saving = false
          // console.log('数据：' + JSON.stringify(this.vote))
        }, 5000)
      } else {
        // console.log(JSON.stringify(missitem), '+++++++++')
        this.$zglobal.showMessage(
          'red-7',
          'center',
          '保存失败！以下数据项未填写：' + JSON.stringify(missitem)
        )

        setTimeout(() => {
          this.saving = false
          // console.log('数据：' + JSON.stringify(this.vote))
        }, 500)
      }
    },
    /* 文件读写
     * 打开或创建文件夹,创建文件并写入内容
     * */
    writeToFile(fileName, data) {
      data = JSON.stringify(data)
      if (process.env.MODE === 'cordova') {
        window.resolveLocalFileSystemURL(
          cordova.file.externalRootDirectory,
          function(directoryEntry) {
            // 创建文件夹AIApp
            directoryEntry.getDirectory(
              'AIApp/Images',
              { create: true },
              function(dirEntry) {
                // alert('您创建了：' + dirEntry.name + ' 文件夹。')
              },
              function(err) {
                alert('创建文件夹出错' + err.toString())
              }
            )
            // 查找这个文件，如果没有则创建
            directoryEntry.getFile(
              fileName,
              { create: true, exclusive: false },
              function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                  fileWriter.onwriteend = function(e) {
                    alert('保存成功： "' + fileName)
                  }
                  fileWriter.onerror = function(e) {
                    alert('保存失败：' + e.toString())
                  }
                  // alert(data + '-' + fileWriter.length)
                  fileWriter.seek(fileWriter.length)
                  var blob = new Blob([',' + data], { type: 'text/plain' })
                  fileWriter.write(blob)
                  fileWriter.close()
                })
              },
              function(err) {
                alert('写入文件出错' + err.toString())
              }
            )
          },
          function(err) {
            alert('创建文件出错' + err.toString())
          }
        )
      }
    }
    /*
     * 依次打开指定目录文件夹,读取文件内容
     * */
  }
}
</script>
<style scoped>
.q-stepper--vertical .q-stepper__step-inner {
  padding: 0 2px 25px 37px;
}
.doc-card-title {
  margin-left: -20px;
  padding: 2px 10px 2px 24px;
  background: var(--q-color-info);
  color: #000000;
  position: relative;
  border-radius: 3px 5px 5px 0;
}
.divwarp {
  height: 40px;
}
dd {
  font-size: 16px;
}
</style>
