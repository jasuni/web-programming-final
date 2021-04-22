<template>
<div>
  <h1>Personal Questionaires</h1>
  <div v-for="(questionaire, index) in questionaires" :key=index>
    <h2>{{ questionaire.title }}</h2>
    <p>{{ questionaire.description }}</p>
    <router-link :to="'/responses/' + questionaire._id">
      <button type="button">Show Details</button>
    </router-link>
    <button type="button" @click="removeQuestionaire(index)">Remove</button>
  </div>
  <p v-if="error">{{error}}</p>

</div>
</template>

<script>
// TODO get list of questionaires from server, display title/description/creator, and
// enable the ability to view the Qs and responses
import axios from 'axios';
export default {
  name: "UserQuestionaireList",
  data() {
    return {
      questionaires: [],
      error: '',
    }
  },
  async created() {
    await this.getUserQuestionaires();
  },
  methods: {
    async getUserQuestionaires() {
      try {
        let response = await axios.get('/api/questionaires/'+this.$root.$data.user.username);
        //console.log(response);
        this.questionaires = response.data;
        this.error = '';
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    },
    async removeQuestionaire(index) {
      try {
        await axios.delete("/api/questionaires/" + this.$root.$data.user._id + '/' + this.questionaires[index]._id);
        await this.getUserQuestionaires();
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    }
  }
}

// TODO global will be able to respond to said questionaires
</script>
