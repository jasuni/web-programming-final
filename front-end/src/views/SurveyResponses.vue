<template>
  <div>
    <div v-if="show">
    <form class="questionaire" @submit.prevent="update">
      <fieldset>
        <input v-model="questionaire.title" placeholder="Title">
      </fieldset>
      <fieldset>
        <textarea v-model="questionaire.description" placeholder="Description" />
      </fieldset>
      <div v-for="(question, index) in questionaire.questions" :key="index">
        <fieldset>
          <textarea v-model="questionaire.questions[index]" placeholder="Your Question here" />
        </fieldset>
      </div>
      <button type="submit" @click.prevent="update">Update</button>
    </form>

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
  computed: {
    questions() {
      return this.questionaire.questions;
    }
  },
  async created() {
    this.id = this.$route.params.id
    console.log(this.id)
    await this.getQuestionaire();
  },
  methods: {
    async getQuestionaire() {
      try {
        let response = await axios.get('/api/questionaires/' +
            this.$root.$data.user._id + '/' + this.id);
        console.log(response);
        this.questionaire = response.data;
        this.questions = response.data.questions;
        this.show = true;
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
        this.show = false;
      }
    },
    async update() {
      try {
        await axios.put('/api/questionaires/' + this.$root.$data.user._id +
            '/' + this.id, this.questionaire);
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
        this.show = false;
      }
    }
    //async removeSurvey() {
      // delete survey, then return to home page
      //<button type="button" @click="removeSurvey(index)">Delete Survey</button>
    //}
    //<p class="question">{{question}}</p>
  }
}
</script>
