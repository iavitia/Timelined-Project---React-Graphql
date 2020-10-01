const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const timelineResolvers = require('./timelines');
const commentsResolvers = require('./comments');
const Timeline = require('../../models/Timeline');

module.exports = {
  Post: {
    likeCount(parent) {
      return parent.likes.length;
    },
  },
  User: {
    timelines(parent) {
      return Timeline.find({ username: parent.username });
    },
  },
  Timeline: {
    likeCount(parent) {
      return parent.likes.length;
    },
  },
  Query: {
    ...postsResolvers.Query,
    ...timelineResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...timelineResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...timelineResolvers.Subscription,
    ...commentsResolvers.Subscription,
  },
};
