'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const BlogSchema = new Schema({
    category: { type: String },
    tag: { type: [ String ], default: [] },
    desc: { type: String },
    image: { type: String },
    author: { type: String },
    title: { type: String, unique: true },
    content: { type: String },
    blogInfo: {
      type: {
        viewCount: Number,
        likes: Number,
      },
      default: { viewCount: 0, likes: 0 },
    },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  });

  BlogSchema.pre('save', function(next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });
  return mongoose.model('Blog', BlogSchema);
};

