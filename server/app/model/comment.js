'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentSchema = new Schema({
    userId: { type: Number, required: true },
    blogId: { type: String, required: true },
    parentId: { type: String, required: true, default: '' },
    likes: { type: Number, required: true, default: 0 },
    content: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  });

  CommentSchema.pre('save', function(next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });
  CommentSchema.pre('update', function(next) {
    const now = new Date();
    this.updatedAt = now;
    next();
  });
  return mongoose.model('Comment', CommentSchema);
};
