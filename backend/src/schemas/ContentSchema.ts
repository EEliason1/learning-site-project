import { gql } from 'graphql-tag';

export const contentTypeDefs = gql`
  type Content {
    id: ID!
    title: String!
    type: String!
    url: String
    text: String
    course: Course!
  }

  type Query {
    content(id: ID!): Content
    allContent: [Content]
  }

  type Mutation {
    createContent(title: String!, type: String!, url: String, text: String, courseId: ID!): Content
    deleteContent(id: ID!): Boolean
  }
`;
