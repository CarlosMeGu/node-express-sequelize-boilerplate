const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite', storage: './database.sqlite3',
});

class ProductInventory extends Sequelize.Model {
}

ProductInventory.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING, allowNull: false,
  },
  stock: {
    type: Sequelize.NUMBER, default: 0,
  },
  createdAt: {
    type: Sequelize.DATE, default: new Date(),
  },
  updatedAt: {
    type: Sequelize.DATE, default: new Date(),
  },
}, {
  sequelize, modelName: 'ProductInventory',
});

class Transaction extends Sequelize.Model {
}

Transaction.init({
  productId: {
    type: Sequelize.NUMBER, allowNull: false,
  },
  type: {
    type: Sequelize.ENUM('RECEIVE', 'SELL'), allowNull: false,
  },
  cost: {
    type: Sequelize.NUMBER, default: 0,
  },
  productAmount: {
    type: Sequelize.NUMBER, default: 0,
  },
  createdAt: {
    type: Sequelize.DATE, default: new Date(),
  },
  updatedAt: {
    type: Sequelize.DATE, default: new Date(),
  },
}, {
  sequelize, modelName: 'Transaction',
});

class General extends Sequelize.Model {
}

General.init({
  balance: {
    type: Sequelize.NUMBER, default: 0,
  },
  createdAt: {
    type: Sequelize.DATE, default: new Date(),
  },
  updatedAt: {
    type: Sequelize.DATE, default: new Date(),
  },
}, {
  sequelize, modelName: 'General',
});
ProductInventory.hasMany(Transaction, { foreignKey: 'productId' });
Transaction.belongsTo(ProductInventory, { foreignKey: 'productId' });

module.exports = {
  sequelize, General, ProductInventory, Transaction,
};
