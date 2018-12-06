const { ApolloServer } = require("apollo-server");
const { Prisma } = require("prisma-binding");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const apolloSchema = require("./schema");

const resolvers = {
  Query,
  Mutation,
}

const server = new ApolloServer({
  typeDefs: apolloSchema,
  resolvers,
  context: ({req}) => ({
    ...req,
    prisma: new Prisma({
      typeDefs: './src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466/feed/',
      debug: true,
    }),
  }),
});

const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
};

server.listen(options).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});