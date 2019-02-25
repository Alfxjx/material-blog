'use strict';
const crypto = require('crypto');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { type: String },
    pwd: { type: String },
    avatar: { type: String, default: 'http://www.alfxjx.club/image/defaultAvatar.jpg' },
    desc: { type: String, default: '这个人很懒，什么都没有写' },
    openId: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
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
    this.pwd = crypto.createHmac('SHA1', 'xjx').update(this.pwd).digest('hex');
    next();
  });
  return mongoose.model('User', UserSchema);
};
