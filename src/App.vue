<template>
  <div id="app">
    <p>{{ lang }}</p>
    <div v-bind:key="champion.name" v-for="champion in champions">{{ champion.name }} {{ champion.attackDamage }}</div>
    <button @click="getLanguage">Get Language</button>
    <button @click="getChampions">Get Champions</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data() {
    return {
      lang: '',
      champions: []
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
    },
    async getChampions() {
      try {
        const response = await axios.post('http://localhost:4000/graphql', {query: `{getChampions {name, attackDamage}}`});
        this.champions = response.data.data.getChampions;
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
