<template>
  <div class="home">
    <Forms v-if="user" />
    <Login v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Login from '@/components/Login.vue'
import Forms from '@/components/Forms.vue'

export default {
  name: 'Home',
  components: {
    Forms,
    Login,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
}
</script>
