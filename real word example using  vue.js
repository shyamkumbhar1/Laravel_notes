Creating a real-world task using Vuex involves setting up a Vuex store to manage the state of your application, defining actions to interact with external APIs or perform asynchronous tasks, mutations to update the state in response to actions, and getters to retrieve and compute derived state from the store.

Let's create a simple real-world task management application where users can add, remove, and mark tasks as completed. We'll use Vuex to manage the state of tasks.

Here's a basic outline of how you can structure your Vuex store and components for this task management application:

Define the Vuex Store:
Create a Vuex store with state, mutations, actions, and getters.
Define an array in the state to hold the list of tasks.
javascript
Copy code
// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: [],
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
    },
    removeTask(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    toggleTaskCompletion(state, taskId) {
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit('addTask', task);
    },
    removeTask({ commit }, taskId) {
      commit('removeTask', taskId);
    },
    toggleTaskCompletion({ commit }, taskId) {
      commit('toggleTaskCompletion', taskId);
    },
  },
  getters: {
    completedTasks(state) {
      return state.tasks.filter(task => task.completed);
    },
    pendingTasks(state) {
      return state.tasks.filter(task => !task.completed);
    },
  },
});
Create Components:
Create Vue components to interact with the Vuex store and display tasks.
Use Vuex actions to perform operations like adding, removing, or toggling task completion.
vue
Copy code
<!-- TaskList.vue -->
<template>
  <div>
    <h2>Tasks</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <span :class="{ 'completed': task.completed }">{{ task.name }}</span>
        <button @click="toggleTaskCompletion(task.id)">
          {{ task.completed ? 'Mark Incomplete' : 'Mark Complete' }}
        </button>
        <button @click="removeTask(task.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['completedTasks', 'pendingTasks']),
    tasks() {
      // Combine completed and pending tasks
      return [...this.pendingTasks, ...this.completedTasks];
    },
  },
  methods: {
    ...mapActions(['toggleTaskCompletion', 'removeTask']),
  },
};
</script>
vue
Copy code
<!-- TaskForm.vue -->
<template>
  <div>
    <h2>Add Task</h2>
    <form @submit.prevent="addTask">
      <input type="text" v-model="taskName" placeholder="Enter task name" required>
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      taskName: '',
    };
  },
  methods: {
    ...mapActions(['addTask']),
    addTask() {
      if (this.taskName.trim() !== '') {
        this.addTask({ id: Date.now(), name: this.taskName, completed: false });
        this.taskName = '';
      }
    },
  },
};
</script>
Use Components in App:
Use the components in your main App component.
vue
Copy code
<!-- App.vue -->
<template>
  <div id="app">
    <TaskForm />
    <TaskList />
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';

export default {
  components: {
    TaskForm,
    TaskList,
  },
};
</script>
