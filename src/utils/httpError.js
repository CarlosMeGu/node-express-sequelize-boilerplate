const { RESPONSES } = require('./httpResponses');

class HttpError extends Error {
  constructor(
    code = RESPONSES.SERVER_ERROR.STATUS,
    message = RESPONSES.SERVER_ERROR.MESSAGE,
  ) {
    super(message);
    this.code = code;
  }
}

module.exports = HttpError;
