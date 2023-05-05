const { ProductInventory, sequelize, Transaction } = require('../model');
const { getGeneralInformation } = require('./general');
const { createTransaction } = require('./transactions');
const { TRANSACTION } = require('./constants');

const getById = async ({ productId }) => ProductInventory.findOne({
  where: {
    id: productId,
  },
});

const createProduct = async ({ name }) => ProductInventory.create({
  name,
});

const sellById = async ({ productId, amount, price }) => sequelize.transaction(async (t) => {
  const product = await getById({ productId });
  if (product.stock < amount) return `Not enough stock, only ${product.stock} ${product.name} left`;

  const generalInformation = await getGeneralInformation();
  generalInformation.balance += price * amount;
  product.stock -= amount;

  await product.save({ transaction: t });
  await generalInformation.save({ transaction: t });

  await createTransaction({
    productId,
    cost: price,
    productAmount: amount,
    totalCost: price * amount,
    type: TRANSACTION.TYPE.SELL,
    t,
  });

  return product;
});

const buyById = async ({ productId, amount, price }) => sequelize.transaction(async (t) => {
  const product = await getById({ productId });

  const generalInformation = await getGeneralInformation();
  const toPay = price * amount;
  if (generalInformation.balance < toPay) return `Not enough balance, only can buy ${Math.floor(generalInformation.balance / price)} ${product.name}`;
  generalInformation.balance -= toPay;
  product.stock += amount;

  await product.save({ transaction: t });
  await generalInformation.save({ transaction: t });

  await createTransaction({
    productId,
    cost: price,
    productAmount: amount,
    totalCost: price * amount,
    type: TRANSACTION.TYPE.RECEIVE,
    t,
  });

  return product;
});

const getInventoryWithTransactions = async () => ProductInventory.findAll({
  include: [{
    attributes: [
      'type',
      [sequelize.fn('sum', sequelize.col('productAmount')), 'productAmount'],
      [sequelize.fn('sum', sequelize.col('totalCost')), 'totalCost'],
    ],
    model: Transaction,
  }],
  order: [['id', 'ASC']],
  group: ['Transactions.type', 'ProductInventory.id'],
});

const getAll = async () => ProductInventory.findAll();

module.exports = {
  buyById, getById, getAll, sellById, createProduct, getInventoryWithTransactions,
};
