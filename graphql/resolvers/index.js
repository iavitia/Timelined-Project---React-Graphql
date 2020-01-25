const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const timelineResolvers = require('./timelines');
const commentsResolvers = require('./comments');

module.exports = {
  Post: {
    likeCount(parent) {
      return parent.likes.length;
    }
  },
  Timeline: {
    likeCount(parent) {
      return parent.likes.length;
    }
  },
  Query: {
    ...postsResolvers.Query,
    ...timelineResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...timelineResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  Subscription: {
    ...timelineResolvers.Subscription
  }
};
