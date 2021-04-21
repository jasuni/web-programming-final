<template>
  <div class="login">
    <form class="login-form">
      <fieldset>
        <legend>Register for an account</legend>
        <input placeholder="username" v-model="username">
        <input type="password" placeholder="password" v-model="password">
      </fieldset>
      <fieldset>
        <button type="submit" @click.prevent="register">Register</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      usernames: '',
      password: '',
    }
  },
  methods: {
    async register() {

    }
  }
}
</script>
