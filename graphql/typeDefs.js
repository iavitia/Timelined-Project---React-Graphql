const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
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
    sources: [Sources]!
    likes: [Like]!
    likeCount: Int!
  }
  type Sources {
    id: ID!
    username: String!
    body: String!
    url: String!
    createdAt: String!
  }
  type User {
    id: ID!
    email: String!
    about: String
    profilePic: String
    token: String!
    username: String!
    name: String
    createdAt: String!
    contact: Contact
    timelines: [Timeline]!
  }

  type Contact {
    email: String
    facebook: String
    instagram: String
    twitter: String
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
    getUsers: [User]
    getUser(username: String!): User
    getTimelines: [Timeline]
    getTimeline(timelineId: ID): Timeline
    getTimelinesByUsername(username: String!): [Timeline]
    getPostByUsername(username: String!): Post
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
    likePost(postId: ID!): Post!
    likeTimeline(timelineId: ID!): Timeline!
    addSources(timelineId: ID!, body: String!, url: String!): Timeline!
    deleteSource(timelineId: ID!, sourceId: ID!): Timeline!
  }
  type Subscription {
    newSource: Timeline!
    newComment: Comment!
  }
`;
