'use strict';

const Controller = require('egg').Controller;
const error = require('../errors/errors');
const path = require('path');
const fs = require('fs');
class HomeController extends Controller {
  async upload() {
    const { ctx } = this;
    // egg-multipart 已经帮我们处理文件二进制对象
    const stream = await ctx.getFileStream();
    console.log(stream);
    const filename = stream.filename;
    const newfileName = Date.now() + filename;
    const target = path.join(__dirname, '../public/image/' + newfileName);
    const writeStream = fs.createWriteStream(target);
    const pub = new Promise(resolve => {
      const _stream = stream.pipe(writeStream);
      _stream.on('finish', () => {
        resolve();
      });
    });
    await pub;
    ctx.body = {
      statusCode: error.STATUS_CODE.SUC,
      msg: '上传成功',
      data: `http://www.alfxjx.club/image/${newfileName}`,
    };
  }
  async form() {
    const { ctx } = this;
    ctx.body = {
      statusCode: error.STATUS_CODE.SUC,
      msg: 'get form',
    };
  }
}

module.exports = HomeController;
