const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const timelineResolvers = require('./timelines');

module.exports = {
  Query: {
    ...postsResolvers.Query,
    ...timelineResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...timelineResolvers.Mutation
  }
};
