<template>
  <div id="app">
    <p>{{ lang }}</p>
    <button @click="getLanguage">Get Language</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data() {
    return {
      lang: ''
    }
  },
  methods: {
     async getLanguage() {
      try {
        const response = await axios.post('http://localhost:4000/graphql', {query: '{language}'});
        this.lang = response.data.data.language;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
