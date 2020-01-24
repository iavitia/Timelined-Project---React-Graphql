const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
  }
  type Comment {
    id: ID!
    username: String!
    createdAt: String!
    body: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  type Timeline {
    id: ID!
    username: String!
    createdAt: String!
    headline: String!
    summary: String!
    imgUrl: String!
    sources: [Sources!]
  }
  type Sources {
    id: ID!
    body: String
    url: String
    createdAt: String
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID): Post
    getTimelines: [Timeline]
    getTimeline(timelineId: ID): Timeline
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createTimeline(
      headline: String!
      summary: String!
      imgUrl: String!
    ): Timeline!
    deleteTimeline(timelineId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    LikePost(postId: ID!): Post!
    likeTimeline(timelineId: ID!): Timeline!
    addSources(timelineId: ID!, body: String!, url: String!): Timeline!
  }
`;
