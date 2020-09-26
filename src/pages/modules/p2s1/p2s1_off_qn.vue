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
            A.
            基本情况（家庭基本情况、自然、生产生活条件、人口、劳动力、收入情况等）
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A1. 户主姓名：</div>
          <q-input v-model="vote.a1" type="text" dense />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A2. 户主身份证号码：
          </div>
          <q-input
            v-model="vote.a2"
            type="text"
            dense
            style="min-width:200px;"
            mask="X##### ######## #### XX"
            :rules="[val => val.length > 19 || '身份证号必须大于18位！']"
          />
          <div style="padding-top: 10px;">A3. 户主民族是：</div>
          <q-select
            v-model="vote.a3"
            dense
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
              '阿昌族',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.a3 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.a301"
              type="text"
              dense
              label="其他民族"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
          <div style="padding-top: 10px;">A4. 联系电话：</div>
          <q-input
            v-model="vote.a4"
            type="text"
            dense
            mask="#############################"
          />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A5-1. 被访者姓名：</div>
          <q-input v-model="vote.a501" type="text" dense />
          <div style="padding-top: 10px;">A5-2. 与户主的关系：</div>
          <q-select
            v-model="vote.a502"
            dense
            behavior="menu"
            style="min-width: 8em;"
            :options="['本人', '配偶', '子女', '父母', '其他']"
          ></q-select>
          <div v-if="vote.a502 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.a5021"
              type="text"
              dense
              label="其他关系"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A5-3. 联系电话：</div>
          <q-input
            v-model="vote.a503"
            type="text"
            dense
            mask="#############################"
          />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A6. 您所在的行政区域是？</div>
        </dd>
        <dd
          v-if="areasign"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
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
          <div class="row no-wrap ">
            <q-input v-model="vote.town" type="text" dense class="col-9" />
            <div style="padding-top: 10px;min-width: 100px;">乡（镇）</div>
          </div>
          <div class="row no-wrap ">
            <q-input v-model="vote.village" type="text" dense class="col-9" />
            <div style="padding-top: 10px;">村</div>
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">A7. 您的家庭情况是？（单选）</div>
          <q-select
            v-model="vote.a7"
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
          <div style="padding-top: 10px;">A8. 户籍人口（人）：</div>
          <q-input v-model="vote.a8" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A9.
            常住人口（居住在家半年以上(含半年),共享生活开支的人口，不包括现役军人，服刑人员）（人）：
          </div>
          <q-input v-model="vote.a9" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A9-1 16周岁以下人口（人）：
          </div>
          <q-input v-model="vote.a901" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A9-2
            现有劳动力人口数（人）【16-64岁具有劳动能力人口，不包括现役军人，服刑人员】：
          </div>
          <q-input v-model="vote.a902" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A9-3
            丧失劳动能力人口数（人）【16到64周岁间因病因残失去劳动力的人数】：
          </div>
          <q-input v-model="vote.a903" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A9-4 60 周岁及以上人数（人）：
          </div>
          <q-input v-model="vote.a904" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A9-5 未来 3
            年您家庭劳动力人口数（人）【未来3年16-64岁可能具有劳动能力人口，不包括在校学生，现役军人，服刑人员】：
          </div>
          <q-input v-model="vote.a905" type="text" dense mask="##" />
        </dd>

        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A10. 近三年来（2018-2020 年），
            您家庭年均总收入（元）【人均收入（元）：<font color="red">{{
              (sumdataa10 / vote.a9) | Numformat
            }}</font
            >】：
          </div>
          <q-input v-model="sumdataa10" type="number" dense readonly />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A10-1 近三年来（2018-2020年），您家庭年均经营性净收入（元）：
          </div>
          <q-input
            v-model="vote.a1001"
            type="number"
            dense
            oninput="if(value.length>10) value=value.slice(0,10)"
            @change="suma10"
          />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A10-2 近三年来（2018-2020 年），您家庭年均工资性收入（元）：
          </div>
          <q-input
            v-model="vote.a1002"
            type="number"
            dense
            oninput="if(value.length>10) value=value.slice(0,10)"
            @change="suma10"
          />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A10-3 近三年来（2018-2020 年），您家庭年均财产性收入（元）：
          </div>
          <q-input
            v-model="vote.a1003"
            type="number"
            dense
            oninput="if(value.length>10) value=value.slice(0,10)"
            @change="suma10"
          />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A10-4 近三年来（2018-2020 年），您家庭年均转移性收入（元）：
          </div>
          <q-input
            v-model="vote.a1004"
            type="number"
            dense
            oninput="if(value.length>10) value=value.slice(0,10)"
            @change="suma10"
          />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A10-5 其中全家每月可领低保金（元）【若无，则填“0”】：
          </div>
          <q-input
            v-model="vote.a1005"
            type="number"
            dense
            oninput="if(value.length>6) value=value.slice(0,6)"
          />
          <div style="padding-top: 10px;">
            A10-6 每月领养老金（元）【若无，则填“0”】：
          </div>
          <q-input
            v-model="vote.a1006"
            type="number"
            dense
            oninput="if(value.length>6) value=value.slice(0,6)"
          />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A11. 近3年来，您的家庭收入主要来源是什么？（单选）
          </div>
          <q-select
            v-model="vote.a11"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="[
              '外出务工收入：在本乡镇外务工的工资收入',
              '本地务工收入：在本乡镇内务工',
              '本地务工收入：政府提供的各种公益性岗位的工资收入',
              '种养殖收入：各类农林牧渔业收入',
              '经营性收入：家庭各种经营性收入，如做生意、跑运输、开饭馆、小超市等',
              '财产性收入：房屋等出租，土地流转，入股分红等收入',
              '转移性收入：各类政府补贴，低保，养老金、残疾人补贴等收入'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A12. 影响您家收入最主要的原因是什么？（单选）
          </div>
          <q-select
            v-model="vote.a12"
            dense
            behavior="menu"
            style="min-width:12em;"
            :options="[
              '因病、因残',
              '因学',
              '因自然灾害',
              '因缺土地、水等资源',
              '因婚丧嫁娶',
              '因缺技术、资金等',
              '缺劳力',
              '无影响',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.a12 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.a1201"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A13. 近3年来,您的家庭最大支出是？（单选）
          </div>
          <q-select
            v-model="vote.a13"
            dense
            behavior="menu"
            style="min-width: 12em;"
            :options="[
              '孩子教育支出',
              '家庭基本生活支出，包括吃、穿、用等消费支出',
              '家庭成员医疗支出',
              '固定资产投入支出，包括改扩建住房，房屋装修，购买家具家电等',
              '生产经营性支出',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.a13 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.a1301"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A14. 未来 3 年，您的家庭主要支出可能是？（单选）
          </div>
          <q-select
            v-model="vote.a14"
            dense
            behavior="menu"
            style="min-width: 12em;"
            :options="[
              '孩子教育支出',
              '生活提升改善性支出，如改扩建住房，购买家电，保险等',
              '医疗保健支出',
              '生产经营性支出',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.a14 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.a1401"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A15. 您家是否有存款？（单选）
          </div>
          <q-select
            v-model="vote.a15"
            dense
            behavior="menu"
            style="min-width: 10em;"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            A16. 您认为你家实现增收致富的主要途径和方式有哪些？（多选）
          </div>
          <q-select
            v-model="vote.a16"
            dense
            multiple
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '外出务工',
              '发展种植业',
              '发展养殖业',
              '发展服务业',
              '发展手工业',
              '发展经营业',
              '改善基础设施条件',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.a16 === 'object' &&
                vote.a16.length > 0 &&
                vote.a16.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.a1601"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-title">
            B. 家庭产业发展情况（产业发展、产业培训及指导、产业保障）
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
            B2. 家里主要发展了什么产业项目？（多选）
          </div>
          <q-select
            v-model="vote.b2"
            dense
            multiple
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '种植业（传统类：小麦、玉米、水稻等）',
              '种植业（经济类：中药材、蔬菜、烤烟、林果等）',
              '养殖业',
              '农产品加工业',
              '特色手工业',
              '休闲农业与乡村旅游',
              '个体经营',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.b2 === 'object' &&
                vote.b2.length > 0 &&
                vote.b2.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.b201"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.b1 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B3. 产业经营方式是什么？（单选）
          </div>
          <q-select
            v-model="vote.b3"
            dense
            behavior="menu"
            style="min-width: 12em;"
            :options="[
              '自己经营管理',
              '合作社托管托养',
              '龙头企业技术支持',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.b3 === 'object' &&
                vote.b3.length > 0 &&
                vote.b3.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.b301"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.b1 === '是' && vote.b3 === '自己经营管理'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B4. 自己经营管理时采用的管理方式主要是什么？（多选）
          </div>
          <q-select
            v-model="vote.b4"
            dense
            multiple
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '传统方式（人力、牛等）',
              '机械化管理（收割机，播种机等）',
              '信息智能化管理（新型农业）',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.b4 === 'object' &&
                vote.b4.length > 0 &&
                vote.b4.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.b401"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.b1 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B5. 产业效益如何？（单选）
          </div>
          <q-select
            v-model="vote.b5"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['很好', '较好', '一般', '较差']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.b1 === '是' && vote.b5 === '较差'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B6. 效果较差的主要原因是什么？（单选）
          </div>
          <q-select
            v-model="vote.b6"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '产业没选好',
              '缺乏技术',
              '经营管理不善',
              '产品市场价格波动大',
              '遭受各类自然灾害、牲畜疫病等影响',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.b6 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.b601"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.b1 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B7. 您希望得到哪些产业帮扶？（多选）
          </div>
          <q-select
            v-model="vote.b7"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '政策支持',
              '资金帮扶',
              '技术指导',
              '提供产品销售渠道',
              '管理指导',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.b7 === 'object' &&
                vote.b7.length > 0 &&
                vote.b7.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.b701"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.b1 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B8. 您希望怎样销售产品？（单选）
          </div>
          <q-select
            v-model="vote.b8"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '市场销售',
              '统一加工后销售',
              '电商销售',
              '企业收购',
              '政府订单',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.b8 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.b801"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.b1 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B9. 您是否希望村上设置电子商务配送站点？（单选）
          </div>
          <q-select
            v-model="vote.b9"
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
            B10. 您家想参加哪种类型的产业保险？（多选）
          </div>
          <q-select
            v-model="vote.b10"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '农作物成本、收入类保险',
              '自然灾害类保险',
              '养殖疫病类保险',
              '价格波动类保险',
              '特色产品专属类保险',
              '不知道，不是很清楚',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.b10 === 'object' &&
                vote.b10.length > 0 &&
                vote.b10.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.b1001"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.b1 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B11.是否想继续发展这些产业？（单选）
          </div>
          <q-select
            v-model="vote.b11"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.b1 === '是' && vote.b11 === '否'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B12. 若不想继续发展此产业，原因是什么？（单选）
          </div>
          <q-select
            v-model="vote.b12"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '产业效益不好',
              '缺乏销售渠道',
              '缺乏技术指导',
              '灾害风险过大',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.b12 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.b1201"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.b1 === '否'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B13. 若以前没有发展产业，以后想发展什么产业？（多选）
          </div>
          <q-select
            v-model="vote.b13"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '种植业（传统类：小麦、玉米、水稻等）',
              '种植业（经济类：中药材、蔬菜、烤烟、林果等）',
              '养殖业',
              '农产品加工业',
              '特色手工业',
              '休闲农业与乡村旅游',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.b13 === 'object' &&
                vote.b13.length > 0 &&
                vote.b13.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.b1301"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B14.你是否想参加农业技能培训？（单选）
          </div>
          <q-select
            v-model="vote.b14"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.b14 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B15. 您希望参加哪些农业技能培训？（多选）
          </div>
          <q-select
            v-model="vote.b15"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="['种殖培训', '养殖培训', '加工培训', '销售培训', '其他']"
          ></q-select>
          <div
            v-if="
              typeof vote.b15 === 'object' &&
                vote.b15.length > 0 &&
                vote.b15.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.b1501"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B16. 您是否知道村上有合作社？（单选）
          </div>
          <q-select
            v-model="vote.b16"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B17. 您是否想参加合作社？（单选）
          </div>
          <q-select
            v-model="vote.b17"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.b17 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B18. 您希望通过什么方式入股合作社？（多选）
          </div>
          <q-select
            v-model="vote.b18"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '贷款入股',
              '自有资金',
              '土地入股',
              '财政资金入股',
              '劳力入股',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.b18 === 'object' &&
                vote.b18.length > 0 &&
                vote.b18.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.b1801"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B19. 您是否借过扶贫小额贷款？（单选）
          </div>
          <q-select
            v-model="vote.b19"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.b19 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B20. 您借扶贫小额贷款主要用于哪方面？（单选）
          </div>
          <q-select
            v-model="vote.b20"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '购买种子、化肥、农机具等生产资料',
              '扩大经营或经商',
              '子女上学、盖房、婚丧嫁娶、支付医疗费等生活性支出',
              '突发性事件或自然灾害',
              '外出务工',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.b20 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.b2001"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.b19 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B21. 扶贫小额贷款到期后能还得上吗？（单选）
          </div>
          <q-select
            v-model="vote.b21"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['能及时还上', '能还上，但是要延期还', '还不上']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.b19 === '否'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            B22. 您没有申请扶贫小额贷款的原因？（单选）
          </div>
          <q-select
            v-model="vote.b22"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '贷款手续太复杂',
              '没有贷款的需要',
              '觉得还不上，所以没有贷',
              '扶贫贷款门槛高',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.b22 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.b2201"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            B23. 未来是否有贷款意愿？（单选）
          </div>
          <q-select
            v-model="vote.b23"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-title">
            C. 就业务工情况（家庭务工情况、就业培训）
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C1.目前，您家庭成员务工人数有多少人（人）：【若无，则填“0”】
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
            C2.您所在的村扶贫工厂或者扶贫车间有多少个（个）：【若无，则填“0”】
          </div>
          <q-input
            v-model="vote.c2"
            type="text"
            dense
            style="min-width: 8em;"
            mask="###"
          />
        </dd>
        <dd
          v-if="vote.c2 > 0"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            C3.您家庭成员在扶贫工厂或者扶贫车间务工有有多少人（人）：【若无，则填“0”】
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
            C4.您家庭成员有公益性岗位多少人（人）：【若无，则填“0”】
          </div>
          <q-input
            v-model="vote.c4"
            type="text"
            dense
            style="min-width: 8em;"
            mask="###"
          />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C5. 您希望政府通过哪种方式发布招工信息？（多选）
          </div>
          <q-select
            v-model="vote.c5"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '手机短信',
              '微信公众号',
              '村内设置招工信息栏',
              '乡/村招工信息群',
              '广播宣传',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.c5 === 'object' &&
                vote.c5.length > 0 &&
                vote.c5.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.c501"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C6. 您认为您家务工的最大困难是？（单选）
          </div>
          <q-select
            v-model="vote.c6"
            dense
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '没有劳动力',
              '无劳动技能，外出务工无合适岗位',
              '学历太低',
              '没有获取招工信息的渠道',
              '无法外出务工（需要照顾老人、病人或小孩等）',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.c6 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.c601"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C7. 您希望得到哪种就业帮扶措施？（多选）
          </div>
          <q-select
            v-model="vote.c7"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '政府发布用工信息',
              '获得就业创业补助、车费补助或稳岗补助等',
              '提供就业咨询',
              '引进企业带动就业',
              '政府提供公益性岗位',
              '提供权益保障服务',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.c7 === 'object' &&
                vote.c7.length > 0 &&
                vote.c7.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.c701"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C8. 您家是否有人参加过就业培训？（单选）
          </div>
          <q-select
            v-model="vote.c8"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.c8 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            C9. 参加过什么就业培训？（多选）
          </div>
          <q-select
            v-model="vote.c9"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '厨师',
              '维修工（如汽车维修等）',
              '机械操作（如挖掘机、装载机、吊车等）',
              '电、焊工',
              '建筑工',
              '家政服务',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.c9 === 'object' &&
                vote.c9.length > 0 &&
                vote.c9.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.c901"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.c8 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            C10. 接受培训是否对您家务工有所帮助？（单选）
          </div>
          <q-select
            v-model="vote.c10"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.c8 === '是' && vote.c10 === '否'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            C11. 您认为培训对您家就业没有帮助的原因是什么？（多选）
          </div>
          <q-select
            v-model="vote.c11"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '市场人员饱和',
              '尚未达到应有技能',
              '自己不想去',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.c11 === 'object' &&
                vote.c11.length > 0 &&
                vote.c11.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.c1101"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            C12. 今后，你是否想接受就业技能培训？（单选）
          </div>
          <q-select
            v-model="vote.c12"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.c12 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            C13. 想接受哪些就业技能培训？（多选）
          </div>
          <q-select
            v-model="vote.c13"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '厨师',
              '维修工（如汽车维修等）',
              '挖掘机驾驶',
              '电工',
              '建筑工',
              '家政服务',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.c13 === 'object' &&
                vote.c13.length > 0 &&
                vote.c13.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.c1301"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-title">
            D. 灾害及救助情况（灾害情况、救助措施）
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D1. 您家庭所在地区灾害发生的频率如何？（单选）
          </div>
          <q-select
            v-model="vote.d1"
            dense
            style="min-width: 15em;"
            behavior="menu"
            :options="[
              '自然灾害很少发生（三年一次或更少）',
              '自然灾害时有发生（两年一次或一年一次）',
              '自然灾害频发多发（一年两次及以上）'
            ]"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D2. 您所在地区（村/乡/镇）是否有气象灾害？（单选）
          </div>
          <q-select
            v-model="vote.d2"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.d2 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            D3. 您所在地区（村/乡/镇）气象灾害主要有哪些？（多选）
          </div>
          <q-select
            v-model="vote.d3"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="['洪灾', '旱灾', '霜冻', '雪灾', '其他']"
          ></q-select>
          <div
            v-if="
              typeof vote.d3 === 'object' &&
                vote.d3.length > 0 &&
                vote.d3.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.d301"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D4. 您所在地区（村/乡/镇）是否有地质灾害？（单选）
          </div>
          <q-select
            v-model="vote.d4"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.d4 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            D5. 您所在地区（村/乡/镇）地质灾害主要有哪些？（多选）
          </div>
          <q-select
            v-model="vote.d5"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="['滑坡', '崩塌', '泥石流', '地震', '其他']"
          ></q-select>
          <div
            v-if="
              typeof vote.d5 === 'object' &&
                vote.d5.length > 0 &&
                vote.d5.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.d501"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D6. 您所在地区（村/乡/镇）是否有生物灾害？（单选）
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
            D7. 您所在地区（村/乡/镇）生物灾害主要有哪些？（多选）
          </div>
          <q-select
            v-model="vote.d7"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="['病虫害', '有害物种入侵', '其他']"
          ></q-select>
          <div
            v-if="
              typeof vote.d7 === 'object' &&
                vote.d7.length > 0 &&
                vote.d7.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.d701"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D8. 针对以上自然灾害，您家希望得到什么救助措施？（多选）
          </div>
          <q-select
            v-model="vote.d8"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '资金补贴',
              '住房重建补助',
              '加固基础设施建设',
              '心理辅导',
              '灾害应急知识宣传',
              '提供食物、住所等应急救助物资',
              '提供临时就业岗位',
              '提供农药补助',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.d8 === 'object' &&
                vote.d8.length > 0 &&
                vote.d8.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.d801"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D9. 此次新冠肺炎对您家是否有影响？（单选）
          </div>
          <q-select
            v-model="vote.d9"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.d9 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            D10. 新冠肺炎对您家有什么影响？（多选）
          </div>
          <q-select
            v-model="vote.d10"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '务工人数减少',
              '务工时间缩短',
              '务工地点改变',
              '无法外出务工',
              '人身安全受到威胁',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.d10 === 'object' &&
                vote.d10.length > 0 &&
                vote.d10.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.d1001"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.d9 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            D11. 针对此次新冠肺炎，您家得到过什么救助措施？（多选）
          </div>
          <q-select
            v-model="vote.d11"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '农资补贴',
              '生产补贴',
              '消费扶贫',
              '扶贫小额贷款（优惠）延期',
              '发放防护用品',
              '提供临时就业岗位',
              '资金补贴',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.d11 === 'object' &&
                vote.d11.length > 0 &&
                vote.d11.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.d1101"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D12. 牲畜疫情（如非洲猪瘟、禽流感等）对您家是否有影响？（单选）
          </div>
          <q-select
            v-model="vote.d12"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.d12 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            D13. 牲畜疫情对您家有什么影响？（多选）
          </div>
          <q-select
            v-model="vote.d13"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="['收益减少', '订单减少', '成本增加', '其他']"
          ></q-select>
          <div
            v-if="
              typeof vote.d13 === 'object' &&
                vote.d13.length > 0 &&
                vote.d13.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.d1301"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.d12 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            D14. 针对牲畜疫情，您家希望得到什么救助措施？（多选）
          </div>
          <q-select
            v-model="vote.d14"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '发放种畜、种禽补助',
              '提供临时就业岗位',
              '资金补贴',
              '控制疫情',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.d14 === 'object' &&
                vote.d14.length > 0 &&
                vote.d14.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.d1401"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            D15.
            您所经受的各类灾害（自然灾害、新冠肺炎、牲畜疫情等）对家庭收入或人身安全的影响？（单选）
          </div>
          <q-select
            v-model="vote.d15"
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
            D16. 灾害前您家希望得到哪些帮助措施？（多选）
          </div>
          <q-select
            v-model="vote.d16"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '灾前预警',
              '灾害应急演练',
              '灾害知识普及与宣传',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.d16 === 'object' &&
                vote.d16.length > 0 &&
                vote.d16.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.d1601"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-title">
            E. 公共服务及设施保障情况（教育、医疗、公共设施等）
          </div>
        </dt>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-subtitle">
            饮水方面
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E1. 您家用水是否需要进行改进？（单选）
          </div>
          <q-select
            v-model="vote.e1"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.e1 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E2. 您希望您家用水在以下哪些方面进行改进？（多选）
          </div>
          <q-select
            v-model="vote.e2"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="['自来水入户', '水质提升', '水量增加', '其他']"
          ></q-select>
          <div
            v-if="
              typeof vote.e2 === 'object' &&
                vote.e2.length > 0 &&
                vote.e2.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.e201"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-subtitle">
            教育方面
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E3. 您家正在接受教育的学生（幼儿园及以上）多少人？（人）
          </div>
          <q-input v-model="vote.e3" type="text" dense mask="###" />
        </dd>
        <dd
          v-if="vote.e3 > 0"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E4. 近 3 年来，您家年均教育支出有多少元？（元）
          </div>
          <q-input v-model="vote.e4" type="text" dense mask="######" />
        </dd>
        <dd
          v-if="vote.e3 > 0"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E5. 教育支出对家庭负担如何？（单选）
          </div>
          <q-select
            v-model="vote.e5"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '负担较轻',
              '负担一般',
              '负担较大',
              '负担不起',
              '无教育支出'
            ]"
          ></q-select>
        </dd>
        <dd
          v-if="vote.e3 > 0"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E6. 您家庭的孩子完成义务教育后接受教育情况是？（单选）
          </div>
          <q-select
            v-model="vote.e6"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '义务教育后不愿再接受教育',
              '义务教育后尽可能接受更高级教育',
              '义务教育后能不能接受更高级教育无所谓'
            ]"
          ></q-select>
        </dd>
        <dd
          v-if="vote.e3 > 0"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E7. 您所在乡/镇学校的教育质量如何？（单选）
          </div>
          <q-select
            v-model="vote.e7"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['质量很好', '质量较好', '质量一般', '质量较差']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.e3 > 0 && vote.e7 === '质量较差'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E8. 质量较差的原因是？（多选）
          </div>
          <q-select
            v-model="vote.e8"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '教学资源有限',
              '教学设施较差',
              '师资不强',
              '班级学习氛围较差',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.e8 === 'object' &&
                vote.e8.length > 0 &&
                vote.e8.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.e801"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.e3 > 0"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E9. 家中是否有在校读书的留守儿童？（单选）
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
          v-if="vote.e3 > 0 && vote.e9 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E10. 近3年孩子父母每年平均在家？（月）
          </div>
          <q-input v-model="vote.e10" type="text" dense mask="###" />
        </dd>
        <dd
          v-if="vote.e3 > 0 && vote.e9 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E11. 老师是否定期家访？（单选）
          </div>
          <q-select
            v-model="vote.e11"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.e3 > 0"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E12. 家里是否有在读高校学生（专科、本科、研究生及以上）？（单选）
          </div>
          <q-select
            v-model="vote.e12"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.e3 > 0 && vote.e12 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E13. 如果有，在读高校学生是否获得补贴政策？（多选）
          </div>
          <q-select
            v-model="vote.e13"
            dense
            multiple
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '路费补贴',
              '生活补贴',
              '助学贷款',
              '国家励志奖学金',
              '国家助学金',
              '不清楚',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.e13 === 'object' &&
                vote.e13.length > 0 &&
                vote.e13.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.e1301"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd
          v-if="vote.e3 > 0 && vote.e12 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E14. 你是否知道政府对于高校学生有就业政策？（单选）
          </div>
          <q-select
            v-model="vote.e14"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.e3 > 0 && vote.e12 === '是' && vote.e14 === '是'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E15. 有哪些就业政策？（多选）
          </div>
          <q-select
            v-model="vote.e15"
            dense
            multiple
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '生源回流计划',
              '回乡创业政策',
              '提供本地就业平台',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.e15 === 'object' &&
                vote.e15.length > 0 &&
                vote.e15.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.e1501"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-subtitle">
            医疗方面
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E16. 近 3 年来，您家年均医疗开销多少钱？（元）
          </div>
          <q-input v-model="vote.e16" type="text" dense mask="#####" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E17. 您家患慢性病有多少人？（人）
          </div>
          <q-input v-model="vote.e17" type="text" dense mask="##" />
          <div style="padding-top: 10px;" class="text-warning">
            （高血压、糖尿病、肝硬化等32个病种，若无，则填“0”）
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E18. 您家有一二级残疾多少人？（人）
          </div>
          <q-input v-model="vote.e18" type="text" dense mask="##" />
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E19. 您家患有大病有多少人？（人）
          </div>
          <q-input v-model="vote.e19" type="text" dense mask="##" />
          <div style="padding-top: 10px;" class="text-warning">
            （儿童先天性心脏病、急性白血病、终末期肾病等20个病种。若无，则填“0”）
          </div>
        </dd>
        <dd
          v-if="vote.e19 > 0"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E20. 家里大病病人平常在哪里看病？（单选）
          </div>
          <q-select
            v-model="vote.e20"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['县医院', '市医院', '省医院', '乡（镇）卫生院', '其他']"
          ></q-select>
          <div v-if="vote.e20 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.e2001"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E21. 您觉得县/乡/村医院能满足您及家人基本看病的需求吗？（单选）
          </div>
          <q-select
            v-model="vote.e21"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['完全满足', '基本满足', '不能满足', '不清楚']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E22. 您希望县、乡/镇医院在以下哪些方面做出改进？（多选）
          </div>
          <q-select
            v-model="vote.e22"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '完善医疗设备',
              '配备专业医疗人员',
              '适当减轻医疗费用负担',
              '组织医务人员下乡/下村开展集中诊断或咨询',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.e22 === 'object' &&
                vote.e22.length > 0 &&
                vote.e22.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.e2201"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E23. 您是否愿意参加健康方面的知识讲座？（单选）
          </div>
          <q-select
            v-model="vote.e23"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['不愿意', '愿意', '无所谓']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E24. 您家庭成员是否想去医院进行健康体检？（单选）
          </div>
          <q-select
            v-model="vote.e24"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-subtitle">
            人居环境方面
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E25. 您家主要房屋结构是什么？（单选，结合调查员判断）
          </div>
          <q-select
            v-model="vote.e25"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['钢混', '砖混', '砖木', '土木', '竹木', '其他']"
          ></q-select>
          <div v-if="vote.e25 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.e2501"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E26. 您家取暖的主要能源是什么？（单选）
          </div>
          <q-select
            v-model="vote.e26"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '煤',
              '电',
              '柴火',
              '牛粪',
              '燃气（天然气/液化气/煤气/沼气）',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.e26 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.e2601"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E27. 您家做饭的主要能源是什么？（单选）
          </div>
          <q-select
            v-model="vote.e27"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '煤',
              '电',
              '柴火',
              '牛粪',
              '燃气（天然气/液化气/煤气/沼气）',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.e27 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.e2701"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E28. 您家处理生活垃圾的主要方式是什么？（单选）
          </div>
          <q-select
            v-model="vote.e28"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['村里集中清运处理', '随意处置', '其他']"
          ></q-select>
          <div v-if="vote.e28 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.e2801"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E29. 您家处理生产垃圾（如秸秆等）的主要方式是什么？（单选）
          </div>
          <q-select
            v-model="vote.e29"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '就地填埋',
              '就地焚烧',
              '高温堆肥',
              '村里集中清运处理',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.e29 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.e2901"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E30. 您家厕所粪污、生活污水的主要处理方式是什么？（单选）
          </div>
          <q-select
            v-model="vote.e30"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['资源化利用（修沼气池）', '作为种植肥料', '随意处理']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E31. 您家是否做到人畜分离？（单选）
          </div>
          <q-select
            v-model="vote.e31"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E32. 目前，您家生活环境哪些方面做过改善？（多选）
          </div>
          <q-select
            v-model="vote.e32"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '院落硬化',
              '院落绿化',
              '厕所改造',
              '入户道路改造',
              '厨房改造',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.e32 === 'object' &&
                vote.e32.length > 0 &&
                vote.e32.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.e3201"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E33. 目前，您最希望在哪方面改善生活环境？（单选）
          </div>
          <q-select
            v-model="vote.e33"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '院落硬化',
              '院落绿化',
              '厕所改造',
              '入户道路改造',
              '厨房改造',
              '其他'
            ]"
          ></q-select>
          <div v-if="vote.e33 === '其他'" style="padding-top: 10px;">
            <q-input
              v-model="vote.e3301"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dt class="text-h6 row no-wrap items-center" style="margin-top: 5px;">
          <div class="doc-card-subtitle">
            公共服务及设施方面
          </div>
        </dt>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E34. 您认为去乡/镇的出行方式方便吗？（单选）
          </div>
          <q-select
            v-model="vote.e34"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['非常方便', '比较方便', '一般', '不方便']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E35. 乡/镇有没有集中供养中心（老人、失能人员）?（单选）
          </div>
          <q-select
            v-model="vote.e35"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['有', '没有', '不知道']"
          ></q-select>
        </dd>
        <dd
          v-if="vote.e35 === '有'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E36. 若有，家里有多少人在集中供养中心？（人）
          </div>
          <q-input v-model="vote.e36" type="text" dense mask="##" />
        </dd>
        <dd
          v-if="vote.e35 === '没有'"
          :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'"
        >
          <div style="padding-top: 10px;">
            E37. 您希望乡/镇里设立集中供养中心吗？（单选）
          </div>
          <q-select
            v-model="vote.e37"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['很需要', '有一定需要', '不需要']"
          ></q-select>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E38. 您获取知识和信息的途径是？（多选）
          </div>
          <q-select
            v-model="vote.e38"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="['电视', '手机上网', '书籍', '广播', '其他']"
          ></q-select>
          <div
            v-if="
              typeof vote.e38 === 'object' &&
                vote.e38.length > 0 &&
                vote.e38.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.e3801"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E39. 您希望村里增加哪些文化活动？（多选）
          </div>
          <q-select
            v-model="vote.e39"
            dense
            multiple
            style="min-width: 12em;"
            behavior="menu"
            :options="[
              '体育活动（广场舞、羽毛球、乒乓球、篮球等）',
              '文化活动（阅览室、读报看书、书法、下棋等）',
              '艺术活动（戏剧演出、微电影）',
              '分享类活动（分享生活经验、厨艺、健身方法、防诈骗技巧等）',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.e39 === 'object' &&
                vote.e39.length > 0 &&
                vote.e39.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.e3901"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E40. 您希望村里增加哪些文化设施？（多选）
          </div>
          <q-select
            v-model="vote.e40"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '体育活动场地及设施',
              '文化活动场地及设施',
              '艺术活动场地及设施',
              '分享类活动场地及设施',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.e40 === 'object' &&
                vote.e40.length > 0 &&
                vote.e40.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.e4001"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E41. 您认为村里哪些基础设施有待改善？（多选）
          </div>
          <q-select
            v-model="vote.e41"
            dense
            multiple
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
              '文体设施',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.e41 === 'object' &&
                vote.e41.length > 0 &&
                vote.e41.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.e4101"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E42. 您希望村里增加哪些公共服务设施？（多选）
          </div>
          <q-select
            v-model="vote.e42"
            dense
            multiple
            style="min-width: 22em;"
            behavior="menu"
            :options="[
              '路灯',
              '垃圾池或者垃圾桶',
              '公共警务室',
              '公共厕所',
              '其他'
            ]"
          ></q-select>
          <div
            v-if="
              typeof vote.e42 === 'object' &&
                vote.e42.length > 0 &&
                vote.e42.includes('其他')
            "
            style="padding-top: 10px;"
          >
            <q-input
              v-model="vote.e4201"
              type="text"
              dense
              label="其他(请填写具体内容)"
              :rules="[val => !!val || '必填项！']"
            />
          </div>
        </dd>
        <dd :class="$q.screen.gt.xs ? 'row q-mx-ma' : 'q-mx-sm'">
          <div style="padding-top: 10px;">
            E43. 您是否愿意为村里的公共事务做贡献？（单选）
          </div>
          <q-select
            v-model="vote.e43"
            dense
            style="min-width: 12em;"
            behavior="menu"
            :options="['是', '否']"
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
  filters: {
    Numformat: function(value) {
      // 截取当前数据到小数点后三位
      const tempVal = Number(value).toFixed(3)
      if (tempVal === 'NaN') {
        return '0.00'
      }
      const realVal = tempVal.substring(0, tempVal.length - 1)
      return realVal
    }
  },
  data() {
    return {
      saving: false,
      positionsign: false,
      username: null,
      netstate: null,
      qsource: null,
      sumdataa10: 0,
      areasign: false,
      placeholders: {
        province: '------- 省 --------',
        city: '------- 市 -------',
        area: '------- 区 -------'
      },
      vote: {
        province: '云南省',
        latitude: 0,
        longitude: 0,
        au_conclusion: '正常'
      }
    }
  },

  computed: {},
  watch: {},
  created() {
    if (process.env.MODE === 'cordova') {
      this.getPosition()
      this.positionsign = true
    }
    this.checkConnection()
  },
  mounted() {
    this.username = this.$q.localStorage.getItem('username')
    this.qsource = this.$route.query.qsource
    // console.log(this.qsource, '+++++++')
    this.getmyprofile()
    if (this.$q.localStorage.getItem('votedata')) {
      this.vote = JSON.parse(this.$q.localStorage.getItem('votedata'))
    }
    // this.$nextTick(() => {
    //   setInterval(this.autoSaveD, 5000)
    // })
  },
  beforeDestroy() {
    this.autoSaveD()
  },

  methods: {
    // 计算问卷内子项
    suma10() {
      this.sumdataa10 =
        Number(this.vote.a1001) +
        Number(this.vote.a1002) +
        Number(this.vote.a1003) +
        Number(this.vote.a1004)
    },
    // 结束
    AreaonSelected(data) {
      // console.log(data, '===========')
      this.vote.province = data.province.value
      this.vote.city = data.city.value
      this.vote.county = data.area.value
      this.vote.areacode = data.area.code
      // console.log(JSON.stringify(this.vote), '===========')
    },
    // 得到profile的信息
    getmyprofile() {
      if (this.$auth.check()) {
        this.$router.app.$http
          .get('/profile/getMyProfile/')
          .then(res => {
            if (res.data.success) {
              // 判断返回值是否为空
              if (!res.data.data) {
                this.areasign = true
                this.vote.province = '云南省'
              } else {
                // 将地区数据赋过去
                this.vote.province = res.data.data.province
                this.vote.city = res.data.data.city
                this.vote.county = res.data.data.area
                // console.log('+++++++++++++111++', JSON.stringify(this.vote))
                if (
                  !this.vote.province ||
                  !this.vote.city ||
                  !this.vote.county
                ) {
                  this.areasign = true
                  this.vote.province = '云南省'
                }
              }
            } else {
              this.areasign = true
              this.vote.province = '云南省'
              this.$zglobal.showMessage(
                'red-5',
                'center',
                this.$t('auth.register.invalid_data')
              )
            }
          })
          .catch(e => {})
      } else {
        this.areasign = true
        this.vote.province = '云南省'
      }
    },
    // 自动保存
    autoSaveD() {
      this.$q.localStorage.remove('votedata')
      this.$nextTick(() => {
        console.log('.')
        this.$q.localStorage.set('votedata', JSON.stringify(this.vote))
      })
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
      // alert('获取位置成功:' + JSON.stringify(this.vote))
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
      // 如果取不到用户id信息,就赋予一个999
      if (!this.vote.investigator) {
        this.vote.investigator = '999999'
      }
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
      // 生成10001-86400的随机数
      var currentdate =
        Math.floor(Math.random() * (86400 - 10001 + 1) + 10001) +
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
      this.vote.a10 = this.sumdataa10
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
        'a1',
        'a2',
        'a3',
        // 'a301',
        'a4',
        'a501',
        'a502',
        // 'a5021',
        'a503',
        'a7',
        'a8',
        'a9',
        'a901',
        'a902',
        'a903',
        'a904',
        'a905',
        'a1001',
        'a1002',
        'a1003',
        'a1004',
        'a1005',
        'a1006',
        'a11',
        'a12',
        // 'a1201',
        'a13',
        // 'a1301',
        'a14',
        // 'a1401',
        'a15',
        'a16',
        // 'a1601',
        'b1',
        // 'b2',
        // 'b201',
        // 'b3',
        // 'b301',
        // 'b4',
        // 'b401',
        // 'b5',
        // 'b6',
        // 'b601',
        // 'b7',
        // 'b701',
        // 'b8',
        // 'b801',
        // 'b9',
        // 'b10',
        // 'b1001',
        // 'b11',
        // 'b12',
        // 'b1201',
        // 'b13',
        // 'b1301',
        'b14',
        // 'b15',
        // 'b1501',
        'b16',
        'b17',
        // 'b18',
        // 'b1801',
        'b19',
        // 'b20',
        // 'b2001',
        // 'b21',
        // 'b22',
        // 'b2201',
        'b23',
        'c1',
        'c2',
        // 'c3',
        'c4',
        'c5',
        // 'c501',
        'c6',
        // 'c601',
        'c7',
        // 'c701',
        'c8',
        // 'c9',
        // 'c901',
        // 'c10',
        // 'c11',
        // 'c1101',
        'c12',
        // 'c13',
        // 'c1301',
        'd1',
        'd2',
        // 'd3',
        // 'd301',
        'd4',
        // 'd5',
        // 'd501',
        'd6',
        // 'd7',
        // 'd701',
        'd8',
        // 'd801',
        'd9',
        // 'd10',
        // 'd1001',
        // 'd11',
        // 'd1101',
        'd12',
        // 'd13',
        // 'd1301',
        // 'd14',
        // 'd1401',
        'd15',
        'd16',
        // 'd1601',
        'e1',
        // 'e2',
        // 'e201',
        'e3',
        // 'e4',
        // 'e5',
        // 'e6',
        // 'e7',
        // 'e8',
        // 'e801',
        // 'e9',
        // 'e10',
        // 'e11',
        // 'e12',
        // 'e13',
        // 'e1301',
        // 'e14',
        // 'e15',
        // 'e1501',
        'e16',
        'e17',
        'e18',
        'e19',
        // 'e20',
        // 'e2001',
        'e21',
        'e22',
        // 'e2201',
        'e23',
        'e24',
        'e25',
        // 'e2501',
        'e26',
        // 'e2601',
        'e27',
        // 'e2701',
        'e28',
        // 'e2801',
        'e29',
        // 'e2901',
        'e30',
        'e31',
        'e32',
        // 'e3201',
        'e33',
        // 'e3301',
        'e34',
        'e35',
        // 'e36',
        // 'e37',
        'e38',
        // 'e3801',
        'e39',
        // 'e3901',
        'e40',
        // 'e4001',
        'e41',
        // 'e4101',
        'e42',
        // 'e4201',
        'e43'
      ]
      // 检测其他字段是否有值
      var requiredotheritm = [
        'a12',
        'a13',
        'a14',
        'a16',
        'b2',
        'b3',
        'b4',
        'b6',
        'b7',
        'b8',
        'b10',
        'b12',
        'b13',
        'b15',
        'b18',
        'b20',
        'b22',
        'c5',
        'c6',
        'c7',
        'c9',
        'c11',
        'c13',
        'd3',
        'd5',
        'd7',
        'd8',
        'd10',
        'd11',
        'd13',
        'd14',
        'd16',
        'e2',
        'e8',
        'e13',
        'e15',
        'e20',
        'e22',
        'e25',
        'e26',
        'e27',
        'e28',
        'e29',
        'e30',
        'e32',
        'e33',
        'e38',
        'e39',
        'e40',
        'e41',
        'e42'
      ]
      var missitem = []
      var submitsign = true
      // if (!this.vote.areacode) {
      //   this.$zglobal.showMessage('red-7', 'center', '行政区域未设置正确！')
      //   submitsign = false
      // }
      // console.log(JSON.stringify(this.vote), '+++++++++++')
      if (
        this.vote.city === null ||
        this.vote.county === null ||
        this.vote.city === 'null' ||
        this.vote.county === 'null' ||
        this.vote.city === '------- 市 -------' ||
        this.vote.county === '------- 区 -------'
      ) {
        this.$zglobal.showMessage('red-7', 'center', '行政区域未设置正确(A6)！')
        submitsign = false
      }
      // 检测是否必须
      for (var item in requireditem) {
        // console.log(requireditem[item], '----------')
        // 检测所有必须的key是否包含
        if (!(requireditem[item] in this.vote)) {
          missitem.push(requireditem[item])
          submitsign = false
        }
      }
      // 检测其他字段
      for (var itemo in requiredotheritm) {
        // 检测所有必须的key是否包含
        if (requiredotheritm[itemo] in this.vote) {
          var realitemo = this.vote[requiredotheritm[itemo]]
          // console.log(realitemo, '----------')
          if (realitemo) {
            if (realitemo.includes('其他') || realitemo === '其他') {
              var realk = requiredotheritm[itemo] + '01'
              if (!this.vote[realk]) {
                missitem.push(realk)
                submitsign = false
              }
            }
          }
        }
      }
      if (submitsign) {
        // 检测是否vote里所有项是否有q-select多选的Array，如果有则toString
        for (var votekey in this.vote) {
          if (typeof this.vote[votekey] === 'object') {
            this.vote[votekey] = JSON.stringify(this.vote[votekey])
            // .replace(']', '}')
            // this.vote[votekey] = encodeURIComponent(this.vote[votekey])
          }
        }
        // 是否在线
        if (this.$auth.check()) {
          console.log('ON-----', this.vote, '===', JSON.stringify(this.vote))
          if (
            process.env.MODE === 'cordova' &&
            this.netstate === '无网络连接'
          ) {
            alert('当前【无网络连接】，将采用离线方式保存问卷！')
            this.writeToFile('/AIApp/Votedata.json', this.vote)
          } else {
            // console.log(this.vote, '==========')
            this.$router.app.$http
              .post('/p2/s1/p2s1questionnaire1', this.vote)
              .then(res => {
                // console.log(res, '+++++++')
                if (res.data.success) {
                  this.$zglobal.showMessage(
                    'green',
                    'center',
                    this.$t('p2s1.savesuccess')
                  )
                  setTimeout(() => {
                    this.$q.localStorage.remove('votedata')
                    location.href = '/'
                  }, 5000)
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
          // console.log('OFF-----', this.vote, '===', JSON.stringify(this.vote))
          if (
            process.env.MODE === 'cordova' &&
            this.netstate === '无网络连接'
          ) {
            alert('当前【无网络连接】，将采用离线方式保存问卷！')
            this.writeToFile('/AIApp/Votedata.json', this.vote)
          } else {
            this.$router.app.$http
              .post('/p2/s1/p2s1questionnaire1/noa', this.vote)
              .then(res => {
                // console.log(res, '+++++++')
                if (res.data.success) {
                  this.$zglobal.showMessage(
                    'green',
                    'center',
                    this.$t('p2s1.savesuccess')
                  )
                  setTimeout(() => {
                    this.$q.localStorage.remove('votedata')
                    location.href = '/'
                  }, 5000)
                } else {
                  this.$zglobal.showMessage(
                    'red-7',
                    'center',
                    this.$t('p2s1.savefailed')
                  )
                }
              })
          }
        }
        setTimeout(() => {
          this.saving = false
          // console.log('数据：' + JSON.stringify(this.vote))
        }, 5000)
      } else {
        // console.log(JSON.stringify(missitem), '+++++++++')
        if (missitem.length > 0) {
          this.$zglobal.showMessage(
            'blue-grey-8',
            'center',
            '保存失败！以下数据项未填写：<p style="word-break:break-all">' +
              JSON.stringify(missitem) +
              '</p>',
            true
          )
        }

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
.doc-card-subtitle {
  margin-left: -10px;
  padding: 2px 10px 2px 24px;
  color: #000000;
  border: 1px solid #e8e8e8;
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
