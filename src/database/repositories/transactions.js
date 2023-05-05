const { Transaction, sequelize, ProductInventory } = require('../model');

const getAll = async () => Transaction.findAll();

const getBuysAndSells = async () => Transaction.findAll({
  attributes: [
    'productId',
    'type',
    [sequelize.fn('sum', sequelize.col('productAmount')), 'productAmount'],
    [sequelize.fn('sum', sequelize.col('totalCost')), 'totalCost'],
  ],
  include: [{
    model: ProductInventory,
  }],
  order: [['productId', 'ASC']],
  group: ['productId', 'type'],
});

const createTransaction = async ({
  productId, cost, productAmount, type, totalCost, t,
}) => Transaction.create({
  productId,
  cost,
  productAmount,
  totalCost,
  type,
}, { transaction: t });
module.exports = {
  getAll,
  createTransaction,
  getBuysAndSells,
};
