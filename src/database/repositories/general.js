const { General } = require('../model');

const getGeneralInformation = async () => General.findOne();

module.exports = {
  getGeneralInformation,
};
