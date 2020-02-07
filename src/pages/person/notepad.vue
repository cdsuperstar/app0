<template>
  <div class="q-pa-md" align="center">
    <div style="float:right;">
      <q-btn
        round
        color="purple"
        glossy
        text-color="white"
        icon="add"
        size="20px"
        title="添加新备忘"
      ></q-btn>
    </div>
    <span style="color: #9C9C9C">温馨提示：点击进入进行修改</span>
    <div class="q-gutter-md">
      <div
        class="inline bg-brown-2 rounded-borders cursor-pointer"
        style="max-width: 600px"
      >
        <div class="fit flex flex-center text-center non-selectable q-pa-md">
          I am groot!<br />(Hover me!)
        </div>
      </div>

      <div
        class="inline bg-blue-2 rounded-borders cursor-pointer"
        style="max-width: 600px"
      >
        <div class="fit flex flex-center text-center non-selectable q-pa-md">
          I am groot!<br />(Hover me!)
        </div>
      </div>

      <div
        class="inline bg-light-green-2 rounded-borders cursor-pointer"
        style="max-width: 600px"
      >
        <div class="fit flex flex-center text-center non-selectable q-pa-md">
          I am groot!<br />(Hover me!)
        </div>
      </div>

      <div
        class="inline bg-pink-2 rounded-borders cursor-pointer"
        style="max-width: 600px"
      >
        <div class="fit flex flex-center text-center non-selectable q-pa-md">
          I am groot!<br />(Hover me!)
        </div>
      </div>

      <div
        class="inline bg-purple-2 rounded-borders cursor-pointer"
        style="max-width: 600px"
      >
        <div class="fit flex flex-center text-center non-selectable q-pa-md">
          I am groot!<br />(Hover me!)
        </div>
      </div>

      <div
        class="inline bg-indigo-2 rounded-borders cursor-pointer"
        style="max-width: 600px"
      >
        <div class="fit flex flex-center text-center non-selectable q-pa-md">
          I am groot!<br />(Hover me!)
        </div>
      </div>
    </div>
    <q-page-scroller :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="pink"></q-btn>
    </q-page-scroller>
  </div>
</template>

<style></style>

<script>
export default {
  name: 'NotePad'
}
</script>

<style scoped></style>
