import { gql } from 'graphql-tag';

export const courseTypeDefs = gql`
  type Course {
    id: ID!
    title: String!
    description: String!
    instructor: User!
    content: [Content!]!
  }

  type Query {
    course(id: ID!): Course
    allCourses: [Course]
  }

  type Mutation {
    createCourse(title: String!, description: String!, instructorId: ID!): Course
    deleteCourse(id: ID!): Boolean
  }
`;
