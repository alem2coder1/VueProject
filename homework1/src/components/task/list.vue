
<template>
  <ul class="list">
    <item
        v-for="t in tasks"
        :key="t.id"
        :task="t"
        @toggle="$emit('toggle', t.id)"
        @remove="$emit('remove', t.id)"
    />
  </ul>
</template>

<script setup>
import Item from "@/components/task/item.vue";

const props = defineProps({
  tasks: { type: Array, required: true }
})
</script>

<style scoped>
.list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
</style>