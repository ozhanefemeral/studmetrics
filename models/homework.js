'use strict';
module.exports = (sequelize, DataTypes) => {
  const Homework = sequelize.define('Homework', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 40]
      }
    },
    questions: DataTypes.ARRAY(DataTypes.JSON),
    lockAfterAnswering: { type: DataTypes.BOOLEAN, defaultValue: false },
    average: { type: DataTypes.FLOAT, decimals: 3 }
  }, {});
  Homework.associate = function (models) {
    Homework.belongsTo(models.Offer, {
      foreignKey: "offerId"
    })
    Homework.hasMany(models.Assignment, {
      foreignKey: "homeworkId"
    })
  };
  return Homework;
};