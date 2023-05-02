const {
  getProductById,
  getAllProducts,
} = require('../database/repositories/productInventory');
const { RESPONSES } = require('../utils/httpResponses');

const getProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await getProductById({ productId });

  if (!product) return res.status(RESPONSES.NOT_FOUND_ERR.STATUS).end();
  res.json(product);
};

const getAll = async (req, res) => {
  const products = await getAllProducts();
  if (!products) return res.status(RESPONSES.NOT_FOUND_ERR.STATUS).end();
  res.json(products);
};

module.exports = {
  getProduct,
  getAll,
};
