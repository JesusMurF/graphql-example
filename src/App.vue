<template>
  <div id="app">
    <p>{{ lang }}</p>
    <div v-bind:key="champion.name" v-for="champion in champions">{{ champion.name }} {{ champion.attackDamage }}</div>
    <p>The champion {{ champion }}</p>
    <p>Updated champion {{ updatedChampion }}</p>
    <button @click="getLanguage">Get Language</button>
    <button @click="getChampions">Get Champions</button>
    Name: <input type="text" v-model="name">
    Attack Damage: <input v-model.number="attack">
    <button @click="updateAttackDamage">Update champion by name</button>
    <button @click="getChampionByName">Get champion by name</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data() {
    return {
      lang: '',
      champions: [],
      champion: '',
      updatedChampion: {},
      attack: 5.5
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
    },
    async getChampionByName () {
      const response = await axios.post('http://localhost:4000/graphql', {
        query: `
        query GetChampionByName($championName: String!) {
          getChampionByName(name: $championName) {
            name
            attackDamage
          }
        }`,
        variables: {
          championName: this.name
        }
      })
      this.champion = response.data.data.getChampionByName
    },
    async updateAttackDamage () {
      const response = await axios.post('http://localhost:4000/graphql', {
        query: `
          mutation UpdateAttackDamage(
            $championName: String!, $attackDamage: Float) {
              updateAttackDamage(name: $championName, attackDamage: $attackDamage) {
                name
                attackDamage
              }
            }`,
            variables: {
              championName: this.name,
              attackDamage: this.attack
            }
      })
      this.updatedChampion = response.data.data.updateAttackDamage;
    }
  }
}
</script>
