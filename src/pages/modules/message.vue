<template>
  <div class="q-pa-md" align="center">
    <span style="color: #9C9C9C">温馨提示：已阅消息将于30天后自动清理</span>
    <div
      style="max-width: 600px;border:1px solid  #E2E2E2;border-radius:10px 10px"
    >
      <q-tabs
        v-model="tab"
        align="justify"
        narrow-indicator
        class="q-mb-lg bg-white text-grey-6 shadow-2"
        active-color="primary"
        indicator-color="purple"
      >
        <q-tab name="mails" label="系统消息" icon="record_voice_over">
          <q-badge color="orange" floating align="middle">15</q-badge>
        </q-tab>
        <q-tab name="alarms" label="用户消息" icon="mail_outline">
          <q-badge color="orange" floating align="middle">20</q-badge>
        </q-tab>
        <q-tab name="movies" label="服务消息" icon="room_service">
          <q-badge color="orange" floating align="middle">2</q-badge>
        </q-tab>
      </q-tabs>
      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="bg-purple text-white text-center"
        >
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Ad molestiae non facere animi nobis, similique nemo velit reiciendis
            corporis impedit nam in.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Nostrum necessitatibus expedita dolores? Voluptatem repudiandae
            magni ea.
          </q-tab-panel>
        </q-tab-panels>

        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
          class="bg-orange text-white text-center"
        >
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Ad molestiae non facere animi nobis, similique nemo velit reiciendis
            corporis impedit nam in.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Nostrum necessitatibus expedita dolores? Voluptatem repudiandae
            magni ea.
          </q-tab-panel>
        </q-tab-panels>

        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="jump-up"
          transition-next="jump-down"
          class="bg-teal text-white text-center"
        >
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Ad molestiae non facere animi nobis, similique nemo velit reiciendis
            corporis impedit nam in.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Nostrum necessitatibus expedita dolores? Voluptatem repudiandae
            magni ea.
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  name: 'Message',
  data() {
    return {
      tab: 'mails'
    }
  }
}
</script>

<style scoped></style>
