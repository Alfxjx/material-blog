'use strict';

class BaseError extends Error {
  constructor(statusCode, msg) {
    super();
    this.statusCode = statusCode;
    this.msg = msg;
  }
}

exports.BaseError = BaseError;
