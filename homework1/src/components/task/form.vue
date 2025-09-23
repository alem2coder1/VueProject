<!-- src/components/TaskForm.vue -->
<template>
  <form class="form" @submit.prevent="onSubmit">
    <input v-model.trim="text" type="text" placeholder="Task text" required />

    <!-- 分类选择 -->
    <select v-model="category" required>
      <option value="" disabled>Select category</option>
      <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
    </select>

    <!-- 优先级选择 -->
    <select v-model="priority" required>
      <option value="" disabled>Select priority</option>
      <option v-for="p in priorities" :key="p" :value="p">{{ p }}</option>
    </select>

    <button :disabled="!text || !category || !priority">Add task</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

// ✅ 用 props 接收父组件传来的数据
const props = defineProps({
  categories: { type: Array, required: true },
  priorities: { type: Array, required: true }
})

const emit = defineEmits(['add'])

const text = ref('')
const category = ref('')
const priority = ref('')

function onSubmit() {
  emit('add', { text: text.value, category: category.value, priority: priority.value })
  text.value = ''
  category.value = ''
  priority.value = ''
}
</script>