<template>
  <q-page padding class="q-pa-ma">
    <q-dialog v-model="DaddFiles" seamless>
      <q-item-section style="max-width:300px;max-height: 50vh" class="scroll">
        <q-uploader
          style="max-width: 300px"
          :url="this.$axios.defaults.baseURL + '/zero/uploadMyTmpFiles'"
          method="POST"
          multiple
          auto-expand
          :filter="checkFileSize"
          :label="this.$t('article.attachment')"
          :headers="[
            {
              name: 'enctype',
              value: 'multipart/form-data'
            },
            { name: 'Authorization', value: 'Bearer ' + this.$auth.token() }
          ]"
          @uploading="upfileing"
          @uploaded="upfilished"
        >
          <template v-slot:list="scope">
            <div class="text-right">
              <q-btn
                v-close-popup
                flat
                round
                color="primary"
                size="sm"
                icon="close"
                title="关闭此窗口"
                :disable="fileupdone"
              />
            </div>
            <q-list separator>
              <q-item v-for="file in scope.files" :key="file.name">
                <q-item-section>
                  <q-item-label class="full-width ellipsis">
                    {{ file.name }}
                  </q-item-label>

                  <q-item-label caption>
                    Status: {{ file.__status }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                  </q-item-label>
                </q-item-section>

                <q-item-section v-if="file.__img" thumbnail class="gt-xs">
                  <img :src="file.__img.src" />
                </q-item-section>

                <q-item-section top side>
                  <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                    @click="scope.removeFile(file)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </q-uploader>
      </q-item-section>
    </q-dialog>
    <q-dialog v-model="editItem">
      <q-card class="modify-question">
        <q-toolbar class="bg-primary text-white">
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
            :title="this.$t('buttons.close')"
          />
          <q-toolbar-title>
            <span class="text-subtitle1 text-weight-bold"> 修改问卷</span>
          </q-toolbar-title>
          <q-btn
            flat
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="saveItems()"
          />
        </q-toolbar>
        <q-separator color="accent" />
        <q-card-section class="scroll" style="max-height: 85vh">
          <dl>
            <dt class="text-h6 row no-wrap items-center">
              <div class="doc-card-title">
                A.
                基本情况（家庭基本情况、自然、生产生活条件、人口、劳动力、收入情况等）
              </div>
            </dt>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">A1. 户主姓名：</div>
              <q-input v-model="vote.a1" type="text" dense />
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                A2. 户主身份证号码：
              </div>
              <q-input
                v-model="vote.a2"
                type="text"
                dense
                style="min-width:200px;"
                mask="X##### ######## ###X X"
              />
              <div style="padding-top: 10px;">A3. 户主民族是：【可输入】</div>
              <q-select
                v-model="vote.a3"
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
              <div style="padding-top: 10px;">A4. 联系电话：</div>
              <q-input
                v-model="vote.a4"
                type="text"
                dense
                mask="#############################"
              />
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">A5-1. 被访者姓名：</div>
              <q-input v-model="vote.a501" type="text" dense />
              <div style="padding-top: 10px;">A5-2. 与户主的关系：</div>
              <q-input v-model="vote.a502" type="text" dense />
              <div style="padding-top: 10px;">A5-3. 联系电话：</div>
              <q-input
                v-model="vote.a503"
                type="text"
                dense
                mask="#############################"
              />
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">A6. 您所在的行政区域是？</div>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">乡镇：</div>
              <q-input v-model="vote.town" type="text" dense />
              <div style="padding-top: 10px;">村：</div>
              <q-input v-model="vote.village" type="text" dense />
            </dd>
            <dd class="q-mx-sm">
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
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                A9.
                常住人口（居住在家半年以上(含半年),共享生活开支的人口，不包括现役军人，服刑人员）（人）：
              </div>
              <q-input v-model="vote.a9" type="text" dense mask="##" />
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                A9-1 16周岁以下人口（人）：
              </div>
              <q-input v-model="vote.a901" type="text" dense mask="##" />
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                A9-2
                现有劳动力人口数（人）【16-64岁具有劳动能力人口，不包括现役军人，服刑人员】：
              </div>
              <q-input v-model="vote.a902" type="text" dense mask="##" />
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                A9-3
                丧失劳动能力人口数（人）【16到64周岁间因病因残失去劳动力的人数】：
              </div>
              <q-input v-model="vote.a903" type="text" dense mask="##" />
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                A9-4 60 周岁及以上人数（人）：
              </div>
              <q-input v-model="vote.a904" type="text" dense mask="##" />
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                A9-5 您家未来 3
                年您家庭劳动力人口数（人）【未来3年16-64岁可能具有劳动能力人口，不包括在校学生，现役军人，服刑人员】：
              </div>
              <q-input v-model="vote.a905" type="text" dense mask="##" />
            </dd>

            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                A10. 近三年来（2018-2020 年），
                您家庭年均总收入（元）【人均收入（元）：<font color="red">{{
                  (sumdataa10 / vote.a9) | Numformat
                }}</font
                >】：
              </div>
              <q-input v-model="sumdataa10" type="number" dense readonly />
            </dd>
            <dd class="q-mx-sm">
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
            <dd class="q-mx-sm">
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
            <dd class="q-mx-sm">
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
            <dd class="q-mx-sm">
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
            <dd class="q-mx-sm">
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
            <dd class="q-mx-sm">
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
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                A12. 影响您家收入最主要的原因是什么？（单选）【可输入】
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
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                A13. 近3年来,您的家庭最大支出是？（单选）【可输入】
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
                  '家庭基本生活支出，包括吃、穿、用等消费支出',
                  '家庭成员医疗支出',
                  '固定资产投入支出，包括改扩建住房，房屋装修，购买家具家电等',
                  '生产经营性支出'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                A14. 未来 3 年，您的家庭主要支出可能是？（单选）【可输入】
              </div>
              <q-select
                v-model="vote.a14"
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
            <dd class="q-mx-sm">
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
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                A16.
                您认为你家实现增收致富的主要途径和方式有哪些？（多选）【可输入】
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
                  '外出务工',
                  '发展种植业',
                  '发展养殖业',
                  '发展服务业',
                  '发展手工业',
                  '发展经营业',
                  '改善基础设施条件'
                ]"
              ></q-select>
            </dd>
            <dt
              class="text-h6 row no-wrap items-center"
              style="margin-top: 5px;"
            >
              <div class="doc-card-title">
                B. 家庭产业发展情况（产业发展、产业培训及指导、产业保障）
              </div>
            </dt>
            <dd class="q-mx-sm">
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
            <dd v-if="vote.b1 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                B2. 家里主要发展了什么产业项目？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.b2"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
                behavior="menu"
                :options="[
                  '种植业（传统类：小麦、玉米、水稻等）',
                  '种植业（经济类：中药材、蔬菜、烤烟、林果等）',
                  '养殖业',
                  '农产品加工业',
                  '特色手工业',
                  '休闲农业与乡村旅游',
                  '个体经营'
                ]"
              ></q-select>
            </dd>
            <dd v-if="vote.b1 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                B3. 产业经营方式是什么？（单选）【可输入】
              </div>
              <q-select
                v-model="vote.b3"
                dense
                use-input
                use-chips
                new-value-mode="add-unique"
                behavior="menu"
                style="min-width: 22em;"
                :options="[
                  '自己经营管理',
                  '合作社托管托养',
                  '龙头企业技术支持'
                ]"
              ></q-select>
            </dd>
            <dd
              v-if="vote.b1 === '是' && vote.b3 === '自己经营管理'"
              class="q-mx-sm"
            >
              <div style="padding-top: 10px;">
                B4. 自己经营管理时采用的管理方式主要是什么？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.b4"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
                behavior="menu"
                :options="[
                  '传统方式（人力、牛等）',
                  '机械化管理（收割机，播种机等）',
                  '信息智能化管理（新型农业）'
                ]"
              ></q-select>
            </dd>
            <dd v-if="vote.b1 === '是'" class="q-mx-sm">
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
              v-if="
                vote.b1 === '是' && (vote.b5 === '一般' || vote.b5 === '较差')
              "
              class="q-mx-sm"
            >
              <div style="padding-top: 10px;">
                B6. 效果一般或较差的主要原因是什么？（单选）【可输入】
              </div>
              <q-select
                v-model="vote.b6"
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
            <dd v-if="vote.b1 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                B7. 您希望得到哪些产业帮扶？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.b7"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
                behavior="menu"
                :options="[
                  '政策支持',
                  '资金帮扶',
                  '技术指导',
                  '提供产品销售渠道',
                  '管理指导'
                ]"
              ></q-select>
            </dd>
            <dd v-if="vote.b1 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                B8. 您希望怎样销售产品？（单选）【可输入】
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
                  '市场销售',
                  '统一加工后销售',
                  '电商销售',
                  '企业收购',
                  '政府订单'
                ]"
              ></q-select>
            </dd>
            <dd v-if="vote.b1 === '是'" class="q-mx-sm">
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
            <dd v-if="vote.b1 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                B10. 您家想参加哪种类型的产业保险？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.b10"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
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
            <dd v-if="vote.b1 === '是'" class="q-mx-sm">
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
            <dd v-if="vote.b1 === '是' && vote.b11 === '否'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                B12. 若不想继续发展此产业，原因是什么？（单选）【可输入】
              </div>
              <q-select
                v-model="vote.b12"
                dense
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 12em;"
                behavior="menu"
                :options="[
                  '产业效益不好',
                  '缺乏销售渠道',
                  '缺乏技术指导',
                  '灾害风险过大'
                ]"
              ></q-select>
            </dd>
            <dd v-if="vote.b1 === '否' && vote.b11 === '否'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                B13. 若以前没有发展产业，以后想发展什么产业？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.b13"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
                behavior="menu"
                :options="[
                  '种植业（传统类：小麦、玉米、水稻等）',
                  '种植业（经济类：中药材、蔬菜、烤烟、林果等）',
                  '养殖业',
                  '农产品加工业',
                  '特色手工业',
                  '休闲农业与乡村旅游'
                ]"
              ></q-select>
            </dd>
            <dd v-if="vote.b11 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                B14. 您希望参加哪些农业技能培训？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.b14"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
                behavior="menu"
                :options="[
                  '种殖培训',
                  '养殖培训',
                  '加工培训',
                  '销售培训',
                  '不需要'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                B15. 您是否知道村上有合作社？（单选）
              </div>
              <q-select
                v-model="vote.b15"
                dense
                style="min-width: 15em;"
                behavior="menu"
                :options="['是', '否']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                B16. 您是否想参加合作社？（单选）
              </div>
              <q-select
                v-model="vote.b16"
                dense
                style="min-width: 15em;"
                behavior="menu"
                :options="['是', '否']"
              ></q-select>
            </dd>
            <dd v-if="vote.b16 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                B17. 您希望通过什么方式入股合作社？（多选）【可输入】
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
                :options="[
                  '贷款入股',
                  '自有资金',
                  '土地入股',
                  '财政资金入股',
                  '劳力入股'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                B18. 您是否借过扶贫小额贷款？（单选）
              </div>
              <q-select
                v-model="vote.b18"
                dense
                style="min-width: 15em;"
                behavior="menu"
                :options="['是', '否']"
              ></q-select>
            </dd>
            <dd v-if="vote.b18 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                B19. 您借扶贫小额贷款主要用于哪方面？（单选）【可输入】
              </div>
              <q-select
                v-model="vote.b19"
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
            <dd v-if="vote.b18 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                B20. 扶贫小额贷款到期后能还得上吗？（单选）
              </div>
              <q-select
                v-model="vote.b20"
                dense
                style="min-width: 15em;"
                behavior="menu"
                :options="['能及时还上', '能还上，但是要延期还', '还不上']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
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
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                B22. 未来是否有贷款意愿？（单选）
              </div>
              <q-select
                v-model="vote.b22"
                dense
                style="min-width: 15em;"
                behavior="menu"
                :options="['是', '否']"
              ></q-select>
            </dd>
            <dt
              class="text-h6 row no-wrap items-center"
              style="margin-top: 5px;"
            >
              <div class="doc-card-title">
                C. 就业务工情况（家庭务工情况、就业培训）
              </div>
            </dt>
            <dd class="q-mx-sm">
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
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                C2.您所在的乡镇/村扶贫工厂或者扶贫车间有多少个（个）：【若无，则填“0”】
              </div>
              <q-input
                v-model="vote.c2"
                type="text"
                dense
                style="min-width: 8em;"
                mask="###"
              />
            </dd>
            <dd v-if="vote.c2 > 0" class="q-mx-sm">
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
            <dd class="q-mx-sm">
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
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                C5. 您希望政府通过哪种方式发布招工信息？（多选）【可输入】
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
                  '手机短信',
                  '微信公众号',
                  '村内设置招工信息栏',
                  '乡/村招工信息群',
                  '广播宣传'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                C6. 您认为您家务工的最大困难是？（单选）【可输入】
              </div>
              <q-select
                v-model="vote.c6"
                dense
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
                behavior="menu"
                :options="[
                  '没有劳动力',
                  '无劳动技能，外出务工无合适岗位',
                  '学历太低',
                  '没有获取招工信息的渠道',
                  '无法外出务工（需要照顾老人、病人或小孩等）'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                C7. 您希望得到哪种就业帮扶措施？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.c7"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
                behavior="menu"
                :options="[
                  '政府发布用工信息',
                  '获得就业创业补助、车费补助或稳岗补助等',
                  '提供就业咨询',
                  '引进企业带动就业',
                  '政府提供公益性岗位',
                  '提供权益保障服务'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
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
            <dd v-if="vote.c8 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                C9. 参加过什么就业培训？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.c9"
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
            <dd v-if="vote.c8 === '是'" class="q-mx-sm">
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
            <dd v-if="vote.c8 === '是' && vote.c10 === '否'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                C11.
                您认为培训对您家就业没有帮助的原因是什么？（多选）【可输入】
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
                :options="['市场人员饱和', '尚未达到应有技能', '自己不想去']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                C12. 今后，您想接受哪些就业技能培训？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.c12"
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
                  '挖掘机驾驶',
                  '电工',
                  '建筑工',
                  '家政服务',
                  '不想参加培训'
                ]"
              ></q-select>
            </dd>
            <dt
              class="text-h6 row no-wrap items-center"
              style="margin-top: 5px;"
            >
              <div class="doc-card-title">
                D. 灾害及救助情况（灾害情况、救助措施）
              </div>
            </dt>
            <dd class="q-mx-sm">
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
            <dd class="q-mx-sm">
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
            <dd v-if="vote.d2 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                D3. 您所在地区（村/乡/镇）气象灾害主要有哪些？（多选）【可输入】
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
                :options="['洪灾', '旱灾', '霜冻', '雪灾']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
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
            <dd v-if="vote.d4 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                D5. 您所在地区（村/乡/镇）地质灾害主要有哪些？（多选）【可输入】
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
                :options="['滑坡', '崩塌', '泥石流', '地震']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
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
            <dd v-if="vote.d6 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                D7. 您所在地区（村/乡/镇）生物灾害主要有哪些？（多选）【可输入】
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
                :options="['病虫害', '有害物种入侵']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                D8.
                针对以上自然灾害，您家希望得到什么救助措施？（多选）【可输入】
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
                  '资金补贴',
                  '住房重建补助',
                  '加固基础设施建设',
                  '心理辅导',
                  '灾害应急知识宣传',
                  '提供食物、住所等应急救助物资',
                  '提供临时就业岗位',
                  '提供农药补助'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
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
            <dd v-if="vote.d9 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                D10. 新冠肺炎对您家有什么影响？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.d10"
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
            <dd v-if="vote.d9 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                D11.
                针对此次新冠肺炎，您家得到过什么救助措施？（多选）【可输入】
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
                :options="[
                  '农资补贴',
                  '生产补贴',
                  '消费扶贫',
                  '扶贫小额贷款（优惠）延期',
                  '发放防护用品',
                  '提供临时就业岗位',
                  '资金补贴'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
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
            <dd v-if="vote.d12 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                D13. 牲畜疫情对您家有什么影响？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.d13"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
                behavior="menu"
                :options="['收益减少', '订单减少', '成本增加']"
              ></q-select>
            </dd>
            <dd v-if="vote.d12 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                D14. 针对牲畜疫情，您家希望得到什么救助措施？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.d14"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
                behavior="menu"
                :options="[
                  '发放种畜、种禽补助',
                  '提供临时就业岗位',
                  '资金补贴',
                  '控制疫情'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
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
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                D16. 灾害前您家希望得到哪些帮助措施？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.d16"
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
            <dt
              class="text-h6 row no-wrap items-center"
              style="margin-top: 5px;"
            >
              <div class="doc-card-title">
                E. 公共服务及设施保障情况（教育、医疗、公共设施等）
              </div>
            </dt>
            <dt
              class="text-h6 row no-wrap items-center"
              style="margin-top: 5px;"
            >
              <div class="doc-card-subtitle">
                饮水方面
              </div>
            </dt>
            <dd class="q-mx-sm">
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
            <dt
              class="text-h6 row no-wrap items-center"
              style="margin-top: 5px;"
            >
              <div class="doc-card-subtitle">
                教育方面
              </div>
            </dt>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E2. 您家正在接受教育的学生（幼儿园及以上）多少人？（人）
              </div>
              <q-input v-model="vote.e2" type="text" dense mask="###" />
            </dd>
            <dd v-if="vote.e2 > 0" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E3. 近 3 年来，您家年均教育支出有多少元？（元）
              </div>
              <q-input v-model="vote.e3" type="text" dense mask="######" />
            </dd>
            <dd v-if="vote.e2 > 0" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E4. 教育支出对家庭负担如何？（单选）
              </div>
              <q-select
                v-model="vote.e4"
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
            <dd v-if="vote.e2 > 0" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E5. 您家庭的孩子完成义务教育后接受教育情况是？（单选）
              </div>
              <q-select
                v-model="vote.e5"
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
            <dd v-if="vote.e2 > 0" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E6. 您所在乡/镇学校的教育质量如何？（单选）
              </div>
              <q-select
                v-model="vote.e6"
                dense
                style="min-width: 12em;"
                behavior="menu"
                :options="['质量很好', '质量较好', '质量一般', '质量较差']"
              ></q-select>
            </dd>
            <dd v-if="vote.e2 > 0" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E7. 家中是否有在校读书的留守儿童？（单选）
              </div>
              <q-select
                v-model="vote.e7"
                dense
                style="min-width: 12em;"
                behavior="menu"
                :options="['是', '否']"
              ></q-select>
            </dd>
            <dd v-if="vote.e2 > 0 && vote.e7 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E8. 近3年孩子父母每年平均在家？（月）
              </div>
              <q-input v-model="vote.e8" type="text" dense mask="###" />
            </dd>
            <dd v-if="vote.e2 > 0 && vote.e7 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E9. 老师是否定期家访？（单选）
              </div>
              <q-select
                v-model="vote.e9"
                dense
                style="min-width: 12em;"
                behavior="menu"
                :options="['是', '否']"
              ></q-select>
            </dd>
            <dd v-if="vote.e2 > 0" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E10.
                家里是否有在读高校学生（专科、本科、研究生及以上）？（单选）
              </div>
              <q-select
                v-model="vote.e10"
                dense
                style="min-width: 12em;"
                behavior="menu"
                :options="['是', '否']"
              ></q-select>
            </dd>
            <dd v-if="vote.e2 > 0 && vote.e10 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E11. 如果有，在读高校学生是否获得补贴政策？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.e11"
                dense
                multiple
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
            <dd v-if="vote.e2 > 0 && vote.e10 === '是'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E12. 政府对于高校学生是否有以下就业政策？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.e12"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 12em;"
                behavior="menu"
                :options="['生源回流计划', '回乡创业政策', '提供本地就业平台']"
              ></q-select>
            </dd>
            <dt
              class="text-h6 row no-wrap items-center"
              style="margin-top: 5px;"
            >
              <div class="doc-card-subtitle">
                医疗方面
              </div>
            </dt>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E13. 近 3 年来，您家年均医疗开销多少钱？（元）
              </div>
              <q-input v-model="vote.e13" type="text" dense mask="#####" />
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E14. 您家患慢性病有多少人？（人）
              </div>
              <q-input v-model="vote.e14" type="text" dense mask="##" />
              <div style="padding-top: 10px;">
                患慢性病人数：指患有下列疾病且影响劳动能力的人口。慢性病包括：高血压、糖尿病、肝硬化、风湿性心脏病、肺心病、慢性病毒性肝炎、肺结核、淋巴结核、甲状腺功能亢进、甲状腺功能低下、类风湿性关节炎、溶血性贫血、白血病、复发性阿弗他口腔溃疡、冠心病（专指心肌梗塞和心绞痛）、慢性阻塞性肺疾病（COPD）、再生障碍性贫血、原发性骨髓纤维化、慢性肾脏疾病（CKD）三期及以上、重症肌无力、系统性红斑狼疮、伴多发骨折的严重骨质疏松症、白塞氏病、侵袭性牙周炎、口腔扁平苔藓、银屑病、下肢静脉曲张、股骨头坏死、帕金森氏病、恶性肿瘤、精神分裂症。（32种）
              </div>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E15. 您家有一二级残疾多少人？（人）
              </div>
              <q-input v-model="vote.e15" type="text" dense mask="##" />
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E16. 您家患有大病有多少人？（人）
              </div>
              <q-input v-model="vote.e16" type="text" dense mask="##" />
              <div style="padding-top: 10px;">
                大病：新型农村合作医疗重大疾病医疗保险所列重大疾病。具体为：儿童先天性心脏病、急性白血病、终末期肾病、妇女乳腺癌、宫颈癌、重性精神病、艾滋病机会性感染、耐多药肺结核、肺癌、食道癌、胃癌、结肠癌、直肠癌、慢性粒细胞白血病、急性心肌梗塞、脑梗死、血友病、I型糖尿病、甲亢、唇腭裂。（20种）
              </div>
            </dd>
            <dd v-if="vote.e16 > 0" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E17. 家里大病病人平常在哪里看病？（单选）【可输入】
              </div>
              <q-select
                v-model="vote.e17"
                dense
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 12em;"
                behavior="menu"
                :options="['县医院', '市医院', '省医院', '乡（镇）卫生院']"
              ></q-select>
            </dd>
            <dd v-if="vote.e16 > 0" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E18. 您觉得县/乡/村医院能满足您及家人基本看病的需求吗？（单选）
              </div>
              <q-select
                v-model="vote.e18"
                dense
                style="min-width: 12em;"
                behavior="menu"
                :options="['完全满足', '基本满足', '不能满足', '不清楚']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E19.
                您希望县、乡/镇医院在以下哪些方面做出改进？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.e19"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
                behavior="menu"
                :options="[
                  '完善医疗设备',
                  '配备专业医疗人员',
                  '适当减轻医疗费用负担',
                  '组织医务人员下乡/下村开展集中诊断或咨询'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E20. 您是否愿意参加健康方面的知识讲座？（单选）
              </div>
              <q-select
                v-model="vote.e20"
                dense
                style="min-width: 12em;"
                behavior="menu"
                :options="['不愿意', '愿意', '无所谓']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E21. 您家庭成员是否想去医院进行健康体检？（单选）
              </div>
              <q-select
                v-model="vote.e21"
                dense
                style="min-width: 12em;"
                behavior="menu"
                :options="['是', '否']"
              ></q-select>
            </dd>
            <dt
              class="text-h6 row no-wrap items-center"
              style="margin-top: 5px;"
            >
              <div class="doc-card-subtitle">
                人居环境方面
              </div>
            </dt>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E22. 您家主要房屋结构是什么？（单选，结合调查员判断）【可输入】
              </div>
              <q-select
                v-model="vote.e22"
                dense
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 12em;"
                behavior="menu"
                :options="['钢混', '砖混', '砖木', '土木', '竹木']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E23. 您家取暖的主要能源是什么？（单选）【可输入】
              </div>
              <q-select
                v-model="vote.e23"
                dense
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 12em;"
                behavior="menu"
                :options="[
                  '煤',
                  '电',
                  '柴火',
                  '牛粪',
                  '燃气（天然气/液化气/煤气/沼气）'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E24. 您家做饭的主要能源是什么？（单选）【可输入】
              </div>
              <q-select
                v-model="vote.e24"
                dense
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 12em;"
                behavior="menu"
                :options="[
                  '煤',
                  '电',
                  '柴火',
                  '牛粪',
                  '燃气（天然气/液化气/煤气/沼气）'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E25. 您家处理生活垃圾的主要方式是什么？（单选）【可输入】
              </div>
              <q-select
                v-model="vote.e25"
                dense
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 12em;"
                behavior="menu"
                :options="['村里集中清运处理', '随意处置']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E26.
                您家处理生产垃圾（如秸秆等）的主要方式是什么？（单选）【可输入】
              </div>
              <q-select
                v-model="vote.e26"
                dense
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 12em;"
                behavior="menu"
                :options="[
                  '就地填埋',
                  '就地焚烧',
                  '高温堆肥',
                  '村里集中清运处理'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E27. 您家厕所粪污、生活污水的主要处理方式是什么？（单选）
              </div>
              <q-select
                v-model="vote.e27"
                dense
                style="min-width: 12em;"
                behavior="menu"
                :options="[
                  '资源化利用（修沼气池）',
                  '作为种植肥料',
                  '随意处理'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E28. 您家是否做到人畜分离？（单选）
              </div>
              <q-select
                v-model="vote.e28"
                dense
                style="min-width: 12em;"
                behavior="menu"
                :options="['是', '否']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E29. 目前，您家生活环境哪些方面做过改善？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.e29"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
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
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E30. 目前，您最希望在哪方面改善生活环境？（单选）【可输入】
              </div>
              <q-select
                v-model="vote.e30"
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
            <dt
              class="text-h6 row no-wrap items-center"
              style="margin-top: 5px;"
            >
              <div class="doc-card-subtitle">
                公共服务及设施方面
              </div>
            </dt>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E31. 您认为去乡/镇的出行方式方便吗？（单选）
              </div>
              <q-select
                v-model="vote.e31"
                dense
                style="min-width: 12em;"
                behavior="menu"
                :options="['非常方便', '比较方便', '一般', '不方便']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E32. 乡/镇有没有集中供养中心（老人、失能人员）?（单选）
              </div>
              <q-select
                v-model="vote.e32"
                dense
                style="min-width: 12em;"
                behavior="menu"
                :options="['有', '没有']"
              ></q-select>
            </dd>
            <dd v-if="vote.e32 === '有'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E33. 若有，家里有多少人在集中供养中心？（人）
              </div>
              <q-input v-model="vote.e33" type="text" dense mask="##" />
            </dd>
            <dd v-if="vote.e32 === '没有'" class="q-mx-sm">
              <div style="padding-top: 10px;">
                E34. 您希望乡/镇里设立集中供养中心吗？（单选）
              </div>
              <q-select
                v-model="vote.e34"
                dense
                style="min-width: 12em;"
                behavior="menu"
                :options="['很需要', '有一定需要', '不需要']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E35. 您获取知识和信息的途径是？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.e35"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
                behavior="menu"
                :options="['电视', '手机上网', '书籍', '广播']"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E36. 您希望村里增加哪些文化活动？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.e36"
                dense
                multiple
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
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E37. 您希望村里增加哪些文化设施？（多选）【可输入】
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
                  '体育活动场地及设施',
                  '文化活动场地及设施',
                  '艺术活动场地及设施',
                  '分享类活动场地及设施'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E38. 您认为村里哪些基础设施有待改善？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.e38"
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
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E39. 您希望村里增加哪些公共服务设施？（多选）【可输入】
              </div>
              <q-select
                v-model="vote.e39"
                dense
                multiple
                use-input
                use-chips
                new-value-mode="add-unique"
                style="min-width: 22em;"
                behavior="menu"
                :options="[
                  '路灯',
                  '垃圾池或者垃圾桶',
                  '公共警务室',
                  '公共厕所'
                ]"
              ></q-select>
            </dd>
            <dd class="q-mx-sm">
              <div style="padding-top: 10px;">
                E40. 您是否愿意为村里的公共事务做贡献？（单选）
              </div>
              <q-select
                v-model="vote.e40"
                dense
                style="min-width: 12em;"
                behavior="menu"
                :options="['是', '否']"
              ></q-select>
            </dd>
          </dl>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="reviewItem">
      <q-card style="width: 500px;">
        <q-toolbar class="bg-primary text-white">
          <q-icon size="30px" name="account_box" />
          <q-toolbar-title>
            <span class="text-weight-bold"> 审核问卷 </span>
          </q-toolbar-title>
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
            :title="this.$t('buttons.close')"
          />
        </q-toolbar>
        <q-separator color="accent" />
        <div class="q-pa-md">
          <div class="row ">
            <div class="col-12 col-md-7">
              <q-input v-model="vote.reviewer" type="text">
                <template v-slot:before>
                  <font size="3" color="black"> 审 核 人 ：</font>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-7" style="margin-right: 16px;">
              <q-select
                v-model="vote.re_conclusion"
                use-input
                use-chips
                new-value-mode="add-unique"
                behavior="menu"
                :options="['审核通过', '疑似漏评', '疑似错退', '其他问题']"
              >
                <template v-slot:before>
                  <font size="3" color="black">审核结论：</font>
                </template>
              </q-select>
            </div>
          </div>
          <div class="row">
            <div>
              <font size="3" color="black">审核意见：</font>
            </div>
            <div class="col-11 col-md-11">
              <q-input
                v-model.trim="vote.re_comments"
                outlined
                type="textarea"
                label="意见"
              />
            </div>
          </div>
        </div>

        <q-separator color="accent" />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            flat
            color="secondary"
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="resaveItems()"
          />
          &nbsp;&nbsp;
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-secondary">
      {{ $t('p2s1.qsname') }}
      <q-banner
        v-if="currentrowdataid"
        dense
        rounded
        class="text-h6 bg-textinfo"
      >
        <q-icon name="warning" color="negative" siae="10px" />
        ID【<font class="text-warning">{{ currentrowdataid }}</font>
        】 待保存文件：
        <font class="text-warning">{{ files }}</font>
      </q-banner>
    </div>
    <q-separator color="accent" />
    <div class="row q-ma-md" style="margin: 16px 1px;">
      <q-btn
        v-if="mPermissions['p2s1_on_qs.bmodify']"
        color="addbtn"
        text-color="white"
        class="q-ma-xs"
        icon="post_add"
        :label="this.$t('buttons.modifyd')"
        @click="modifyItems()"
      />
      <q-btn
        v-if="mPermissions['p2s1_on_qs.bDelete']"
        color="deldbtn"
        text-color="white"
        class="q-ma-xs"
        icon="delete_sweep"
        :label="this.$t('buttons.delete')"
        @click="delItems()"
      />
      <q-btn
        v-if="mPermissions['p2s1_on_qs.saveFiles']"
        color="savebtn"
        text-color="white"
        class="q-ma-xs"
        icon="cloud_upload"
        :label="this.$t('p2s1.upattachment')"
        @click="saveItems()"
      />
      <q-separator
        v-if="!$q.screen.gt.xs"
        class="col-10 q-ma-xs"
        color="info"
      />
      <q-btn
        v-if="mPermissions['p2s1_on_qs.reviewData']"
        color="treebtn"
        text-color="white"
        class="q-ma-xs"
        icon="lock"
        :label="this.$t('p2s1.review')"
        @click="reviewdata()"
      />
      <q-btn
        v-if="mPermissions['p2s1_on_qs.bexport']"
        color="expbtn"
        text-color="white"
        class="q-ma-xs"
        icon="save_alt"
        :label="this.$t('buttons.export')"
        @click="ExportDataAsCVS()"
      />
      <q-space v-if="$q.screen.gt.xs" />
      <q-input
        v-model="quickFilter"
        dense
        style="max-width: 100px"
        class="q-ml-xs"
        :label="this.$t('modules.searchall')"
        @input="onQuickFilterChanged()"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-separator
        v-if="!$q.screen.gt.xs"
        class="col-10 q-ma-xs"
        color="info"
      />
    </div>
    <div class="shadow-1">
      <ag-grid-vue
        style="width: 100%; height: 500px;"
        class="ag-theme-balham p2sonqs-agGrid"
        row-selection="single"
        row-multi-select-with-click="false"
        :grid-options="gridOptions"
        :column-defs="columnDefs"
        :row-data="rowData"
        :default-col-def="defaultColDef"
        :pagination="true"
        :pagination-page-size="50"
        :get-row-style="getRowStyle"
        :framework-components="frameworkComponents"
        :locale-text="this.$t('aggrid')"
        @cellValueChanged="oncellValueChanged"
        @grid-ready="onGridReady"
      >
      </ag-grid-vue>
    </div>
  </q-page>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import { mapActions, mapState } from 'vuex'
