'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentSchema = new Schema({
    id: { type: Number },
    userId: { type: Number },
    blogId: { typ: Number },
    parentId: { type: Number },
    content: { type: String },
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
  return mongoose.model('Comment', CommentSchema);
};
