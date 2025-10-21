<!-- src/App.vue -->
<template>
  <main class="container">
    <h1>Task Manager</h1>

    <p>Total: {{ tasks.length }} | Incomplete: {{ incompleteCount }}</p>

    <section class="filters">
      <label>
        Category:
        <select v-model="filters.category">
          <option value="">All</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </label>

      <label>
        Priority:
        <select v-model="filters.priority">
          <option value="">All</option>
          <option v-for="p in priorities" :key="p" :value="p">{{ p }}</option>
        </select>
      </label>

      <label>
        <input type="checkbox" v-model="filters.onlyIncomplete" />
        Only incomplete
      </label>
    </section>

    <TaskForm
        :categories="categories"
        :priorities="priorities"
        @add="addTask"
    />

    <p v-if="filteredTasks.length === 0" class="empty">No tasks</p>

    <TaskList
        v-else
        :tasks="filteredTasks"
        @toggle="toggleDone"
        @remove="removeTask"
    />
  </main>
</template>

<script setup>

import { ref, reactive, computed } from 'vue'
import TaskForm from './components/task/form.vue'
import TaskList from './components/task/list.vue'

const tasks = ref([
  { id: 1, text: 'Buy milk', category: 'Life', priority: 'medium', done: false },
  { id: 2, text: 'Finish report', category: 'Work', priority: 'high', done: false },
])

const categories = ['Work', 'Study', 'Life']
const priorities = ['low', 'medium', 'high']

const filters = reactive({
  category: '',
  priority: '',
  onlyIncomplete: false,
})


const incompleteCount = computed(() => tasks.value.filter(t => !t.done).length)


const filteredTasks = computed(() => {
  return tasks.value.filter(t => {
    if (filters.category && t.category !== filters.category) return false
    if (filters.priority && t.priority !== filters.priority) return false
    if (filters.onlyIncomplete && t.done) return false
    return true
  })
})

function addTask(payload) {
  const id = Date.now()
  tasks.value.push({ id, done: false, ...payload })
}
function removeTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}
function toggleDone(id) {
  const t = tasks.value.find(t => t.id === id)
  if (t) t.done = !t.done
}
</script>

<style scoped>
.container { max-width: 720px; margin: 32px auto; padding: 0 16px; }
.filters { display: flex; gap: 16px; align-items: center; margin: 16px 0; }
.empty { color: #999; margin: 16px 0; }
</style>