import agAttachmentCellRander from '../../frameworkComponents/agAttachmentCellRander'

export default {
  name: 'P2s1OnQs',
  components: {
    AgGridVue
  },
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
      placeholders: {
        province: '------- 省 --------',
        city: '------- 市 -------',
        area: '------- 区 -------'
      },
      sumdataa10: 0,
      reviewItem: false,
      editItem: false,
      vote: { province: '云南省' },
      DaddFiles: false,
      files: [],
      fileupdone: false,
      currentrowdataid: false,
      loading: true,
      quickFilter: null,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowData: null,
      getRowStyle: null,
      changerowcolor: null,
      frameworkComponents: null,
      defaultColDef: null,
      mPermissions: []
    }
  },
  computed: {
    ...mapState('zero', ['ZPermissions'])
  },
  watch: {
    // 获得列表
  },
  created() {
    this.$router.app.$http
      .get('/p2/s1/p2s1questionnaire1/')
      .then(res => {
        if (res.data.success) {
          this.rowData = res.data.data
          // console.log(this.rowData)
        } else {
        }
      })
      .catch(e => {})
  },
  beforeMount() {
    this.initGrid()
  },
  mounted() {
    // console.log(this.ZModules)
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
    this.initPermissions()
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
    // 权限
    ...mapActions('zero', ['getMyPermissions', 'reqThePermission']),
    initPermissions() {
      const preq = [
        {
          module: 'p2s1_on_qs',
          name: 'p2s1_on_qs.bmodify',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null
          },
          title: this.$t('p2s1.bmodify')
        },
        {
          module: 'p2s1_on_qs',
          name: 'p2s1_on_qs.bDelete',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null
          },
          title: this.$t('p2s1.bDelete')
        },
        {
          module: 'p2s1_on_qs',
          name: 'p2s1_on_qs.saveFiles',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null
          },
          title: this.$t('p2s1.saveFiles')
        },
        {
          module: 'p2s1_on_qs',
          name: 'p2s1_on_qs.reviewData',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null
          },
          title: this.$t('p2s1.reviewData')
        },
        {
          module: 'p2s1_on_qs',
          name: 'p2s1_on_qs.bexport',
          syscfg: {
            required: false,
            type: 'Boolean',
            default: null
          },
          title: this.$t('p2s1.bexport')
        }
      ]

      this.reqThePermission(preq)
        .then(res => {
          this.mPermissions = res
        })
        .catch(e => {
          // console.log(e)
        })
    },
    initGrid() {
      this.gridOptions = {
        rowHeight: 32,
        headerHeight: 32,
        allowShowChangeAfterFilter: true
      }
      this.frameworkComponents = {
        agAttachmentCellRander: agAttachmentCellRander
      }
      this.columnDefs = [
        {
          editable: false,
          headerName: 'ID',
          field: 'id',
          width: 70,
          minWidth: 70,
          maxWidth: 70,
          sortable: true,
          checkboxSelection: true
        },
        {
          headerName: this.$t('p2s1.no'),
          field: 'no',
          width: 110,
          minWidth: 180,
          maxWidth: 260,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('p2s1.qpname'),
          field: 'qtype',
          width: 110,
          minWidth: 130,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('p2s1.qsource'),
          field: 'qsource',
          width: 110,
          minWidth: 110,
          maxWidth: 170,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('p2s1.created_at'),
          field: 'created_at',
          width: 120,
          minWidth: 120,
          maxWidth: 180,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('p2s1.re_comments'),
          field: 're_comments',
          width: 100,
          minWidth: 100,
          maxWidth: 180,
          sortable: true,
          filter: true
        },
        {
          headerName: this.$t('p2s1.re_conclusion'),
          field: 're_conclusion',
          width: 100,
          minWidth: 100,
          maxWidth: 180,
          sortable: true,
          filter: true
        }
        // {
        //   headerName: this.$t('p2s1.reviewer'),
        //   field: 'reviewer',
        //   width: 120,
        //   minWidth: 120,
        //   maxWidth: 260,
        //   sortable: true,
        //   filter: true
        // },
        // {
        //   headerName: this.$t('p2s1.isattachment'),
        //   field: 'q_files',
        //   width: 90,
        //   minWidth: 90,
        //   editable: true,
        //   filter: true,
        //   cellRendererFramework: agAttachmentCellRander,
        //   cellRendererParams: {
        //     down: this.downloadfile,
        //     del: this.deletefile,
        //     add: this.addfile
        //   }
        // },
        // {
        //   headerName: this.$t('p2s1.au_comments'),
        //   field: 'au_comments',
        //   width: 120,
        //   minWidth: 120,
        //   maxWidth: 260,
        //   sortable: true,
        //   filter: true
        // },
        // {
        //   headerName: this.$t('p2s1.au_conclusion'),
        //   field: 'au_conclusion',
        //   width: 100,
        //   minWidth: 100,
        //   maxWidth: 180,
        //   sortable: true,
        //   filter: true
        // }
      ]
      this.defaultColDef = {
        editable: false,
        resizable: true
      }
      this.getRowStyle = this.onchangerowcolor
    },
    onGridReady(params) {
      params.api.sizeColumnsToFit()
    },
    onQuickFilterChanged() {
      this.gridApi.setQuickFilter(this.quickFilter)
    },
    delItems() {
      var selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length > 0) {
        this.$q
          .dialog({
            title: this.$t('buttons.comfirmtitle'),
            message: this.$t('buttons.comfirmdialog'),
            html: true,
            cancel: true,
            persistent: true
          })
          .onOk(() => {
            selectedData.forEach(val => {
              // 如果有结论，就不能删除
              if (val.re_conclusion !== null) {
                this.$zglobal.showMessage(
                  'red-7',
                  'center',
                  this.$t('p2s1.re_failed')
                )
                return
              }
              this.gridApi.updateRowData({ remove: [val] })
              if (val.id === undefined) return false
              this.$router.app.$http
                .delete('/p2/s1/p2s1questionnaire1/' + val.id)
                .then(res => {
                  if (res.data.success) {
                    // console.log(res.data.data)
                    this.$zglobal.showMessage(
                      'positive',
                      'center',
                      this.$t('operation.delsuccess')
                    )
                  } else {
                    this.$zglobal.showMessage(
                      'red-7',
                      'center',
                      this.$t('operation.delfailed')
                    )
                  }
                })
                .catch(e => {})
            })
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          })
      }
    },
    ExportDataAsCVS() {
      var params = {
        fileName: 'p2s1onqs.txt',
        suppressQuotes: true,
        columnSeparator: ';'
      }
      this.gridApi.exportDataAsCsv(params)
    },
    onchangerowcolor() {
      return { backgroundColor: this.changerowcolor }
    },
    oncellValueChanged(params) {
      // console.log(params.oldValue,updateRowData params.newValue)
      if (params.oldValue === null) params.oldValue = ''
      if (params.newValue !== params.oldValue) {
        this.changerowcolor = '#ffa195'
        this.gridApi.redrawRows({
          rowNodes: [this.gridApi.getDisplayedRowAtIndex(params.rowIndex)]
        })
      }
      this.changerowcolor = ''
    },
    AreaonSelected(data) {
      // console.log(data, '===========')
      this.vote.province = data.province.value
      this.vote.city = data.city.value
      this.vote.county = data.area.value
      // console.log(JSON.stringify(this.vote), '===========')
    },
    reviewdata() {
      var selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length === 1) {
        this.vote = selectedData[0]
        this.$nextTick(() => {
          this.reviewItem = true
        })
      } else {
        this.$zglobal.showMessage(
          'red-7',
          'center',
          this.$t('operation.rowserror')
        )
      }
    },
    modifyItems() {
      var selectedData = this.gridApi.getSelectedRows()
      if (selectedData.length === 1) {
        this.vote = selectedData[0]
        this.$nextTick(() => {
          // 检测是否vote里所有子项是否有[]符号，有则parse
          for (var votekey in this.vote) {
            // console.log(typeof this.vote[votekey], '++++++++', votekey)
            if (
              this.vote[votekey] !== null &&
              typeof this.vote[votekey] === 'string'
            ) {
              // console.log(votekey, '-----')
              if (
                this.vote[votekey].substring(0, 1) === '[' &&
                this.vote[votekey].substring(this.vote[votekey].length - 1) ===
                  ']'
              ) {
                this.vote[votekey] = JSON.parse(this.vote[votekey])
              }
            }
          }
          this.editItem = true
        })
      } else {
        this.$zglobal.showMessage(
          'red-7',
          'center',
          this.$t('operation.rowserror')
        )
      }
    },
    saveItems() {
      const selectedData = this.gridApi.getSelectedRows()
      selectedData.forEach(val => {
        // 检测是否vote里所有项是否有q-select多选Array，如果有则toJson
        for (var votekey in val) {
          if (typeof val[votekey] === 'object' && val[votekey] !== null) {
            val[votekey] = JSON.stringify(val[votekey])
          }
        }
        // console.log(val, '-------')
        if (val.re_conclusion !== null) {
          this.$zglobal.showMessage(
            'red-7',
            'center',
            this.$t('p2s1.re_failed')
          )
          return
        }
        if (val.id) {
          if (this.files.length) {
            val.q_files = this.files
          }
          // console.log(val)
          this.$router.app.$http
            .put('/p2/s1/p2s1questionnaire1/' + val.id, val)
            .then(res => {
              if (res.data.success) {
                this.gridApi.updateRowData({
                  update: [Object.assign(val, res.data.data)]
                })
                this.$zglobal.showMessage(
                  'positive',
                  'center',
                  this.$t('operation.updatesuccess')
                )
                // console.log(res.data.data)
              } else {
                this.$zglobal.showMessage(
                  'red-7',
                  'center',
                  this.$t('operation.updatefailed')
                )
              }
            })
            .catch(e => {})
        }
      })
      this.currentrowdataid = false
      this.$nextTick(() => {
        this.editItem = false
      })
    },
    // 审核
    resaveItems() {
      var selectedData = this.gridApi.getSelectedRows()
      selectedData.forEach(val => {
        if (val.id) {
          // console.log(val)
          this.$router.app.$http
            .put('/p2/s1/p2s1questionnaire1/' + val.id, val)
            .then(res => {
              if (res.data.success) {
                this.gridApi.updateRowData({
                  update: [Object.assign(val, res.data.data)]
                })
                this.$zglobal.showMessage(
                  'positive',
                  'center',
                  this.$t('operation.updatesuccess')
                )
                // console.log(res.data.data)
              } else {
                this.$zglobal.showMessage(
                  'red-7',
                  'center',
                  this.$t('operation.updatefailed')
                )
              }
            })
            .catch(e => {})
        }
      })
      this.currentrowdataid = false
    },
    // 文件上传
    checkFileSize(files) {
      return files.filter(file => file.size < 20480000)
    },
    uploadFile() {
      this.DaddFiles = true
      this.files = []
    },
    upfileing() {
      this.fileupdone = true
    },
    upfilished(info) {
      this.files.push(info.files[0].name)
      this.fileupdone = false
    },
    downloadfile(rowid, filename, fn) {
      this.$router.app.$http
        .post('/p2/s1/p2s1questionnaire1/downAttachFile/' + rowid, {
          filename: filename,
          collection: fn
        })
        .then(res => {
          console.log(res, '----------')
          if (res.data.success) {
            window.open(res.data.data, '_blank')
          }
        })
        .catch(e => {})
      // end
    },
    deletefile(rowid, rowdata, filename) {
      console.log(rowid, filename, 'del')
      this.$router.app.$http
        .post('/p2/s1/p2s1questionnaire1/deleteAttachFile/' + rowid, {
          filename: filename,
          collection: 'q_files'
        })
        .then(res => {
          if (res.data.success) {
            console.log(res)
            this.gridApi.updateRowData({
              update: [Object.assign(rowdata, res.data.data)]
            })
            this.$zglobal.showMessage(
              'positive',
              'center',
              this.$t('operation.delsuccess')
            )
          }
        })
        .catch(e => {})
    },
    addfile(rowdata) {
      this.currentrowdataid = rowdata.data.id
      this.uploadFile()
    }
  }
}
</script>
<style>
/*蓝色#006699 #339999 #666699  #336699  黄色#CC9933  紫色#996699  #990066 棕色#999966 #333300 红色#CC3333  绿色#009966  橙色#ff6600  其他*/
.p2sonqs-agGrid .ag-header {
  background-color: var(--q-color-secondary);
  color: #ffffff;
  font-size: 13px;
}
.p2sonqs-agGrid .ag-cell {
  padding-left: 1px;
  font-size: 13px;
}
.ag-theme-balham .ag-icon,
.ag-header-icon .ag-sort-ascending-icon {
  color: #ffffff;
}
.ag-theme-balham .ag-paging-page-summary-panel .ag-icon,
.ag-theme-balham .ag-paging-panel {
  color: #000000;
}
.ag-theme-balham .ag-icon-checkbox-unchecked {
  color: #cccccc;
}
.ag-theme-balham .ag-icon-checkbox-checked {
  color: var(--q-color-secondary);
}
.modify-question {
  margin: 20px auto;
  width: 550px;
}
.doc-card-title {
  margin-left: -20px;
  padding: 2px 10px 2px 24px;
  background: var(--q-color-info);
  color: #000000;
  position: relative;
  border-radius: 3px 5px 5px 0;
}
dd {
  font-size: 16px;
}
</style>
