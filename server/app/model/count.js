'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CountSchema = new Schema({
    ip: { type: String, required: true },
    // 分有 home 首页  blogview 博客 backup1 备用 bloglike
    type: { type: String, required: true },
    blogId: { type: String },
    createdAt: { type: Date },
  });
  CountSchema.pre('save', function(next) {
    this.createdAt = new Date();
    next();
  });

  return mongoose.model('Count', CountSchema);
};
