const { model, Schema } = require('mongoose');

const timelineSchema = new Schema({
  username: String,
  createdAt: String,
  headline: String,
  summary: String,
  imgUrl: String,
  sources: [
    {
      body: String,
      url: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Timeline', timelineSchema);
