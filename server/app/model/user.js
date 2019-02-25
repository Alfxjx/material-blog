'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    id: { type: Number },
    username: { type: String },
    pwd: { typ: String },
    avatar: { type: String },
    desc: { type: String, default: '这个人很懒，什么都没有写' },
    openId: { type: String },
    tpUserName: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  });

  UserSchema.pre('save', function(next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });
  return mongoose.model('User', UserSchema);
};
