
<template>
  <li class="item" :class="{ done: task.done }">
    <div class="info">
      <strong class="text">{{ task.text }}</strong>
      <span class="meta">[{{ task.category }} · {{ task.priority }}]</span>
    </div>
    <div class="actions">
      <button @click="$emit('toggle')">
        {{ task.done ? 'Undo' : 'Done' }}
      </button>
      <button class="danger" @click="$emit('remove')">Delete</button>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  task: { type: Object, required: true }
})
</script>

<style scoped>
.item { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border: 1px solid #eee; border-radius: 8px; }
.info { display: flex; gap: 8px; align-items: center; }
.text { font-weight: 600; }
.meta { color: #888; font-size: 12px; }
.actions { display: flex; gap: 8px; }
button { height: 30px; padding: 0 10px; }
button.danger { color: #c0392b; border-color: #f2d7d5; }
.done .text { text-decoration: line-through; opacity: 0.6; } /* 5) class 绑定效果 */
</style>