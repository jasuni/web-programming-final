<template>
  <div class="forms-list">
    <p>You are logged in as: {{user.username}} <button @click="logout" class="logout">Logout</button></p>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Forms',
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async logout() {
      try {
        await axios.delete('/api/users');
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    }
  }
}
</script>
