<template>
  <div class="home">
    <Forms v-if="user" />
    <Login v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Forms from '@/components/Forms.vue'

export default {
  name: 'Home',
  components: {
    Forms,
    Login,
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>
