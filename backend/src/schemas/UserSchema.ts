import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Query {
    user(id: ID!): User
    allUsers: [User]
  }

  type Mutation {
    register(name: String!, email: String!, password: String!, role: String!): User
    deleteUser(id: ID!): Boolean
  }
`;
