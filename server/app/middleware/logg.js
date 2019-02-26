'use strict';


module.exports = () => {
  return async function logg(ctx, next) {
    const dateStart = Date.now();
    ctx.app.logger.info(ctx.request.method, ctx.request.url, 'is coming');
    await next();
    const dateEnd = Date.now();
    const time = dateEnd - dateStart
    ctx.app.logger.info(ctx.request.method, ctx.request.url, 'is end', 'take time:' + time + 'ms');
  };
};
