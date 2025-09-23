<!-- src/App.vue -->
<template>
  <main class="container">
    <h1>Task Manager</h1>

    <!-- 2) 模板语法：插值显示未完成数量 -->
    <p>Total: {{ tasks.length }} | Incomplete: {{ incompleteCount }}</p>

    <!-- 过滤区（可选加分） -->
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

    <!-- 9) 表单绑定 + 8) 事件：添加任务 -->
    <TaskForm
        :categories="categories"
        :priorities="priorities"
        @add="addTask"
    />

    <!-- 6) 条件渲染 -->
    <p v-if="filteredTasks.length === 0" class="empty">No tasks</p>

    <!-- 7) 列表渲染 -->
    <TaskList
        v-else
        :tasks="filteredTasks"
        @toggle="toggleDone"
        @remove="removeTask"
    />
  </main>
</template>

<script setup>
/**
 * 3) 响应式：任务列表放在 ref/ reactive
 * 4) 计算属性：incompleteCount + filteredTasks
 */
import { ref, reactive, computed } from 'vue'
import TaskForm from './components/task/form.vue'
import TaskList from './components/task/list.vue'

// 演示数据（可删）
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

// 4i) 未完成数量
const incompleteCount = computed(() => tasks.value.filter(t => !t.done).length)

// 4ii) 过滤后的列表
const filteredTasks = computed(() => {
  return tasks.value.filter(t => {
    if (filters.category && t.category !== filters.category) return false
    if (filters.priority && t.priority !== filters.priority) return false
    if (filters.onlyIncomplete && t.done) return false
    return true
  })
})

// 8) 事件处理：添加 / 删除 / 完成
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