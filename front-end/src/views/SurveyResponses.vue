<template>
  <div>
    <p>Survey Response page </p>
    <div v-if="show">
      <h2>{{ questionaire.title }}</h2>
      <p>{{ questionaire.description }}</p>
      <div v-for="(question, index) in questionaire.questions" :key=index>
        <p>{{question}}</p>
      </div>
    </div>
    <p v-if="error">{{error}}</p>
    <router-link :to="'/'">
      <p>Return to Home Page</p>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SurveyResponses',
  data() {
    return {
      id: 0,
      questionaire: {},
      error: '',
      show: false,
    }
  },
  async created() {
    this.id = this.$route.params.id
    console.log(this.id)
    this.getQuestionaire();
  },
  methods: {
    async getQuestionaire() {
      try {
        console.log("in try block");
        let response = await axios.get('/api/questionaires/' +
            this.$root.$data.user._id + '/' + this.id);
        console.log(response);
        this.questionaire = response.data;
        this.show = true;
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
        this.show = false;
      }
    },

  }
}
</script>
