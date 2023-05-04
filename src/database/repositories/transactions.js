const { Transaction } = require('../model');

const getAll = async () => Transaction.findAll();

const createTransaction = async ({
  productId, cost, productAmount, type, t,
}) => Transaction.create({
  productId,
  cost,
  productAmount,
  type,
}, { transaction: t });
module.exports = {
  getAll,
  createTransaction,
};
