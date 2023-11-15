const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Purchases",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      payment_id:{
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {paranoid: true}
  );
};