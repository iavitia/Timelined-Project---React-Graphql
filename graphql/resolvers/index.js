const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const timelineResolvers = require('./timelines');
const commentsResolvers = require('./comments');

module.exports = {
  Query: {
    ...postsResolvers.Query,
    ...timelineResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...timelineResolvers.Mutation,
    ...commentsResolvers.Mutation
  }
};
