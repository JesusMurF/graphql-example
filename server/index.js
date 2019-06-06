const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const Todo = require('./todo');

const app = express();
app.use(cors());

const schema = buildSchema(`
  type Query {
    language: String,
    getTodos: [Todo]
    getTodoById(id: Int!): Todo
  }

  type Mutation {
    updateTodo(id: Int!, title: String): Todo
  }

  type Todo {
    id: Int
    title: String
  }
`);

const todos = [
  new Todo(1, 'Mi primer todo'),
  new Todo(2, 'Mi segundo todo')
]

const rootValue = {
  language: () => 'GraphQL',
  getTodos: () => todos,
  getTodoById: ({ id }) => todos.find(todo => todo.id === id),
  updateTodo: ({id, title = ''}) => {
    const todo = todos.find(todo => todo.id === id);
    todo.title = title;
    return todo;
  }
}

app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))

app.listen(4000, () => console.log('Listening on 4000'));