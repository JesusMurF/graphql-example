const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const app = express();
app.use(cors());

const schema = buildSchema(`
  type Query {
    language: String,
    getTodos: [Todo]
    getTodoById(id: String!): Todo
  }

  type Mutation {
    updateTodo(id: String!, title: String): Todo
  }

  type Todo {
    id: String
    title: String
  }
`);

const todos = [
  {id: '1', title: 'Mi primer todo'},
  {id: '2', title: 'Mi segundo todo'}
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