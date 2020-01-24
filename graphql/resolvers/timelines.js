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
              createdAt: new Date().toISOString()
            });
            await timeline.save();
            return timeline;
          } else throw new UserInputError('Timeline not found');
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
