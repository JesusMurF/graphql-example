const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const Champion = require('./champion');

const app = express();
app.use(cors());

const schema = buildSchema(`
  type Query {
    language: String,
    getChampions: [Champion]
    getChampionByName(name: String!): Champion
  }

  type Mutation {
    updateAttackDamage(name: String!, attackDamage: Float): Champion
  }

  type Champion {
    name: String,
    attackDamage: Float
  }
`);

const champions = [
  new Champion('Ashe', 100),
  new Champion('Vayne', 200)
]

const rootValue = {
  language: () => 'GraphQL',
  getChampions: () => champions,
  getChampionByName: ({ name }) => champions.find(element => element.name === name),
  updateAttackDamage: ({name, attackDamage = 150}) => {
    const champion = champions.find(element => element.name === name);
    champion.attackDamage = attackDamage;
    return champion;
  }
}

app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))

app.listen(4000, () => console.log('Listening on 4000'));