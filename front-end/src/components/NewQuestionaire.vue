<template>
<transition v-if="show" name="modal">
  <div>
    <form class="new-questionaire" @submit.prevent="upload">
      <legend>New Questionaire</legend>
      <fieldset>
        <input v-model="title" placeholder="Title">
      </fieldset>
      <fieldset>
        <textarea v-model="description" placeholder="Description" />
      </fieldset>
      <div v-for="(question, index) in questions" :key="index">
        <fieldset>
          <textarea v-model="questions[index]" placeholder="Your Question here" />
        </fieldset>
      </div>
      <fieldset class="buttons">
        <button type="button" @click="addQuestion">Add Question</button>
        <button type="button" @click="close">Close</button>
        <button type="submit" @click="upload">Upload</button>
      </fieldset>
    </form>
  </div>
</transition>
</template>

<script>
import axios from 'axios';
export default {
  name: 'NewQuestionaire',
  props: {
    show: Boolean,
  },
  data() {
    return {
      title: '',
      description: '',
      questions: [''],
      error: '',
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('questions', this.questions)
        await axios.post("/api/questionaires", formData);
        this.title = '';
        this.description = '';
        this.questions = [''];
        this.$emit('uploadFinished');
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    },
    addQuestion() {
      this.questions.push('');
    }, //TODO add ability to remove questions
  }
}

/*
<div v-bind:key="(question, index) in questions">
  <fieldset>
    <textarea v-model="questions[index]" placeholder="Your Question here" />
  </fieldset>
</div>
*/
</script>
