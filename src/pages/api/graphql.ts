import { ApolloServer, gql } from 'apollo-server-micro';
import { firestore } from '~/services/firestore';

const typeDefs = gql`
  input CommentInput {
    slug: String!
    user: String!
    comment: String!
  }
  type Mutation {
    newComment(input: CommentInput!): String!
  }
  type Query {
    asd: String
  }
`;

const resolvers = {
  Mutation: {
    async newComment(_, { input }) {
      const doc = await firestore.collection(input.slug).add({
        user: input.user,
        comment: input.comment,
      });
      return doc.id;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
