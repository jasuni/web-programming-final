<template>
  <div class="forms-list">
    <div class="menu">
      <p>You are logged in as: {{user.username}} <button @click="logout" class="logout">Logout</button></p>
      <button @click="toggleQuestionaireCreation">Create New Questionaire</button>
      <new-questionaire :show="showInputForm" @close="close" @uploadFinished="finishCreation" />
    </div>
    <button @click="toggleList">Switch List</button>
    <div class="questionaire-list" >
      <global-questionaire-list v-if="global"/>
      <user-questionaire-list v-else />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NewQuestionaire from '@/components/NewQuestionaire.vue';
import UserQuestionaireList from '@/components/UserQuestionaireList.vue';
import GlobalQuestionaireList from '@/components/GlobalQuestionaireList.vue';
export default {
  name: 'Forms',
  components: {
    NewQuestionaire,
    GlobalQuestionaireList,
    UserQuestionaireList,
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  data() {
    return {
      showInputForm: false,
      global: false,
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
    },
    async getQuestionaires() {
      try {
        let response = await axios.get("/api/questionaires");
        this.questionaires = response.data.questionaires;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    toggleQuestionaireCreation() {
      this.showInputForm = true;
    },
    async finishCreation() {
      this.showInputForm = false;
      this.getQuestionaires();
    },
    close() {
      this.showInputForm = false;
    },
    toggleList() {
      this.global = !this.global;
    },

  }
}
</script>

<style scoped>
.menu {
  margin-bottom: 24px;
}
</style>
