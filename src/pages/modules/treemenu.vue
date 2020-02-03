<template>
  <div>
    <q-expansion-item
      v-if="children.ismenu == 1"
      v-bind:key="children.id"
      dense
      dense-toggle
      expand-separator
      :header-inset-level="depth * 0.3"
      :content-inset-level="depth * 0.3"
      :icon="children.icon"
      :label="children.title"
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
      v-if="children.ismenu == 0"
      :to="{ name: children.url }"
      clickable
      dense
      dense-toggle
      v-ripple
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
  props: ['children', 'depth']
}
</script>
