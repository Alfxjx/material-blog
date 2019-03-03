'use strict';
const error = require('../errors/errors');

module.exports = () => {
  return async function check(ctx, next) {
    if (!ctx.user || !ctx.isAuthenticated()) {
      throw error.NotLoginError();
    }
    await next();
  };
};
