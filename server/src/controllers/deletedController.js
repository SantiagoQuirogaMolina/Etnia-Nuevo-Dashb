const Sequelize = require('sequelize');
const { Products, User } = require("../db");

const findAllDeleted = async () => {
  try {
    const deletedProducts = await Products.findAll({
      where: {
        deletedAt: { [Sequelize.Op.ne]: null }
      }
    });
    const deletedUsers = await User.findAll({
      where: {
        deletedAt: { [Sequelize.Op.ne]: null }
      }
    });
    const allDeletedRecords = [
      ...deletedProducts,
      ...deletedUsers,
    ];

    return allDeletedRecords;
  } catch (error) {
    console.error('Error retrieving soft-deleted records:', error);
    throw error; // You might want to propagate the error back to the caller
  }
};

module.exports = findAllDeleted;