const RESPONSES = {
  SERVER_ERROR: {
    MESSAGE: 'Internal server error',
    STATUS: 500,
  },
  UNAUTHORIZED: {
    MESSAGE: 'Unauthorized',
    STATUS: 401,
  },
  NOT_FOUND_ERR: {
    MESSAGE: 'Not found',
    STATUS: 404,
  },
  ALREADY_REPORTED: {
    MESSAGE: 'Already reported',
    STATUS: 208,
  },
  UNPROCESSABLE: {
    MESSAGE: 'Insufficient funds',
    STATUS: 422,
  },
  ACCEPTED: {
    MESSAGE: 'Accepted',
    STATUS: 202,
  },
};

module.exports = {
  RESPONSES,
};
