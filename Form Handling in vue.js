<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue.js User Input and Form Validation Example</title>
  <!-- Include Vue.js library -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
</head>
<body>

<div id="app">
  <!-- Input field bound to a data property using v-model -->
  <input type="text" v-model="username" placeholder="Enter username">
  <!-- Display validation message -->
  <p v-if="!isUsernameValid">Please enter a valid username.</p>
  <!-- Submit button -->
  <button @click="submitForm">Submit</button>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    username: '', // Data property bound to the input field
    isUsernameValid: true // Flag to track the validity of the username
  },
  methods: {
    submitForm() {
      // Perform form validation
      if (this.username.trim() === '') {
        // If username is empty, mark it as invalid
        this.isUsernameValid = false;
      } else {
        // Otherwise, proceed with form submission
        alert('Form submitted successfully!');
        // Reset validation flag and clear input field
        this.isUsernameValid = true;
        this.username = '';
      }
    }
  }
});
</script>

</body>
</html>
