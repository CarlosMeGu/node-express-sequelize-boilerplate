const { ProductInventory } = require('../model');

const getProductById = async ({ productId }) => ProductInventory.findOne({
  where: {
    id: productId,
  },
});

const getAllProducts = async () => ProductInventory.findAll();

module.exports = {
  getProductById, getAllProducts,
};
