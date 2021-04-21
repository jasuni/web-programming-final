<template>
  <div class="login">
    <form class="register-form">
      <fieldset>
        <legend>Register or Login</legend>
        <input placeholder="username" v-model="username">
        <input type="password" placeholder="password" v-model="password">
      </fieldset>
      <fieldset>
        <button type="submit" @click.prevent="register">Register</button>
        <button type="submit" @click.prevent="login">Login</button>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async register() {
      this.error = '';
      if (!this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = '';
      if (!this.username || !this.password)
        return;
      try {
        let response = await axios.post('api/users/login', {
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    }
  }
}
</script>
