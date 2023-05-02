const { Transaction } = require('../model');

const getAllTransactions = async () => Transaction.findAll();

module.exports = {
  getAllTransactions,
};
