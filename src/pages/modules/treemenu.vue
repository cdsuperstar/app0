<template>
  <div v-if="children.ismenu.indexOf('A') !== -1">
    <q-expansion-item
      v-model="epandstate"
      v-if="children.children.length > 0"
      v-bind:key="children.id"
      :header-class="{ 'text-primary text-weight-bold': epandstate }"
      expand-separator
      :to="
        children.url === '' || children.url === null
          ? ''
          : { name: children.url }
      "
      :content-inset-level="depth * 0.2"
      :caption="children.tip"
    >
      <template v-slot:header>
        <q-item-section avatar>
          <q-icon class="text-primary" :name="children.icon" />
        </q-item-section>

        <q-item-section>
          {{ children.title }}
        </q-item-section>
      </template>
      <treemenu
        v-for="node in children.children"
        v-bind:key="node.id"
        :children="node"
        :depth="depth + 1"
      ></treemenu>
    </q-expansion-item>

    <q-item
      v-if="children.children.length == 0"
      :to="
        children.url === '' || children.url === null
          ? ''
          : { name: children.url }
      "
      style="border-bottom: 1px dashed #ebebeb;"
      :caption="children.tip"
      :title="children.tip"
    >
      <q-item-section avatar>
        <q-icon class="text-primary" :name="children.icon" />
      </q-item-section>
      <q-item-section>{{ children.title }}</q-item-section>
    </q-item>
  </div>
</template>
<script>
export default {
  name: 'treemenu',
  props: ['children', 'depth'],
  data() {
    return {
      epandstate: true
    }
  },
  created() {
    // console.log(
    //   this.children.url,
    //   this.children.url === '' || this.children.url === null
    // )
    // console.log(this.children.name, this.children, this.depth)
  },
  method: {
    test() {
      console.log(this)
      return true
    }
  }
}
</script>
