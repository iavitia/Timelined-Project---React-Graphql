const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');
const Timeline = require('../../models/Timeline');
const checkAuth = require('../../utils/check-auth');
const { validateSources } = require('../../utils/validators');

module.exports = {
  Query: {
    async getTimelines() {
      try {
        const timelines = await Timeline.find().sort({ createdAt: -1 });
        return timelines;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getTimeline(_, { timelineId }) {
      try {
        const timeline = await Timeline.findById(timelineId);
        if (timeline) {
          return timeline;
        } else {
          throw new Error('Timeline not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    // TODO: Add validation to inputs
    async createTimeline(_, { headline, summary, imgUrl }, context) {
      const user = checkAuth(context);
      const newTimeline = new Timeline({
        headline,
        summary,
        imgUrl,
        user: user.indexOf,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const timeline = await newTimeline.save();

      return timeline;
    },
    async deleteTimeline(_, { timelineId }, context) {
      const user = checkAuth(context);

      try {
        const timeline = await Timeline.findById(timelineId);

        if (user.username === timeline.username) {
          await timeline.delete();
          return 'Deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    // TODO: add validation for url
    async addSources(_, { timelineId, body, url }, context) {
      const user = checkAuth(context);
      const { valid, errors } = validateSources(body, url);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      try {
        const timeline = await Timeline.findById(timelineId);

        if (user.username === timeline.username) {
          if (timeline) {
            timeline.sources.push({
              body,
              url,
              username: user.username,
              createdAt: new Date().toISOString()
            });
            await timeline.save();

            context.pubsub.publish('NEW_SOURCE', {
              newSource: timeline
            });

            return timeline;
          } else throw new UserInputError('Timeline not found');
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteSource(_, { timelineId, sourceId }, context) {
      const { username } = checkAuth(context);

      const timeline = await Timeline.findById(timelineId);

      if (timeline) {
        const sourceIndex = timeline.sources.findIndex(
          source => source.id === sourceId
        );

        if (timeline.sources[sourceIndex].username === username) {
          timeline.sources.splice(sourceIndex, 1);
          await timeline.save();
          return timeline;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Timeline not found');
      }
    },
    async likeTimeline(_, { timelineId }, context) {
      const { username } = checkAuth(context);

      const timeline = await Timeline.findById(timelineId);
      if (timeline) {
        if (timeline.likes.find(like => like.username === username)) {
          // timeline already liked, unlike it
          timeline.likes = timeline.likes.filter(
            like => like.username !== username
          );
        } else {
          // Not liked, like timeline
          timeline.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }
        await timeline.save();
        return timeline;
      } else throw new UserInputError('Timeline not found');
    }
  },
  Subscription: {
    newSource: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_SOURCE')
    }
  }
};
