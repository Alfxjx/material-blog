'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const BlogSchema = new Schema({
    category: { type: String, required: true },
    tag: { type: [ String ], default: [] },
    desc: { type: String, required: true },
    image: { type: String },
    author: { type: String, required: true },
    title: { type: String, unique: true },
    content: { type: String, required: true },
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
  BlogSchema.pre('update', function(next) {
    const now = new Date();
    this.updatedAt = now;
    next();
  });
  return mongoose.model('Blog', BlogSchema);
};

