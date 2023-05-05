const {
  getAll, getBuysAndSells,
} = require('../database/repositories/transactions');
const { RESPONSES } = require('../utils/httpResponses');
const { TRANSACTION } = require('../database/repositories/constants');
const { getInventoryWithTransactions } = require('../database/repositories/productInventory');

const getTransactions = async (req, res) => {
  const products = await getAll();

  if (!products) return res.status(RESPONSES.NOT_FOUND_ERR.STATUS).end();
  return res.json(products);
};

const transactionTypeMessage = (type) => {
  if (type === TRANSACTION.TYPE.SELL) return 'have been sold';
  return 'have been bought';
};
const beautifyTransactionsMessage = (transactions) => {
  const response = [];
  transactions.forEach((transaction) => {
    response.push(`${transaction.productAmount} boxes of ${transaction.ProductInventory.name} ${transactionTypeMessage(transaction.type)} for a total of $${transaction.totalCost}`);
  });
  return response;
};
const getBuyAndSellTransactions = async (req, res) => {
  const products = await getBuysAndSells();

  if (!products) return res.status(RESPONSES.NOT_FOUND_ERR.STATUS).end();
  return res.json(beautifyTransactionsMessage(products));
};

const beautifyInventoryMessage = (products) => {
  const response = [];
  products.forEach((product) => {
    response.push(`${product.stock} boxes of ${product.name} are currently in stock`);
    let profit = 0;
    if (product.Transactions.length > 0) {
      product.Transactions.forEach((transaction) => {
        response.push(`${transaction.productAmount} boxes of ${product.name} ${transactionTypeMessage(transaction.type)}`);
        if (transaction.type === TRANSACTION.TYPE.SELL) profit += transaction.totalCost;
        else profit -= transaction.totalCost;
      });
    }
    response.push(`The total profit for ${product.name} is $${profit}`);
  });
  return response;
};

const getInventory = async (req, res) => {
  const products = await getInventoryWithTransactions();
  if (!products) return res.status(RESPONSES.NOT_FOUND_ERR.STATUS).end();
  return res.json(beautifyInventoryMessage(products));
};

module.exports = {
  getBuyAndSellTransactions,
  getTransactions,
  getInventory,
};
