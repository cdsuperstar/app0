<template>
  <div>
    <q-expansion-item
      v-if="children.children.length > 0"
      v-bind:key="children.id"
      dense
      dense-toggle
      expand-separator
      :to="children.ismenu == 1 ? '' : { name: children.url }"
      :content-inset-level="depth * 0.3"
      :icon="children.icon"
      :label="children.title"
      :caption="children.tip"
      default-closed
    >
      <treemenu
        v-for="node in children.children"
        v-bind:key="node.id"
        :children="node"
        :depth="depth + 1"
      ></treemenu>
    </q-expansion-item>

    <q-item
      v-if="children.children.length == 0"
      :to="children.ismenu == 1 ? '' : { name: children.url }"
      :caption="children.tip"
      dense
      dense-toggle
      :title="children.tip"
    >
      <q-item-section avatar>
        <q-avatar :icon="children.icon" />
      </q-item-section>
      <q-item-section>{{ children.title }}</q-item-section>
    </q-item>
  </div>
</template>
<script>
export default {
  name: 'treemenu',
  props: ['children', 'depth'],
  created() {
    // console.log(this.children.name, this.children, this.depth)
  }
}
</script>
