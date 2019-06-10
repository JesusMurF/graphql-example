<template>
  <div id="app">
    <div class="section">
      <div class="container">
        <div v-bind:key="todo.title" v-for="todo in todos">{{ todo.title }}</div>
        <!-- <p>The champion {{ champion }}</p> -->
        <!-- <p>Updated champion {{ updatedChampion }}</p> -->
        <button class="button" @click="getLanguage">Get Language</button>
        <button class="button" @click="getTodos">Get todos</button>
        ID: <input type="text" v-model="id">
        <!-- Attack Damage: <input v-model.number="attack">
        <button @click="updateAttackDamage">Update champion by name</button> -->
        {{todo.title}}
        <button class="button" @click="getTodoById">Get ToDo</button>
      </div>
      <p>{{ lang }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data() {
    return {
      id: '',
      todo: {id: null, title: null},
      lang: '',
      todos: [],
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
    async getTodos() {
      try {
        const response = await axios.post('http://localhost:4000/graphql', {query: `{getTodos {id, title}}`});
        console.log(response)
        this.todos = response.data.data.getTodos;
      } catch (error) {
        console.log(error)
      }
    },
    async getTodoById () {
      const response = await axios.post('http://localhost:4000/graphql', {
        query: `
        query GetTodoById($todoId: String!) {
          getTodoById(id: $todoId) {
            id,
            title
          }
        }`,
        variables: {
          todoId: this.id
        }
      })
      this.todo = response.data.data.getTodoById
    },
    // async updateAttackDamage () {
    //   const response = await axios.post('http://localhost:4000/graphql', {
    //     query: `
    //       mutation UpdateAttackDamage(
    //         $championName: String!, $attackDamage: Float) {
    //           updateAttackDamage(name: $championName, attackDamage: $attackDamage) {
    //             name
    //             attackDamage
    //           }
    //         }`,
    //         variables: {
    //           championName: this.title,
    //           attackDamage: this.attack
    //         }
    //   })
    //   this.updatedChampion = response.data.data.updateAttackDamage;
    // }
  }
}
</script>

<style>
@import "../node_modules/bulma/css/bulma.min.css";
</style>

