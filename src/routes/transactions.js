const {
  getAll,
} = require('../database/repositories/transactions');
const { RESPONSES } = require('../utils/httpResponses');

const getTransactions = async (req, res) => {
  const products = await getAll();

  if (!products) return res.status(RESPONSES.NOT_FOUND_ERR.STATUS).end();
  return res.json(products);
};

module.exports = {
  getTransactions,
};
