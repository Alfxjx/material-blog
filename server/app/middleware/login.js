'use strict';

module.exports = () => {
  return async function addCoodie(ctx, next) {
    ctx.cookies.set("sucLoginUrl", ctx.request.query.surl || 'http://www.alfxjx.club?loginRes=true', {overwrite: true});
    ctx.cookies.set("failLoginUrl", ctx.request.query.furl || 'http://www.alfxjx.club?loginRes=false', {overwrite: true});
    await next();
  };
};
