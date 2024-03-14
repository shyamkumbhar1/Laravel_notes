// Parent Component File 

<template>
  <div>
    <ChildComponent :message="parentMessage" />
	 // <ChildComponent v-bind:message="parentMessage" /> // Anotehr way to write this

  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      parentMessage: 'Hello from Parent'
    };
  }
};
</script>


// Childe Componet File

<template>
  <div>
    <p>Message from parent: {{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ['message']
};
</script>
