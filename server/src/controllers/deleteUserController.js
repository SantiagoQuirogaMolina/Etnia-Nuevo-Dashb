const { Op } = require("sequelize");
const { User } = require("../db");

const findAllDeleteduser = async () => {
  console.log("si entra ");
  try {
    const deletedProducts = await User.findAll({
      paranoid: false,
      where: {
        deletedAt: { [Op.not]: null },
      },
      timezone: "UTC", // Ajusta la zona horaria según tus necesidades
    });
    console.log("lista de deleteproduct" + JSON.stringify(deletedProducts));

    // const deletedUsers = await User.findAll({
    //   where: {
    //     deletedAt: { [Sequelize.Op.ne]: null }
    //   }
    // });
    const allDeletedRecords = [
      ...deletedProducts,
      // ...deletedUsers,
    ];

    return allDeletedRecords;
  } catch (error) {
    console.error("Error retrieving soft-deleted records:", error);
    throw error; // You might want to propagate the error back to the caller
  }
};

module.exports = findAllDeleteduser;
